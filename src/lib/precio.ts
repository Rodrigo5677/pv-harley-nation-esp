import { useEffect, useState } from "react";

/** Faixa B = preço um pouco menor (países com menor poder de compra). Resto = faixa A. */
const TIER_B = new Set(["AR", "CO", "PE", "EC", "BO", "PY", "VE", "DO", "GT", "HN", "SV", "NI", "CU"]);

export type Tier = "a" | "b";
export type Plan = "app" | "book" | "bundle" | "wheel";

export const PRICES: Record<Plan, Record<Tier, number>> = {
  app: { a: 21.45, b: 18.9 },
  book: { a: 34.95, b: 29.9 },
  bundle: { a: 42.5, b: 36.9 },
  wheel: { a: 22.9, b: 22.9 },
};

/** Preço "antes" riscado (metade do original americano). */
export const OLD_PRICES: Record<Exclude<Plan, "wheel">, number> = { app: 73.5, book: 63.5, bundle: 123.5 };

/** Links de checkout Hotmart por faixa (preenchidos com as ofertas em espanhol). */
export const CHECKOUT: Record<Plan, Record<Tier, string>> = {
  app: { a: "https://pay.hotmart.com/S106172425V", b: "https://pay.hotmart.com/S106172425V" },
  book: { a: "https://pay.hotmart.com/L105994413B", b: "https://pay.hotmart.com/L105994413B" },
  bundle: { a: "https://pay.hotmart.com/Q106173506K", b: "https://pay.hotmart.com/Q106173506K" },
  wheel: { a: "https://pay.hotmart.com/Q106173506K?off=tcj4bkjo", b: "https://pay.hotmart.com/Q106173506K?off=tcj4bkjo" },
};

/** Moeda local por país (código ISO, símbolo exibido). */
const CURRENCY: Record<string, [string, string]> = {
  MX: ["MXN", "MX$"], CO: ["COP", "COL$"], AR: ["ARS", "ARS$"], CL: ["CLP", "CLP$"], PE: ["PEN", "S/"],
  ES: ["EUR", "€"], UY: ["UYU", "$U"], BO: ["BOB", "Bs"], PY: ["PYG", "₲"], GT: ["GTQ", "Q"],
  HN: ["HNL", "L"], NI: ["NIO", "C$"], CR: ["CRC", "₡"], DO: ["DOP", "RD$"],
};

/** Câmbio de reserva (USD -> moeda) caso a API não responda. */
const FALLBACK_RATES: Record<string, number> = {
  MXN: 18.5, COP: 4000, ARS: 1450, CLP: 950, PEN: 3.7, EUR: 0.92, UYU: 40, BOB: 6.9, PYG: 7500,
  GTQ: 7.7, HNL: 26, NIO: 36.7, CRC: 505, DOP: 61,
};

/** Fuso horário -> país (palpite instantâneo antes da geolocalização por IP). */
const TZ: Record<string, string> = {
  "America/Mexico_City": "MX", "America/Monterrey": "MX", "America/Tijuana": "MX", "America/Cancun": "MX", "America/Merida": "MX", "America/Chihuahua": "MX", "America/Hermosillo": "MX", "America/Mazatlan": "MX",
  "America/Bogota": "CO", "America/Argentina/Buenos_Aires": "AR", "America/Buenos_Aires": "AR", "America/Argentina/Cordoba": "AR", "America/Santiago": "CL",
  "America/Lima": "PE", "Europe/Madrid": "ES", "Atlantic/Canary": "ES", "America/Montevideo": "UY", "America/La_Paz": "BO", "America/Asuncion": "PY",
  "America/Guayaquil": "EC", "America/Caracas": "VE", "America/Guatemala": "GT", "America/Tegucigalpa": "HN", "America/El_Salvador": "SV",
  "America/Managua": "NI", "America/Costa_Rica": "CR", "America/Panama": "PA", "America/Santo_Domingo": "DO", "America/Puerto_Rico": "PR", "America/Havana": "CU",
};

export function tierOf(country: string | null): Tier {
  return country && TIER_B.has(country) ? "b" : "a";
}

/** "21,45" estilo LATAM */
export function fmtUsd(v: number): { whole: string; cents: string; full: string } {
  const [w, c] = v.toFixed(2).split(".");
  const whole = grp(Number(w));
  return { whole, cents: "," + c, full: `US$ ${whole},${c}` };
}

function grp(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function nice(n: number): number {
  if (n < 100) return Math.round(n);
  if (n < 1000) return Math.round(n / 10) * 10;
  if (n < 100000) return Math.round(n / 100) * 100;
  return Math.round(n / 1000) * 1000;
}

export interface Geo {
  country: string | null;
  tier: Tier;
  local: (usd: number) => string | null; // "≈ MX$ 790" ou null (USD/desconhecido)
}

const CACHE = "geo_precio_v1";

export function useGeo(): Geo {
  const [country, setCountry] = useState<string | null>(null);
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);

  useEffect(() => {
    let alive = true;
    try {
      const c = JSON.parse(localStorage.getItem(CACHE) || "null");
      if (c && c.t > Date.now() - 12 * 3600e3) {
        setCountry(c.country);
        if (c.rates) setRates({ ...FALLBACK_RATES, ...c.rates });
        return;
      }
    } catch {}
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (TZ[tz]) setCountry(TZ[tz]);
    } catch {}
    (async () => {
      let ctry: string | null = null;
      let rts: Record<string, number> | null = null;
      try {
        const r = await fetch("https://get.geojs.io/v1/ip/country.json");
        ctry = ((await r.json()).country || "").toUpperCase() || null;
      } catch {}
      try {
        const r = await fetch("https://open.er-api.com/v6/latest/USD");
        const j = await r.json();
        if (j && j.rates) rts = j.rates;
      } catch {}
      if (!alive) return;
      if (ctry) setCountry(ctry);
      if (rts) setRates({ ...FALLBACK_RATES, ...rts });
      try {
        localStorage.setItem(CACHE, JSON.stringify({ t: Date.now(), country: ctry, rates: rts }));
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, []);

  const local = (usd: number) => {
    if (!country || !CURRENCY[country]) return null;
    const [code, sym] = CURRENCY[country];
    const rate = rates[code];
    if (!rate) return null;
    const v = nice(usd * rate);
    return `≈ ${sym} ${grp(v)}`;
  };

  return { country, tier: tierOf(country), local };
}
