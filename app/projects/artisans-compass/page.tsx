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
    icon: "⏱",
    title: "타임테이블",
    subtitle: "Timeline",
    description: "하루 동안의 작업 세션을 시각적인 막대 그래프로 확인하세요.",
    detail: "00:00 ~ 24:00 전체 시간축 위에 작업 블록이 표시됩니다.",
  },
  {
    icon: "📊",
    title: "앱 사용량",
    subtitle: "App Usage",
    description: "어떤 앱을 얼마나 사용했는지 자동으로 기록합니다.",
    detail: "예) Endfield.exe 3h 11m · Discord PTB 35m",
  },
  {
    icon: "🗂",
    title: "데일리 아카이브",
    subtitle: "Daily Archive",
    description: "매일의 기록을 아카이브로 저장합니다. 고정/동적 두 가지 모드를 지원합니다.",
    detail: null,
    subFeatures: [
      { label: "고정", desc: "자정 00:00에 정확히 오늘 아카이브 저장 후 다음 날로 전환" },
      { label: "동적", desc: "앱을 닫기 전까지 당일로 기록 — 새벽 작업자를 위한 옵션" },
    ],
  },
  {
    icon: "📅",
    title: "캘린더 & 루틴",
    subtitle: "Calendar",
    description: "Ctrl + Drag로 여러 루틴 동시 선택, 드래그로 자유롭게 이동.",
    detail: "루틴 범위 선택 시 색상으로 구간이 강조됩니다.",
  },
  {
    icon: "🧩",
    title: "위젯 모드",
    subtitle: "Widget",
    description: "앱을 작은 위젯으로 바탕화면에 올려놓으세요.",
    detail: "Lock Position & Size로 실수 이동 방지.",
  },
  {
    icon: "🎨",
    title: "테마",
    subtitle: "Themes",
    description: "다양한 색상 테마. 위젯과 메인 화면에 각각 다른 테마 적용 가능.",
    detail: "모든 색상은 컬러 테이블로 관리됩니다.",
  },
  {
    icon: "⚙️",
    title: "설정 UI",
    subtitle: "Settings",
    description: "타임테이블 카테고리, 작업 외 프로그램 등록, 아카이브 모드 등.",
    detail: "별도 패널로 분리되어 메인 화면을 방해하지 않습니다.",
  },
  {
    icon: "🏷",
    title: "고정 작업 탭",
    subtitle: "Fixed Tasks",
    description: "매일 반복되는 고정 작업을 별도 탭에 등록, 자정에 자동 초기화.",
    detail: "타임테이블 자정 표시 시 이전 날/오늘 2줄로 보입니다.",
  },
];

const archiveModes = [
  {
    mode: "고정 (Fixed)",
    colorCard: "border-[#7c6cf4]/30 bg-[#7c6cf4]/5",
    colorBadge: "bg-[#7c6cf4]/20 text-[#9b8dff]",
    scenario: "예: 24일 자정 00:00",
    flow: [
      "24일 데일리 아카이브 저장",
      "25일 데일리 아카이브로 즉시 전환",
      "아카이브에서 24일 타임테이블 1줄만 표시",
    ],
  },
  {
    mode: "동적 (Dynamic)",
    colorCard: "border-[#e07a40]/30 bg-[#e07a40]/5",
    colorBadge: "bg-[#e07a40]/20 text-[#f0954a]",
    scenario: "예: 24일 자정이 지나도 앱 사용 중",
    flow: [
      "앱을 닫기 전까지 24일로 기록 유지",
      "앱 종료 후 재시작 시 25일 아카이브 시작",
      "아카이브에서 24일/25일 2줄로 표시",
    ],
  },
];

