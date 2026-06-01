import Link from "next/link";
import Nav from "./components/Nav";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />
      <main className="mx-auto max-w-2xl px-5">

        {/* Intro */}
        <section className="pb-20 pt-28">
          <ScrollReveal>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              indie developer
            </p>
            <h1 className="mb-5 text-3xl font-bold tracking-tight">유인서</h1>
            <p className="text-[15px] leading-[1.8] text-[var(--t3)]">
              생활의 불편함을 줄여주는 앱을 만들고 있습니다.
            </p>
          </ScrollReveal>
        </section>

        {/* Projects */}
        <section className="pb-10">
          <ScrollReveal>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">프로젝트</p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <Link
              href="/projects/artisans-compass"
              className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hi)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[var(--t1)] transition-colors group-hover:text-[var(--accent)]">
                  Artisan&apos;s Compass
                </span>
                <span className="rounded-full border border-[var(--border-hi)] px-2.5 py-0.5 text-[11px] text-[var(--t4)]">
                  Windows 앱
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-[var(--t4)]">
                하루를 기록하는 생산성 앱. 앱 사용 이력이 타임테이블에 자동으로 쌓이고, 프로젝트·할일·포모도로가 한 흐름으로 연결되는 구조.
              </p>
            </Link>
          </ScrollReveal>
        </section>

        {/* Certifications */}
        <section className="pb-10">
          <ScrollReveal delay={40}>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">자격증</p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <Link
              href="/certifications"
              className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hi)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-3 flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-[10px] uppercase tracking-widest text-[var(--t5)]">어학</span>
                  <span className="text-[13px] text-[var(--t3)]">TOEIC 800</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-[10px] uppercase tracking-widest text-[var(--t5)]">기술</span>
                  <span className="text-[13px] text-[var(--t3)]">정보처리기사 · ITQ · GTQ 1급</span>
                </div>
              </div>
              <p className="mt-2.5 text-[12px] text-[var(--t4)] transition-colors group-hover:text-[var(--accent)]">
                자세히 보기 →
              </p>
            </Link>
          </ScrollReveal>
        </section>

        {/* Blog */}
        <section className="pb-32">
          <ScrollReveal delay={40}>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">블로그</p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="text-[14px] text-[var(--t4)]">아직 없어요.</p>
          </ScrollReveal>
        </section>

      </main>

      <footer className="px-5 pb-10 text-xs text-[var(--t5)]">© 2025 yuinseo</footer>
    </div>
  );
}
