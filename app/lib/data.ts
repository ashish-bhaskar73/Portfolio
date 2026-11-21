export const profile = {
  name: "Ashish Bhaskar",
  role: "Java Backend Engineer",
  tagline:
    "Designing scalable backend systems with Java 21, Spring Boot microservices, and AWS-based distributed architecture.",
  location: "Noida, Uttar Pradesh, India",
  email: "ashish.bhaskar.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/bhaskarashish",
  github: "https://github.com/ashish-bhaskar73",
  resume: "/ashish-bhaskar-resume.pdf",
  photo: "/ashish-headshot.png",
  // Jul 2024 (RoboMQ) → present. Shown in the hero annotation.
  experience: "2+ yrs",
  summary:
    "Java Backend Engineer with 2+ years of experience designing and developing scalable backend systems using Java 21, Spring Boot, Microservices, PostgreSQL, and Redis. Experienced in backend architecture, distributed systems, performance optimization, asynchronous processing, and AWS cloud integrations. Proven ownership of backend development across six microservices, including large-scale file transfer systems, workflow automation, and secure authentication.",
};

export const stats = [
  { value: "2 TB", label: "Single-file transfers via S3 multipart uploads" },
  { value: "35%", label: "Faster API responses via caching, async & query tuning" },
  { value: "90%", label: "Fewer production defects through testing" },
  { value: "6", label: "Microservices owned across the Docsora platform" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "Xcelore Pvt Ltd",
    period: "Jun 2025 — Present",
    location: "Noida, Uttar Pradesh",
    points: [
      "Responsible for backend architecture, technical design decisions, and development across six microservices of Docsora, covering document management, file transfer, and e-signature workflows.",
      "Developed scalable backend services using Java 21, Spring Boot, PostgreSQL, and Redis, supporting thousands of API requests daily.",
      "Engineered large-file transfer workflows supporting up to 2 TB using AWS S3 multipart uploads, with retry and resume mechanisms.",
      "Reduced API response time by 35% through Redis caching, asynchronous processing, and PostgreSQL query optimization.",
      "Designed and implemented configurable document approval and e-signature workflows with role-based access control for Signer, Approver, Viewer, and CC roles.",
      "Designed a multi-region AWS architecture for regional data residency, disaster recovery, and low-latency access; implemented centralized audit logging and integrated AWS S3, SES, and CloudFront.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "RoboMQ Pvt. Ltd",
    period: "Jul 2024 — May 2025",
    location: "Jaipur, Rajasthan",
    points: [
      "Contributed to backend development of the Hire2Retire identity lifecycle management platform using Java, Spring Boot, and PostgreSQL.",
      "Developed and enhanced REST APIs for employee onboarding, profile updates, and offboarding across HR and enterprise identity management systems.",
      "Implemented RabbitMQ-based asynchronous messaging workflows for reliable data synchronization between HR systems and enterprise applications.",
      "Built scheduled reconciliation services running at five-minute intervals to identify and resolve data inconsistencies between source and target identity systems.",
      "Worked on backend business logic, data processing, and integration workflows to ensure consistent employee lifecycle operations.",
      "Investigated and resolved backend defects through root cause analysis and systematic debugging.",
      "Developed and maintained JUnit test cases and integration tests, contributing to a 90% reduction in production defects.",
    ],
  },
];

export type Project = {
  slug: string; // anchor id on /projects
  name: string;
  meta: string; // sector · role line shown in project rows
  kpi: string; // one headline metric shown in mono
  period?: string; // shown on /projects when the project has fixed dates
  blurb: string;
  highlights: string[];
  tech: string[];
  caseStudy?: CaseStudy;
};

// Rendered on /projects/[slug]. Every sentence must trace to the resume or to
// one of the blog posts; leave a part empty rather than guess, and the page
// omits that section.
export type CaseStudy = {
  problem: string;
  flow: { title: string; detail: string }[];
  decisions: { choice: string; why: string }[];
  outcome: string[];
  relatedPost?: string; // slug in app/blog/posts.ts
};

export const projects: Project[] = [
  {
    slug: "kcpl",
    name: "KCPL — Multi-Outlet Restaurant Management Platform",
    meta: "Restaurant operations · Backend developer",
    kpi: "PR → PO → GRN → Invoice",
    period: "Jan 2026 — Aug 2026",
    blurb:
      "Designed and developed a modular monolithic backend, with REST APIs and database entities supporting multi-outlet restaurant operations.",
    highlights: [
      "Modular monolith with modules for inventory, procurement, ordering, menu, and identity management",
      "End-to-end procurement workflow: Purchase Requisition, Purchase Order, GRN, and Invoice management",
      "Inventory features including stock tracking, wastage management, recipe/BOM, and unit conversion",
      "JWT authentication, role-based access control, S3 presigned uploads, PDF generation, audit logging, and Docker-based deployment",
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "AWS S3", "Docker"],
    // Source: resume (KCPL project). Decisions left empty: the resume does not
    // say why a modular monolith was chosen.
    caseStudy: {
      problem:
        "Multi-outlet restaurant operations need inventory, procurement, ordering, menu, and identity management in one backend, with purchasing traceable from request to invoice.",
      flow: [
        { title: "Requisition", detail: "An outlet raises a Purchase Requisition." },
        { title: "Purchase Order", detail: "The requisition becomes a Purchase Order." },
        { title: "GRN", detail: "Goods received are recorded against the order." },
        { title: "Invoice", detail: "The invoice closes the procurement loop." },
      ],
      decisions: [],
      outcome: [
        "Modules for inventory, procurement, ordering, menu, and identity management.",
        "Stock tracking, wastage management, recipe/BOM, and unit conversion.",
        "JWT authentication, role-based access control, S3 presigned uploads, PDF generation, audit logging, and Docker-based deployment.",
      ],
    },
  },
  {
    slug: "docsora",
    name: "Docsora — Document, Transfer & E-Signature Platform",
    meta: "Enterprise SaaS · Backend architecture & development",
    kpi: "2 TB transfers · 35% faster APIs",
    blurb:
      "A product built around six microservices for document management, file transfer, and e-signature workflows — where I'm responsible for backend architecture, technical design decisions, and development.",
    highlights: [
      "Six Java 21 / Spring Boot microservices on PostgreSQL and Redis, serving thousands of API requests daily",
      "2 TB file transfers via S3 multipart uploads with retry and resume",
      "35% faster API responses through Redis caching, async processing, and query optimization",
      "Approval & e-signature workflows with Signer / Approver / Viewer / CC roles",
      "Multi-region AWS architecture for data residency, disaster recovery, and low latency, with centralized audit logging",
    ],
    tech: ["Java 21", "Spring Boot", "PostgreSQL", "Redis", "AWS S3", "SES", "CloudFront", "JWT", "OAuth2"],
    // Sources: resume (Xcelore bullets) and app/blog/engineering-2tb-file-transfers.
    caseStudy: {
      problem:
        "Users needed to send single files of up to 2 TB. Over HTTP in one request, one dropped connection means starting again from zero, and a failure at 99% costs everything.",
      flow: [
        { title: "Initiate", detail: "Ask S3 for an uploadId for the transfer." },
        { title: "Upload parts", detail: "Send chunks in parallel; S3 returns an ETag per part." },
        { title: "Persist progress", detail: "Store the uploadId and each completed part's ETag, keyed by transfer." },
        { title: "Complete", detail: "Send the ordered part list; S3 stitches the object together." },
      ],
      decisions: [
        {
          choice: "S3 multipart instead of a single upload",
          why: "Parts are independent, so a failed part is a local retry, not a restart.",
        },
        {
          choice: "Persist part state",
          why: "On restart, parts already sent are skipped, so a crashed worker resumes instead of starting over.",
        },
        {
          choice: "Bounded concurrency",
          why: "Upload several parts at once to use the bandwidth, without exhausting memory or file handles.",
        },
      ],
      outcome: [
        "Transfers of up to 2 TB with retry and resume.",
        "A mid-flight node failure costs a few retried parts, not a restarted terabyte.",
        "Across the platform: 35% faster API responses through Redis caching, async processing, and PostgreSQL query optimization.",
      ],
      relatedPost: "engineering-2tb-file-transfers",
    },
  },
  {
    slug: "hire2retire",
    name: "Hire2Retire — Identity Lifecycle Platform",
    meta: "HR / Identity · Backend developer",
    kpi: "90% fewer prod defects",
    blurb:
      "Identity lifecycle management platform keeping HR systems and enterprise identity systems in sync across onboarding, profile updates, and offboarding.",
    highlights: [
      "REST APIs for employee onboarding, profile updates, and offboarding",
      "RabbitMQ-based asynchronous messaging for reliable HR-to-enterprise data synchronization",
      "Scheduled reconciliation services running every five minutes to resolve data inconsistencies",
      "JUnit and integration tests contributing to a 90% reduction in production defects",
    ],
    tech: ["Java", "Spring Boot", "PostgreSQL", "RabbitMQ", "REST APIs", "JUnit 5"],
    // Source: resume (RoboMQ bullets).
    caseStudy: {
      problem:
        "Employee records live in HR systems, but access lives in enterprise identity systems. When the two drift, people keep access after leaving or wait for it after joining.",
      flow: [
        { title: "HR event", detail: "Onboarding, profile update, or offboarding." },
        { title: "REST APIs", detail: "Lifecycle endpoints receive and validate the change." },
        { title: "RabbitMQ", detail: "The change is synchronized asynchronously to enterprise applications." },
        { title: "Reconcile", detail: "Every five minutes, compare source and target and resolve differences." },
      ],
      decisions: [
        {
          choice: "Asynchronous messaging with RabbitMQ",
          why: "Reliable data synchronization between HR systems and enterprise applications.",
        },
        {
          choice: "Scheduled reconciliation every five minutes",
          why: "Identify and resolve inconsistencies between source and target identity systems.",
        },
      ],
      outcome: [
        "JUnit and integration tests contributing to a 90% reduction in production defects.",
      ],
    },
  },
];

export type SkillGroup = { label: string; items: string[] };

// Mirrors the SKILLS section of the resume (public/ashish-bhaskar-resume.pdf),
// plus Grafana and CloudWatch, which the site keeps though the resume omits them.
export const skills: SkillGroup[] = [
  {
    label: "Backend Development",
    items: [
      "Java 21",
      "SQL",
      "Spring Boot",
      "Spring Security",
      "Spring Cloud Gateway",
      "Spring Data JPA",
      "Hibernate",
      "OpenFeign",
      "REST APIs",
      "Multithreading",
    ],
  },
  {
    label: "Databases & Caching",
    items: ["PostgreSQL", "MySQL", "Redis", "Caffeine", "SQL Query Optimization"],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS S3",
      "RDS",
      "SES",
      "CloudFront",
      "EKS",
      "ECR",
      "Secrets Manager",
      "Docker",
      "Kubernetes",
      "Helm",
      "CI/CD",
    ],
  },
  {
    label: "Architecture & Messaging",
    items: [
      "Microservices",
      "Distributed Systems",
      "Event-Driven Architecture",
      "RabbitMQ",
      "Redis Pub/Sub",
      "WebSockets",
      "STOMP",
    ],
  },
  {
    label: "Security & Testing",
    items: ["JWT", "OAuth2", "RBAC", "JUnit 5", "Mockito", "Integration Testing"],
  },
  {
    label: "Tools & Monitoring",
    items: [
      "Git",
      "GitLab CI",
      "GitHub Actions",
      "Maven",
      "Flyway",
      "SonarQube",
      "New Relic",
      "Swagger/OpenAPI",
      "Grafana",
      "CloudWatch",
    ],
  },
];

