'use client';
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { useLang } from "../../i18n/LangContext";

export default function ProjectCard() {
  const { lang, t } = useLang();
  return (
    <section className="pb-14">
      <ScrollReveal>
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.home.sectionProjects}</p>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <Link
          href={`/${lang}/projects/artisans-compass`}
          className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hi)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[15px] font-semibold text-[var(--t1)] transition-colors group-hover:text-[var(--accent)]">
              Artisan&apos;s Compass
            </span>
            <span className="rounded-full border border-[var(--border-hi)] px-2.5 py-0.5 text-[11px] text-[var(--t4)]">
              {t.home.projectBadge}
            </span>
          </div>
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--t3)]">
            {t.home.projectSummary}
          </p>
          <ul className="mb-4 space-y-2">
            {t.home.projectHighlights.map((item) => (
              <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-[var(--t4)]">
                <span className="mt-[2px] shrink-0 text-[var(--accent)]" aria-hidden>·</span>
                {item}
              </li>
            ))}
          </ul>
          <span className="text-[12px] font-semibold text-[var(--accent)]">
            {t.home.projectCta}
          </span>
        </Link>
      </ScrollReveal>
    </section>
  );
}
