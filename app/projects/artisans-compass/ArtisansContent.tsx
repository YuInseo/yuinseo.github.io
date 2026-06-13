'use client';
import DownloadButton from "./DownloadButton";
import DemoSection from "./DemoSection";
import ScrollReveal from "../../components/ScrollReveal";
import { useLang } from "../../i18n/LangContext";

export default function ArtisansContent() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <section className="mx-auto max-w-2xl px-5 pb-14 pt-20">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Artisan&apos;s Compass
        </h1>
        <p className="mb-3 text-[15px] leading-relaxed text-[var(--t3)]">
          {t.artisans.intro}
        </p>
        <p className="mb-10 text-[14px] leading-relaxed text-[var(--t4)]">
          {t.artisans.introDetail}
        </p>
        <DownloadButton />
      </section>

      <hr className="border-[var(--border)]" />

      <section className="mx-auto max-w-5xl px-5 py-14">
        <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.artisans.sectionDemo}</p>
        <DemoSection />
      </section>

      <div className="bg-[var(--surface)]">
        <section className="mx-auto max-w-2xl px-5 py-14">
          <ScrollReveal>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.artisans.sectionArchive}</p>
            <p className="mb-8 text-[13px] leading-relaxed text-[var(--t4)]">
              {t.artisans.archiveDesc}
            </p>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2">
            <ScrollReveal delay={80}>
              <div className="border-l-2 pl-5" style={{ borderColor: "var(--archive-1)" }}>
                <p className="mb-1.5 text-sm font-semibold text-[var(--t1)]">{t.artisans.fixedMode}</p>
                <p className="mb-3 text-[13px] leading-relaxed text-[var(--t3)]">
                  {t.artisans.fixedModeDesc}
                </p>
                <p className="text-[12px] leading-relaxed text-[var(--t4)]">
                  {t.artisans.fixedModeDetail}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div className="border-l-2 pl-5" style={{ borderColor: "var(--archive-2)" }}>
                <p className="mb-1.5 text-sm font-semibold text-[var(--t1)]">{t.artisans.dynamicMode}</p>
                <p className="mb-3 text-[13px] leading-relaxed text-[var(--t3)]">
                  {t.artisans.dynamicModeDesc}
                </p>
                <p className="text-[12px] leading-relaxed text-[var(--t4)]">
                  {t.artisans.dynamicModeDetail}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-2xl px-5 py-14">
        <ScrollReveal>
          <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.artisans.sectionOther}</p>
        </ScrollReveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {t.artisans.features.map((f, i) => (
            <ScrollReveal key={f.label} delay={i * 80}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5">
                <p className="mb-1.5 text-[14px] font-semibold text-[var(--t1)]">{f.label}</p>
                <p className="text-[13px] leading-relaxed text-[var(--t4)]">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