export const education = {
  degree: "Bachelor of Technology in Computer Science",
  school: "Rajasthan Technical University",
  location: "Kota, Rajasthan",
  period: "2020 — 2024",
  grade: "8.60 CGPA",
};

// Top-level routes (multi-page site). Home is reached via the brand link.
export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

// Short tech list for the home-page marquee (a curated subset of `skills`).
export const marquee = [
  "Java 21",
  "Spring Boot",
  "Spring Cloud Gateway",
  "Microservices",
  "PostgreSQL",
  "Redis",
  "RabbitMQ",
  "AWS S3",
  "Docker",
  "Kubernetes",
  "GitHub Actions",
  "OAuth2 / JWT",
  "CloudWatch",
];

// "Java 21" and "Java" name the same skill; only a trailing " <version>" is
// dropped, so "OAuth2" is left alone.
function skillKey(name: string): string {
  return name.replace(/\s+\d+(\.\d+)*$/, "").toLowerCase();
}

/** Projects whose tech list includes this skill (shown on /skills). */
export function projectsUsing(skill: string): Project[] {
  const key = skillKey(skill);
  return projects.filter((p) => p.tech.some((t) => skillKey(t) === key));
}

// Every project tag must be a skill, or /skills silently loses the link.
const skillKeys = new Set(skills.flatMap((g) => g.items.map(skillKey)));
for (const p of projects) {
  for (const t of p.tech) {
    if (!skillKeys.has(skillKey(t))) {
      throw new Error(`Project "${p.slug}" lists tech "${t}", which matches no entry in skills`);
    }
  }
}
