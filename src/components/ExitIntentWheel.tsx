import { useEffect, useRef, useState } from "react";
import { X, Flame, Lock } from "lucide-react";
import { CHECKOUT, PRICES, fmtUsd, useGeo } from "@/lib/precio";

const SESSION_KEY = "harley_vault_exit_wheel_shown";

const segments = [
  { label: "5%", color: "#F47216" },
  { label: "10%", color: "#2563eb" },
  { label: "15%", color: "#16a34a" },
  { label: "20%", color: "#dc2626" },
  { label: "25%", color: "#F47216" },
  { label: "50%", color: "#2563eb" },
];

export default function ExitIntentWheel() {
  const geo = useGeo();
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(600);
  const triggeredRef = useRef(false);
  const ignoreNextPopRef = useRef(false);

  // Triggers
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const trigger = () => {
      if (triggeredRef.current) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;
      triggeredRef.current = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    };

    // Trigger 1: mouse leaves viewport from the top
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      if (e.clientY <= 5) trigger();
    };
    document.addEventListener("mouseout", onMouseOut);

    // Trigger 1b: visibility change
    const onVisibility = () => {
      if (document.visibilityState === "hidden") trigger();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Trigger 1c: page hide
    const onPageHide = () => trigger();
    window.addEventListener("pagehide", onPageHide);

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href")?.trim();
      if (!href) return;

      const isHashLink = href.startsWith("#");
      const isSamePageLink = href.startsWith(`${window.location.pathname}#`);

      if (isHashLink || isSamePageLink) {
        ignoreNextPopRef.current = true;
        window.setTimeout(() => {
          ignoreNextPopRef.current = false;
        }, 800);
      }
    };
    document.addEventListener("click", onDocumentClick, true);

    // Trigger 2: back button — only fire when user goes back PAST our guard
    window.history.pushState({ __exitGuard: true }, "");
    const onPopState = (e: PopStateEvent) => {
      if (triggeredRef.current) return;
      if (ignoreNextPopRef.current) {
        window.history.pushState({ __exitGuard: true }, "");
        return;
      }
      // If we're landing back on our guard state (e.g. user clicked a #anchor
      // and then pressed back), just re-push and ignore.
      if (e.state && (e.state as { __exitGuard?: boolean }).__exitGuard) {
        window.history.pushState({ __exitGuard: true }, "");
        return;
      }
      trigger();
      window.history.pushState({ __exitGuard: true }, "");
    };
    window.addEventListener("popstate", onPopState);

    // Keep the guard on top of the stack whenever the user navigates within
    // the page (hash links, etc.) so back-button still has to cross it.
    const onHashChange = () => {
      window.history.pushState({ __exitGuard: true }, "");
    };
    window.addEventListener("hashchange", onHashChange);


    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onHashChange);
      
    };
  }, []);

  // Countdown after win
  useEffect(() => {
    if (!won) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [won]);

  const close = () => setOpen(false);

  const spin = () => {
    if (spinning || won) return;
    setSpinning(true);
    const targetMod = 210;
    const fullSpins = 6;
    const finalRotation =
      rotation - (rotation % 360) + fullSpins * 360 + targetMod;
    setRotation(finalRotation);
    setTimeout(() => {
      setSpinning(false);
      setWon(true);
    }, 4000);
  };

  // Auto-spin when popup opens
  useEffect(() => {
    if (open && !spinning && !won) {
      const t = setTimeout(() => spin(), 500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#F47216]/40 bg-[#0a0a0a]/95 p-6 md:p-8 shadow-[0_30px_80px_-20px_rgba(244,114,22,0.5)]">
        <button
          onClick={close}
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 transition hover:border-[#F47216] hover:text-[#F47216]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-sm border border-[#F47216]/40 bg-[#F47216]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#F47216]">
            <Flame className="h-3.5 w-3.5" />
            {won ? "¡Ganaste!" : "Oferta exclusiva"}
          </div>
        </div>

        {!won ? (
          <h2 className="mb-6 text-center text-3xl md:text-4xl font-black uppercase leading-tight text-white">
            Gira para Ganar <span className="text-[#F47216]">Tu Descuento</span>
          </h2>
        ) : (
          <h2 className="mb-3 text-center text-3xl md:text-4xl font-black uppercase leading-tight text-white">
            Ganaste <span className="text-[#F47216]">50% OFF</span> en El Búnker
          </h2>
        )}

        {/* Wheel */}
        <div className="relative mx-auto mb-6 aspect-square w-64 max-w-full">
          <div className="absolute inset-0 rounded-full bg-[#F47216]/20 blur-2xl" />
          <svg
            viewBox="0 0 200 200"
            className="relative h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4s cubic-bezier(0.17, 0.67, 0.21, 1)"
                : "none",
            }}
          >
            {segments.map((seg, i) => {
              const start = (i * 60 - 90) * (Math.PI / 180);
              const end = ((i + 1) * 60 - 90) * (Math.PI / 180);
              const x1 = 100 + 100 * Math.cos(start);
              const y1 = 100 + 100 * Math.sin(start);
              const x2 = 100 + 100 * Math.cos(end);
              const y2 = 100 + 100 * Math.sin(end);
              const path = `M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`;
              const mid = ((i + 0.5) * 60 - 90) * (Math.PI / 180);
              const tx = 100 + 62 * Math.cos(mid);
              const ty = 100 + 62 * Math.sin(mid);
              const rot = i * 60 + 30;
              return (
                <g key={i}>
                  <path d={path} fill={seg.color} stroke="#0a0a0a" strokeWidth="1.5" />
                  <text
                    x={tx}
                    y={ty}
                    fill="#fff"
                    fontSize="16"
                    fontWeight="800"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${rot} ${tx} ${ty})`}
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {seg.label}
                  </text>
                </g>
              );
            })}
            <circle cx="100" cy="100" r="12" fill="#0a0a0a" stroke="#F47216" strokeWidth="3" />
          </svg>

          {/* Pointer */}
          <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2">
            <div
              className="h-0 w-0"
              style={{
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderBottom: "18px solid #F47216",
                filter: "drop-shadow(0 -2px 4px rgba(0,0,0,0.5))",
              }}
            />
          </div>
        </div>

        {!won ? (
          <button
            onClick={spin}
            disabled={spinning}
            className="relative flex w-full items-center justify-center gap-2 rounded-sm bg-[#F47216] px-6 py-4 text-lg font-black uppercase tracking-widest text-white transition hover:bg-[#ff8533] disabled:opacity-70 shadow-[0_15px_40px_-10px_rgba(244,114,22,0.7)]"
          >
            {spinning ? "Girando..." : "Girar Ahora"}
            <Flame className="h-5 w-5" />
          </button>
        ) : (
          <>
            <p className="mb-5 text-center text-sm md:text-base text-white/70">
              El Búnker del Mecánico Harley por solo{" "}
              <span className="font-bold text-white">{geo.local(PRICES.wheel[geo.tier]) ? `${geo.local(PRICES.wheel[geo.tier])!.replace("≈ ", "")} (${fmtUsd(PRICES.wheel[geo.tier]).full})` : fmtUsd(PRICES.wheel[geo.tier]).full}</span> — expira
              al cerrar esta página.
            </p>

            <div className="mb-5 flex flex-col items-center">
              <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                Expira en
              </span>
              <div className="text-4xl md:text-5xl font-black tracking-wider text-[#F47216] tabular-nums">
                {mm}:{ss}
              </div>
            </div>

            <a
              href={CHECKOUT.wheel[geo.tier]}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center gap-3 rounded-sm bg-[#F47216] px-6 py-4 text-lg font-black uppercase tracking-widest text-white transition hover:bg-[#ff8533] shadow-[0_15px_40px_-10px_rgba(244,114,22,0.7)]"
            >
              <Lock className="h-5 w-5" />
              Reclamar Mi 50% de Descuento
            </a>

            <button
              onClick={close}
              className="mt-4 w-full text-center text-xs uppercase tracking-widest text-white/50 underline-offset-4 transition hover:text-white hover:underline"
            >
              No gracias, prefiero pagar el precio completo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
