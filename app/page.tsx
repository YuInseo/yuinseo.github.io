import type { Metadata } from "next";

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
    description:
      "하루 동안의 작업 세션을 시각적인 막대 그래프로 확인하세요. 언제 집중했는지, 언제 쉬었는지 한눈에 파악할 수 있습니다.",
    detail: "00:00 ~ 24:00 전체 시간축 위에 작업 블록이 표시됩니다.",
  },
  {
    icon: "📊",
    title: "앱 사용량",
    subtitle: "App Usage",
    description:
      "어떤 앱을 얼마나 사용했는지 자동으로 기록합니다. 작업 외 프로그램과 메인 작업 도구를 구분해 집중도를 측정하세요.",
    detail: "예) Endfield.exe 3h 11m · Discord PTB 35m",
  },
  {
    icon: "🗂",
    title: "데일리 아카이브",
    subtitle: "Daily Archive",
    description:
      "매일의 기록을 아카이브로 저장합니다. 고정 모드와 동적 모드를 선택해 자정 기준을 유연하게 설정할 수 있습니다.",
    detail: null,
    subFeatures: [
      {
        label: "고정 모드",
        desc: "자정 00:00에 정확히 오늘 아카이브 저장 → 다음 날 아카이브로 전환",
      },
      {
        label: "동적 모드",
        desc: "Artisan's Compass를 닫기 전까지 당일로 기록 — 새벽 작업자를 위한 옵션",
      },
    ],
  },
  {
    icon: "📅",
    title: "캘린더 & 루틴",
    subtitle: "Calendar & Routines",
    description:
      "반복되는 일상 루틴을 캘린더에 등록하고 관리하세요. Ctrl + Drag로 여러 루틴을 동시에 선택하고, 드래그로 자유롭게 이동할 수 있습니다.",
    detail: "루틴 범위 선택 시 색상으로 구간이 강조됩니다.",
  },
  {
    icon: "🧩",
    title: "위젯 모드",
    subtitle: "Widget Mode",
    description:
      "앱을 작은 위젯으로 바탕화면에 올려놓으세요. 위젯 고정 잠금, 크기·위치 조절, 테마를 독립적으로 설정할 수 있습니다.",
    detail: "Lock Position & Size 기능으로 실수로 움직이는 것을 방지합니다.",
  },
  {
    icon: "🎨",
    title: "테마",
    subtitle: "Themes",
    description:
      "다양한 색상 테마를 제공합니다. 앱 전체에 적용되는 컬러 시스템으로 작업 외 앱 사용량에도 별도 색상이 표시됩니다.",
    detail: "모든 색상 값은 컬러 테이블로 관리되어 테마 간 전환이 즉각적입니다.",
  },
  {
    icon: "⚙️",
    title: "설정 UI",
    subtitle: "Settings",
    description:
      "타임테이블 카테고리, 작업 외 프로그램 등록, 데일리 아카이브 모드 등 세부 동작을 직접 조정할 수 있습니다.",
    detail: "설정은 별도 패널로 분리되어 있어 메인 화면을 방해하지 않습니다.",
  },
  {
    icon: "🏷",
    title: "매일 고정 작업 탭",
    subtitle: "Fixed Daily Tasks",
    description:
      "매일 반복되는 고정 작업을 별도의 탭에 등록하세요. 자정이 지나면 자동으로 초기화되어 새 하루를 깔끔하게 시작합니다.",
    detail: "타임테이블 자정 표시 시 이전 날/오늘 2줄로 함께 보입니다.",
  },
];

const archiveModes = [
  {
    mode: "고정 (Fixed)",
    color: "border-blue-500/40 bg-blue-950/20",
    badgeColor: "bg-blue-500/20 text-blue-300",
    scenario: "예: 24일 자정 00:00",
    flow: [
      "24일 데일리 아카이브 저장",
      "25일 데일리 아카이브로 즉시 전환",
      "데일리 아카이브에서 24일 타임테이블 1줄만 표시",
    ],
  },
  {
    mode: "동적 (Dynamic)",
    color: "border-purple-500/40 bg-purple-950/20",
    badgeColor: "bg-purple-500/20 text-purple-300",
    scenario: "예: 24일 자정이 지나도 앱 사용 중",
    flow: [
      "Artisan's Compass를 닫기 전까지 24일로 기록 유지",
      "앱 종료 후 재시작 시 25일 데일리 아카이브 시작",
      "데일리 아카이브에서 24일/25일 앱 닫기 전 2줄로 표시",
    ],
  },
];