export default function ArtisansCompassPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e2ec]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 text-center sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(124,108,244,0.12), transparent)",
          }}
        />
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7c6cf4]">
          Windows Desktop App
        </p>
        <h1 className="mx-auto mb-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Artisan&apos;s{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7c6cf4, #b09af8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Compass
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-sm text-base text-[#6a6a98] sm:max-w-md">
          타임테이블 · 앱 사용량 · 데일리 아카이브 · 루틴 캘린더.
          <br className="hidden sm:block" />
          당신의 하루를 정확하게 안내합니다.
        </p>
        <div className="mb-10 flex flex-wrap justify-center gap-2 text-xs">
          {["Windows 10/11", "타임테이블", "데일리 아카이브", "루틴 캘린더"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#252530] bg-[#17171e] px-3 py-1.5 text-[#6a6a98]"
            >
              {tag}
            </span>
          ))}
        </div>
        <DownloadButton />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold">주요 기능</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-[#252530] bg-[#17171e] p-5 transition-colors hover:border-[#353548]"
            >
              <div className="mb-3 text-2xl">{f.icon}</div>
              <p className="mb-0.5 text-[10px] font-medium uppercase tracking-widest text-[#3e3e68]">
                {f.subtitle}
              </p>
              <h3 className="mb-2 font-semibold text-[#e2e2ec]">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#6a6a98]">{f.description}</p>
              {f.subFeatures && (
                <ul className="mt-3 space-y-1.5">
                  {f.subFeatures.map((sf) => (
                    <li key={sf.label} className="flex gap-1.5 text-xs text-[#6a6a98]">
                      <span className="shrink-0 font-semibold text-[#7c6cf4]">{sf.label}</span>
                      <span>{sf.desc}</span>
                    </li>
                  ))}
                </ul>
              )}
              {f.detail && !f.subFeatures && (
                <p className="mt-3 rounded-lg bg-[#0f0f14] px-3 py-2 text-xs text-[#3e3e68]">
                  {f.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Archive modes */}
      <section className="border-y border-[#252530] bg-[#17171e]/40 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-[#7c6cf4]">
            Deep Dive
          </p>
          <h2 className="mb-3 text-center text-2xl font-bold">데일리 아카이브 모드</h2>
          <p className="mx-auto mb-12 max-w-md text-center text-sm text-[#6a6a98]">
            생활 패턴에 따라 자정 기준을 유연하게 설정할 수 있습니다.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {archiveModes.map((am) => (
              <div key={am.mode} className={`rounded-xl border p-6 ${am.colorCard}`}>
                <span className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${am.colorBadge}`}>
                  {am.mode}
                </span>
                <p className="mb-4 text-sm text-[#6a6a98]">{am.scenario}</p>
                <ol className="space-y-2.5">
                  {am.flow.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#a0a0c8]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0f0f14]/60 text-[10px] font-bold text-[#6a6a98]">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#7c6cf4]">
              Timeline
            </p>
            <h2 className="mb-4 text-2xl font-bold">타임테이블 & 앱 사용량</h2>
            <p className="mb-5 text-sm leading-relaxed text-[#6a6a98]">
              하루 24시간을 세로축으로 펼쳐 작업 블록을 시각화합니다. 집중 시간과 전환 패턴을 파악하세요.
            </p>
            <ul className="space-y-2.5 text-sm text-[#6a6a98]">
              {[
                "타임라인 탭 — 작업 세션을 수평 블록으로 표시",
                "앱 사용량 탭 — 각 앱별 누적 사용 시간",
                "작업 외 프로그램을 설정에서 별도 지정",
                "자정 경계를 2줄로 표시해 연속 세션 파악",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#7c6cf4]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl border border-[#252530] bg-[#17171e] p-5">
            <div className="mb-4 flex gap-2">
              <div className="rounded-md bg-[#252530] px-3 py-1.5 text-xs font-semibold text-[#e2e2ec]">
                타임라인
              </div>
              <div className="rounded-md px-3 py-1.5 text-xs text-[#3e3e68]">앱 사용량</div>
            </div>
            <div className="space-y-1 text-[10px] text-[#3e3e68]">
              {[
                { time: "00:00", bars: [] },
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
              ].map((row, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-9 shrink-0 text-right">{row.time}</span>
                  <div className="flex-1 space-y-0.5">
                    {row.bars.map((bar, i) => (
                      <div
                        key={i}
                        className="h-3 rounded-sm"
                        style={{ width: bar.w, backgroundColor: bar.color }}
                      />
                    ))}
                    {row.bars.length === 0 && (
                      <div className="h-px w-full" style={{ backgroundColor: "#1e1e28" }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Widget & Themes */}
      <section className="border-t border-[#252530] bg-[#17171e]/40 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#e07a40]">
            Customization
          </p>
          <h2 className="mb-4 text-2xl font-bold">위젯 모드 & 테마</h2>
          <p className="mx-auto mb-12 max-w-sm text-sm text-[#6a6a98]">
            필요할 때 위젯으로 최소화하고, 원하는 분위기에 맞는 테마를 적용하세요.
          </p>
          <div className="grid gap-4 text-left sm:grid-cols-3">
            {[
              { title: "위젯 고정", desc: "Lock Position & Size로 실수 이동·크기 변경 방지.", icon: "🔒" },
              { title: "독립 테마", desc: "위젯 모드와 메인 화면에 각각 다른 테마 적용.", icon: "🎨" },
              { title: "컬러 시스템", desc: "모든 색상이 테마 테이블로 관리되어 전환이 즉각적.", icon: "🌈" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[#252530] bg-[#17171e] p-5">
                <div className="mb-2.5 text-2xl">{item.icon}</div>
                <h3 className="mb-1.5 font-semibold text-[#e2e2ec]">{item.title}</h3>
                <p className="text-sm text-[#6a6a98]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1 overflow-hidden rounded-xl border border-[#252530] bg-[#17171e] p-5">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-[#252530] px-2.5 py-1 text-xs text-[#a0a0c8]">오늘: Feb 6</span>
              <span className="rounded-lg bg-[#7c6cf4]/20 px-2.5 py-1 text-xs font-semibold text-[#9b8dff]">
                Project 9 · Feb 6
              </span>
            </div>
            <div className="mb-3 flex items-center justify-between text-sm font-bold text-[#e2e2ec]">
              <span>February 2026</span>
              <div className="flex gap-2 text-[#3e3e68]">
                <span>&lt;</span>
                <span>&gt;</span>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-[#3e3e68]">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="py-1 font-semibold">{d}</div>
              ))}
              {[...Array(5)].map((_, i) => <div key={i} />)}
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={`rounded-md py-1.5 text-xs ${
                    day === 6
                      ? "bg-[#7c6cf4] font-bold text-white"
                      : "text-[#6a6a98] hover:bg-[#252530]"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#7c6cf4]">
              Calendar
            </p>
            <h2 className="mb-4 text-2xl font-bold">루틴 캘린더</h2>
            <p className="mb-5 text-sm leading-relaxed text-[#6a6a98]">
              반복 루틴을 캘린더에 등록하고 시각적으로 관리하세요.
            </p>
            <ul className="space-y-2.5 text-sm text-[#6a6a98]">
              {[
                "Ctrl + Drag로 여러 루틴 동시 선택",
                "선택한 루틴을 드래그로 자유롭게 이동",
                "선택 범위를 색상으로 강조 표시",
                "프로젝트별 캘린더 분리 관리",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#7c6cf4]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#252530] px-4 py-8 text-center text-xs text-[#3e3e68]">
        Artisan&apos;s Compass — 장인의 나침반이 당신의 하루를 안내합니다.
      </footer>
    </div>
  );
}
