import { ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-ember">
          <span className="h-px w-8 bg-ember" />
          {eyebrow}
          <span className="h-px w-8 bg-ember" />
        </div>
      )}
      <h2 className="font-display text-4xl font-bold leading-[0.95] md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
