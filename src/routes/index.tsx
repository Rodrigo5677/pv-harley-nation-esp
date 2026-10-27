import { createFileRoute } from "@tanstack/react-router";
import { type ComponentType, type ReactNode, useEffect, useState } from "react";
import {
  Battery,
  Check,
  ChevronDown,
  CircleDot,
  Cog,
  Disc,
  Download,
  Droplet,
  Flame,
  Gauge,
  Infinity as InfinityIcon,
  Lock,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  TriangleAlert,
  Wrench,
  Zap,
} from "lucide-react";
import heroHarley from "@/assets/hero-harley.jpg";
import manualMockup from "@/assets/manual-mockup.webp";
import phoneHomeAsset from "@/assets/app/phone-home.png.asset.json";
import phoneEngineAsset from "@/assets/app/phone-engine.png.asset.json";
import phoneSearchAsset from "@/assets/app/phone-search.png.asset.json";
import phoneHeatAsset from "@/assets/app/phone-heat.png.asset.json";
import t1Asset from "@/assets/testimonials/t1.png.asset.json";
import t4Asset from "@/assets/testimonials/t4.png.asset.json";
import t6Asset from "@/assets/testimonials/t6.png.asset.json";
import ExitIntentWheel from "@/components/ExitIntentWheel";
import { CHECKOUT, PRICES, fmtUsd, useGeo } from "@/lib/precio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manual de Longevidad Harley — Cuida tu moto como un veterano" },
      {
        name: "description",
        content:
          "El manual digital + app para dueños de Harley en México: lo que puedes hacer tú mismo para que tu moto pase de los 200,000 km como nueva.",
      },
      { property: "og:title", content: "Manual de Longevidad Harley" },
      {
        property: "og:description",
        content: "Cuida tu Harley como un veterano del camino. Manual digital + app, acceso inmediato.",
      },
    ],
  }),
  component: LandingPage,
});

const BRAND = "MANUAL HARLEY";

function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <Hero />
      <SixThings />
      <ContentSection />
      <CtaStrip />
      <AppSection />
      <Testimonials />
      <OfferSection />
      <Benefits />
      <Guarantee />
      <Faq />
      <Footer />
      <ExitIntentWheel />
    </div>
  );
}

function scrollToOffer() {
  document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" });
}

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-8 md:py-12 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: ReactNode; subtitle?: string }) {
  return (
    <div className="mx-auto mb-7 max-w-3xl text-center md:mb-14">
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-ember">
          <span className="h-px w-8 bg-ember" />
          {eyebrow}
          <span className="h-px w-8 bg-ember" />
        </div>
      )}
      <h2 className="font-display text-4xl font-bold leading-[0.95] md:text-6xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-sm gradient-ember">
        <Flame className="h-5 w-5 text-background" />
      </div>
      <span className={`font-display font-bold tracking-wider ${small ? "text-sm" : "text-lg"}`}>{BRAND}</span>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        <Logo />
        <button
          onClick={scrollToOffer}
          className="hidden items-center gap-2 rounded-sm border border-ember/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-ember transition hover:bg-ember hover:text-background md:inline-flex"
        >
          Quiero mi manual
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-20">
      <div className="absolute inset-0">
        <img
          src={heroHarley}
          alt="Harley en la carretera de noche"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="container relative mx-auto px-4 py-14 md:px-6 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-ember/40 bg-ember/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-ember">
            <Flame className="h-4 w-4" />
            Para dueños de Harley en México
          </div>
          <h1 className="font-display text-4xl font-bold leading-[0.95] md:text-7xl">
            Tu Harley como nueva <span className="text-ember">por más de 200,000 km</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-xl">
            El manual que te enseña a cuidar tu moto como un veterano del camino: lo que puedes hacer tú mismo en tu
            cochera y los errores que le quitan años de vida a tu V-Twin.
          </p>
          <button
            onClick={scrollToOffer}
            className="group mt-9 inline-flex items-center gap-3 rounded-sm gradient-ember px-8 py-5 font-display text-lg font-bold uppercase tracking-wider text-background shadow-glow transition hover:scale-105"
          >
            Quiero mi manual
            <Flame className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>
          <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
            Pago único · Acceso inmediato · Garantía de 7 días
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

