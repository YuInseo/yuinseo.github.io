// Project tabs
const tabs = [
  { label: "일반 작업", accent: false },
  { label: "Artisan's compass", accent: false },
  { label: "Project 2", accent: false },
  { label: "Project 4", accent: false },
  { label: "Project 9", accent: true },
  { label: "Project 6", accent: false },
];

// Horizontal gantt bars (% offsets out of 21 days: Feb 1–21)
const ganttBars = [
  { label: "Artisan's compass", left: "0%",   width: "38%", dimmed: false },
  { label: "Project 2",         left: "9%",   width: "24%", dimmed: true  },
  { label: "Project 4",         left: "24%",  width: "19%", dimmed: true  },
  { label: "Project 9",         left: "19%",  width: "57%", dimmed: false },
  { label: "Project 6",         left: "47%",  width: "24%", dimmed: true  },
];

const ganttDays = Array.from({ length: 21 }, (_, i) => i + 1);

// Todo items (flat, depth-aware)
const todos = [
  { label: "커미션 A",     done: true,  depth: 0, hasChildren: true },
  { label: "레이어 정리",   done: true,  depth: 1, hasChildren: false },
  { label: "선따기",        done: true,  depth: 1, hasChildren: false },
  { label: "채색",          done: false, depth: 1, hasChildren: false },
  { label: "리터치",        done: false, depth: 1, hasChildren: false },
  { label: "개인 작업",     done: false, depth: 0, hasChildren: true },
  { label: "배경 드로잉",   done: false, depth: 1, hasChildren: false },
  { label: "최종 정리",     done: false, depth: 1, hasChildren: false },
];

// Vertical time graph
const timeRows = [
  { time: "00",  pct: 0  },
  { time: "02",  pct: 55 },
  { time: "04",  pct: 0  },
  { time: "06",  pct: 0  },
  { time: "08",  pct: 0  },
  { time: "10",  pct: 85 },
  { time: "12",  pct: 0  },
  { time: "14",  pct: 0  },
  { time: "16",  pct: 60 },
  { time: "18",  pct: 0  },
  { time: "20",  pct: 35 },
  { time: "22",  pct: 0  },
];

export default function MainScreenMock() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-[var(--border-hi)] bg-[var(--surface)]"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.18)" }}
    >
      {/* ── Project tabs ── */}
      <div className="flex items-center gap-0.5 overflow-x-auto border-b border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 [scrollbar-width:none]">
        {tabs.map((t) => (
          <span
            key={t.label}
            className="shrink-0 rounded px-2.5 py-1 text-[11px] font-medium transition-colors"
            style={
              t.accent
                ? { background: "var(--accent)", color: "var(--btn-text)" }
                : { color: "var(--t4)" }
            }
          >
            {t.label}
          </span>
        ))}
      </div>

      {/* ── Horizontal gantt (hidden on mobile) ── */}
      <div className="hidden border-b border-[var(--border)] px-3 py-2 lg:block">
        {/* day ruler */}
        <div className="relative mb-1 flex">
          {ganttDays.map((d) => (
            <div key={d} className="flex-1 text-center text-[8px] text-[var(--t5)]">
              {d % 3 === 1 ? d : ""}
            </div>
          ))}
        </div>
        {/* bars */}
        <div className="space-y-1">
          {ganttBars.map((bar) => (
            <div key={bar.label} className="relative h-4">
              <div
                className="absolute top-0 flex h-full items-center rounded px-1.5 text-[9px] font-medium"
                style={{
                  left: bar.left,
                  width: bar.width,
                  background: bar.dimmed ? "var(--surface-up)" : "var(--accent)",
                  color: bar.dimmed ? "var(--t4)" : "var(--btn-text)",
                  opacity: bar.dimmed ? 0.7 : 1,
                }}
              >
                <span className="truncate">{bar.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main panels ── */}
      <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_200px]">

        {/* Left — todo list */}
        <div className="min-w-0 p-3">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--t2)]">Project 9</span>
            <span className="text-[10px] text-[var(--t5)]">Feb 6, 2026</span>
          </div>
          <div className="space-y-0.5">
            {todos.map((item, i) => (
              <div
                key={i}
                className="flex min-w-0 items-center gap-1.5 rounded py-0.5 pr-1 text-[12px]"
                style={{ paddingLeft: `${item.depth * 16 + 4}px` }}
              >
                {/* collapse arrow placeholder */}
                {item.hasChildren ? (
                  <span className="shrink-0 text-[9px] text-[var(--t5)]">▾</span>
                ) : (
                  <span className="w-[10px] shrink-0" />
                )}
                {/* checkbox */}
                <span
                  className="shrink-0 text-[11px]"
                  style={{ color: item.done ? "var(--accent)" : "var(--t5)" }}
                >
                  {item.done ? "✓" : "○"}
                </span>
                <span
                  className="truncate"
                  style={{
                    color: item.done ? "var(--t4)" : item.depth === 0 ? "var(--t1)" : "var(--t2)",
                    textDecoration: item.done ? "line-through" : "none",
                    fontSize: item.depth === 0 ? "12px" : "11px",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — time graph + end button */}
        <div className="flex w-28 flex-col border-l border-[var(--border)] p-3 lg:w-[200px]">
          <p className="mb-2 text-[10px] font-semibold text-[var(--t4)]">타임라인</p>
          <div className="flex-1 space-y-[3px]">
            {timeRows.map((row) => (
              <div key={row.time} className="flex items-center gap-1">
                <span className="w-5 shrink-0 text-right text-[9px] text-[var(--t5)]">
                  {row.time}
                </span>
                <div className="flex-1">
                  {row.pct > 0 ? (
                    <div
                      className="h-[7px] rounded-[2px]"
                      style={{ width: `${row.pct}%`, backgroundColor: "var(--tl-a)" }}
                    />
                  ) : (
                    <div className="h-px w-full bg-[var(--border)]" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* End Day button */}
          <button
            className="mt-4 w-full rounded-md py-1.5 text-[11px] font-semibold"
            style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}
          >
            End Day →
          </button>
        </div>
      </div>
    </div>
  );
}
