'use client';
import ScrollReveal from "../ScrollReveal";
import { useLang } from "../../i18n/LangContext";
import { SKILL_GROUPS } from "../../data/skills";

export default function TechStack() {
  const { lang, t } = useLang();
  return (
    <section className="pb-14">
      <ScrollReveal>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.home.sectionStack}</p>
        <p className="mb-6 text-[13px] leading-relaxed text-[var(--t3)]">{t.home.stackLead}</p>
      </ScrollReveal>
      <div className="space-y-4">
        {SKILL_GROUPS.map((group, i) => (
          <ScrollReveal key={group.label.en} delay={i * 60}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline">
              <span className="w-32 shrink-0 text-[12px] font-semibold text-[var(--t4)]">
                {group.label[lang]}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[12px] text-[var(--t2)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
