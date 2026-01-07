export interface Project {
    slug: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    link?: string;
    isExternal: boolean;
    image: string;
}

export const projects: Project[] = [
    {
        slug: "homelab-infrastructure",
        title: "Hybrid Homelab & Network Engineering",
        description: "A hybrid cloud/on-prem network stack using MikroTik hardware, VLAN segmentation, and VPS tunneling for secure external access.",
        content: `
            ## Overview

            This project is the core of my practical IT education—a living production environment where I host services, manage network traffic, and test enterprise-grade configurations. Recently migrated from a virtualized router setup to dedicated hardware for increased throughput and reliability.

            ## The Architecture

            ### 1. Network Layer (Physical & Virtual)
            - **Edge Routing:** Migrated to a **MikroTik RB5009** to handle gigabit WAN throughput and complex firewall rules.
            - **Core Switching:** Two **Dell PowerConnect 6248** switches handling Layer 2 traffic and VLAN tagging.
            - **Remote Access:** A custom **WireGuard** implementation connecting a remote Cloud VPS to the home network. This acts as a secure gateway to expose internal services (like Game Servers and Web Apps) without opening vulnerable ports on the residential IP.

            ### 2. Virtualization & Compute
            - **Cluster:** A **Proxmox VE** cluster combining enterprise servers and power-efficient nodes for high availability.
            - **Orchestration:** **Docker** stacks managed via Portainer/Compose for microservices.
            - **Storage:** **TrueNAS** providing centralized NFS/SMB shares for backups and media.

            ### 3. Hosted Services
            - **Monitoring:** Grafana and Prometheus for real-time visualization of network traffic and node health.
            - **Traffic Management:** Nginx Proxy Manager handling SSL termination and reverse proxying.
            - **Media Stack:** A containerized suite including Lidarr and Navidrome for audio streaming.
            - **Game Servers:** Hosted Minecraft instances with custom server-side administration tools.

            ## Key Challenges Solved

            **Problem:** Exposing local services securely behind a restrictive residential ISP (CGNAT).
            **Solution:** Deployed a VPS with a static IP to act as a reverse proxy ingress point, tunneling traffic over WireGuard back to the local Proxmox ingress controller.

            **Problem:** Network congestion during high-traffic transfers.
            **Solution:** Implement VLAN segmentation on the Dell 6248s to isolate Storage traffic (iSCSI/NFS) from User and IoT traffic.
        `,
        tags: ["MikroTik", "Proxmox", "WireGuard", "Dell Networking", "Docker"],
        isExternal: false,
        image: "/images/homelab.svg"
    },
    {
        slug: "arduino-dmx-fixture",
        title: "Embedded DMX Lighting Node",
        description: "A custom C++ embedded project converting DMX512 protocols into PWM signals for stage lighting.",
        content: `
            ## Overview

            An embedded systems project designed to bridge professional stage lighting protocols (DMX512) with custom hardware. This node acts as a decoder, receiving standard DMX packets and converting them into PWM signals to drive RGB LED fixtures.

            ## The Engineering

            ### Hardware Implementation
            - **Controller:** Arduino (ATmega328P/Mega) handling the logic loop.
            - **Communication:** MAX485 Transceiver for RS-485 to TTL conversion.
            - **Isolation:** Optocouplers used to protect the microcontroller from voltage spikes common in stage rigging.

            ### The Protocol (C++)
            The firmware manually handles the DMX timing constraints (250kbaud) to ensure frame integrity.

            \`\`\`cpp
            #include <DMXSerial.h>

            // Addressing methodology
            const int startAddress = 1;

            void setup() {
              // Initialize DMX Receiver mode
              DMXSerial.init(DMXReceiver);
              
              // Set PWM pins for RGB channels
              pinMode(9, OUTPUT);  // Red
              pinMode(10, OUTPUT); // Green
              pinMode(11, OUTPUT); // Blue
            }

            void loop() {
              // Check for valid DMX packet frame
              if (DMXSerial.receive()) {
                // Map DMX channels (0-255) to PWM duty cycle
                analogWrite(9, DMXSerial.read(startAddress));
                analogWrite(10, DMXSerial.read(startAddress + 1));
                analogWrite(11, DMXSerial.read(startAddress + 2));
              }
            }
            \`\`\`

            ## Use Case
            This fixture was designed to integrate into existing "Tornado Audio" production workflows, allowing for synchronized custom lighting that interfaces with standard lighting desks.
        `,
        tags: ["C++", "Embedded", "DMX512", "Arduino"],
        isExternal: false,
        image: "/images/arduino.svg"
    },
    {
        slug: "tornado-audio",
        title: "Tornado Audio",
        description: "Professional mixing and mastering services by Hunter Johanson.",
        content: "",
        tags: ["Audio Engineering", "Small Business"],
        link: "https://tornadoaudio.net",
        isExternal: true,
        image: "/images/tornado.svg"
    }
];

export const skills = [
    "System Administration",
    "MikroTik RouterOS",
    "Proxmox VE",
    "Docker & Containers",
    "VLANs & Subnetting",
    "WireGuard / VPNs",
    "Python",
    "C++",
    "TrueNAS",
    "Nginx Proxy Manager",
    "Grafana",
    "React / Next.js",
];

export const socialLinks = {
    github: "https://github.com/TornadoMC2", // Update thisa
    linkedin: "https://linkedin.com/in/hjohanson", // Update this
    email: "hcjohan@ilstu.edu"
};