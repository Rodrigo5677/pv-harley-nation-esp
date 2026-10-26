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
import { CHECKOUT, OLD_PRICES, PRICES, fmtUsd, useGeo } from "@/lib/precio";
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
      { title: "El Búnker del Mecánico Harley | Paquete de Manuales de Taller" },
      {
        name: "description",
        content:
          "Un búnker técnico de reparación Harley creado para dueños que quieren especificaciones reales, diagnósticos, tablas de torque y guías para ahorrar en el concesionario.",
      },
      {
        property: "og:title",
        content: "El Búnker del Mecánico Harley",
      },
      {
        property: "og:description",
        content:
          "Referencias técnicas de reparación Harley, atajos de diagnóstico y manuales de taller para ahorrar costos en un solo búnker digital.",
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
              Archivo de taller
            </span>
            <span className="font-mono">Producto digital • acceso inmediato</span>
          </div>

          <h1 className="max-w-4xl font-headline text-5xl leading-[0.9] text-foreground md:text-7xl lg:text-[5.5rem]">
            DEJA DE PAGAR
            <br />
            PRECIOS DE CONCESIONARIO
            <br />
            POR TRABAJOS DE GARAJE.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            <strong className="font-semibold text-foreground">El Búnker del Mecánico Harley</strong> es un
            paquete con nivel de taller que reúne referencias de reparación, tablas de torque, atajos de
            diagnóstico y desgloses de costos del concesionario creado para dueños que de verdad meten mano
            a sus motos.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              "4 manuales técnicos organizados por reparaciones reales",
              "Diseñado para usar en el banco de trabajo, leer en el celular y consultar al instante",
              "Hecho para eliminar gastos inútiles, adivinanzas y sobreprecios del concesionario",
            ].map((item) => (
              <div key={item} className="info-chip">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#pricing" className="button-cta">
              Obtener el búnker ahora
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="reveal-on-scroll space-y-4">
          <div className="panel overflow-hidden">
            <div className="panel-topline" />
            <img
              src={workshopHero}
              alt="Motor Harley desarmado sobre un banco de taller bajo iluminación de trabajo"
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
    "SIN TURNO EN EL CONCESIONARIO",
    "SIN ADIVINAR EL TORQUE",
    "SIN PAGAR US$ 150 POR UN DIAGNÓSTICO BÁSICO",
    "SIN PÁNICO POR HERRAMIENTAS ESPECIALES",
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
      title: "Mano de obra inflada",
      text: "Muchos dueños de Harley pagan tarifas exageradas en el taller por reparaciones que se vuelven muy manejables cuando tienes el proceso explicado paso a paso.",
    },
    {
      icon: Gauge,
      title: "Confusión de especificaciones",
      text: "La mayoría no se frena por falta de ganas. Se frena porque los valores de torque, las rutas de diagnóstico y las secuencias están dispersos por todos lados.",
    },
    {
      icon: TriangleAlert,
      title: "Intimidación con herramientas",
      text: "El concesionario hace que trabajos de rutina parezcan imposibles sin una pared llena de herramientas especiales. Este búnker te muestra qué importa, qué se puede sustituir y qué ignorar.",
    },
  ];

  return (
    <section className="border-b border-border py-16 md:py-24 grid-floor">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal-on-scroll max-w-3xl">
          <Eyebrow>Por qué la mayoría paga de más</Eyebrow>
          <h2 className="font-headline text-4xl leading-[0.92] md:text-6xl">
            NO SE TRATA DE PARECER MECÁNICO. SE TRATA DE TENER LA INFORMACIÓN CORRECTA ANTES DE ABRIR LA MOTO.
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
      title: "Referencia de Diagnóstico",
      text: "Lectura por combinación de botones, interpretación de códigos, procedimientos de reinicio y rutas de solución de fallas sin rodeos según tu plataforma.",
    },
    {
      number: "02",
      title: "Tablas Maestras de Torque",
      text: "Valores críticos de apriete agrupados por trabajo real para que no tengas que buscar página por página en medio de una reparación.",
    },
    {
      number: "03",
      title: "Archivos de Sobreprecio del Concesionario",
      text: "Un mapa práctico de lo que cobran los talleres, lo que realmente cuestan los repuestos y qué trabajos vale la pena hacer tú mismo.",
    },
    {
      number: "04",
      title: "Guía de Sustitución de Herramientas",
      text: "Muestra qué herramientas especiales son indispensables, cuáles se pueden reemplazar y cómo trabajar con inteligencia usando herramientas comunes de garaje.",
    },
  ];

  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div>
            <div className="reveal-on-scroll max-w-3xl">
              <Eyebrow>Lo que realmente recibes</Eyebrow>
              <h2 className="font-headline text-4xl leading-[0.92] md:text-6xl">
                UN BÚNKER DE REPARACIÓN ESTRUCTURADO COMO UN BANCO DE TRABAJO, NO COMO UN FOLLETO DE VENTAS.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {manuals.map((manual) => (
                <article key={manual.number} className="reveal-on-scroll panel p-6">
                  <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                    <span className="font-headline text-4xl leading-none text-primary">{manual.number}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                      Manual incluido
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
              Vista previa del paquete
            </div>
            <div className="p-5">
              <img
                src={vaultBundle}
                alt="Vista previa del paquete digital de manuales El Búnker del Mecánico Harley"
                width={1200}
                height={1200}
                loading="lazy"
                className="w-full"
              />
            </div>
            <div className="grid gap-px border-t border-border bg-border">
              {[
                ["Cobertura", "Twin Cam, M8, Sportster"],
                ["Uso", "Celular + impresiones de taller"],
                ["Acceso", "Inmediato tras la compra"],
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
            Desbloquear mi acceso ahora
          </a>
        </div>
      </div>
    </section>
  );
}

function EvidenceSection() {
  const badges = ["Sin instalar nada", "190+ temas", "Funciona en cualquier celular", "Todos los modelos Harley"];

  return (
    <section className="border-b border-border bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal-on-scroll mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-8 bg-primary" />
            Bono incluido
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2 className="mt-6 font-headline text-4xl leading-[0.92] md:text-6xl">
            LA APP DEFINITIVA PARA DUEÑOS DE HARLEY
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Sin necesidad de instalación. Ábrela en cualquier celular, en cualquier momento — creada para cada modelo Harley.
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
            { src: phoneHomeAsset.url, caption: "La Biblia Harley — todas las categorías en un solo lugar." },
            { src: phoneEngineAsset.url, caption: "190+ guías a fondo organizadas por tema." },
            { src: phoneSearchAsset.url, caption: "Búsqueda instantánea de cada solución y consejo." },
            { src: phoneHeatAsset.url, caption: "Soluciones paso a paso con advertencias claras." },
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
            Obtener la app + el búnker
          </a>
        </div>
      </div>
    </section>
  );
}


function ComparisonSection() {
  const rows = [
    ["Sesión de diagnóstico básico", "US$ 150+", "US$ 0 después de descargar"],
    ["Ajuste de primaria", "US$ 120", "Hazlo tú mismo"],
    ["Reparación de levas / tensores", "US$ 1.800+", "Repuestos + guía paso a paso"],
    ["Compra compulsiva de herramientas", "US$ 2.000+ con el tiempo", "Compra solo lo necesario"],
  ];

  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal-on-scroll max-w-3xl">
          <Eyebrow>Perspectiva de costos</Eyebrow>
          <h2 className="font-headline text-4xl leading-[0.92] md:text-6xl">
            UNA PEQUEÑA COMPRA DIGITAL PUEDE AHORRARTE MILES EN MALOS HÁBITOS DE TALLER.
          </h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="reveal-on-scroll panel overflow-hidden">
            <div className="grid grid-cols-3 border-b border-border bg-contrast text-[11px] uppercase tracking-[0.25em] text-contrast-foreground">
              <div className="px-5 py-4 font-mono">Trabajo</div>
              <div className="px-5 py-4 font-mono">Concesionario</div>
              <div className="px-5 py-4 font-mono">Ruta del Búnker</div>
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
            <div className="stat-label">Potencial de ahorro estimado</div>
            <div className="mt-3 font-headline text-7xl leading-none text-primary">US$ 3,4K+</div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Para muchos dueños, evitar una o dos visitas al concesionario ya cubre de sobra toda la compra.
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
  const geo = useGeo();
  const pr = (k: "app" | "book" | "bundle") => fmtUsd(PRICES[k][geo.tier]);
  const tiers = [
    {
      id: "app",
      label: "SOLO LA APP",
      name: "LA APP",
      oldPrice: fmtUsd(OLD_PRICES.app).full,
      priceWhole: pr("app").whole,
      priceCents: pr("app").cents,
      local: geo.local(PRICES.app[geo.tier]),
      tagline: "190+ GUÍAS EN TU BOLSILLO",
      features: [
        { icon: "zap", text: "Acceso completo a la app Harley" },
        { icon: "infinity", text: "190+ guías detalladas a fondo" },
        { icon: "download", text: "Funciona en cualquier celular — sin instalar" },
        { icon: "shield", text: "Garantía de 7 días" },
      ],
      cta: "OBTENER LA APP",
      href: CHECKOUT.app[geo.tier],
      featured: false,
    },
    {
      id: "book",
      label: "SOLO EL LIBRO",
      name: "EL MANUAL",
      oldPrice: fmtUsd(OLD_PRICES.book).full,
      priceWhole: pr("book").whole,
      priceCents: pr("book").cents,
      local: geo.local(PRICES.book[geo.tier]),
      tagline: "EL LIBRO DIGITAL COMPLETO",
      features: [
        { icon: "download", text: "Manual digital completo" },
        { icon: "infinity", text: "Acceso de por vida" },
        { icon: "zap", text: "Descarga inmediata" },
        { icon: "shield", text: "Garantía de 7 días" },
      ],
      cta: "OBTENER EL LIBRO",
      href: CHECKOUT.book[geo.tier],
      featured: false,
    },
    {
      id: "bundle",
      label: "EL PRECIO ESPECIAL TERMINA EN",
      badge: "MÁS VENDIDO",
      name: "LIBRO + APP",
      oldPrice: fmtUsd(OLD_PRICES.bundle).full,
      priceWhole: pr("bundle").whole,
      priceCents: pr("bundle").cents,
      local: geo.local(PRICES.bundle[geo.tier]),
      tagline: "OFERTA ESPECIAL — SOLO POR HOY",
      features: [
        { icon: "download", text: "Manual digital completo" },
        { icon: "zap", text: "Acceso completo a la app Harley" },
        { icon: "infinity", text: "Acceso de por vida y actualizaciones gratis" },
        { icon: "shield", text: "Garantía incondicional de 7 días" },
      ],
      cta: "DESBLOQUEAR EL PAQUETE COMPLETO",
      href: CHECKOUT.bundle[geo.tier],
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
                      US$
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

                  {tier.local ? (
                    <div className={featured ? "mt-2 font-mono text-xs text-white/80" : "mt-2 font-mono text-xs text-muted-foreground"}>
                      {tier.local} en tu moneda
                    </div>
                  ) : null}

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
      name: "Javier R.",
      city: "Monterrey, MX",
      initials: "JR",
      photo: t1Asset.url,
      rating: 5,
      text: "Me ahorró US$ 340 solo en el ajuste de la primaria. Las tablas de torque por sí solas ya valen mucho más de lo que cuesta.",
    },
    {
      name: "Andrés P.",
      city: "Medellín, CO",
      initials: "AP",
      photo: t2Asset.url,
      rating: 5,
      text: "Por fin un manual que te habla como mecánico y no como abogado. Directo al grano y sin vueltas.",
    },
    {
      name: "Martín G.",
      city: "Córdoba, AR",
      initials: "MG",
      photo: t3Asset.url,
      rating: 5,
      text: "Usé la guía de diagnóstico para resolver una luz de check engine por la que el concesionario me quería cobrar US$ 180 solo por escanear. Lo solucioné en 20 minutos.",
    },
    {
      name: "Carlos V.",
      city: "Santiago, CL",
      initials: "CV",
      photo: t4Asset.url,
      rating: 5,
      text: "La guía de sustitución de herramientas me salvó de gastar US$ 400 en herramientas especiales que no necesitaba. Una joya para el garaje.",
    },
    {
      name: "Diego M.",
      city: "Lima, PE",
      initials: "DM",
      photo: t5Asset.url,
      rating: 5,
      text: "No soy mecánico profesional, pero esto me dio la seguridad para hacer yo mismo la revisión de los tensores de distribución a los 40.000 km. Pasos claros, sin relleno.",
    },
    {
      name: "Fernando L.",
      city: "Guadalajara, MX",
      initials: "FL",
      photo: t6Asset.url,
      rating: 5,
      text: "Los mejores US$ 42,50 que he invertido en mi moto. Ya lo usé tres veces en el primer mes. Se paga solo rapidísimo.",
    },
  ];

  return (
    <section className="border-b border-border bg-panel py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal-on-scroll mx-auto max-w-3xl text-center">
          <Eyebrow>Historias de compradores</Eyebrow>
          <h2 className="font-headline text-4xl leading-[0.92] md:text-6xl">
            DUEÑOS REALES. HERRAMIENTAS REALES. AHORROS REALES.
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
      question: "¿Cubre mi modelo de Harley?",
      answer:
        "El paquete está armado sobre las plataformas que más tienen los motociclistas: familias Twin Cam, Milwaukee-Eight y Sportster, con referencias organizadas para el uso práctico en el garaje y no con lenguaje de catálogo.",
    },
    {
      question: "¿Esto es solo para mecánicos profesionales?",
      answer:
        "No. Es para dueños que quieren información sólida y confiable. Algunos trabajos son sencillos para principiantes y otros no; el material está diseñado para ayudarte a notar la diferencia antes de desarmar.",
    },
    {
      question: "¿El material es físico o digital?",
      answer:
        "Digital. Obtienes acceso inmediato después de la compra y puedes leerlo en tu celular, tablet o imprimir las páginas que necesites para tenerlas en el banco de trabajo.",
    },
    {
      question: "¿Qué pasa si no tengo todas las herramientas especiales?",
      answer:
        "Exactamente por eso existe la guía de sustitución. Te ayuda a identificar qué se puede reemplazar, qué se puede improvisar de forma segura y qué herramienta vale la pena comprar de verdad.",
    },
  ];

  const [openItem, setOpenItem] = useState<number>(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="reveal-on-scroll text-center">
          <Eyebrow>Preguntas antes de comprar</Eyebrow>
          <h2 className="font-headline text-4xl leading-[0.92] md:text-6xl">
            RESPUESTAS DIRECTAS ANTES DE TU COMPRA.
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
          Producto digital técnico para dueños de Harley • Publicación independiente no afiliada a Harley-Davidson
        </div>
        <div className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Soporte</a>
        </div>
      </div>
    </footer>
  );
}
