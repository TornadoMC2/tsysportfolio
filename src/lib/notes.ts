export interface Note {
    slug: string;
    title: string;
    /** One-line hook used on cards and as the page description. */
    description: string;
    /** ISO date (YYYY-MM-DD). Drives ordering and the <time> element. */
    date: string;
    tags: string[];
    /** Excluded from the index, sitemap and static params until removed. */
    draft?: boolean;
    /** Same Markdown subset as project write-ups — see src/lib/markdown.tsx. */
    content: string;
}

export const notes: Note[] = [
    {
        slug: "publishing-services-from-behind-cgnat",
        title: "Publishing services from behind CGNAT",
        description:
            "My ISP hands out carrier-grade NAT addresses, so there is no port to forward. Here's the VPS-and-WireGuard ingress path I use to put internal services on the public internet anyway.",
        date: "2026-05-18",
        tags: ["Networking", "WireGuard", "CGNAT", "Nginx"],
        content: `
            ## The problem

            Residential ISPs increasingly hand out carrier-grade NAT addresses. Your router gets something in 100.64.0.0/10, the real public address is shared across many customers, and there is no port forwarding to configure because the port does not belong to you. Dynamic DNS does not help: the address it resolves to is not yours either.

            For a homelab this is the wall you hit the moment you want anything reachable from outside the house.

            ## What does not work

            - **Port forwarding.** Nothing to forward. The NAT that matters is upstream of your equipment.
            - **UPnP / NAT-PMP.** Same reason.
            - **Dynamic DNS alone.** Resolves to the carrier's shared address, not to you.
            - **Asking the ISP for a static IP.** Sometimes possible, usually a business-tier upsell, and it puts a residential address in public DNS either way.

            ## The shape of the fix

            If inbound connections cannot reach you, originate the connection outward and keep it open. A cheap VPS with a real static address becomes the public face; a tunnel from your network to that VPS carries traffic back.

            \`\`\`
            client ──▶ public DNS ──▶ VPS (static IP)
                                       │
                                       │  WireGuard tunnel
                                       │  (established outbound from home)
                                       ▼
                                  home router ──▶ reverse proxy ──▶ services
            \`\`\`

            The tunnel is established **from** the home side, so CGNAT is irrelevant — it is an outbound flow like any other. Once it is up it is bidirectional, and the VPS can forward traffic into it.

            ## Why WireGuard

            It is in-kernel, it is fast enough to saturate a residential uplink on modest hardware, and its connection model suits this exactly: there is no session setup to fail, just peers with keys and endpoints. A roaming or re-NATted client re-establishes on the next valid packet, so a carrier reassigning your outer address is a non-event rather than an outage.

            It also runs natively on the MikroTik edge, which means the tunnel lives on the router rather than on a VM that could be down for maintenance.

            ## Terminating in the right place

            The decision that matters more than the tunnel: **what does the VPS know?**

            The lazy version forwards ports straight through and lets the VPS act as a dumb pipe. That works, but it means every service you expose needs its own port and its own TLS handling, and the VPS ends up with routes into your network.

            The version I run terminates TLS at a reverse proxy and gives the VPS exactly one thing to know: a single tunnel endpoint. Public DNS points at the VPS. The VPS forwards to the proxy. The proxy knows the internal hostnames. Nothing on the public side holds a map of the internal network, so compromising the VPS yields a tunnel to one host, not a routing table.

            ## Things that bit me

            **MTU.** The tunnel adds overhead, and the path through it has a smaller MTU than the interfaces on either end. If large responses hang while small ones succeed — TLS handshakes complete but pages never finish loading — this is almost always the cause. Clamp MSS on the tunnel interface rather than trying to guess a working MTU.

            **Keepalives.** A NAT mapping upstream expires if nothing traverses it. Without a persistent keepalive on the home-side peer, the tunnel works fine until it goes quiet, then silently stops accepting inbound traffic until something originates from your side again. This is exactly the failure mode that looks like "it works when I'm testing it."

            **Real client addresses.** Once traffic arrives via a proxy via a tunnel, every log line shows a tunnel address. Forwarding the original address through the proxy chain matters, and it has to be trusted only from the tunnel — otherwise anyone can claim to be anyone.

            **The VPS is now part of your availability.** A five-dollar instance that reboots for maintenance takes your public services with it. It belongs in monitoring alongside everything in the rack.

            ## What I would tell someone starting

            Do not think of this as a workaround. Splitting the public edge from the private network is the same pattern as a DMZ, a bastion host, or a cloud load balancer in front of private subnets. CGNAT forced me into an architecture I would probably choose anyway — the public surface is one small machine that holds no secrets and knows nothing about the inside.
        `,
    },
    {
        slug: "moving-routing-off-the-hypervisor",
        title: "Moving routing off the hypervisor",
        description:
            "Running the router as a VM meant every hypervisor reboot was a network outage — including the reboots I needed in order to maintain the hypervisor. Notes on the migration to dedicated hardware.",
        date: "2026-03-02",
        tags: ["Networking", "MikroTik", "Proxmox VE", "Operations"],
        content: `
            ## The setup that got me here

            Virtualizing the router is a popular homelab move and it is genuinely appealing: no extra hardware, snapshots before config changes, and the same management surface as everything else. For a while it worked.

            The problem is a dependency loop. The hypervisor needs the network. The network runs on the hypervisor.

            ## How it actually fails

            It does not fail dramatically. It fails as a slow tax on everything else:

            - **Maintenance windows are network outages.** Patching the hypervisor drops the internet for the whole house. That pushes the work to 2am, which means it gets deferred, which means the host runs behind on updates.
            - **You cannot debug it remotely.** If the network is down, the thing you need to reach in order to fix the network is unreachable. Every failure becomes a physical-access failure.
            - **The blast radius is wrong.** A misbehaving VM, a full disk, or a bad storage config should degrade a service. Instead it can take down DNS and DHCP for everything.
            - **Boot ordering is fragile.** After a power event, the host has to come up far enough to start the router VM before anything else on the network works — including whatever you were relying on to tell you it had come back.

            None of this is a reason to never virtualize a router. It is a reason not to virtualize *the only* router.

            ## What I moved to

            A MikroTik RB5009 at the edge, terminating the WAN and owning the things that must not depend on the cluster:

            - Inter-VLAN routing and firewall policy
            - DHCP and DNS forwarding
            - The WireGuard peer that provides the external ingress path

            The cluster kept everything that is genuinely a service: reverse proxying, monitoring, storage, containers.

            ## Doing it without a long outage

            The migration was less exciting than I expected, mostly because of the order:

            1. **Build the new config alongside the old one.** Firewall rules, VLAN interfaces and DHCP scopes configured on the new hardware while it is still off the production path. This is the bulk of the work and it costs no downtime.
            2. **Test on an isolated segment.** One switch port, one laptop, before anything real depends on it.
            3. **Match the old addressing exactly.** Same gateway addresses, same DHCP ranges, same reservations. Anything statically configured on the network — and there is always more than you remember — keeps working.
            4. **Cut over at the WAN, not the LAN.** Moving one uplink cable is a shorter outage than re-cabling the rack.
            5. **Keep the old config exportable and the old hardware on the shelf.** A rollback you have actually thought about is the thing that lets you attempt the cutover on a weekday.

            The actual switch was minutes. Everything before it was the point.

            ## What changed afterwards

            The cluster can now be fully rebooted without anyone noticing, which sounds minor and is not. Maintenance stopped being an event I scheduled around and became something I do on a Tuesday afternoon. Nodes get patched, because patching them is no longer disruptive.

            There is a general lesson here that I keep re-learning: **infrastructure that everything depends on should depend on as little as possible.** The router now has exactly one job and no upstream dependencies inside my own network. That is the whole reason it is boring, and boring is what I wanted.
        `,
    },
    {
        slug: "vlan-segmentation-without-downtime",
        title: "Splitting a flat network without taking it down",
        description:
            "Backups were starving everything else on a flat network. Notes on segmenting storage, user, IoT and guest traffic onto VLANs incrementally, on switches that were already in production.",
        date: "2026-01-14",
        tags: ["Networking", "VLANs", "Dell PowerConnect", "Security"],
        content: `
            ## The symptom

            A flat network is fine right up until one host decides to use all of it. In my case that was bulk storage traffic: a backup window or a large NFS transfer would land, and everything else on the network — streaming, games, someone on a call — would degrade at the same time.

            The instinct is to reach for QoS. The better answer was to stop having storage traffic and user traffic share a broadcast domain in the first place.

            ## What segmentation actually buys

            Two separate things, and it is worth being clear about which you want:

            **Performance isolation.** Traffic classes stop competing for the same forwarding path and the same broadcast domain. A backup window becomes invisible to everyone not participating in it.

            **Security isolation.** This is the bigger win and the one I underrated. On a flat network, every device can reach every other device — the IoT gear with firmware from 2019 can reach the management interfaces on the hypervisors. Segmentation means the firewall, not the switch, decides what is allowed to talk to what.

            ## How I divided it

            - **Management** — hypervisor, switch and router management interfaces. Reachable from almost nothing.
            - **Storage** — NFS/iSCSI between the cluster and the NAS. High volume, no reason to leave the segment at all.
            - **User** — trusted personal devices.
            - **IoT** — everything with a vendor cloud dependency and no update story. Internet access, nothing else.
            - **Guest** — isolated, internet-only, with its own captive portal.

            The rule I settled on: **a segment's default posture is deny, and anything that crosses a boundary is an explicit rule with a reason I can articulate.** If I cannot explain why a rule exists, it should not exist.

            ## Doing it incrementally

            The switches were already carrying production traffic, so this had to happen in pieces:

            1. **Create the VLANs before moving anything.** Defining a VLAN and tagging a trunk changes nothing until a port is assigned to it.
            2. **Build the router-side interfaces and firewall rules next**, with permissive rules initially. A segment with no gateway is a segment that looks broken in a way that is confusing to debug.
            3. **Move one class of device at a time**, starting with the one whose breakage matters least. IoT first, storage last.
            4. **Tighten the rules afterwards.** Start permissive and log; watch what actually crosses boundaries for a week; then deny what you did not expect. Doing it in the other order means discovering dependencies as outages.

            ## Things I got wrong

            **I underestimated the discovery protocols.** Chromecasts, printers and anything else relying on mDNS or SSDP stop working the moment they are not in the same broadcast domain as the device looking for them. This is working as designed, and it will be reported to you as "the network is broken." Decide deliberately whether you are going to relay those protocols across a boundary or tell people to stop expecting it to work.

            **I forgot how much was statically configured.** Every hardcoded address, every firewall rule referencing a subnet that no longer exists, every monitoring check pointed at an old IP. Re-addressing a segment surfaces all of it at once.

            **Native VLAN handling is a real footgun.** Untagged traffic on a trunk goes somewhere, and if you have not decided where, the switch has decided for you. Be explicit about the native VLAN on every trunk, and be consistent across both switches.

            ## Was it worth it

            Yes, and not primarily for the performance reason I started with. The backup contention went away, but the thing I actually value is that I can now answer "what can this device reach?" with a firewall rule instead of a shrug. That question turns out to be the whole point.
        `,
    },
];

/** Newest first, drafts excluded. Drafts stay out of routes and the sitemap. */
export const publishedNotes = notes
    .filter((note) => !note.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

export function getNote(slug: string): Note | undefined {
    return publishedNotes.find((note) => note.slug === slug);
}

/** Rough estimate at ~200 words per minute, rounded up to a whole minute. */
export function readingMinutes(content: string): number {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

/** Fixed locale and time zone so the build output and the client agree. */
export function formatNoteDate(date: string): string {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
}
