import type { Metadata } from "next";
import Nav from "../../components/Nav";
import DownloadButton from "./DownloadButton";

export const metadata: Metadata = {
  title: "Artisan's Compass — 정리 프로그램",
  description:
    "타임테이블, 앱 사용량 추적, 데일리 아카이브, 캘린더 루틴 관리까지. 당신의 하루를 다듬는 데스크탑 생산성 앱.",
};

const features = [
  {
    title: "타임테이블",
    description: "하루 동안의 작업 세션을 시각적인 막대 그래프로 확인합니다. 언제 집중했는지 한눈에 파악할 수 있습니다.",
  },
  {
    title: "앱 사용량",
    description: "어떤 앱을 얼마나 사용했는지 자동으로 기록합니다. 작업 도구와 기타 앱을 구분해 집중도를 측정합니다.",
  },
  {
    title: "데일리 아카이브",
    description: "매일의 기록을 아카이브로 저장합니다. 고정/동적 모드로 자정 기준을 생활 패턴에 맞게 설정할 수 있습니다.",
  },
  {
    title: "캘린더 & 루틴",
    description: "반복 루틴을 캘린더에 등록합니다. Ctrl + Drag로 여러 루틴을 동시에 선택하고 드래그로 자유롭게 이동합니다.",
  },
  {
    title: "위젯 모드",
    description: "앱을 작은 위젯으로 바탕화면에 올려놓습니다. Lock Position & Size로 실수 이동을 방지합니다.",
  },
  {
    title: "테마",
    description: "다양한 색상 테마를 제공합니다. 위젯과 메인 화면에 각각 다른 테마를 적용할 수 있습니다.",
  },
  {
    title: "설정 UI",
    description: "타임테이블 카테고리, 작업 외 프로그램 등록, 아카이브 모드 등을 별도 패널에서 조정합니다.",
  },
  {
    title: "고정 작업 탭",
    description: "매일 반복되는 고정 작업을 별도 탭에 등록합니다. 자정이 지나면 자동으로 초기화됩니다.",
  },
];

const archiveModes = [
  {
    mode: "고정 모드",
    accent: "#7c6cf4",
    scenario: "예: 24일 자정 00:00에 앱 실행 중",
    flow: [
      "24일 데일리 아카이브 자동 저장",
      "25일 데일리 아카이브로 즉시 전환",
      "아카이브에서 24일 타임테이블 1줄만 표시",
    ],
  },
  {
    mode: "동적 모드",
    accent: "#e07a40",
    scenario: "예: 24일 자정이 지나도 앱 계속 사용 중",
    flow: [
      "앱을 닫기 전까지 24일로 기록 유지",
      "앱 종료 후 재시작 시 25일 아카이브 시작",
      "아카이브에서 24일/25일 2줄로 표시",
    ],
  },
];

const timelineRows = [
  { time: "00:00", bars: [] as { w: string; color: string }[] },
  { time: "02:00", bars: [{ w: "55%", color: "#7c6cf4" }] },
  { time: "04:00", bars: [] },
  { time: "08:00", bars: [] },
  { time: "10:00", bars: [{ w: "85%", color: "#7c6cf4" }] },
  { time: "12:00", bars: [] },
  { time: "14:00", bars: [] },
  { time: "16:00", bars: [{ w: "60%", color: "#7c6cf4" }, { w: "50%", color: "#3e3e5a" }] },
  { time: "18:00", bars: [] },
  { time: "20:00", bars: [{ w: "35%", color: "#5a4fc4" }] },
  { time: "22:00", bars: [] },
];

