import type { Metadata } from "next";
import Nav from "../components/Nav";
import ScrollReveal from "../components/ScrollReveal";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "학력 & 자격증",
  description: "학력 및 보유 자격증",
};

const EDUCATION = [
  {
    name: "시각디자인 (학사)",
    nameEn: "Visual Design, Bachelor's Degree",
    issuer: "국가평생교육진흥원",
    tags: ["학점은행제", "시각디자인학과", "2025.06 수료"],
    desc: "학점은행제를 통해 시각디자인 전공을 이수했습니다.",
  },
];

const LANGUAGE = [
  {
    name: "TOEIC",
    nameEn: "Test of English for International Communication",
    issuer: "ETS",
    tags: ["800점"],
    desc: "국제적으로 통용되는 영어 실무 능력 평가 시험.",
  },
];

const TECHNICAL = [
  {
    name: "정보처리기사",
    nameEn: "Engineer Information Processing",
    issuer: "한국산업인력공단",
    tags: [],
    desc: "소프트웨어 설계·개발·운영·유지보수 전반을 다루는 국가기술자격.",
  },
  {
    name: "ITQ",
    nameEn: "Information Technology Qualification",
    issuer: "한국생산성본부",
    tags: ["아래한글", "MS 엑셀", "MS 파워포인트"],
    desc: "실무 중심의 OA 활용 능력을 검증하는 국가공인 자격.",
  },
  {
    name: "GTQ",
    nameEn: "Graphic Technology Qualification",
    issuer: "한국생산성본부",
    tags: ["포토샵", "1급"],
    desc: "그래픽 툴 활용 역량을 검증하는 국가공인 자격.",
  },
  {
    name: "컴퓨터활용능력 1급",
    nameEn: "Computer Utilization Ability Level 1",
    issuer: "대한상공회의소",
    tags: ["1급"],
    desc: "스프레드시트·데이터베이스 활용 능력을 검증하는 국가기술자격.",
  },
];

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
          <CertRow key={cert.name} cert={cert} delay={startDelay + i * 60} />
        ))}
      </div>
    </div>
  );
}

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />

      <section className="mx-auto max-w-2xl px-5 pb-20 pt-20">
        <ScrollReveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            education & certifications
          </p>
          <h1 className="mb-14 text-3xl font-bold tracking-tight">학력 & 자격증</h1>
        </ScrollReveal>

        <div className="space-y-12">
          <Section label="학력" certs={EDUCATION} startDelay={80} />
          <Section label="어학능력" certs={LANGUAGE} startDelay={80} />
          <Section label="기술" certs={TECHNICAL} startDelay={80} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
