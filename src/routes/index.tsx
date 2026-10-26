import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import {
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock,
  Download,
  Gauge,
  Infinity,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  TriangleAlert,
  Wrench,
  Zap,
} from "lucide-react";
import workshopHero from "@/assets/workshop-hero.jpg";
import vaultBundle from "@/assets/vault-bundle.png";

import phoneHomeAsset from "@/assets/app/phone-home.png.asset.json";
import phoneEngineAsset from "@/assets/app/phone-engine.png.asset.json";
import phoneSearchAsset from "@/assets/app/phone-search.png.asset.json";
import phoneHeatAsset from "@/assets/app/phone-heat.png.asset.json";
import ExitIntentWheel from "@/components/ExitIntentWheel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import t1Asset from "@/assets/testimonials/t1.png.asset.json";
import t2Asset from "@/assets/testimonials/t2.png.asset.json";
import t3Asset from "@/assets/testimonials/t3.png.asset.json";
import t4Asset from "@/assets/testimonials/t4.png.asset.json";
import t5Asset from "@/assets/testimonials/t5.png.asset.json";
import t6Asset from "@/assets/testimonials/t6.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Harley Mechanic's Vault | Workshop Manual Bundle" },
      {
        name: "description",
        content:
          "A technical Harley repair vault built for owners who want real specs, diagnostics, torque references and dealer-saving repair guidance.",
      },
      {
        property: "og:title",
        content: "The Harley Mechanic's Vault",
      },
      {
        property: "og:description",
        content:
          "Technical Harley repair references, diagnostic shortcuts and cost-saving workshop manuals in one digital vault.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  useReveal();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <FailureStrip />
      <PainGrid />
      <VaultSection />
      <EvidenceSection />
      <ComparisonSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <MinimalFooter />
      <ExitIntentWheel />
    </main>
  );
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="section-eyebrow">{children}</div>;
}

