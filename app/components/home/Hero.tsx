'use client';
import ScrollReveal from "../ScrollReveal";
import GithubIcon from "../GithubIcon";
import { useLang } from "../../i18n/LangContext";
import { GITHUB_URL, RESUME_URL } from "../../data/links";

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="pb-20 pt-28">
      <ScrollReveal>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {t.home.tagline}
        </p>
        <h1 className="mb-5 text-3xl font-bold leading-snug tracking-tight">
          {t.home.heroTitle1}
          <br />
          {t.home.heroTitle2}
        </h1>
        <p className="text-[15px] leading-[1.8] text-[var(--t3)]">
          {t.home.heroSub}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.home.ctaResume}
            className="btn-accent inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors"
          >
            {t.home.ctaResume}
            <span aria-hidden>↗</span>
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.home.ctaGithub}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hi)] px-4 py-2.5 text-[13px] font-semibold text-[var(--t2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <GithubIcon className="h-4 w-4" />
            {t.home.ctaGithub}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
