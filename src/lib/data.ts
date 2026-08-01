interface ProjectBase {
    slug: string;
    title: string;
    /** One-line hook used on cards and as the page description. */
    description: string;
    tags: string[];
    image: string;
    /** Displayed on the card as a period, e.g. "2024 — Present". */
    period: string;
    /** Short outcome-shaped bullets rendered above the long-form content. */
    highlights: string[];
    featured?: boolean;
}

/** A project with a write-up hosted on this site at /projects/[slug]. */
export interface InternalProject extends ProjectBase {
    isExternal: false;
    content: string;
    repo?: string;
}

/** A project that lives elsewhere — the card links straight out. */
export interface ExternalProject extends ProjectBase {
    isExternal: true;
    link: string;
}

export type Project = InternalProject | ExternalProject;

export const projects: Project[] = [
    {
        slug: "homelab-infrastructure",
        title: "Hybrid Homelab & Network Engineering",
        description:
            "A production-grade hybrid cloud/on-prem stack: MikroTik edge routing, VLAN-segmented Layer 2, a Proxmox cluster and WireGuard tunneling that defeats CGNAT.",
        period: "2025 — Present",
        featured: true,
        highlights: [
            "Runs 35+ containerized services across a 3-node Proxmox cluster on 40TB+ of TrueNAS-backed storage",
            "Published internal services from behind a CGNAT residential link using a WireGuard-tunneled VPS ingress",
            "Cut cross-traffic contention by isolating storage, user and IoT traffic onto dedicated VLANs",
        ],
        content: `
            ## Overview

            This is the environment I actually learn in: a live production network where downtime is my problem, backups are my problem, and every design decision has to survive contact with real users. It started as a virtualized router on a spare box and has been rebuilt into dedicated hardware, segmented Layer 2, and a hybrid on-prem/cloud ingress path.

            Everything below is running right now — including the site you are reading this on.

            ## The Architecture

            ### 1. Network Layer (Physical & Virtual)
            - **Edge Routing:** A **MikroTik RB5009** terminating a gigabit WAN, running the firewall policy, inter-VLAN routing and the WireGuard peer.
            - **Core Switching:** Two **Dell PowerConnect 6248** switches handling Layer 2 forwarding, 802.1Q tagging and link aggregation between the rack and the edge.
            - **Segmentation:** Separate VLANs for management, storage, user and IoT devices, with the firewall — not the switch — deciding what is allowed to talk to what.
            - **Remote Access:** A **WireGuard** overlay joining a cloud VPS to the home network, so internal services reach the public internet without a single inbound port open on the residential IP.

            ### 2. Virtualization & Compute
            - **Cluster:** A **Proxmox VE** cluster mixing enterprise hardware with power-efficient nodes, so idle draw stays low without giving up headroom.
            - **Orchestration:** **Docker** stacks defined as Compose files, so a service can be rebuilt from source of truth instead of from memory.
            - **Storage:** **TrueNAS** exporting NFS/SMB for VM storage, backups and media, with snapshots as the first line of defence against my own mistakes.

            ### 3. Platform Services
            - **Observability:** **Grafana** and **Prometheus** graphing interface throughput, node health and container state — the thing that turns "the internet feels slow" into an actual number.
            - **Ingress:** **Nginx Proxy Manager** terminating TLS and reverse-proxying every internal hostname.
            - **Media:** A containerized audio stack (Lidarr, Navidrome) that doubles as the delivery side of my audio work.
            - **Game Servers:** Minecraft instances with custom server-side administration tooling, published through the same VPS ingress path.

            ## Problems I Had To Solve

            **Problem:** A residential ISP behind CGNAT — no static IP, no usable port forwarding, no inbound reachability.
            **Solution:** Stood up a VPS with a static address as the public ingress point and tunneled traffic back over WireGuard to the local reverse proxy. Public DNS points at the VPS; the VPS never needs to know anything about the internal topology beyond one tunnel endpoint.

            **Problem:** Bulk storage transfers were starving interactive traffic on a flat network.
            **Solution:** VLAN segmentation on the 6248s to isolate iSCSI/NFS storage traffic from user and IoT traffic, so a backup window stops being something the rest of the house can feel.

            **Problem:** A virtualized router meant the network died whenever the hypervisor did — including during hypervisor maintenance.
            **Solution:** Migrated edge routing onto dedicated MikroTik hardware. The network now survives a full cluster reboot, which also made maintenance something I can do on a weekday instead of at 2am.

            ## What It Taught Me

            Enterprise gear does not come with a tutorial. Most of what I know about spanning tree, tagged trunks, firewall policy ordering and backup strategy came from breaking this network and then having to get it back before anyone noticed.
        `,
        tags: ["MikroTik RouterOS", "Proxmox VE", "WireGuard", "VLANs", "Docker", "TrueNAS"],
        isExternal: false,
        image: "/images/homelab.svg",
    },
    {
        slug: "arduino-dmx-fixture",
        title: "Embedded DMX Lighting Node",
        description:
            "A custom C++ embedded node that decodes DMX512 off an RS-485 bus and drives RGB fixtures over PWM — built to drop into a real stage lighting rig.",
        period: "Spring 2025",
        featured: true,
        highlights: [
            "Decodes the 250 kbaud DMX512 frame timing in firmware and maps channels to PWM duty cycle",
            "Optically isolated RS-485 front end to survive the ground potential differences of stage power",
            "Addressable like any commercial fixture, so it patches into a standard lighting desk with no special handling",
        ],
        content: `
            ## Overview

            A hardware bridge between professional stage lighting control and custom fixtures. The node sits on a DMX512 universe like any commercial light: you give it a start address, the desk sends it channel data, and it drives RGB LEDs accordingly. The point was to build something that a lighting tech could patch without knowing or caring that it was homemade.

            ## The Engineering

            ### Hardware
            - **Controller:** Arduino (ATmega328P/Mega) running the receive-and-map loop.
            - **Transceiver:** MAX485 converting the differential RS-485 signalling on the DMX line down to TTL.
            - **Isolation:** Optocouplers between the bus and the microcontroller. Stage rigging means long cable runs, shared grounds and dimmer packs — isolation is the difference between a flickering fixture and a dead board.

            ### Firmware
            DMX512 is unforgiving about timing: 250 kbaud, a break-and-mark frame delimiter, and up to 512 channels arriving continuously. The firmware validates the frame before acting on it, so a partial or corrupted packet holds the last good state instead of strobing.

            \`\`\`cpp
            #include <DMXSerial.h>

            // Fixture start address — the same number you'd patch on the desk.
            const int startAddress = 1;

            void setup() {
              DMXSerial.init(DMXReceiver);

              pinMode(9, OUTPUT);  // Red
              pinMode(10, OUTPUT); // Green
              pinMode(11, OUTPUT); // Blue
            }

            void loop() {
              // Only act on a complete, valid frame; otherwise hold last state.
              if (DMXSerial.receive()) {
                analogWrite(9, DMXSerial.read(startAddress));
                analogWrite(10, DMXSerial.read(startAddress + 1));
                analogWrite(11, DMXSerial.read(startAddress + 2));
              }
            }
            \`\`\`

            ## Why It Exists

            It came out of running production work through **Tornado Audio**. Off-the-shelf fixtures are expensive and inflexible; a node that speaks the same protocol lets me put custom lighting into a show while it stays under the control of whatever desk is already on site.

            ## What It Taught Me

            Protocol work is where "it compiles" and "it works" are furthest apart. Reading the DMX512 timing spec and then watching the failure modes on real hardware — reflections, missing termination, ground loops — is the closest I have come to network engineering at the physical layer.
        `,
        tags: ["C++", "Embedded", "DMX512", "RS-485", "Arduino"],
        isExternal: false,
        image: "/images/arduino.svg",
    },
    {
        slug: "guest-network-portal",
        title: "Guest Network Captive Portal",
        description:
            "A branded splash page served to devices landing on the isolated guest VLAN — deliberately built to render on the worst browser in the house.",
        period: "2025",
        highlights: [
            "Ships on its own document shell, so it loads none of the main site's chrome or client-side animation runtime",
            "CSS-only animation and a locked viewport for the stripped-down webviews captive portals are opened in",
            "Guest devices stay on an isolated VLAN with no path to management, storage or IoT segments",
        ],
        content: `
            ## Overview

            When a device joins the guest SSID it lands on an isolated VLAN and gets redirected here. Captive portals are a genuinely hostile rendering target — they open inside a cut-down OS webview, often before the device has full internet access — so this page is engineered around constraint rather than around features.

            ## Design Constraints

            **Constraint:** Captive portal webviews are not full browsers, and the device may not have general internet access yet.
            **Solution:** The portal renders from its own route group with a completely separate document shell. It pulls in no navigation, no footer, and none of the animation runtime the rest of the site uses — just static markup and CSS.

            **Constraint:** Animation still has to feel intentional without shipping a JavaScript animation library.
            **Solution:** Keyframes and staggered animation-delay utilities defined directly in the global stylesheet. Zero runtime cost, and it degrades to plain content if anything fails to load.

            **Constraint:** Portal webviews handle zoom and horizontal overflow badly.
            **Solution:** A fixed device-width viewport with scaling disabled and overflow explicitly clamped, so the layout cannot be dragged sideways on a phone.

            ## The Network Side

            The page is the visible half of a segmentation policy. Guest devices are tagged onto their own VLAN with firewall rules that permit internet egress and nothing else — no route to the management network, the storage network, or any internal service. The portal exists so that isolation reads as hospitality instead of as a broken connection.

            ## What It Taught Me

            The most interesting engineering problems in this project were not the visual ones. Deciding what a guest device is allowed to reach, and making the restriction invisible to the person holding the phone, is the actual work.
        `,
        tags: ["Captive Portal", "VLANs", "Next.js", "CSS"],
        isExternal: false,
        image: "/images/portal.svg",
    },
    {
        slug: "tsys-dev-portfolio",
        title: "tsys.dev — Zero-Runtime Portfolio",
        description:
            "This site: a Next.js 16 App Router build that compiles to pure static HTML, self-hosted on the same infrastructure it documents.",
        period: "2025 — Present",
        highlights: [
            "Statically exported — no Node process, no server runtime, and nothing to patch at 3am",
            "Two independent document shells from one codebase: the public site and the guest captive portal",
            "React 19 with the React Compiler, Tailwind v4 configured entirely in CSS, and per-route metadata for link previews",
        ],
        repo: "https://github.com/TornadoMC2",
        content: `
            ## Overview

            A portfolio that is also an infrastructure decision. The whole site compiles to static HTML and assets — there is no application server, no database, and no runtime dependency to keep patched. It is served off the same stack described in the homelab write-up, through the same reverse proxy and the same WireGuard ingress path.

            ## Technical Decisions

            ### Static export as a security posture
            Next.js is configured for a full static export. That removes an entire class of exposure: no server-side rendering at request time, no API routes, no runtime secrets. The attack surface of the public site is a web server handing out files.

            ### One codebase, two document shells
            The public portfolio and the guest captive portal are different products with different constraints, but they share a design system. Route groups let each own its own \`<html>\` shell, fonts and viewport policy, while the root layout stays a deliberate pass-through. The portal ships without the animation runtime the main site uses; the main site never inherits the portal's locked viewport.

            ### Modern React, honest performance
            React 19 with the React Compiler enabled, so memoization is handled at build time rather than hand-written throughout the tree. Tailwind v4 is configured CSS-first — no JavaScript config file — and fonts are loaded and subset at build time rather than fetched from a third party at runtime.

            ### Accessibility and metadata as requirements, not polish
            Every route exports its own title, description and Open Graph metadata, so a link shared into Slack or LinkedIn renders correctly. Motion respects the operating system's reduced-motion preference. Navigation exposes current-page state to assistive technology.

            ## What It Taught Me

            Choosing what *not* to run is a real engineering decision. A contact form is trivial to add and a permanent liability to operate; a static export with no server is boring in exactly the way production infrastructure should be.
        `,
        tags: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Static Export"],
        isExternal: false,
        image: "/images/portfolio.svg",
    },
    {
        slug: "minecraft-platform",
        title: "Multiplayer Game Server Platform",
        description:
            "Containerized Minecraft infrastructure with custom server-side administration tooling, published to the public internet through the homelab's VPS ingress.",
        period: "2025 — Present",
        highlights: [
            "Server instances run as isolated Docker workloads on the Proxmox cluster with scheduled world backups to TrueNAS",
            "Reachable publicly despite CGNAT by routing player traffic over the same WireGuard/VPS ingress as web services",
            "Custom server-side administration tooling built to manage live player-facing environments",
        ],
        content: `
            ## Overview

            The workload that got me into infrastructure in the first place. Hosting multiplayer game servers is an unusually good teacher: the users are real, they are online at inconvenient hours, and they notice latency immediately.

            ## The Infrastructure

            - **Isolation:** Each server instance runs as its own containerized workload on the Proxmox cluster, so one misbehaving instance cannot take the others with it.
            - **Persistence:** World data lives on TrueNAS-backed storage with scheduled snapshots — a corrupted world is a rollback, not an incident.
            - **Public Reachability:** Player traffic reaches the servers through the same VPS-and-WireGuard ingress path that publishes my web services, which is how a residential connection behind CGNAT hosts a public endpoint at all.
            - **Tooling:** Custom server-side administration tooling for managing the live environment.

            ## Why It Belongs In A Portfolio

            Every constraint in this project is a real operations constraint. Capacity planning, backup and restore, patching, remote access, and users who report problems in vague terms and expect them fixed — the scale is small, but the discipline is the same one that applies to anything running in production.
        `,
        tags: ["Docker", "Proxmox VE", "Linux", "Java", "Operations"],
        isExternal: false,
        image: "/images/minecraft.svg",
    },
    {
        slug: "tornado-audio",
        title: "Tornado Audio",
        description:
            "A mixing and mastering studio I founded and run end to end — client work, deliverables, and the infrastructure the business sits on.",
        period: "2023 — Present",
        highlights: [
            "Founded and operate the business: client intake, engineering, revisions and delivery",
            "Own the technical stack the studio runs on, from session storage and backups to the public site",
            "The production work that motivated the DMX lighting node",
        ],
        tags: ["Audio Engineering", "Small Business", "Client Work"],
        link: "https://tornadoaudio.net",
        isExternal: true,
        image: "/images/tornado.svg",
    },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}

/** Grouped for the about page; flattened for the marquee. */
export const skillGroups = [
    {
        title: "Networking",
        skills: [
            "MikroTik RouterOS",
            "VLANs & 802.1Q",
            "Subnetting & Routing",
            "Firewall Policy",
            "WireGuard / VPNs",
            "DNS & Reverse Proxying",
            "Dell PowerConnect",
        ],
    },
    {
        title: "Systems & Infrastructure",
        skills: [
            "Proxmox VE",
            "Linux Administration",
            "Docker & Compose",
            "TrueNAS / ZFS",
            "Nginx Proxy Manager",
            "Backup & Recovery",
            "Grafana & Prometheus",
        ],
    },
    {
        title: "Development",
        skills: [
            "Python",
            "C++",
            "TypeScript",
            "React / Next.js",
            "Bash",
            "Embedded Firmware",
            "Git",
        ],
    },
] as const;

export const skills = skillGroups.flatMap((group) => group.skills);
