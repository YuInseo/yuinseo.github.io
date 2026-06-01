import type { Metadata } from "next";
import Nav from "../components/Nav";
import ScrollReveal from "../components/ScrollReveal";

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
];

type CertItem = { name: string; nameEn: string; issuer: string; tags: string[]; desc: string };

function CertList({ certs, startDelay = 0 }: { certs: CertItem[]; startDelay?: number }) {
  return (
    <div className="space-y-4">
      {certs.map((cert, i) => (
        <ScrollReveal key={cert.name} delay={startDelay + i * 80}>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-[16px] font-semibold text-[var(--t1)]">{cert.name}</p>
                <p className="mt-0.5 text-[11px] text-[var(--t4)]">{cert.nameEn}</p>
              </div>
              <span className="shrink-0 text-[12px] text-[var(--t4)]">{cert.issuer}</span>
            </div>
            <p className="mb-3 text-[13px] leading-relaxed text-[var(--t3)]">{cert.desc}</p>
            {cert.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {cert.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border-hi)] px-2.5 py-0.5 text-[11px] text-[var(--t4)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>
      ))}
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

        <div className="space-y-14">
          <div>
            <ScrollReveal>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">학력</p>
            </ScrollReveal>
            <CertList certs={EDUCATION} startDelay={80} />
          </div>

          <div>
            <ScrollReveal>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">어학능력</p>
            </ScrollReveal>
            <CertList certs={LANGUAGE} startDelay={80} />
          </div>

          <div>
            <ScrollReveal>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">기술</p>
            </ScrollReveal>
            <CertList certs={TECHNICAL} startDelay={80} />
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-5 py-8 text-center text-xs text-[var(--t5)]">
        © 2025 yuinseo
      </footer>
    </div>
  );
}
