import Link from "next/link";

export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  cta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow text-clay">{eyebrow}</p>
        <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.6rem)]">{title}</h2>
        {body && <p className="mt-5 max-w-xl text-ink-70">{body}</p>}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="group shrink-0 text-sm text-ink transition-colors hover:text-clay"
        >
          {cta.label}
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light";
  className?: string;
}) {
  const styles = {
    solid: "bg-ink text-cream hover:bg-clay",
    outline: "border border-ink/20 text-ink hover:border-ink/50 hover:bg-sand/50",
    light: "bg-cream text-ink hover:bg-gold",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[0.95rem] transition-all duration-200 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
