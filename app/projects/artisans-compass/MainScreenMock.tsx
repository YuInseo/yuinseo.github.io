const todoTree = [
  {
    label: "커미션 A",
    done: true,
    children: [
      { label: "레이어 정리", done: true },
      { label: "선따기", done: true },
      { label: "채색", done: false },
    ],
  },
  {
    label: "개인 작업",
    done: false,
    children: [
      { label: "배경 드로잉", done: false },
      { label: "최종 정리", done: false },
    ],
  },
  {
    label: "Artisan's compass 내일 작업을 정리하세요 →",
    done: false,
    children: [],
  },
];

const timelineBars = [
  { time: "00:00", w: null },
  { time: "02:00", w: "55%" },
  { time: "04:00", w: null },
  { time: "08:00", w: null },
  { time: "10:00", w: "85%" },
  { time: "12:00", w: null },
  { time: "14:00", w: null },
  { time: "16:00", w: "60%" },
  { time: "18:00", w: null },
  { time: "20:00", w: "35%" },
  { time: "22:00", w: null },
];

export default function MainScreenMock() {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border-hi)] bg-[var(--surface)]">
      {/* top bar */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2">
        <span className="text-[10px] text-[var(--t5)]">일반 작업</span>
        <span className="rounded bg-[var(--surface-up)] px-1.5 py-0.5 text-[10px] text-[var(--t3)]">
          Artisan&apos;s compass
        </span>
        <span className="text-[10px] text-[var(--t5)]">Project 2</span>
        <span className="text-[10px] text-[var(--t5)]">Project 4</span>
        <span className="rounded bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--btn-text)]">
          Project 9
        </span>
        <span className="ml-auto text-[10px] text-[var(--t5)]">Project 6</span>
      </div>

      {/* 3-panel body */}
      <div className="grid grid-cols-1 divide-y divide-[var(--border)] lg:grid-cols-[1fr_1.4fr_0.9fr] lg:divide-x lg:divide-y-0">

        {/* Left — timelapse */}
        <div className="p-3">
          <p className="mb-2 text-[10px] font-semibold text-[var(--t4)]">타임랩스 플레이어</p>
          <div className="mb-2 grid grid-cols-3 gap-1">
            {[55, 42, 68, 35, 78, 48, 62, 30, 72].map((opacity, i) => (
              <div
                key={i}
                className="aspect-video rounded-sm"
                style={{ backgroundColor: `color-mix(in srgb, var(--tl-a) ${opacity}%, var(--surface-up))` }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-[var(--t5)]">
            <span>&lt;</span>
            <span>5 / 12</span>
            <span>&gt;</span>
          </div>
        </div>

        {/* Center — To-Do log */}
        <div className="p-3">
          <div className="mb-2 flex items-center gap-2">
            <p className="text-[10px] font-semibold text-[var(--t4)]">Today&apos;s Log</p>
            <span className="text-[10px] text-[var(--t5)]">Project 9 · Feb 6</span>
          </div>
          <div className="space-y-1 text-[11px]">
            {todoTree.map((item) => (
              <div key={item.label}>
                <div className="flex items-start gap-1.5">
                  <span className={`mt-0.5 shrink-0 text-[10px] ${item.done ? "text-[var(--accent)]" : "text-[var(--t5)]"}`}>
                    {item.done ? "✓" : "○"}
                  </span>
                  <span className={item.done ? "text-[var(--t4)] line-through" : "text-[var(--t2)]"}>
                    {item.label}
                  </span>
                </div>
                {item.children.map((child) => (
                  <div key={child.label} className="ml-4 mt-0.5 flex items-start gap-1.5">
                    <span className={`mt-0.5 shrink-0 text-[10px] ${child.done ? "text-[var(--accent)]" : "text-[var(--t5)]"}`}>
                      {child.done ? "✓" : "○"}
                    </span>
                    <span className={`text-[10px] ${child.done ? "text-[var(--t4)] line-through" : "text-[var(--t3)]"}`}>
                      {child.label}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right — stats */}
        <div className="p-3">
          <p className="mb-2 text-[10px] font-semibold text-[var(--t4)]">타임라인</p>
          <div className="mb-3 space-y-[3px]">
            {timelineBars.map((row) => (
              <div key={row.time} className="flex items-center gap-1.5">
                <span className="w-7 shrink-0 text-right text-[9px] text-[var(--t5)]">{row.time}</span>
                <div className="flex-1">
                  {row.w
                    ? <div className="h-2 rounded-[2px]" style={{ width: row.w, backgroundColor: "var(--tl-a)" }} />
                    : <div className="h-px w-full bg-[var(--border)]" />
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="mb-3 flex items-center gap-1.5 rounded bg-[var(--surface-up)] px-2 py-1.5">
            <span className="text-[10px] text-[var(--accent)]">✓</span>
            <span className="text-[10px] text-[var(--t3)]">Quest 달성</span>
          </div>

          <button className="w-full rounded bg-[var(--btn-bg)] py-1.5 text-[10px] font-semibold text-[var(--btn-text)]">
            End
          </button>
        </div>
      </div>
    </div>
  );
}
