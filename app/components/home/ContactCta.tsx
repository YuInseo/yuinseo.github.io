'use client';
import ScrollReveal from "../ScrollReveal";
import GithubIcon from "../GithubIcon";
import { useLang } from "../../i18n/LangContext";
import { EMAIL, GITHUB_URL, RESUME_URL } from "../../data/links";

export default function ContactCta() {
  const { t } = useLang();
  return (
    <section className="pb-32">
      <ScrollReveal>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-8 text-center">
          <h2 className="mb-2 text-[18px] font-bold tracking-tight">{t.home.contactTitle}</h2>
          <p className="mb-6 text-[13px] text-[var(--t3)]">{t.home.contactSub}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="btn-accent inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors"
            >
              {t.home.ctaEmail}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hi)] px-4 py-2.5 text-[13px] font-semibold text-[var(--t2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hi)] px-4 py-2.5 text-[13px] font-semibold text-[var(--t2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t.nav.resume}
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
