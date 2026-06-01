import type { Metadata } from "next";
import Nav from "../../components/Nav";
import DownloadButton from "./DownloadButton";
import DemoSection from "./DemoSection";
import ScrollReveal from "./ScrollReveal";

export const metadata: Metadata = {
  title: "Artisan's Compass",
  description: "하루를 기록하는 Windows 앱",
};

export default function ArtisansCompassPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />

      {/* Intro */}
      <section className="mx-auto max-w-2xl px-5 pb-14 pt-20">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Artisan&apos;s Compass
        </h1>
        <p className="mb-10 text-[15px] leading-relaxed text-[var(--t3)]">
          하루를 기록하는 Windows 앱이에요.
        </p>
        <DownloadButton />
      </section>

      <hr className="border-[var(--border)]" />

      {/* Live demo */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        <p className="mb-5 text-sm font-medium text-[var(--t2)]">라이브 데모</p>
        <DemoSection />
      </section>

      <hr className="border-[var(--border)]" />

      {/* Archive modes */}
      <section className="mx-auto max-w-2xl px-5 py-14">
        <ScrollReveal>
          <p className="mb-8 text-sm font-medium text-[var(--t2)]">데일리 아카이브 모드</p>
        </ScrollReveal>
        <div className="grid gap-8 sm:grid-cols-2">
          <ScrollReveal delay={80}>
            <div className="border-l-2 pl-5" style={{ borderColor: "var(--archive-1)" }}>
              <p className="mb-1.5 text-sm font-semibold text-[var(--t1)]">고정 모드</p>
              <p className="text-sm leading-relaxed text-[var(--t3)]">
                자정 00:00 정각에 다음 날로 넘어가요.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <div className="border-l-2 pl-5" style={{ borderColor: "var(--archive-2)" }}>
              <p className="mb-1.5 text-sm font-semibold text-[var(--t1)]">동적 모드</p>
              <p className="text-sm leading-relaxed text-[var(--t3)]">
                앱을 닫기 전까지 당일로 기록해요. 새벽 작업자용.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <hr className="border-[var(--border)]" />

      {/* Other features */}
      <section className="mx-auto max-w-2xl px-5 py-14">
        <div className="grid gap-8 sm:grid-cols-3">
          <ScrollReveal delay={0}>
            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--t2)]">위젯 모드</p>
              <p className="text-sm leading-relaxed text-[var(--t4)]">바탕화면에 올려두고 쓸 수 있어요. 위치·크기 잠금 가능.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--t2)]">테마</p>
              <p className="text-sm leading-relaxed text-[var(--t4)]">여러 색상 테마. 위젯과 메인 화면에 각각 적용 가능.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <div>
              <p className="mb-1.5 text-sm font-medium text-[var(--t2)]">설정</p>
              <p className="text-sm leading-relaxed text-[var(--t4)]">타임테이블 카테고리, 작업 외 앱, 아카이브 모드 등.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-5 py-8 text-center text-xs text-[var(--t5)]">
        Artisan&apos;s Compass
      </footer>
    </div>
  );
}