export default function ArtisansCompassPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.15),transparent)]"
        />
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
          Desktop Productivity App
        </p>
        <h1 className="mx-auto mb-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Artisan&apos;s&nbsp;
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Compass
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-400">
          타임테이블 · 앱 사용량 · 데일리 아카이브 · 루틴 캘린더.
          <br />
          장인의 나침반처럼, 당신의 하루를 정확하게 안내합니다.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {["Windows", "타임테이블", "앱 사용량 추적", "데일리 아카이브", "루틴 캘린더"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-zinc-300"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">주요 기능</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-white/8 bg-white/4 p-6 transition-colors hover:border-white/15 hover:bg-white/6"
            >
              <div className="mb-4 text-3xl">{f.icon}</div>
              <p className="mb-0.5 text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                {f.subtitle}
              </p>
              <h3 className="mb-3 text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{f.description}</p>
              {f.subFeatures && (
                <ul className="mt-4 space-y-2">
                  {f.subFeatures.map((sf) => (
                    <li key={sf.label} className="flex gap-2 text-xs text-zinc-400">
                      <span className="mt-0.5 shrink-0 font-semibold text-blue-400">
                        {sf.label}
                      </span>
                      <span>{sf.desc}</span>
                    </li>
                  ))}
                </ul>
              )}
              {f.detail && !f.subFeatures && (
                <p className="mt-4 rounded-lg bg-white/4 px-3 py-2 text-xs text-zinc-500">
                  {f.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Archive mode deep-dive */}
      <section className="border-y border-white/6 bg-white/2 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-blue-400">
            Deep Dive
          </p>
          <h2 className="mb-4 text-center text-3xl font-bold">데일리 아카이브 모드</h2>
          <p className="mx-auto mb-14 max-w-lg text-center text-sm text-zinc-400">
            생활 패턴에 따라 자정 기준을 유연하게 설정할 수 있습니다. 새벽에 작업하는 분들을
            위한 동적 모드를 지원합니다.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {archiveModes.map((am) => (
              <div
                key={am.mode}
                className={`rounded-2xl border p-7 ${am.color}`}
              >
                <span
                  className={`mb-5 inline-block rounded-full px-3 py-1 text-xs font-semibold ${am.badgeColor}`}
                >
                  {am.mode}
                </span>
                <p className="mb-4 text-sm text-zinc-400">{am.scenario}</p>
                <ol className="space-y-3">
                  {am.flow.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-zinc-400">
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

      {/* Timeline visual */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">
              Timeline
            </p>
            <h2 className="mb-5 text-3xl font-bold">타임테이블 &amp; 앱 사용량</h2>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              하루 24시간을 세로축으로 펼쳐 작업 블록을 시각화합니다. 메인 작업 앱과 기타 앱을
              구분해 집중 시간과 전환 패턴을 파악하세요.
            </p>
            <ul className="space-y-3 text-sm text-zinc-400">
              {[
                "타임라인 탭 — 작업 세션을 수평 블록으로 표시",
                "앱 사용량 탭 — 각 앱별 누적 사용 시간",
                "작업 외 프로그램을 설정에서 별도 지정 가능",
                "자정 경계를 2줄로 표시해 연속 세션 파악 가능",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Mock timeline */}
          <div className="rounded-2xl border border-white/8 bg-[#111114] p-6">
            <div className="mb-4 flex gap-2">
              <div className="rounded-md bg-white/10 px-4 py-1.5 text-xs font-semibold text-white">
                타임라인
              </div>
              <div className="rounded-md px-4 py-1.5 text-xs text-zinc-500">앱 사용량</div>
            </div>
            <div className="relative space-y-1 text-[10px] text-zinc-600">
              {[
                { time: "00:00", bars: [] },
                { time: "02:00", bars: [{ w: "55%", color: "bg-blue-500" }] },
                { time: "04:00", bars: [] },
                { time: "06:00", bars: [] },
                { time: "08:00", bars: [] },
                {
                  time: "10:00",
                  bars: [{ w: "90%", color: "bg-blue-400" }],
                },
                { time: "12:00", bars: [] },
                { time: "14:00", bars: [] },
                {
                  time: "16:00",
                  bars: [
                    { w: "60%", color: "bg-blue-500" },
                    { w: "55%", color: "bg-zinc-600", mt: true },
                  ],
                },
                { time: "18:00", bars: [] },
                {
                  time: "20:00",
                  bars: [{ w: "40%", color: "bg-blue-600" }],
                },
                { time: "22:00", bars: [] },
                { time: "00:00", bars: [] },
              ].map((row) => (
                <div key={`${row.time}-${row.bars.length}`} className="flex items-center gap-3">
                  <span className="w-10 shrink-0 text-right">{row.time}</span>
                  <div className="relative flex-1 space-y-0.5">
                    {row.bars.map((bar, i) => (
                      <div
                        key={i}
                        className={`h-3 rounded-sm ${bar.color}`}
                        style={{ width: bar.w }}
                      />
                    ))}
                    {row.bars.length === 0 && (
                      <div className="h-px w-full bg-white/5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Widget & Themes */}
      <section className="border-t border-white/6 bg-white/2 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-400">
            Customization
          </p>
          <h2 className="mb-5 text-3xl font-bold">위젯 모드 &amp; 테마</h2>
          <p className="mx-auto mb-14 max-w-lg text-sm text-zinc-400">
            필요할 때 위젯으로 최소화하고, 원하는 분위기에 맞는 테마를 적용하세요.
          </p>
          <div className="grid gap-5 text-left sm:grid-cols-3">
            {[
              {
                title: "위젯 고정",
                desc: "Lock Position & Size로 실수로 위젯을 이동하거나 크기를 바꾸는 것을 방지합니다.",
                icon: "🔒",
              },
              {
                title: "독립 테마",
                desc: "위젯 모드와 메인 화면에 서로 다른 테마를 적용할 수 있습니다.",
                icon: "🎨",
              },
              {
                title: "컬러 시스템",
                desc: "모든 색상은 테마 컬러 테이블로 관리되어 전환 시 즉각 반영됩니다.",
                icon: "🌈",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/8 bg-[#111114] p-6"
              >
                <div className="mb-3 text-2xl">{item.icon}</div>
                <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar routines */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="rounded-2xl border border-white/8 bg-[#111114] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-white/8 px-3 py-1 text-xs text-zinc-300">
                    오늘: Feb 6
                  </span>
                  <span className="rounded-lg bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                    Project 9 · MAIN · Feb 6
                  </span>
                </div>
              </div>
              <div className="mb-3 flex items-center justify-between text-sm font-bold text-white">
                <span>February 2026</span>
                <div className="flex gap-2 text-zinc-400">
                  <span>&lt;</span>
                  <span>&gt;</span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-zinc-500">
                {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((d) => (
                  <div key={d} className="py-1 font-semibold">
                    {d}
                  </div>
                ))}
                {[...Array(5)].map((_, i) => (
                  <div key={i} />
                ))}
                {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`rounded-md py-1.5 ${
                      day === 6
                        ? "bg-blue-500 font-bold text-white"
                        : "text-zinc-400 hover:bg-white/5"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-400">
              Calendar
            </p>
            <h2 className="mb-5 text-3xl font-bold">루틴 캘린더</h2>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              반복 루틴을 캘린더에 등록하고 시각적으로 관리하세요. 여러 루틴을 한 번에
              선택·이동할 수 있어 일정 재조정이 빠릅니다.
            </p>
            <ul className="space-y-3 text-sm text-zinc-400">
              {[
                "Ctrl + Drag로 여러 루틴 동시 선택",
                "선택한 루틴을 드래그로 자유롭게 이동",
                "선택 범위를 색상으로 강조 표시",
                "프로젝트별 캘린더 분리 관리",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 px-6 py-10 text-center text-sm text-zinc-600">
        <p>Artisan&apos;s Compass — 장인의 나침반이 당신의 하루를 안내합니다.</p>
      </footer>
    </div>
  );
}
