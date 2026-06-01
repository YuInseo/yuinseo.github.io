import type { Metadata } from "next";
import Nav from "../../components/Nav";
import DownloadButton from "./DownloadButton";
import DemoSection from "./DemoSection";
import ScrollReveal from "../../components/ScrollReveal";

export const metadata: Metadata = {
  title: "Artisan's Compass",
  description: "앱 사용 이력 자동 기록, 타임테이블, 포모도로, 프로젝트 관리가 하나의 흐름으로 연결되는 Windows 생산성 앱. 매일 밤 하루를 닫으면 그날의 기록이 영구 보관됩니다.",
  keywords: ["Windows 앱", "생산성 앱", "타임테이블", "포모도로", "하루 기록", "시간 관리", "Artisan's Compass"],
  openGraph: {
    title: "Artisan's Compass — 하루를 기록하는 Windows 생산성 앱",
    description: "앱 사용 이력 자동 기록, 타임테이블, 포모도로, 프로젝트 관리가 하나의 흐름으로 연결되는 Windows 생산성 앱.",
    url: "https://yuinseo.github.io/projects/artisans-compass",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Artisan's Compass — 하루를 기록하는 Windows 생산성 앱",
    description: "앱 사용 이력 자동 기록, 타임테이블, 포모도로, 프로젝트 관리가 하나의 흐름으로 연결되는 Windows 생산성 앱.",
  },
  alternates: {
    canonical: "https://yuinseo.github.io/projects/artisans-compass",
  },
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
        <p className="mb-3 text-[15px] leading-relaxed text-[var(--t3)]">
          하루를 기록하는 Windows 앱.
        </p>
        <p className="mb-10 text-[14px] leading-relaxed text-[var(--t4)]">
          앱 사용 이력이 타임테이블에 자동으로 쌓이고, 프로젝트·할일·포모도로·아카이브가 한 흐름으로 연결됩니다. 하루를 닫으면 그날 기록이 영구 보관되고요.
        </p>
        <DownloadButton />
      </section>

      <hr className="border-[var(--border)]" />

      {/* Live demo */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">라이브 데모</p>
        <DemoSection />
      </section>

      {/* Archive modes — surface bg */}
      <div className="bg-[var(--surface)]">
        <section className="mx-auto max-w-2xl px-5 py-14">
          <ScrollReveal>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">데일리 아카이브 모드</p>
          <p className="mb-8 text-[13px] leading-relaxed text-[var(--t4)]">
            하루가 끝나는 기준을 직접 정할 수 있어요. 생활 패턴에 맞는 걸 고르면 됩니다.
          </p>
        </ScrollReveal>
        <div className="grid gap-8 sm:grid-cols-2">
          <ScrollReveal delay={80}>
            <div className="border-l-2 pl-5" style={{ borderColor: "var(--archive-1)" }}>
              <p className="mb-1.5 text-sm font-semibold text-[var(--t1)]">고정 모드</p>
              <p className="mb-3 text-[13px] leading-relaxed text-[var(--t3)]">
                자정 00:00 정각에 다음 날로 전환.
              </p>
              <p className="text-[12px] leading-relaxed text-[var(--t4)]">
                규칙적인 생활 패턴이라면 이쪽이 편하죠. 날짜가 바뀌는 순간 기록이 자동 마감되고 새 하루가 열립니다.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <div className="border-l-2 pl-5" style={{ borderColor: "var(--archive-2)" }}>
              <p className="mb-1.5 text-sm font-semibold text-[var(--t1)]">동적 모드</p>
              <p className="mb-3 text-[13px] leading-relaxed text-[var(--t3)]">
                앱을 닫기 전까지 당일로 기록. 새벽 작업자용.
              </p>
              <p className="text-[12px] leading-relaxed text-[var(--t4)]">
                밤새 작업하는 분들을 위한 모드. 앱을 닫는 순간이 하루의 끝이고, 새벽 3시에 닫아도 전날 날짜로 마감됩니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
        </section>
      </div>

      {/* Other features */}
      <section className="mx-auto max-w-2xl px-5 py-14">
        <ScrollReveal>
          <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">기타 기능</p>
        </ScrollReveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "위젯 모드", desc: "바탕화면에 올려두고 쓰는 모드. 항상 위 고정, 위치·크기 잠금, 투명도 조절." },
            { label: "테마", desc: "다크·라이트 기반 색상 팔레트. 위젯과 메인 화면에 각각 다른 테마 적용 가능." },
            { label: "일기", desc: "모바일 앱에서 버튼 하나로 일기 화면 즉시 실행. 감정 태그·사진 첨부 지원." },
            { label: "설정", desc: "타임라인 그리드 간격, 야간 구간 마커, 하단 바 탭 구성 등 세부 조정 가능." },
          ].map((f, i) => (
            <ScrollReveal key={f.label} delay={i * 80}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5">
                <p className="mb-1.5 text-[14px] font-semibold text-[var(--t1)]">{f.label}</p>
                <p className="text-[13px] leading-relaxed text-[var(--t4)]">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-5 py-8 text-center text-xs text-[var(--t5)]">
        Artisan&apos;s Compass
      </footer>
    </div>
  );
}
