/**
 * Single source of truth for identity, contact details and SEO defaults.
 * Both route-group layouts and every metadata export read from here.
 */
export const site = {
  name: "tsys.dev",
  author: "Hunter Johanson",
  role: "Network & Systems Engineer",
  url: "https://tsys.dev",
  location: "Illinois, USA",
  availability: "Graduating 2028 — open to internships, co-ops and new-grad roles",
  tagline:
    "I build and run production infrastructure — routing, virtualization, containers and the firmware at the edge of it.",
  description:
    "Network and systems engineer running a multi-node Proxmox cluster, MikroTik-routed VLAN network and 35+ containerized services. Homelab infrastructure, embedded systems and full-stack projects by Hunter Johanson.",
} as const;

export const contact = {
  /** Public inbox on the apex domain. */
  email: "hunter@tsys.dev",
  /** University address, used for anything academic or recruiting-related. */
  academicEmail: "hcjohan@ilstu.edu",
  github: "https://github.com/TornadoMC2",
  linkedin: "https://linkedin.com/in/hjohanson",
  business: "https://tornadoaudio.net",
} as const;
