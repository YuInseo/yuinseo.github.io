'use client';
import Nav from "../components/Nav";
import ScrollReveal from "../components/ScrollReveal";
import Footer from "../components/Footer";
import { useLang } from "../i18n/LangContext";

type CertItem = { name: string; nameEn: string; issuer: string; tags: string[]; desc: string };

function CertRow({ cert, delay = 0 }: { cert: CertItem; delay?: number }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="border-b border-[var(--border)] py-5">
        <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-[15px] font-semibold text-[var(--t1)]">{cert.name}</p>
          <p className="text-[12px] text-[var(--t5)]">{cert.issuer}</p>
        </div>
        <p className="mb-2 text-[11px] text-[var(--t5)]">{cert.nameEn}</p>
        <p className="mb-2.5 text-[13px] leading-relaxed text-[var(--t3)]">{cert.desc}</p>
        {cert.tags.length > 0 && (
          <p className="text-[12px] text-[var(--t4)]">{cert.tags.join(" · ")}</p>
        )}
      </div>
    </ScrollReveal>
  );
}

function Section({ label, certs, startDelay = 0 }: { label: string; certs: CertItem[]; startDelay?: number }) {
  return (
    <div>
      <ScrollReveal>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{label}</p>
      </ScrollReveal>
      <div>
        {certs.map((cert, i) => (
          <CertRow key={cert.nameEn} cert={cert} delay={startDelay + i * 60} />
        ))}
      </div>
    </div>
  );
}

export default function CertsContent() {
  const { lang, t } = useLang();

  const education: CertItem[] = [{
    name: t.certs.education.name,
    nameEn: "Visual Design, Bachelor's Degree",
    issuer: lang === 'en' ? 'Korea National Institute for Lifelong Education' : '국가평생교육진흥원',
    tags: t.certs.education.tags,
    desc: t.certs.education.desc,
  }];

  const language: CertItem[] = [{
    name: t.certs.language.name,
    nameEn: "Test of English for International Communication",
    issuer: "ETS",
    tags: t.certs.language.tags,
    desc: t.certs.language.desc,
  }];

  const technical: CertItem[] = [
    {
      name: t.certs.technical.infoProcessing.name,
      nameEn: "Engineer Information Processing",
      issuer: lang === 'en' ? 'HRD Korea' : '한국산업인력공단',
      tags: [],
      desc: t.certs.technical.infoProcessing.desc,
    },
    {
      name: t.certs.technical.itq.name,
      nameEn: "Information Technology Qualification",
      issuer: lang === 'en' ? 'Korea Productivity Center' : '한국생산성본부',
      tags: t.certs.technical.itq.tags,
      desc: t.certs.technical.itq.desc,
    },
    {
      name: t.certs.technical.gtq.name,
      nameEn: "Graphic Technology Qualification",
      issuer: lang === 'en' ? 'Korea Productivity Center' : '한국생산성본부',
      tags: t.certs.technical.gtq.tags,
      desc: t.certs.technical.gtq.desc,
    },
    {
      name: t.certs.technical.compUtil.name,
      nameEn: "Computer Utilization Ability Level 1",
      issuer: lang === 'en' ? 'Korea Chamber of Commerce and Industry' : '대한상공회의소',
      tags: t.certs.technical.compUtil.tags,
      desc: t.certs.technical.compUtil.desc,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />

      <section className="mx-auto max-w-2xl px-5 pb-20 pt-20">
        <ScrollReveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {t.certs.eyebrow}
          </p>
          <h1 className="mb-14 text-3xl font-bold tracking-tight">{t.certs.title}</h1>
        </ScrollReveal>

        <div className="space-y-12">
          <Section label={t.certs.sectionEducation} certs={education} startDelay={80} />
          <Section label={t.certs.sectionLanguage} certs={language} startDelay={80} />
          <Section label={t.certs.sectionTechnical} certs={technical} startDelay={80} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
