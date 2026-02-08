"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type Lenis from "lenis";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Cable,
  CheckCircle2,
  Clock3,
  Cpu,
  Layers,
  Linkedin,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "cases", label: "Case studies" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

const stats = [
  { value: "8-14 days", label: "to first working version" },
  { value: "2-6 weeks", label: "to production rollout" },
  { value: "30-120h/mo", label: "saved via automation" },
];

const services = [
  {
    title: "Custom software",
    text: "Web apps, portals, dashboards, internal tools. Clean architecture and fast iterations.",
    icon: Cpu,
  },
  {
    title: "Automations",
    text: "n8n, Make, Zapier, custom workers. Alerts, lead routing, invoicing, reporting.",
    icon: Zap,
  },
  {
    title: "CRM & RevOps",
    text: "monday.com, HubSpot, Pipedrive. Pipelines, permissions, lifecycle, reporting.",
    icon: Workflow,
  },
  {
    title: "Integrations",
    text: "APIs, webhooks, ETL, data sync. Google Workspace, Slack, Stripe, Airtable.",
    icon: Cable,
  },
  {
    title: "Data & analytics",
    text: "Single source of truth. KPIs, event tracking, dashboards, scheduled exports.",
    icon: BarChart3,
  },
  {
    title: "Maintenance",
    text: "Monitoring, fixes, improvements, documentation. Stable systems over time.",
    icon: ShieldCheck,
  },
];

const processSteps = [
  {
    title: "Audit & scope",
    text: "I map your workflows, data, and constraints. You get a clear plan.",
  },
  {
    title: "Build & iterate",
    text: "Weekly demos, fast feedback loops, visible progress.",
  },
  {
    title: "Rollout",
    text: "Training, docs, access control, and a safe deployment plan.",
  },
  {
    title: "Optimize",
    text: "We measure impact and improve until the system pays for itself.",
  },
];

const caseStudies = [
  {
    title: "Lead intake -> CRM -> sales pipeline",
    metric: "Saved: 42h/month",
    text: "Unified inbox + forms, auto-enrichment, dedup, routing, and Slack alerts. Sales stopped losing leads.",
    tags: ["Automation", "CRM", "Integration"],
  },
  {
    title: "Ops reporting + finance reconciliation",
    metric: "Reduced errors: -78%",
    text: "Automated data pulls, reconciliation rules, and a single dashboard for weekly reporting.",
    tags: ["Data", "Dashboards", "ETL"],
  },
  {
    title: "Client onboarding in monday.com",
    metric: "Cycle time: -35%",
    text: "Templates, permissions, automations, and training. Onboarding became predictable and scalable.",
    tags: ["monday.com", "RevOps", "Enablement"],
  },
];

const techStack = [
  { group: "Build", items: "Next.js, React, TypeScript, Node.js" },
  { group: "Automation", items: "n8n, Make, Zapier, webhooks" },
  { group: "CRM", items: "monday.com, HubSpot, Pipedrive" },
  { group: "Data", items: "Postgres, BigQuery, Airtable, Sheets" },
  { group: "Ops", items: "GitHub, Vercel, Docker, Sentry" },
];

const testimonials = [
  "Fast delivery, zero chaos. The automation paid for itself in the first month.",
  "Clean implementation and great communication. The CRM finally matches our process.",
  "We stopped doing manual reporting. Everything is consistent and visible.",
];

const pricing = [
  {
    title: "Audit (fixed)",
    price: "from 900 EUR",
    bullets: ["Process map", "Quick wins list", "Implementation plan"],
  },
  {
    title: "Build (project)",
    price: "from 3,500 EUR",
    bullets: ["Delivery milestones", "Weekly demos", "Docs + handover"],
    badge: "Most common",
  },
  {
    title: "Retainer",
    price: "from 1,200 EUR / mo",
    bullets: ["Improvements", "Monitoring", "Priority support"],
  },
];