const sixThings: { icon: ComponentType<{ className?: string }>; title: string; items: string[] }[] = [
  {
    icon: RotateCcw,
    title: "Reinicio del acelerador",
    items: [
      "Encendido en ON, motor apagado",
      "Gira el acelerador a fondo cinco veces",
      "En la quinta, sostenlo dos segundos",
      "Apaga el encendido y espera diez segundos",
    ],
  },
  {
    icon: Gauge,
    title: "Más potencia",
    items: [
      "Filtro de aire de alto flujo: +2–3 HP",
      "Mofles slip-on: hasta +5 HP",
      "La afinación (tuner) siempre va AL FINAL",
      "Solo piezas que cumplan la norma de emisiones",
    ],
  },
  {
    icon: CircleDot,
    title: "Presión de llantas",
    items: [
      "Revísala siempre en frío, nunca en caliente",
      "El número del costado es la presión MÁXIMA",
      "Delantera y trasera nunca llevan la misma",
      "Reajusta si llevas pasajero o equipaje",
    ],
  },
  {
    icon: Droplet,
    title: "Cambio de aceite",
    items: [
      "Calienta el motor y luego drena",
      "Cambia el filtro de aceite siempre",
      "Unta un poco de aceite en el empaque del filtro",
      "No olvides el aceite de la primaria — tiene su propio intervalo",
    ],
  },
  {
    icon: Disc,
    title: "Líquido de frenos",
    items: [
      "Se cambia por tiempo: cada dos años",
      "Revisa la mirilla: si está café, ya toca",
      "Con 3% de agua, el punto de ebullición se desploma",
      "Purga siempre en el orden correcto",
    ],
  },
  {
    icon: Battery,
    title: "Batería y moto parada",
    items: [
      "La electrónica consume batería aunque la moto no se use",
      "Debajo de 12.4 V empieza la sulfatación",
      "Si no la usas por semanas, conéctale un mantenedor de carga",
      "Llena el tanque y agrega estabilizador",
    ],
  },
];

