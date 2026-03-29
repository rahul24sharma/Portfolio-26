# Rahul Sharma — 3D Portfolio

Personal portfolio site for **Rahul Sharma**, a **Full Stack Engineer** and **AI Builder** focused on production systems, distributed backends, and applied AI. This repo is a React + TypeScript + Three.js experience: interactive 3D hero, scroll-driven storytelling, and sections for work, career, and contact.

**Links**

- [LinkedIn](https://www.linkedin.com/in/rsharma84/)
- [GitHub](https://github.com/rahul24sharma)
- Live site: update this line after you deploy (for example your Vercel URL). A previous deployment reference: [portfolio (Vercel)](https://portfolio-25-s-rahul.vercel.app/).

![Portfolio preview]

## About

Full stack software engineer with **2+ years** of experience shipping scalable, production-grade systems in **Java**, **Python**, and **TypeScript** — from event-driven backends and cloud infrastructure to responsive frontends and **LLM-powered** workflows.

**Currently:** MS in **Information Systems** at **Northeastern University** (Boston), GPA 3.7 — coursework in Distributed Systems, Machine Learning, Databases, and Software Engineering.

**Previously:** Software Engineer and intern at **WebCraft IT** (Indore, India): Spring Boot and React/TypeScript full stack, PostgreSQL, AWS, CI/CD, and features used by **10,000+ daily users** across multiple enterprise systems.

Content in the app is driven from [`src/data/portfolioData.ts`](src/data/portfolioData.ts) so you can keep the README and the site aligned when you update copy.

## Featured work

| Project | Focus | Stack (high level) |
| -------- | ----- | ------------------- |
| [AI-Powered Document Intelligence](https://github.com/rahul24sharma/AI-Powered-Legal-Document-Intelligence-platform) | LLM-powered extraction | Python, FastAPI, OpenAI, RAG, PostgreSQL, Docker, AWS |
| Distributed Payment Processing | Event-driven finance | Java, Spring Boot, Kafka, PostgreSQL, Redis, AWS |
| [Cloud-Native Health Tracker](https://github.com/rahul24sharma/webapp) | Full stack + IaC | Node.js, Express, MySQL, Terraform, Packer, AWS |
| [Fantasy Edge](https://fantasy-edge-seven.vercel.app/) | Live sports fan product | TypeScript, React, Next.js |
| [AI Voice Interview Platform](https://full-stack-real-time-ai-voice-agent-interview-platform-tawny.vercel.app/) | Real-time voice AI | TypeScript, React, voice APIs |

## Tech stack (this repository)

- **Core:** React 18, TypeScript, Vite  
- **3D:** Three.js, React Three Fiber, Drei, physics (Rapier / Cannon)  
- **Motion:** GSAP, ScrollTrigger, ScrollSmoother, SplitText  
- **UI:** Custom CSS, responsive layout, accessibility touches (skip link, landmarks)  
- **Analytics:** [@vercel/analytics](https://vercel.com/docs/analytics)

## Getting started

**Requirements:** Node.js **18+** (see `engines` in `package.json`).

```bash
git clone <your-repo-url>
cd 3d-portfolio
npm install
npm run dev
```

Open the URL Vite prints (often `http://localhost:5173`).

### Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Dev server (`--host` for LAN devices) |
| `npm run build` | `tsc -b` + production bundle to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |

## Customization

- **Copy & links:** [`src/data/portfolioData.ts`](src/data/portfolioData.ts)  
- **Sections:** `src/components/` (About, Work, Career, Contact, etc.)  
- **Styles:** `src/components/styles/`, `src/index.css`  
- **3D & scroll:** `src/components/Character/`, `src/components/utils/GsapScroll.ts`, `src/components/utils/initialFX.ts`

## Deployment (Vercel)

Production builds are static and work well on **Vercel** with **HTTPS** by default.

1. `npm run build` — confirm `dist/` looks good (`npm run preview`).  
2. Import the Git repository in Vercel.  
3. If the app lives in a subfolder (e.g. `Portfolio-26/3d-portfolio`), set **Root Directory** to `3d-portfolio`.  
4. `vercel.json` in this folder configures SPA routing and security headers.

## GSAP

This project uses the standard `gsap` package (including plugins distributed with it). See the [official installation docs](https://gsap.com/docs/v3/Installation/) if you upgrade or change tooling.

## License

See [LICENSE](LICENSE).

---

Built and maintained by **Rahul Sharma**.
