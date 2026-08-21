export const site = {
  name: "Achraf Meziouni",
  initials: "AM",
  role: "Software Engineer",
  email: "ashrafmeziouni@gmail.com",
  // location: "Fes, Morocco",
  // timezone: "Africa/Casablanca",
  available: true,
  // availabilityNote: "Open to freelance",
  resume: "/assets/Meziouni_Achraf.pdf",
  school: { name: "1337", url: "https://www.1337.ma" },
};

export const socials = [
  { name: "GitHub", handle: "@AchrafMez", url: "https://github.com/AchrafMez" },
  {
    name: "LinkedIn",
    handle: "@achrafmeziouni",
    url: "https://www.linkedin.com/in/achrafmeziouni",
  },
  {
    name: "Discord",
    handle: "achraf",
    url: "https://discord.com/users/528349333461008384",
  },
  { name: "Email", handle: site.email, url: `mailto:${site.email}` },
];

/**
 * Client-facing capability statements. Deliberately written as outcomes
 * ("what you get") rather than a list of technologies.
 */
export const services = [
  {
    index: "01",
    title: "Full-stack products",
    body: "End-to-end web applications — authentication, payments, dashboards, real-time features. Shipped as a codebase your next developer can actually read.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    index: "02",
    title: "Backend & systems",
    body: "APIs and services built to hold up under load. Microservices, event pipelines, socket infrastructure, and the schema design underneath it all.",
    tags: ["C / C++", "Sockets", "Redis", "REST"],
  },
  {
    index: "03",
    title: "Infrastructure & delivery",
    body: "Containerised environments, reverse proxies, TLS, and monitoring — so deploys are boring and failures are visible before your users find them.",
    tags: ["Docker", "Nginx", "Prometheus", "Grafana"],
  },
];

/** Quantified signals — kept honest and verifiable. */
export const stats = [
  { value: "3+", label: "Years writing code" },
  { value: "6", label: "Shipped freelance projects" },
  { value: "2", label: "Live deployments" },
  { value: "42", label: "Network peer-learning" },
];
