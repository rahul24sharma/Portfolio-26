import aiImage from "../images/ai.jpg";
import fantasyImage from "../images/fantasy.png";
import healthImage from "../images/health.jpg";
import interviewImage from "../images/interview.webp";
import paymentImage from "../images/payment.webp";

export const portfolioData = {
  siteTitle: "Rahul Sharma — Full Stack Engineer & AI Builder",
  metaDescription:
    "Full stack engineer and AI builder. Java, TypeScript, React, distributed systems, and production-grade software — portfolio of Rahul Sharma.",
  loadingMarquee: [
    "Full Stack Engineer",
    "Software Engineer",
    "AI Builder",
    "Distributed Systems",
  ],
  navbar: {
    initials: "RS",
    connectLabel: "linkedin.com/in/rsharma84",
    connectUrl: "https://www.linkedin.com/in/rsharma84/",
  },
  hero: {
    greeting: "Hello! I'm",
    firstName: "RAHUL",
    lastName: "SHARMA",
    rolePrefix: "Full Stack",
    rolePrimary: "Engineer",
    roleSecondary: "AI Builder",
  },
  about: {
    title: "About Me",
    description:
      "I'm a Full Stack Software Engineer with 2+ years of experience building scalable, production-grade systems across Java, Python, and TypeScript. I specialize in shipping end-to-end features, from event-driven backends and cloud infrastructure to responsive frontends and AI-powered workflows. Currently pursuing my MS at Northeastern University, I'm passionate about solving real problems at the intersection of software engineering, distributed systems, and applied AI.",
  },
  whatIDo: {
    title: "WHAT I DO",
    cards: [
      {
        heading: "FULL STACK ENGINEERING",
        subheading: "Production Systems at Scale",
        description:
          "I build performant, maintainable applications end-to-end from React/Next.js frontends to Java Spring Boot and Node.js backends, backed by PostgreSQL and Redis, deployed on AWS with CI/CD.",
          tags: [
            "Java & Spring Boot",
            "React & TypeScript",
            "Node.js & FastAPI",
            "PostgreSQL & Redis",
            "REST & GraphQL APIs",
            "AWS & AI-Native Tools",
          ],  
      },
      {
        heading: "AI & LLM INTEGRATION",
        subheading: "Shipping AI in Production",
        description:
          "I integrate LLMs into real workflows, building RAG pipelines, agentic systems, and AI-powered features that extract, personalize, and automate at scale, not just demos.",
        tags: [
          "OpenAI & Anthropic APIs",
          "RAG pipelines",
          "Agentic workflows",
          "Prompt engineering",
          "LLM evaluation",
          "AI-native dev tools",
        ],
      },
      {
        heading: "CLOUD & DEVOPS",
        subheading: "Infrastructure That Ships Fast",
        description:
          "I provision, deploy, and monitor cloud-native applications with Terraform, Docker, and CI/CD — because great software means nothing if it doesn't run reliably in production.",
        tags: [
          "AWS (EC2, RDS, S3, ALB)",
          "Terraform & Packer",
          "Docker & Kubernetes",
          "GitHub Actions CI/CD",
          "CloudWatch monitoring",
          "Zero-downtime deploys",
        ],
      },
    ],
  },
  work: {
    title: "My Work",
    projects: [
      {
        title: "AI-Powered Document Intelligence Platform",
        category: "LLM-Powered Data Extraction",
        tools: "Python, FastAPI, OpenAI API, RAG, PostgreSQL, Docker, AWS",
        image: aiImage,
        link: "https://github.com/rahul24sharma/AI-Powered-Legal-Document-Intelligence-platform",
      },
      {
        title: "Distributed Payment Processing Platform",
        category: "Event-Driven Financial System",
        tools: "Java, Spring Boot, Kafka, PostgreSQL, Redis, Docker, AWS",
        image: paymentImage,
        link: "https://github.com/rahul24sharma",
      },
      {
        title: "Cloud-Native Health Tracker",
        category: "Full Stack App with IaC on AWS",
        tools: "Node.js, Express, MySQL, Terraform, Packer, AWS (EC2, RDS, ALB, ASG, CloudWatch)",
        image: healthImage,
        link: "https://github.com/rahul24sharma/webapp",
      },
      {
        title: "Fantasy Edge",
        category: "Live Sports Fan Platform",
        tools: "TypeScript, React, Next.js, REST APIs, Bootstrap, Real-Time Data",
        image: fantasyImage,
        link: "https://fantasy-edge-seven.vercel.app/",
      },
      {
        title: "AI Voice Agent Interview Platform",
        category: "Real-Time AI Voice Application",
        tools: "TypeScript, React, AI Voice APIs, Real-Time Processing",
        image: interviewImage,
        link: "https://full-stack-real-time-ai-voice-agent-interview-platform-tawny.vercel.app/",
      },
    ],
  },
  career: {
    title: "My career & experience",
    items: [
      {
        role: "MS Student",
        company: "Northeastern University",
        period: "NOW",
        description:
          "Pursuing MS in Information Systems (GPA: 3.7). Coursework in Distributed Systems, Machine Learning, Database Systems, and Software Engineering. Actively building AI and full-stack projects.",
      },
      {
        role: "Software Engineer",
        company: "WebCraft IT · Indore, India",
        period: "2023–24",
        description:
          "Built production full-stack applications with Java Spring Boot, React/TypeScript, and Python. Designed event-driven pipelines, optimized PostgreSQL schemas, deployed on AWS with CI/CD, and integrated LLM-powered features — serving 10,000+ daily users across 5+ enterprise systems.",
      },
      {
        role: "Software Engineer Intern",
        company: "WebCraft IT · Indore, India",
        period: "2022–23",
        description:
          "Developed Java (Spring Boot) and Python (FastAPI) backend services automating business workflows. Optimized database performance, built React frontend components, and wrote comprehensive test suites — cutting query latency by 80% and saving 6+ engineering hours weekly.",
      },
    ],
  },
  contact: {
    connectHeading: "Connect",
    connectLabel: "LinkedIn — rsharma84",
    connectUrl: "https://www.linkedin.com/in/rsharma84/",
    educationHeading: "Education",
    education: [
      "MS Information Systems, Northeastern University, Boston — 2024–2026",
      "BE Computer Science, RGPV University, India — 2019–2023",
    ],
    socialHeading: "Social",
    creditPrefix: "Designed and Developed by",
    creditName: "Rahul Sharma",
    copyrightYear: "2026",
  },
  socialLinks: {
    github: "https://github.com/rahul24sharma",
    linkedin: "https://www.linkedin.com/in/rsharma84/",
    portfolio: "https://portfolio-25-s-rahul.vercel.app/",
    resume:
      "https://www.linkedin.com/in/rsharma84/",
  },
} as const;