const faqs = [
  {
    question: "Do you work with existing systems?",
    answer:
      "Yes. I usually start with an audit, then improve what exists or replace only what is necessary.",
  },
  {
    question: "How fast can we start?",
    answer: "If scope is clear, I can start within days. First working version typically lands in 8-14 days.",
  },
  {
    question: "Do you provide support after launch?",
    answer: "Yes. Retainer or ad-hoc support, plus monitoring and documentation.",
  },
  {
    question: "Can you sign an NDA?",
    answer: "Yes. I keep projects confidential and can share only sanitized examples.",
  },
];

const outcomeBullets = [
  "20-60% less manual ops work",
  "Fewer handoffs, fewer mistakes",
  "Dashboards that show what matters",
  "Automations that actually stick",
];

const logos = ["Atlas", "Northwind", "Helix", "Pulse", "Quanta", "Vertex"];

const container = "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12";

const baseTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: baseTransition,
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  type LenisWindow = Window & { __lenis?: Lenis };

  useEffect(() => {
    const ids = ["hero", ...navItems.map((n) => n.id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.25, 0.4, 0.6],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const scrollToId = (id: string) => {
    if (typeof window === "undefined") return;
    const selector = `#${id}`;
    const lenis = (window as LenisWindow).__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(selector, { offset: -90 });
      return;
    }
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    scrollToId(id);
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  const primaryButton =
    "relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-1)] via-[var(--accent-2)] to-[var(--accent-3)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(34,211,238,0.28)] transition-all duration-300 bg-[length:200%_100%] hover:bg-[position:100%_0] hover:-translate-y-0.5";
  const secondaryButton =
    "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-2)] hover:text-white";

  const navLinkClasses = (id: string) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 border border-transparent hover:border-[var(--border)] hover:text-white ${
      activeSection === id ? "bg-white/5 text-white border-[var(--border)]" : "text-[var(--muted)]"
    }`;

  const statsWithDelay = useMemo(
    () =>
      stats.map((item, idx) => ({
        ...item,
        transition: { ...fadeIn.transition, delay: 0.08 * idx },
      })),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text)]">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="blob absolute -left-24 top-10 h-72 w-72 bg-[radial-gradient(circle,rgba(109,91,255,0.35),transparent_55%)]" />
        <div className="blob absolute right-[-60px] top-6 h-80 w-80 bg-[radial-gradient(circle,rgba(34,211,238,0.32),transparent_55%)]" />
        <div className="blob absolute bottom-[-80px] left-1/4 h-96 w-96 bg-[radial-gradient(circle,rgba(167,139,250,0.28),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-25 noise" />
      </div>

      <div className="relative">
        <header className="sticky top-0 z-50 backdrop-blur-xl">
          <div className={`${container} pt-6`}>
            <div className="glass hoverable flex items-center justify-between border border-[var(--border)]/70 bg-[var(--background-2)]/70 px-4 py-3 md:px-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),transparent_55%),linear-gradient(135deg,var(--accent-1),var(--accent-2))] shadow-[0_10px_30px_rgba(109,91,255,0.45)]">
                  <svg
                    aria-hidden
                    viewBox="0 0 64 64"
                    className="h-7 w-7 text-white"
                    fill="none"
                  >
                    <path
                      d="M32 10L53.5 50H10.5L32 10Z"
                      fill="url(#grad)"
                      stroke="rgba(255,255,255,0.7)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient id="grad" x1="14" y1="50" x2="52" y2="16" gradientUnits="userSpaceOnUse">
                        <stop stopColor="var(--accent-1)" stopOpacity="0.95" />
                        <stop stopColor="var(--accent-2)" offset="0.55" stopOpacity="0.9" />
                        <stop stopColor="var(--accent-3)" offset="1" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="leading-tight">
                  <p className="font-semibold lowercase">master solutions</p>
                  <p className="text-xs text-[var(--muted)]">software, automations, crm</p>
                </div>
              </div>

              <nav className="hidden items-center gap-2 md:flex">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    scroll={false}
                    prefetch={false}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={navLinkClasses(item.id)}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <Link
                  href="/#contact"
                  scroll={false}
                  prefetch={false}
                  onClick={(e) => handleNavClick(e, "contact")}
                  className={primaryButton}
                  aria-label="Book a call"
                >
                  Book a call
                  <ArrowUpRight size={16} />
                </Link>
                <button
                  className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white/5 text-white"
                  aria-label="Toggle menu"
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {menuOpen && (
              <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--background-2)]/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] md:hidden">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    scroll={false}
                    prefetch={false}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-white/5"
                  >
                    {item.label}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  scroll={false}
                  prefetch={false}
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] px-4 py-3 text-sm font-semibold text-white"
                >
                  Book a call
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </header>

        <main className="relative pb-20 pt-10 sm:pt-16">
          <section id="hero" className="py-16 sm:py-20 lg:py-24">
            <div className={`${container} grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]`}>
              <motion.div {...fadeIn} className="flex flex-col gap-6">
                <span className="badge w-fit bg-white/5 text-[var(--muted)]">
                  Engineering-grade delivery for modern teams
                </span>
                <h1 className="font-display text-4xl leading-tight sm:text-5xl sm:leading-[1.05] lg:text-6xl">
                  We build software and automations that remove manual work.
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
                  From CRM implementations to custom integrations and internal tools. I ship production-ready systems that save time, reduce errors, and scale with your business.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/#contact"
                    scroll={false}
                    prefetch={false}
                    onClick={(e) => handleNavClick(e, "contact")}
                    className={primaryButton}
                  >
                    Book a 20-min call
                    <ArrowUpRight size={18} />
                  </Link>
                  <Link
                    href="/#cases"
                    scroll={false}
                    prefetch={false}
                    onClick={(e) => handleNavClick(e, "cases")}
                    className={secondaryButton}
                  >
                    See case studies
                  </Link>
                </div>
                <p className="text-sm text-[var(--muted)]">No fluff. Clear scope. Measurable outcomes.</p>
              </motion.div>

              <motion.div
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: 0.12 }}
                className="gradient-border glass hoverable relative overflow-hidden p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--muted)]">
                  Typical outcomes
                </div>
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                    <Sparkles size={18} className="text-[var(--accent-2)]" aria-label="Sparkles icon" />
                    Engineering-first delivery
                  </div>
                  <div className="flex flex-col gap-3">
                    {outcomeBullets.map((line) => (
                      <div key={line} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-3 text-sm leading-relaxed text-white/90">
                        <CheckCircle2 size={18} className="mt-0.5 text-[var(--accent-2)]" aria-hidden />
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--accent-1)]/15 via-transparent to-transparent blur-3xl" />
              </motion.div>
            </div>
          </section>

          <div className={`${container} mb-12`}>
            <div className="divider" aria-hidden />
          </div>

          <section aria-labelledby="proof" className="py-12 sm:py-16" id="proof">
            <div className={`${container} flex flex-col gap-8`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="badge mb-2">Proof / Stats</p>
                  <h2 id="proof" className="font-display text-3xl sm:text-4xl">
                    Built to deliver, not to impress.
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-[var(--muted)]">
                    I focus on outcomes: speed, reliability, maintainability.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {statsWithDelay.map((item) => (
                  <motion.div
                    key={item.label}
                    {...fadeIn}
                    transition={item.transition}
                    className="glass hoverable flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/80 p-5"
                  >
                    <div className="text-3xl font-semibold text-white sm:text-4xl">{item.value}</div>
                    <p className="text-sm text-[var(--muted)]">{item.label}</p>
                    <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[var(--accent-1)] via-[var(--accent-2)] to-[var(--accent-3)]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section aria-label="Trusted by" className="py-4">
            <div className={`${container}`}>
              <div className="glass hoverable flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--background-2)]/80 px-4 py-4 sm:px-6">
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Trusted by teams that move fast
                </span>
                <div className="flex flex-wrap gap-2">
                  {logos.map((logo) => (
                    <span key={logo} className="pill text-sm font-semibold uppercase text-white/80">
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className={`${container} my-12`}>
            <div className="divider" aria-hidden />
          </div>

          <section id="services" aria-labelledby="services-title" className="py-16 sm:py-20">
            <div className={`${container} flex flex-col gap-10`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="badge mb-2">Services</p>
                  <h2 id="services-title" className="font-display text-3xl sm:text-4xl">
                    What I do
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-[var(--muted)]">
                    Pick one piece or let me own the full pipeline.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.title}
                      {...fadeIn}
                      transition={{ ...fadeIn.transition, delay: 0.05 * idx }}
                      className="glass hoverable group flex h-full flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[var(--accent-2)] shadow-inner shadow-[rgba(255,255,255,0.08)]">
                          <Icon size={20} aria-hidden />
                        </span>
                        <h3 className="font-semibold text-lg">{service.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--muted)]">{service.text}</p>
                      <div className="mt-auto h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <div className={`${container} my-12`}>
            <div className="divider" aria-hidden />
          </div>

          <section id="process" aria-labelledby="process-title" className="py-16 sm:py-20">
            <div className={`${container} flex flex-col gap-10`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="badge mb-2">Process</p>
                  <h2 id="process-title" className="font-display text-3xl sm:text-4xl">
                    Process that keeps things moving
                  </h2>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 right-4 top-1/2 hidden h-px bg-gradient-to-r from-[var(--accent-1)]/70 via-[var(--accent-2)]/40 to-[var(--accent-3)]/70 md:block" aria-hidden />
                <div className="grid gap-4 md:grid-cols-4">
                  {processSteps.map((step, idx) => (
                    <motion.div
                      key={step.title}
                      {...fadeIn}
                      transition={{ ...fadeIn.transition, delay: 0.05 * idx }}
                      className="glass hoverable relative flex h-full flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/90 p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white/5 text-sm font-semibold text-white">
                          {idx + 1}
                        </span>
                        <h3 className="font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--muted)]">{step.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className={`${container} my-12`}>
            <div className="divider" aria-hidden />
          </div>

          <section id="cases" aria-labelledby="cases-title" className="py-16 sm:py-20">
            <div className={`${container} flex flex-col gap-10`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="badge mb-2">Case studies</p>
                  <h2 id="cases-title" className="font-display text-3xl sm:text-4xl">
                    Case studies
                  </h2>
                  <p className="mt-2 max-w-2xl text-base text-[var(--muted)]">
                    Examples of measurable impact (sanitized, NDA-safe).
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {caseStudies.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.08 * idx }}
                    className="glass hoverable flex h-full flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6"
                  >
                    <div className="pill w-fit bg-gradient-to-r from-[var(--accent-1)]/25 via-[var(--accent-2)]/25 to-[var(--accent-3)]/25 text-sm font-semibold text-white">
                      {item.metric}
                    </div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="pill bg-white/5 text-xs font-medium text-white/90">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <div className={`${container} my-12`}>
            <div className="divider" aria-hidden />
          </div>

          <section aria-labelledby="stack-title" className="py-16 sm:py-20">
            <div className={`${container} grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start`}>
              <motion.div {...fadeIn} className="flex flex-col gap-4">
                <p className="badge w-fit">Tech stack</p>
                <h2 id="stack-title" className="font-display text-3xl sm:text-4xl">
                  Tools I ship with
                </h2>
                <p className="max-w-2xl text-base text-[var(--muted)]">
                  I pick the stack that balances speed, reliability, and maintainability for your team.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {techStack.map((stack) => (
                    <div
                      key={stack.group}
                      className="glass hoverable flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-4"
                    >
                      <div className="text-sm uppercase tracking-wide text-[var(--muted)]">{stack.group}</div>
                      <div className="text-base font-semibold text-white">{stack.items}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: 0.1 }}
                className="gradient-border glass hoverable relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/90 p-6"
              >
                <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                  <ShieldCheck size={18} className="text-[var(--accent-1)]" aria-hidden />
                  Reliable delivery patterns
                </div>
                <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-white/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 text-[var(--accent-2)]" aria-hidden />
                    Build with observability: logs, alerts, and health checks by default.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 text-[var(--accent-2)]" aria-hidden />
                    Reusable component library for consistent UX across flows.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-0.5 text-[var(--accent-2)]" aria-hidden />
                    Deployment playbooks: staging, rollout toggles, and rollback plans.
                  </li>
                </ul>
                <div className="absolute right-6 top-6 h-12 w-12 rounded-full bg-[radial-gradient(circle,rgba(109,91,255,0.2),transparent_60%)]" aria-hidden />
              </motion.div>
            </div>
          </section>

          <div className={`${container} my-12`}>
            <div className="divider" aria-hidden />
          </div>

          <section aria-labelledby="testimonials-title" className="py-16 sm:py-20">
            <div className={`${container} flex flex-col gap-10`}>
              <div>
                <p className="badge mb-2">Testimonials</p>
                <h2 id="testimonials-title" className="font-display text-3xl sm:text-4xl">
                  What clients say
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((quote, idx) => (
                  <motion.div
                    key={quote.slice(0, 12)}
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.05 * idx }}
                    className="glass hoverable flex h-full flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/85 p-5"
                  >
                    <div className="flex items-center gap-2 text-[var(--muted)]">
                      <Sparkles size={16} aria-hidden />
                      Client feedback
                    </div>
                    <p className="text-base leading-relaxed text-white/90">“{quote}”</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <div className={`${container} my-12`}>
            <div className="divider" aria-hidden />
          </div>

          <section id="pricing" aria-labelledby="pricing-title" className="py-16 sm:py-20">
            <div className={`${container} flex flex-col gap-10`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="badge mb-2">Engagement</p>
                  <h2 id="pricing-title" className="font-display text-3xl sm:text-4xl">
                    Simple models depending on scope.
                  </h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {pricing.map((plan, idx) => (
                  <motion.div
                    key={plan.title}
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.07 * idx }}
                    className={`glass hoverable flex h-full flex-col gap-4 rounded-2xl border bg-[var(--surface)]/85 p-6 ${
                      plan.badge ? "border-[var(--accent-2)]/50 shadow-[0_20px_60px_rgba(34,211,238,0.25)]" : "border-[var(--border)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold">{plan.title}</h3>
                      {plan.badge && (
                        <span className="badge border-[var(--accent-2)]/60 bg-[var(--accent-2)]/15 text-[var(--accent-2)]">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-semibold text-white">{plan.price}</div>
                    <ul className="flex flex-col gap-2 text-sm text-[var(--muted)]">
                      {plan.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="mt-0.5 text-[var(--accent-2)]" aria-hidden />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center gap-2 text-sm text-white/80">
                      <Clock3 size={16} aria-hidden />
                      Timeline set per scope
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <div className={`${container} my-12`}>
            <div className="divider" aria-hidden />
          </div>

          <section id="faq" aria-labelledby="faq-title" className="py-16 sm:py-20">
            <div className={`${container} grid gap-10 lg:grid-cols-[1.05fr_0.95fr]`}>
              <motion.div {...fadeIn} className="flex flex-col gap-4">
                <p className="badge w-fit">FAQ</p>
                <h2 id="faq-title" className="font-display text-3xl sm:text-4xl">
                  FAQ
                </h2>
                <p className="text-base text-[var(--muted)]">
                  Clear answers so you know exactly how we work together.
                </p>
              </motion.div>

              <div className="flex flex-col gap-3">
                {faqs.map((faq, idx) => (
                  <motion.details
                    key={faq.question}
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.05 * idx }}
                    className="group glass hoverable rounded-2xl border border-[var(--border)] bg-[var(--surface)]/85 p-4"
                    open={idx === 0}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-semibold text-white">
                      {faq.question}
                      <span className="text-sm text-[var(--muted)] transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{faq.answer}</p>
                  </motion.details>
                ))}
              </div>
            </div>
          </section>

          <div className={`${container} my-12`}>
            <div className="divider" aria-hidden />
          </div>

          <section aria-labelledby="cta-title" className="py-16 sm:py-20">
            <div className={`${container} grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center`}>
              <motion.div
                {...fadeIn}
                className="gradient-border glass hoverable relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-2)]/90 p-8"
              >
                <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_20%_30%,rgba(109,91,255,0.25),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.25),transparent_40%)]" />
                <div className="relative z-10 flex flex-col gap-4">
                  <h2 id="cta-title" className="font-display text-3xl sm:text-4xl">
                    Let&apos;s remove manual work from your business.
                  </h2>
                  <p className="max-w-2xl text-base text-[var(--muted)]">
                    Tell me what you do today. I will map the fastest path to automation and measurable savings.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/#contact"
                      scroll={false}
                      prefetch={false}
                      onClick={(e) => handleNavClick(e, "contact")}
                      className={primaryButton}
                    >
                      Book a 20-min call
                      <ArrowUpRight size={18} />
                    </Link>
                    <Link
                      href="/#contact"
                      scroll={false}
                      prefetch={false}
                      onClick={(e) => handleNavClick(e, "contact")}
                      className={secondaryButton}
                    >
                      Email me
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: 0.12 }}
                className="glass hoverable rounded-3xl border border-[var(--border)] bg-[var(--background-2)]/85 p-6"
                id="contact"
              >
                <div className="flex items-center gap-3">
                  <Layers size={20} className="text-[var(--accent-2)]" aria-hidden />
                  <div>
                    <h3 className="font-semibold text-lg">Contact</h3>
                    <p className="text-sm text-[var(--muted)]">Response time: &lt; 24h on business days</p>
                  </div>
                </div>

                <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                  <label className="flex flex-col gap-2 text-sm text-[var(--muted)]">
                    Name
                    <input
                      required
                      name="name"
                      className="h-11 rounded-xl border border-[var(--border)] bg-white/5 px-3 text-sm text-white outline-none transition focus:border-[var(--accent-2)] focus:bg-white/10"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-[var(--muted)]">
                    Work email
                    <input
                      required
                      type="email"
                      name="email"
                      className="h-11 rounded-xl border border-[var(--border)] bg-white/5 px-3 text-sm text-white outline-none transition focus:border-[var(--accent-2)] focus:bg-white/10"
                      placeholder="you@company.com"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-[var(--muted)]">
                    What do you want to improve?
                    <textarea
                      required
                      name="message"
                      rows={4}
                      className="rounded-xl border border-[var(--border)] bg-white/5 px-3 py-3 text-sm text-white outline-none transition focus:border-[var(--accent-2)] focus:bg-white/10"
                      placeholder="Describe the workflow, tool, or metric."
                    />
                  </label>
                  <button type="submit" className={`${primaryButton} w-full justify-center`}>
                    Send message
                  </button>
                  {submitted && (
                    <div className="rounded-xl border border-[var(--success)]/30 bg-[var(--success)]/10 px-3 py-2 text-sm text-[var(--success)]" role="status" aria-live="polite">
                      Got it. I will reply within 24h.
                    </div>
                  )}
                </form>

                <div className="mt-6 grid gap-3 rounded-2xl border border-[var(--border)] bg-white/5 p-4 text-sm text-[var(--muted)]">
                  <div className="flex items-center gap-2 text-white">
                    <Mail size={16} aria-hidden />
                    Email: <a href="mailto:hello@mastersolutions.dev" className="underline decoration-[var(--accent-2)]/60">hello@mastersolutions.dev</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} aria-hidden />
                    LinkedIn: <span className="text-white">(placeholder)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} aria-hidden />
                    Based in EU, working worldwide
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="border-t border-[var(--border)]/60 bg-[var(--background-2)]/60 py-10">
          <div className={`${container} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
            <div>
              <div className="text-lg font-semibold text-white lowercase">master solutions</div>
              <p className="text-sm text-[var(--muted)]">software, automations, crm</p>
              <p className="mt-2 text-xs text-[var(--muted)]">© 2026 master solutions. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
