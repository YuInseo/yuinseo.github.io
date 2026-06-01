import type { Metadata } from "next";
import Nav from "../../components/Nav";
import DownloadButton from "./DownloadButton";
import DemoSection from "./DemoSection";
import ScrollReveal from "../../components/ScrollReveal";

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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollReveal delay={0}>
            <div>
              <p className="mb-2 text-[14px] font-semibold text-[var(--t1)]">위젯 모드</p>
              <p className="mb-3 text-[13px] leading-relaxed text-[var(--t4)]">바탕화면에 올려두고 쓸 수 있어요. 위치·크기 잠금 가능.</p>
              <ul className="space-y-1.5">
                {["항상 위 (Always on top) 설정", "위치·크기 잠금으로 실수 방지", "투명도 조절 가능", "메인 화면과 다른 테마 적용"].map(p => (
                  <li key={p} className="flex items-start gap-2 text-[12px] text-[var(--t4)]">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[var(--border-hi)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div>
              <p className="mb-2 text-[14px] font-semibold text-[var(--t1)]">테마</p>
              <p className="mb-3 text-[13px] leading-relaxed text-[var(--t4)]">여러 색상 테마. 위젯과 메인 화면에 각각 적용 가능.</p>
              <ul className="space-y-1.5">
                {["다크 / 라이트 기반 다양한 색상 팔레트", "메인 화면과 위젯에 각각 다른 테마", "악센트 컬러 커스터마이즈", "프로젝트별 색상 직접 지정"].map(p => (
                  <li key={p} className="flex items-start gap-2 text-[12px] text-[var(--t4)]">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[var(--border-hi)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div>
              <p className="mb-2 text-[14px] font-semibold text-[var(--t1)]">일기</p>
              <p className="mb-3 text-[13px] leading-relaxed text-[var(--t4)]">모바일에서 버튼 하나로 기록.</p>
              <ul className="space-y-1.5">
                {["버튼 한 번으로 일기 화면 즉시 실행", "오늘 날짜 제목 자동 입력", "감정 이모지 태그", "사진 최대 4장 첨부", "해당 날짜 아카이브에 연결"].map(p => (
                  <li key={p} className="flex items-start gap-2 text-[12px] text-[var(--t4)]">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[var(--border-hi)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div>
              <p className="mb-2 text-[14px] font-semibold text-[var(--t1)]">설정</p>
              <p className="mb-3 text-[13px] leading-relaxed text-[var(--t4)]">타임테이블 카테고리, 작업 외 앱, 아카이브 모드 등.</p>
              <ul className="space-y-1.5">
                {["자동 추적 앱 목록 관리", "타임테이블 그리드 간격 설정", "야간 시간 구간 마커", "하단 바 탭 구성", "알림 및 내보내기 (예정)"].map(p => (
                  <li key={p} className="flex items-start gap-2 text-[12px] text-[var(--t4)]">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[var(--border-hi)]" />
                    {p}
                  </li>
                ))}
              </ul>
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