function SixThings() {
  return (
    <section className="relative bg-background py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold uppercase leading-tight md:text-5xl">
            Seis cosas que puedes hacer tú mismo
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Todas las especificaciones están en el manual, por modelo y año.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {sixThings.map(({ icon: Icon, title, items }) => (
            <div key={title} className="rounded-sm border border-border bg-card/60 p-6">
              <Icon className="h-7 w-7 text-ember" />
              <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide">{title}</h3>
              <ul className="mt-3 space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-muted-foreground">
                    <span className="text-ember">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-ember">
          Las especificaciones exactas de tu modelo y año están en el manual.
        </p>
      </div>
    </section>
  );
}

const modules = [
  { icon: Zap, n: "01", title: "Motor V-Twin", text: "Cuidados específicos para el corazón de tu Harley." },
  { icon: Droplet, n: "02", title: "Cambio de aceite correcto", text: "Tipo, intervalo y la técnica que pocos conocen." },
  { icon: Cog, n: "03", title: "Mantenimiento eléctrico", text: "Diagnóstico y prevención de fallas eléctricas." },
  { icon: Gauge, n: "04", title: "Suspensión y llantas", text: "Presión, balanceo y cambio en el momento justo." },
  { icon: Battery, n: "05", title: "Cuidado de la batería", text: "Cómo hacer que tu batería dure el doble." },
  { icon: TriangleAlert, n: "06", title: "Errores fatales", text: "Los 7 errores que le quitan la mitad de la vida a tu moto." },
  { icon: Sparkles, n: "07", title: "Preservación premium", text: "Técnicas de detallado y protección." },
  {
    icon: ShieldCheck,
    n: "08",
    title: "Evita el desgaste prematuro",
    text: "El ritual de quienes mantienen su Harley como nueva por décadas.",
  },
];

function ContentSection() {
  return (
    <Section id="content" className="bg-background">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-ember/20 blur-[120px]" />
          <img
            src={manualMockup}
            alt="Portada del manual"
            loading="lazy"
            width={1200}
            height={1900}
            className="mx-auto w-full max-w-md drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          />
        </div>
        <div>
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-ember">
            <span className="h-px w-8 bg-ember" />
            Arsenal completo
          </div>
          <h2 className="mb-4 font-display text-4xl font-bold leading-[0.95] md:text-5xl">Todo lo que trae el manual</h2>
          <p className="mb-10 text-muted-foreground md:text-lg">
            8 módulos directos al grano. Cada ficha técnica resume años de taller, miles de kilómetros y lo que los
            talleres no quieren que sepas.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {modules.map((m) => (
              <div
                key={m.title}
                className="group flex items-start gap-4 rounded-sm border border-border bg-card/50 p-4 transition hover:border-ember/50 hover:bg-card"
              >
                <div className="font-display text-2xl font-bold text-ember/40 transition group-hover:text-ember">
                  {m.n}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <m.icon className="h-4 w-4 text-ember" />
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider">{m.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function CtaStrip() {
  return (
    <section className="bg-background py-10 md:py-14">
      <div className="container mx-auto flex justify-center px-4 md:px-6">
        <button
          onClick={scrollToOffer}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-sm gradient-ember px-8 py-5 font-display text-lg font-bold uppercase tracking-wider text-background shadow-glow transition hover:scale-105"
        >
          Quiero mi paquete ahora
          <Flame className="h-5 w-5 transition group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

function AppSection() {
  const screens = [
    { img: phoneHomeAsset.url, caption: "La Biblia Harley — todas las categorías en un solo lugar." },
    { img: phoneEngineAsset.url, caption: "190+ guías a fondo organizadas por tema." },
    { img: phoneSearchAsset.url, caption: "Búsqueda instantánea de cada solución y consejo." },
    { img: phoneHeatAsset.url, caption: "Soluciones paso a paso con advertencias claras." },
  ];

  return (
    <Section id="app" className="relative bg-background">
      <div className="absolute inset-x-0 top-1/3 -z-10 h-80 bg-ember/10 blur-[140px]" />
      <SectionTitle
        eyebrow="Bono incluido"
        title="La app definitiva para dueños de Harley"
        subtitle="No hay que instalar nada. Ábrela en cualquier celular, cuando quieras — hecha para todos los modelos Harley."
      />
      <div className="mx-auto mb-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["Sin instalar nada", "190+ temas", "Funciona en cualquier celular", "Todos los modelos Harley"].map((t) => (
          <div key={t} className="flex items-center gap-3 rounded-sm border border-border bg-card/60 px-4 py-3">
            <Check className="h-4 w-4 shrink-0 text-ember" />
            <span className="font-display text-xs font-bold uppercase tracking-wider">{t}</span>
          </div>
        ))}
      </div>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {screens.map((s) => (
          <div key={s.caption} className="group flex flex-col items-center text-center">
            <div className="relative w-full">
              <div className="absolute inset-x-6 bottom-2 -z-10 h-12 rounded-full bg-ember/30 blur-2xl transition group-hover:bg-ember/50" />
              <div className="relative mx-auto w-full max-w-[260px] rounded-[32px] border-[10px] border-[#1a1a1a] bg-[#0a0a0a] p-1 drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] transition duration-500 group-hover:-translate-y-2">
                <div className="absolute left-1/2 top-0 z-10 h-[18px] w-[90px] -translate-x-1/2 rounded-b-xl bg-[#1a1a1a]" />
                <img src={s.img} alt={s.caption} loading="lazy" className="w-full rounded-[22px] object-contain" />
              </div>
            </div>
            <p className="mt-6 max-w-[240px] text-sm font-medium text-muted-foreground">{s.caption}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const testimonials = [
  {
    name: "Javier R.",
    role: "Monterrey, N.L.",
    img: t1Asset.url,
    text: "Me ahorré una lana solo por dejar de cometer un error sencillo que llevaba años haciendo. El manual se paga solo cien veces.",
  },
  {
    name: "Ricardo M.",
    role: "Ciudad de México",
    img: t4Asset.url,
    text: "Mi Harley quedó mucho más confiable después de aplicar los consejos del manual. Otro sonido, otra manera de rodar.",
  },
  {
    name: "Fernando L.",
    role: "Guadalajara, Jal.",
    img: t6Asset.url,
    text: "Directo al grano, sin relleno y muy útil. Es justo lo que le faltaba a quien se toma en serio su moto.",
  },
];

function Testimonials() {
  return (
    <Section id="testimonials" className="brushed-steel grain">
      <SectionTitle eyebrow="Hermandad del camino" title="Quien lo lee nunca vuelve a ver su Harley igual" />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-sm border border-border bg-card p-7 transition hover:border-ember/60 hover:shadow-card"
          >
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-ember text-ember" />
              ))}
            </div>
            <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground/90 md:text-base">"{t.text}"</p>
            <div className="flex items-center gap-4 border-t border-border pt-5">
              <img
                src={t.img}
                alt={t.name}
                loading="lazy"
                width={64}
                height={64}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-ember/40"
              />
              <div>
                <div className="font-display text-sm font-bold uppercase tracking-wider">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Countdown() {
  const [secondsLeft, setSecondsLeft] = useState(180);
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const urgent = secondsLeft <= 20;

  return (
    <div className="relative border-b border-ember/30 bg-card px-4 py-5 text-center">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-ember/10 to-transparent" />
      <div className="relative">
        <div
          className={`mb-1 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.3em] ${urgent ? "text-destructive" : "text-ember"}`}
        >
          <Timer className="h-4 w-4" />
          La oferta termina en
        </div>
        <div
          className={`font-display text-5xl font-bold tabular-nums leading-none tracking-tight md:text-6xl ${urgent ? "text-destructive" : "text-foreground"}`}
        >
          {mm}:{ss}
        </div>
        <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Minutos y segundos
        </div>
      </div>
    </div>
  );
}

/** "1,580" — separador de milhar do México */
function mxn(n: number) {
  return n.toLocaleString("es-MX");
}

function OfferSection() {
  const geo = useGeo("MX");
  const usd = PRICES.bundle.a;
  const sale = geo.localValue(usd) ?? Math.round(usd * 18.5);
  const original = geo.localValue(usd * 2) ?? Math.round(usd * 2 * 18.5);
  const features = [
    { icon: InfinityIcon, t: "Acceso de por vida al libro + la app" },
    { icon: Download, t: "Actualizaciones futuras gratis" },
    { icon: Zap, t: "Descarga inmediata después de la compra" },
    { icon: ShieldCheck, t: "Garantía incondicional de 7 días" },
  ];

  return (
    <Section id="offer" className="relative bg-background">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-96 -translate-y-1/2 bg-ember/15 blur-[140px]" />
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-sm border border-ember/40 bg-ember/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-ember">
            <Flame className="h-4 w-4" /> Oferta por tiempo limitado
          </div>
        </div>
        <h2 className="text-center font-display text-4xl font-bold leading-[0.95] md:text-6xl">
          Oferta especial <span className="text-ember">por tiempo limitado</span>
        </h2>

        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-lg overflow-hidden rounded-md border-2 border-ember/60 bg-card shadow-glow ring-1 ring-ember/30">
            <Countdown />

            <div className="relative border-b border-ember/30 bg-ember px-6 py-4 text-center">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="relative font-display text-2xl font-bold uppercase tracking-wider text-background md:text-3xl">
                Combo libro + app
              </div>
              <div className="relative mt-1 text-sm font-semibold uppercase tracking-widest text-background/90">
                Te llevas los dos. Pagas uno.
              </div>
            </div>

            <div className="border-b border-border gradient-steel p-8 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-sm border border-ember/40 bg-background/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-ember">
                Paquete completo incluido
              </div>
              <div className="mb-3 font-display text-2xl font-bold uppercase tracking-widest text-muted-foreground line-through md:text-3xl">
                ${mxn(original)} MXN
              </div>
              <div className="mb-1 inline-flex items-center gap-2 rounded-full bg-ember/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-ember">
                <span className="h-2 w-2 animate-pulse rounded-full bg-ember" />
                Ahorras ${mxn(original - sale)}
              </div>
              <div className="flex items-end justify-center gap-2">
                <span className="font-display text-2xl text-ember">$</span>
                <span className="font-display text-7xl font-bold leading-none md:text-8xl">{mxn(sale)}</span>
                <span className="mb-2 font-display text-xl text-muted-foreground">MXN</span>
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                Pago único · Sin suscripción
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                ≈ {fmtUsd(usd).full} · el monto exacto en pesos lo ves en la página de pago
              </div>
            </div>

            <div className="p-8 md:p-10">
              <ul className="mb-8 space-y-4">
                {features.map((f) => (
                  <li key={f.t} className="flex items-center gap-3 text-foreground/90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-ember/15 text-ember">
                      <f.icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{f.t}</span>
                  </li>
                ))}
              </ul>
              <a
                href={CHECKOUT.bundle.a}
                target="_blank"
                rel="noopener noreferrer"
                className="group glow-pulse relative flex w-full items-center justify-center gap-3 rounded-sm gradient-ember px-8 py-6 font-display text-xl font-bold uppercase tracking-widest text-background transition hover:scale-[1.02]"
              >
                <Lock className="h-5 w-5" />
                Desbloquear mi combo
              </a>
              <div className="mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-ember" />
                Compra 100% segura · Acceso inmediato
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const benefits = [
  {
    icon: TriangleAlert,
    title: "Evita problemas caros",
    text: "Detecta las señales de alerta antes de que se conviertan en cuentas de taller.",
  },
  { icon: Flame, title: "Errores que destruyen motores", text: "Los hábitos silenciosos que matan tu V-Twin antes de tiempo." },
  { icon: Wrench, title: "Mantenimiento preventivo sencillo", text: "Rutinas que cualquier dueño puede hacer en su cochera." },
  { icon: Timer, title: "Más durabilidad", text: "Triplica la vida de los componentes críticos." },
];

function Benefits() {
  return (
    <Section id="benefits" className="brushed-steel grain">
      <SectionTitle
        eyebrow="Lo que está en juego"
        title="Lo que ganas con este manual"
        subtitle="Conocimiento probado por veteranos del camino. El resultado: una máquina que sigue fuerte por décadas."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b, i) => (
          <div
            key={b.title}
            className="group relative overflow-hidden rounded-sm border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-ember/60 hover:shadow-glow"
          >
            <div className="absolute -right-8 -top-8 font-display text-7xl font-bold text-ember/5 transition group-hover:text-ember/10">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-ember/30 bg-ember/10 text-ember transition group-hover:bg-ember group-hover:text-background">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Guarantee() {
  return (
    <Section id="guarantee" className="bg-background">
      <div className="brushed-steel mx-auto flex max-w-4xl flex-col items-center gap-10 rounded-md border border-border p-10 md:flex-row md:p-14">
        <div className="relative shrink-0">
          <div className="absolute inset-0 -z-10 rounded-full bg-ember/30 blur-2xl" />
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-ember bg-background">
            <div className="text-center">
              <div className="font-display text-4xl font-bold leading-none text-ember">7</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-foreground">Días</div>
            </div>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="mb-3 font-display text-3xl font-bold md:text-4xl">Garantía total de 7 días</h3>
          <p className="text-muted-foreground md:text-lg">
            Lee el manual, aplica los consejos y, si no te sirve, te devolvemos el 100% de tu dinero. Sin preguntas y sin
            trámites. Todo el riesgo es nuestro.
          </p>
        </div>
      </div>
    </Section>
  );
}

const faqs = [
  {
    q: "¿Sirve para cualquier modelo de Harley?",
    a: "Sí. El manual cubre Sportster, Softail, Touring, Dyna y Street — los principios de longevidad aplican a cualquier V-Twin de Harley.",
  },
  {
    q: "¿El manual es físico o digital?",
    a: "100% digital. Lo abres en tu celular, tablet o computadora en cuanto compras — sin esperar envíos.",
  },
  {
    q: "¿El acceso es inmediato?",
    a: "Sí. En cuanto se confirma el pago, el acceso llega a tu correo.",
  },
  {
    q: "¿Necesito saber de mecánica?",
    a: "No. Todo está explicado en español sencillo. Hasta un principiante puede aplicar las técnicas.",
  },
  {
    q: "¿Puedo verlo en mi celular?",
    a: "Sí. El manual se adapta a cualquier dispositivo — llévalo contigo a la cochera.",
  },
  {
    q: "¿Cuánto pago en pesos?",
    a: "El precio en pesos de esta página es aproximado y cambia con el tipo de cambio del día. El monto exacto aparece en la página de pago antes de que confirmes.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-background">
      <SectionTitle eyebrow="Preguntas frecuentes" title="Antes de salir a rodar" />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="overflow-hidden rounded-sm border border-border bg-card">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-secondary"
              >
                <span className="font-display text-base font-bold uppercase tracking-wider md:text-lg">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-ember transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground md:text-base">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background pb-8 pt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 font-display text-3xl font-bold tracking-wider md:text-5xl">
            RUEDA MÁS LEJOS. <span className="text-ember">RUEDA MÁS FUERTE.</span>
          </div>
          <div className="mx-auto h-px w-24 bg-ember" />
        </div>
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Logo small />
          <nav className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest text-muted-foreground">
            <a href="#" className="transition hover:text-ember">
              Términos de uso
            </a>
            <a href="#" className="transition hover:text-ember">
              Aviso de privacidad
            </a>
            <a href="#" className="transition hover:text-ember">
              Contacto
            </a>
          </nav>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Manual de Longevidad Harley · Todos los derechos reservados.
          <div className="mt-2 text-[10px]">
            Producto independiente. Sin afiliación con Harley-Davidson Motor Company.
          </div>
        </div>
      </div>
    </footer>
  );
}