function HeroSection() {
  return (
    <section className="border-b border-border hero-metal">
      <div className="container mx-auto grid gap-10 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[minmax(0,1.15fr)_430px] lg:items-start lg:gap-14">
        <div className="reveal-on-scroll">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            <span className="inline-flex items-center gap-2 border border-border bg-panel px-3 py-2 font-mono">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Workshop archive
            </span>
            <span className="font-mono">Digital product • instant access</span>
          </div>

          <h1 className="max-w-4xl font-headline text-5xl leading-[0.9] text-foreground md:text-7xl lg:text-[5.5rem]">
            STOP PAYING
            <br />
            DEALER PRICES
            <br />
            FOR GARAGE JOBS.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            <strong className="font-semibold text-foreground">The Harley Mechanic&apos;s Vault</strong> is a
            workshop-grade bundle of repair references, torque sheets, diagnostic shortcuts and
            dealer-cost breakdowns built for owners who actually turn wrenches.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              "4 technical manuals organized by real repair jobs",
              "Built for bench use, mobile reading and on‑demand reference",
              "Made to cut waste, guesswork and dealer markup",
            ].map((item) => (
              <div key={item} className="info-chip">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#pricing" className="button-cta">
              Get the vault now
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="reveal-on-scroll space-y-4">
          <div className="panel overflow-hidden">
            <div className="panel-topline" />
            <img
              src={workshopHero}
              alt="Harley engine disassembled on a workshop bench under shop lighting"
              width={1600}
              height={1200}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

function FailureStrip() {
  const items = [
    "NO DEALER APPOINTMENT",
    "NO GUESSWORK ON TORQUE",
    "NO PAYING $150 FOR BASIC DIAGNOSTICS",
    "NO SPECIAL-TOOL PANIC",
  ];

  return (
    <section className="border-b border-border bg-panel">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="h-2 w-2 bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PainGrid() {
  const items = [
    {
      icon: CircleDollarSign,
      title: "Labor padding",
      text: "Many Harley owners are paying premium shop rates for repairs that become very manageable once the process is laid out correctly.",
    },
    {
      icon: Gauge,
      title: "Spec confusion",
      text: "Most people do not stop because they lack courage. They stop because the torque values, diagnostic paths and sequences are scattered everywhere.",
    },
    {
      icon: TriangleAlert,
      title: "Tool intimidation",
      text: "Dealers make routine jobs sound impossible without a wall of special tools. This vault shows what matters, what substitutes and what to ignore.",
    },
  ];

  return (
    <section className="border-b border-border py-16 md:py-24 grid-floor">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal-on-scroll max-w-3xl">
          <Eyebrow>Why most owners overpay</Eyebrow>
          <h2 className="font-headline text-4xl leading-[0.92] md:text-6xl">
            THIS IS NOT ABOUT LOOKING LIKE A MECHANIC. IT&apos;S ABOUT HAVING THE RIGHT INFORMATION BEFORE THE BIKE IS ALREADY OPEN.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="reveal-on-scroll panel p-6">
              <item.icon className="h-8 w-8 text-primary" strokeWidth={1.75} />
              <h3 className="mt-6 font-headline text-2xl text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VaultSection() {
  const manuals = [
    {
      number: "01",
      title: "Diagnostic Reference",
      text: "Button-combo reads, code interpretation, reset procedures and no-nonsense troubleshooting paths by platform.",
    },
    {
      number: "02",
      title: "Torque Master Sheets",
      text: "Critical fastener values grouped by actual job so you are not hunting page by page during a repair.",
    },
    {
      number: "03",
      title: "Dealer Markup Files",
      text: "A practical map of what shops charge, what the parts really cost and which jobs are worth doing yourself.",
    },
    {
      number: "04",
      title: "Tool Substitution Guide",
      text: "Shows which special tools matter, which ones can be replaced and how to work smarter with common garage equipment.",
    },
  ];

  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div>
            <div className="reveal-on-scroll max-w-3xl">
              <Eyebrow>What you actually get</Eyebrow>
              <h2 className="font-headline text-4xl leading-[0.92] md:text-6xl">
                A REPAIR VAULT STRUCTURED LIKE A WORK BENCH, NOT A SALES BROCHURE.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {manuals.map((manual) => (
                <article key={manual.number} className="reveal-on-scroll panel p-6">
                  <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                    <span className="font-headline text-4xl leading-none text-primary">{manual.number}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                      Included manual
                    </span>
                  </div>
                  <h3 className="mt-5 font-headline text-2xl text-foreground">{manual.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{manual.text}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="reveal-on-scroll panel overflow-hidden">
            <div className="border-b border-border bg-contrast px-5 py-4 font-mono text-[11px] uppercase tracking-[0.26em] text-contrast-foreground">
              Bundle preview
            </div>
            <div className="p-5">
              <img
                src={vaultBundle}
                alt="Digital bundle preview of The Harley Mechanic's Vault manuals"
                width={1200}
                height={1200}
                loading="lazy"
                className="w-full"
              />
            </div>
            <div className="grid gap-px border-t border-border bg-border">
              {[
                ["Coverage", "Twin Cam, M8, Sportster"],
                ["Use", "Mobile + bench printouts"],
                ["Access", "Immediate after checkout"],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[120px_1fr] bg-panel px-5 py-4">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
                  <div className="text-sm font-medium text-foreground">{value}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="reveal-on-scroll mt-10 flex justify-center">
          <a href="#pricing" className="button-cta">
            Unlock my access now
          </a>
        </div>
      </div>
    </section>
  );
}

function EvidenceSection() {
  const badges = ["No install needed", "190+ topics", "Works on any phone", "Every Harley model"];

  return (
    <section className="border-b border-border bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal-on-scroll mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-8 bg-primary" />
            Bonus included
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2 className="mt-6 font-headline text-4xl leading-[0.92] md:text-6xl">
            THE DEFINITIVE APP FOR HARLEY OWNERS
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            No install required. Open it on any phone, any time — built for every Harley model.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {badges.map((b) => (
              <div
                key={b}
                className="flex items-center gap-2 border border-border bg-panel px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground"
              >
                <Check className="h-3.5 w-3.5 text-primary" />
                {b}
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-on-scroll mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { src: phoneHomeAsset.url, caption: "The Harley Bible — every category in one place." },
            { src: phoneEngineAsset.url, caption: "190+ deep-dive guides organized by topic." },
            { src: phoneSearchAsset.url, caption: "Instant search across every fix and tip." },
            { src: phoneHeatAsset.url, caption: "Step-by-step solutions with cautions." },
          ].map((item) => (
            <figure key={item.caption} className="flex flex-col items-center">
              <div className="relative w-full max-w-[260px] rounded-[32px] border-[10px] border-[#1a1a1a] bg-[#0a0a0a] p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
                {/* Notch */}
                <div className="absolute left-1/2 top-0 z-10 h-[18px] w-[90px] -translate-x-1/2 rounded-b-xl bg-[#1a1a1a]" />
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full rounded-[22px] object-contain"
                />
              </div>
              <figcaption className="mt-5 px-2 text-center text-sm leading-relaxed text-muted-foreground">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>


        <div className="reveal-on-scroll mt-10 flex justify-center">
          <a href="#pricing" className="button-cta">
            Get the app + vault
          </a>
        </div>
      </div>
    </section>
  );
}


function ComparisonSection() {
  const rows = [
    ["Basic diagnostic session", "$150+", "$0 after download"],
    ["Primary adjustment", "$120", "Do it yourself"],
    ["Cam/tensioner related repair", "$1,800+", "Parts + guided reference"],
    ["Tool panic purchase", "$2,000+ over time", "Buy only what matters"],
  ];

  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal-on-scroll max-w-3xl">
          <Eyebrow>Cost perspective</Eyebrow>
          <h2 className="font-headline text-4xl leading-[0.92] md:text-6xl">
            ONE SMALL DIGITAL PURCHASE CAN SAVE YOU THOUSANDS IN BAD SERVICE HABITS.
          </h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="reveal-on-scroll panel overflow-hidden">
            <div className="grid grid-cols-3 border-b border-border bg-contrast text-[11px] uppercase tracking-[0.25em] text-contrast-foreground">
              <div className="px-5 py-4 font-mono">Job</div>
              <div className="px-5 py-4 font-mono">Dealer</div>
              <div className="px-5 py-4 font-mono">Vault path</div>
            </div>
            {rows.map((row) => (
              <div key={row[0]} className="grid grid-cols-3 border-b border-border px-0 last:border-b-0">
                <div className="bg-background px-5 py-5 text-sm text-foreground">{row[0]}</div>
                <div className="bg-panel px-5 py-5 text-sm text-muted-foreground line-through">{row[1]}</div>
                <div className="bg-background px-5 py-5 text-sm font-medium text-primary">{row[2]}</div>
              </div>
            ))}
          </div>

          <div className="reveal-on-scroll panel p-6">
            <div className="stat-label">Estimated savings potential</div>
            <div className="mt-3 font-headline text-7xl leading-none text-primary">$3.4K+</div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              For many owners, one or two avoided dealer visits can already cover the entire purchase.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function useCountdown(minutes: number) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  useEffect(() => {
    const key = `pricingCountdownEnd-${minutes}m-v2`;
    let end = Number(localStorage.getItem(key));
    if (!end || end < Date.now()) {
      end = Date.now() + minutes * 60 * 1000;
      localStorage.setItem(key, String(end));
    }
    const tick = () => {
      const diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setSecondsLeft(diff);
      if (diff === 0) {
        const next = Date.now() + minutes * 60 * 1000;
        localStorage.setItem(key, String(next));
        end = next;
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [minutes]);
  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function PricingSection() {
  const countdown = useCountdown(3);
  const tiers = [
    {
      id: "app",
      label: "APP ONLY",
      name: "THE APP",
      oldPrice: "$147.00",
      priceWhole: "42",
      priceCents: ".90",
      tagline: "190+ GUIDES IN YOUR POCKET",
      features: [
        { icon: "zap", text: "Full access to the Harley app" },
        { icon: "infinity", text: "190+ deep-dive guides" },
        { icon: "download", text: "Works on any phone — no install" },
        { icon: "shield", text: "7-day guarantee" },
      ],
      cta: "GET THE APP",
      href: "https://pay.hotmart.com/S106172425V",
      featured: false,
    },
    {
      id: "book",
      label: "BOOK ONLY",
      name: "THE MANUAL",
      oldPrice: "$127.00",
      priceWhole: "69",
      priceCents: ".90",
      tagline: "THE COMPLETE DIGITAL BOOK",
      features: [
        { icon: "download", text: "Complete digital manual" },
        { icon: "infinity", text: "Lifetime access" },
        { icon: "zap", text: "Instant download" },
        { icon: "shield", text: "7-day guarantee" },
      ],
      cta: "GET THE BOOK",
      href: "https://pay.hotmart.com/L105994413B",
      featured: false,
    },
    {
      id: "bundle",
      label: "SPECIAL PRICE ENDS IN",
      badge: "BEST SELLER",
      name: "BOOK + APP",
      oldPrice: "$247.00",
      priceWhole: "85",
      priceCents: ".00",
      tagline: "SPECIAL OFFER — TODAY ONLY",
      features: [
        { icon: "download", text: "Complete digital manual" },
        { icon: "zap", text: "Full access to the Harley app" },
        { icon: "infinity", text: "Lifetime access & free updates" },
        { icon: "shield", text: "7-day unconditional guarantee" },
      ],
      cta: "UNLOCK THE FULL PACK",
      href: "https://pay.hotmart.com/Q106173506K",
      featured: true,
    },
  ];

  return (
    <section id="pricing" className="border-b border-border py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal-on-scroll grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {tiers.map((tier) => {
            const featured = tier.featured;
            return (
              <article
                key={tier.id}
                className={
                  featured
                    ? "relative flex flex-col overflow-hidden bg-[oklch(0.68_0.2_45)] text-white shadow-[0_30px_80px_-20px_oklch(0.68_0.2_45_/_0.55)]"
                    : "panel relative flex flex-col overflow-hidden bg-panel"
                }
              >
                {featured ? (
                  <div className="bg-[oklch(0.68_0.2_45)] px-6 pt-6 text-center">
                    <div className="mx-auto max-w-[240px] border border-white/30 px-4 py-3">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white">
                        {tier.label}
                      </div>
                      <div className="mt-1 font-headline text-3xl tabular-nums tracking-[0.1em] text-white">
                        <Clock className="mx-auto mb-1 h-5 w-5" />
                        {countdown}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={
                      featured
                        ? "border-b-2 border-white/30 px-6 py-5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white"
                        : "border-b border-border bg-[#1a1a1a] px-6 py-5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[oklch(0.68_0.2_45)]"
                    }
                  >
                    {tier.label}
                  </div>
                )}

                <div className="flex flex-1 flex-col items-center text-center px-6 py-7">
                  {featured && tier.badge ? (
                    <div className="mb-3 inline-block bg-white px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-black">
                      {tier.badge}
                    </div>
                  ) : null}

                  <div
                    className={
                      featured
                        ? "font-headline text-2xl leading-none text-white"
                        : "font-headline text-2xl leading-none text-white"
                    }
                  >
                    {tier.name}
                  </div>

                  <div
                    className={
                      featured
                        ? "mt-3 font-mono text-sm text-white/70 line-through"
                        : "mt-3 font-mono text-sm text-muted-foreground line-through"
                    }
                  >
                    {tier.oldPrice}
                  </div>

                  <div className="mt-2 flex items-start justify-center gap-1">
                    <span
                      className={
                        featured
                          ? "mt-2 font-mono text-base text-white"
                          : "mt-2 font-mono text-base text-black"
                      }
                    >
                      $
                    </span>
                    <span
                      className={
                        featured
                          ? "font-headline text-7xl leading-none text-white md:text-8xl"
                          : "font-headline text-7xl leading-none text-black md:text-8xl"
                      }
                    >
                      {tier.priceWhole}
                    </span>
                    <span
                      className={
                        featured
                          ? "mt-2 font-mono text-lg text-white"
                          : "mt-2 font-mono text-lg text-black"
                      }
                    >
                      {tier.priceCents}
                    </span>
                  </div>

                  <div
                    className={
                      featured
                        ? "mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-white"
                        : "mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground"
                    }
                  >
                    {tier.tagline}
                  </div>

                  <ul className="mt-6 flex-1 space-y-3 text-left w-full">
                    {tier.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[oklch(0.68_0.2_45)]">
                          {feature.icon === "zap" && <Zap className="h-4 w-4 text-white" />}
                          {feature.icon === "download" && <Download className="h-4 w-4 text-white" />}
                          {feature.icon === "infinity" && <Infinity className="h-4 w-4 text-white" />}
                          {feature.icon === "shield" && <ShieldCheck className="h-4 w-4 text-white" />}
                        </span>
                        <span className={featured ? "text-white" : "text-foreground"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={tier.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      featured
                        ? "mt-8 inline-flex w-full items-center justify-center gap-2 bg-[oklch(0.55_0.22_45)] px-5 py-4 font-headline text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[oklch(0.5_0.22_45)]"
                        : "mt-8 inline-flex w-full items-center justify-center gap-2 border border-[oklch(0.68_0.2_45)] bg-transparent px-5 py-4 font-headline text-sm font-bold uppercase tracking-[0.12em] text-[oklch(0.68_0.2_45)] transition hover:bg-[oklch(0.68_0.2_45)] hover:text-white"
                    }
                  >
                    <Lock className="h-4 w-4" />
                    {tier.cta}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mike Johnson",
      city: "Milwaukee, WI",
      initials: "MJ",
      photo: t1Asset.url,
      rating: 5,
      text: "Saved me $340 on a primary adjustment alone. The torque sheets alone are worth more than the price.",
    },
    {
      name: "Tom Harris",
      city: "Austin, TX",
      initials: "TH",
      photo: t2Asset.url,
      rating: 5,
      text: "Finally a manual that talks like a mechanic and not like a lawyer. Straight to the point.",
    },
    {
      name: "Dave Miller",
      city: "Phoenix, AZ",
      initials: "DM",
      photo: t3Asset.url,
      rating: 5,
      text: "Used the diagnostic reference to fix a check engine light the dealer wanted $180 to diagnose. Took me 20 minutes.",
    },
    {
      name: "Jake Peterson",
      city: "Columbus, OH",
      initials: "JP",
      photo: t4Asset.url,
      rating: 5,
      text: "The tool substitution guide saved me from buying $400 in special tools I didn't need. Game changer.",
    },
    {
      name: "Chris Barnes",
      city: "Charlotte, NC",
      initials: "CB",
      photo: t5Asset.url,
      rating: 5,
      text: "I'm not a pro but this made me confident enough to do my own cam tensioner inspection. Clear steps, no fluff.",
    },
    {
      name: "Ray Cooper",
      city: "Denver, CO",
      initials: "RC",
      photo: t6Asset.url,
      rating: 5,
      text: "Best $45 I've spent on my bike. Already used it three times in the first month. Pays for itself fast.",
    },
  ];

  return (
    <section className="border-b border-border bg-panel py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal-on-scroll mx-auto max-w-3xl text-center">
          <Eyebrow>Buyer stories</Eyebrow>
          <h2 className="font-headline text-4xl leading-[0.92] md:text-6xl">
            REAL OWNERS. REAL WRENCHES. REAL SAVINGS.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="reveal-on-scroll panel flex flex-col p-6"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-border">
                  <AvatarImage src={t.photo} alt={t.name} className="object-cover" />
                  <AvatarFallback className="bg-contrast text-contrast-foreground font-headline text-sm">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-headline text-base leading-none text-foreground">
                    {t.name}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {t.city}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                "{t.text}"
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Does it cover my Harley model?",
      answer:
        "The bundle is built around the platforms most owners ask about: Twin Cam, Milwaukee-Eight and Sportster families, with references organized for practical use instead of showroom marketing language.",
    },
    {
      question: "Is this for professionals only?",
      answer:
        "No. It is for owners who want solid information. Some jobs are beginner-friendly, others are not, and the material is designed to help you tell the difference before starting.",
    },
    {
      question: "Is it physical or digital?",
      answer:
        "Digital. You get immediate access after purchase and can read it on your phone, tablet or print selected pages for bench use.",
    },
    {
      question: "What if I do not own every special tool?",
      answer:
        "That is exactly why the substitution guide exists. It helps you identify what can be replaced, what can be improvised and what is actually worth buying.",
    },
  ];

  const [openItem, setOpenItem] = useState<number>(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="reveal-on-scroll text-center">
          <Eyebrow>Questions before checkout</Eyebrow>
          <h2 className="font-headline text-4xl leading-[0.92] md:text-6xl">
            STRAIGHT ANSWERS BEFORE YOU BUY.
          </h2>
        </div>

        <div className="reveal-on-scroll mt-10 panel overflow-hidden">
          {faqs.map((faq, index) => {
            const isOpen = openItem === index;

            return (
              <button
                key={faq.question}
                type="button"
                onClick={() => setOpenItem(isOpen ? -1 : index)}
                className="block w-full border-b border-border px-5 py-5 text-left last:border-b-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-headline text-xl leading-tight text-foreground md:text-2xl">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-primary" />
                  )}
                </div>
                {isOpen ? (
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MinimalFooter() {
  return (
    <footer className="border-t border-border bg-panel py-6">
      <div className="container mx-auto flex flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Technical digital product for Harley owners
        </div>
        <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}