export default function ArtisansCompassPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e2ec]">
      <Nav />

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3e3e68]">
          Windows Desktop App
        </p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Artisan&apos;s{" "}
          <span style={{ color: "#9b8dff" }}>Compass</span>
        </h1>
        <p className="mb-10 max-w-sm text-base leading-relaxed text-[#6a6a98]">
          타임테이블 · 앱 사용량 · 데일리 아카이브 · 루틴 캘린더.
          당신의 하루를 정확하게 안내합니다.
        </p>
        <DownloadButton />
      </section>

      <hr className="border-[#1e1e28]" />

      {/* Features — numbered list */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="mb-10 text-xs font-semibold uppercase tracking-widest text-[#3e3e68]">
          주요 기능
        </h2>
        <div className="divide-y divide-[#1a1a24]">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="flex flex-col gap-1.5 py-5 sm:flex-row sm:gap-12"
            >
              <div className="flex shrink-0 items-baseline gap-4 sm:w-52">
                <span className="font-mono text-xs text-[#2e2e48]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium text-[#c8c8e0]">{f.title}</span>
              </div>
              <p className="pl-8 text-sm leading-relaxed text-[#6a6a98] sm:pl-0">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-[#1e1e28]" />

      {/* Archive modes */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3e3e68]">
          데일리 아카이브 모드
        </h2>
        <p className="mb-10 text-sm text-[#3e3e68]">
          생활 패턴에 따라 자정 기준을 유연하게 설정할 수 있습니다.
        </p>
        <div className="grid gap-10 sm:grid-cols-2">
          {archiveModes.map((am) => (
            <div
              key={am.mode}
              className="border-l-2 pl-5"
              style={{ borderColor: am.accent }}
            >
              <p className="mb-1 font-medium text-[#c8c8e0]">{am.mode}</p>
              <p className="mb-5 text-xs text-[#3e3e68]">{am.scenario}</p>
              <ol className="space-y-2.5">
                {am.flow.map((step, idx) => (
                  <li key={idx} className="flex gap-2.5 text-sm text-[#6a6a98]">
                    <span className="shrink-0 font-mono text-xs text-[#3e3e68]">
                      {idx + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-[#1e1e28]" />

      {/* Timeline — mock UI */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3e3e68]">
          타임테이블 &amp; 앱 사용량
        </h2>
        <p className="mb-10 text-sm text-[#3e3e68]">
          하루 24시간을 세로축으로 펼쳐 작업 블록을 시각화합니다.
        </p>
        <div className="grid items-start gap-10 sm:grid-cols-2">
          <ul className="space-y-3 text-sm text-[#6a6a98]">
            {[
              "타임라인 탭 — 작업 세션을 수평 블록으로 표시",
              "앱 사용량 탭 — 각 앱별 누적 사용 시간",
              "작업 외 프로그램을 설정에서 별도 지정",
              "자정 경계를 2줄로 표시해 연속 세션 파악",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-[3px] w-[3px] shrink-0 rounded-full bg-[#7c6cf4]" />
                {item}
              </li>
            ))}
          </ul>

          {/* Mock timeline */}
          <div className="overflow-hidden rounded-lg border border-[#252530] bg-[#13131a] p-4">
            <div className="mb-3 flex gap-2">
              <div className="rounded bg-[#252530] px-2.5 py-1 text-[11px] font-semibold text-[#c8c8e0]">
                타임라인
              </div>
              <div className="px-2.5 py-1 text-[11px] text-[#3e3e68]">앱 사용량</div>
            </div>
            <div className="space-y-[3px] text-[10px] text-[#3e3e68]">
              {timelineRows.map((row, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-8 shrink-0 text-right">{row.time}</span>
                  <div className="flex-1 space-y-[2px]">
                    {row.bars.map((bar, i) => (
                      <div
                        key={i}
                        className="h-2.5 rounded-[2px]"
                        style={{ width: bar.w, backgroundColor: bar.color }}
                      />
                    ))}
                    {row.bars.length === 0 && (
                      <div className="h-px w-full bg-[#1e1e28]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="border-[#1e1e28]" />

      {/* Widget & Themes */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3e3e68]">
          위젯 모드 &amp; 테마
        </h2>
        <p className="mb-10 text-sm text-[#3e3e68]">
          필요할 때 위젯으로 최소화하고, 분위기에 맞는 테마를 적용하세요.
        </p>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { title: "위젯 고정", desc: "Lock Position & Size로 실수 이동·크기 변경을 방지합니다." },
            { title: "독립 테마", desc: "위젯과 메인 화면에 서로 다른 테마를 적용할 수 있습니다." },
            { title: "컬러 시스템", desc: "모든 색상이 테마 테이블로 관리되어 전환이 즉각 반영됩니다." },
          ].map((item) => (
            <div key={item.title}>
              <p className="mb-1.5 text-sm font-medium text-[#c8c8e0]">{item.title}</p>
              <p className="text-sm leading-relaxed text-[#6a6a98]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-[#1e1e28]" />

      {/* Calendar — mock UI */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#3e3e68]">
          루틴 캘린더
        </h2>
        <p className="mb-10 text-sm text-[#3e3e68]">
          반복 루틴을 캘린더에 등록하고 시각적으로 관리합니다.
        </p>
        <div className="grid items-start gap-10 sm:grid-cols-2">
          <ul className="space-y-3 text-sm text-[#6a6a98]">
            {[
              "Ctrl + Drag로 여러 루틴 동시 선택",
              "선택한 루틴을 드래그로 자유롭게 이동",
              "선택 범위를 색상으로 강조 표시",
              "프로젝트별 캘린더 분리 관리",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-[3px] w-[3px] shrink-0 rounded-full bg-[#7c6cf4]" />
                {item}
              </li>
            ))}
          </ul>

          {/* Mock calendar */}
          <div className="overflow-hidden rounded-lg border border-[#252530] bg-[#13131a] p-4">
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-[#252530] px-2 py-0.5 text-[11px] text-[#8888a8]">
                오늘: Feb 6
              </span>
              <span className="rounded bg-[#7c6cf4]/20 px-2 py-0.5 text-[11px] font-medium text-[#9b8dff]">
                Project 9 · Feb 6
              </span>
            </div>
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#c8c8e0]">February 2026</span>
              <div className="flex gap-2 text-[10px] text-[#3e3e68]">
                <span>&lt;</span>
                <span>&gt;</span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-[10px]">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="py-1 font-semibold text-[#3e3e68]">{d}</div>
              ))}
              {[...Array(5)].map((_, i) => <div key={i} />)}
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={`rounded py-1 ${
                    day === 6
                      ? "bg-[#7c6cf4] font-bold text-white"
                      : "text-[#6a6a98]"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1e1e28] px-5 py-8 text-center text-xs text-[#2e2e48]">
        Artisan&apos;s Compass — 장인의 나침반이 당신의 하루를 안내합니다.
      </footer>
    </div>
  );
}
