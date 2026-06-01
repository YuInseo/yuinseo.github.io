"use client";

import { useState } from "react";

type ProjId = "general" | "artisans" | "p2" | "p4" | "p9" | "p6";

interface Todo { id: string; label: string; depth: number; hasChildren?: boolean; done?: boolean; }
interface Project { id: ProjId; label: string; color: string; gs: number; ge: number; todos: Todo[]; time: number[]; }
interface CalEvent { id: string; day: number; project: ProjId; label: string; start: number; end: number; }

const PROJECTS: Project[] = [
  {
    id: "general", label: "일반 작업", color: "#8a8070", gs: 1, ge: 28,
    todos: [
      { id: "g1", label: "이메일 답장", depth: 0, done: true },
      { id: "g2", label: "회의 자료 준비", depth: 0 },
      { id: "g3", label: "주간 정리 문서", depth: 0, done: true },
    ],
    time: [0, 20, 0, 0, 40, 60, 0, 30, 0, 45, 0, 0],
  },
  {
    id: "artisans", label: "Artisan's compass", color: "#4a90e2", gs: 1, ge: 8,
    todos: [
      { id: "a1", label: "타임테이블 UI 개선", depth: 0, hasChildren: true, done: true },
      { id: "a2", label: "색상 팔레트 추가", depth: 1, done: true },
      { id: "a3", label: "애니메이션 적용", depth: 1, done: true },
      { id: "a4", label: "다크모드 수정", depth: 0 },
      { id: "a5", label: "빌드 & 배포", depth: 0 },
    ],
    time: [0, 55, 0, 0, 0, 85, 0, 0, 60, 0, 35, 0],
  },
  {
    id: "p2", label: "Project 2", color: "#e06090", gs: 3, ge: 10,
    todos: [
      { id: "p2a", label: "기획안 작성", depth: 0, done: true },
      { id: "p2b", label: "디자인 시안", depth: 0 },
    ],
    time: [0, 0, 0, 0, 70, 0, 0, 50, 0, 0, 40, 0],
  },
  {
    id: "p4", label: "Project 4", color: "#40b080", gs: 8, ge: 16,
    todos: [
      { id: "p4a", label: "초안 작업", depth: 0, done: true },
      { id: "p4b", label: "피드백 반영", depth: 0, done: true },
      { id: "p4c", label: "최종 납품", depth: 0 },
    ],
    time: [0, 0, 0, 0, 0, 75, 0, 90, 0, 55, 0, 0],
  },
  {
    id: "p9", label: "Project 9", color: "#f0a030", gs: 5, ge: 20,
    todos: [
      { id: "p9a", label: "커미션 A", depth: 0, hasChildren: true, done: true },
      { id: "p9b", label: "레이어 정리", depth: 1, done: true },
      { id: "p9c", label: "선따기", depth: 1, done: true },
      { id: "p9d", label: "채색", depth: 1 },
      { id: "p9e", label: "리터치", depth: 1 },
      { id: "p9f", label: "개인 작업", depth: 0, hasChildren: true },
      { id: "p9g", label: "배경 드로잉", depth: 1 },
      { id: "p9h", label: "최종 정리", depth: 1 },
    ],
    time: [0, 55, 0, 0, 0, 85, 0, 0, 60, 0, 35, 0],
  },
  {
    id: "p6", label: "Project 6", color: "#38bdf8", gs: 15, ge: 24,
    todos: [
      { id: "p6a", label: "리서치", depth: 0, done: true },
      { id: "p6b", label: "프로토타입", depth: 0 },
      { id: "p6c", label: "테스트", depth: 0 },
    ],
    time: [0, 0, 0, 0, 50, 0, 0, 65, 0, 80, 20, 0],
  },
];

// Feb 2–8, 2026 (일~토). Feb 6 = Thu = TODAY
const WEEK_DAYS = [
  { date: 2, label: "일" }, { date: 3, label: "월" }, { date: 4, label: "화" },
  { date: 5, label: "수" }, { date: 6, label: "목" }, { date: 7, label: "금" },
  { date: 8, label: "토" },
];
const TODAY = 6;

const CAL_EVENTS: CalEvent[] = [
  { id: "e1",  day: 2, project: "p9",      label: "커미션 A",    start: 14,   end: 17   },
  { id: "e2",  day: 3, project: "artisans", label: "Artisan's",  start: 13,   end: 16   },
  { id: "e3",  day: 3, project: "p9",      label: "Project 9",  start: 20,   end: 22.5 },
  { id: "e4",  day: 4, project: "p2",      label: "Project 2",  start: 10,   end: 12   },
  { id: "e5",  day: 4, project: "p4",      label: "Project 4",  start: 15,   end: 17.5 },
  { id: "e6",  day: 5, project: "p9",      label: "커미션 A",    start: 11,   end: 14   },
  { id: "e7",  day: 5, project: "p6",      label: "Project 6",  start: 19.5, end: 21   },
  { id: "e8",  day: 6, project: "p9",      label: "커미션 A",    start: 10,   end: 14   },
  { id: "e9",  day: 6, project: "p9",      label: "Project 9",  start: 20,   end: 22   },
  { id: "e10", day: 7, project: "artisans", label: "Artisan's",  start: 11,   end: 13   },
  { id: "e11", day: 7, project: "p6",      label: "Project 6",  start: 17,   end: 20   },
];

const START_H = 10;   // 10:00
const END_H   = 23;   // 23:00
const HOUR_H  = 26;   // px per hour
const TOTAL_H = (END_H - START_H) * HOUR_H;
const TIME_MARKS = [10, 12, 14, 16, 18, 20, 22];

const TIME_LABELS = ["00","02","04","06","08","10","12","14","16","18","20","22"];
const DAYS = 27;

const SHORT_LABEL: Record<ProjId, string> = {
  general: "일반", artisans: "AC", p2: "P2", p4: "P4", p9: "P9", p6: "P6",
};

/* ── desktop top tabs ── */
function Tabs({ activeId, onSelect }: { activeId: ProjId; onSelect: (id: ProjId) => void }) {
  return (
    <div className="hidden items-end overflow-x-auto border-b border-[var(--border)] bg-[var(--bg)] px-1 pt-1 [scrollbar-width:none] lg:flex">
      {PROJECTS.map(p => (
        <button key={p.id} onClick={() => onSelect(p.id)}
          className="relative shrink-0 px-3 pb-2 pt-1.5 text-[11px] font-medium transition-colors"
          style={{ color: activeId === p.id ? p.color : "var(--t5)" }}
        >
          {p.label}
          <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-t-full transition-opacity duration-200"
            style={{ background: p.color, opacity: activeId === p.id ? 1 : 0 }} />
        </button>
      ))}
    </div>
  );
}

/* ── mobile bottom tab bar ── */
function BottomTabBar({ activeId, onSelect }: { activeId: ProjId; onSelect: (id: ProjId) => void }) {
  return (
    <div className="grid grid-cols-6 border-t border-[var(--border)] bg-[var(--surface)]">
      {PROJECTS.map(p => {
        const isActive = p.id === activeId;
        return (
          <button key={p.id} onClick={() => onSelect(p.id)}
            className="flex flex-col items-center gap-1 py-2.5 transition-colors"
            style={{ background: isActive ? `${p.color}1a` : "transparent" }}
          >
            <div className="h-1.5 w-1.5 rounded-full transition-all duration-200"
              style={{ background: isActive ? p.color : "var(--t5)", transform: isActive ? "scale(1.4)" : "scale(1)" }} />
            <span className="text-[9px] font-semibold leading-none transition-colors duration-200"
              style={{ color: isActive ? p.color : "var(--t5)" }}>
              {SHORT_LABEL[p.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── mobile: weekly calendar grid ── */
function CalendarGrid({ activeId }: { activeId: ProjId }) {
  const getColor = (id: ProjId) => PROJECTS.find(p => p.id === id)!.color;

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Day headers */}
      <div className="grid shrink-0 border-b border-[var(--border)] bg-[var(--surface)]"
        style={{ gridTemplateColumns: "34px repeat(7, 1fr)" }}>
        <div />
        {WEEK_DAYS.map(d => (
          <div key={d.date} className="flex flex-col items-center py-1.5 gap-0.5">
            <span className="text-[9px] text-[var(--t5)]">{d.label}</span>
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold"
              style={d.date === TODAY
                ? { background: "var(--accent)", color: "var(--btn-text)" }
                : { color: "var(--t2)" }}
            >
              {d.date}
            </span>
          </div>
        ))}
      </div>

      {/* Grid body */}
      <div className="overflow-y-auto [scrollbar-width:none]" style={{ maxHeight: "260px" }}>
        <div className="grid" style={{ gridTemplateColumns: "34px repeat(7, 1fr)" }}>

          {/* Time labels column */}
          <div className="relative shrink-0" style={{ height: TOTAL_H }}>
            {TIME_MARKS.map(h => (
              <div key={h} className="absolute right-1 text-[8px] leading-none text-[var(--t5)]"
                style={{ top: `${(h - START_H) * HOUR_H - 5}px` }}>
                {h}시
              </div>
            ))}
          </div>

          {/* Day columns */}
          {WEEK_DAYS.map(d => {
            const dayEvents = CAL_EVENTS.filter(e => e.day === d.date);
            return (
              <div key={d.date} className="relative border-l border-[var(--border)]"
                style={{ height: TOTAL_H }}>
                {/* Hour lines */}
                {TIME_MARKS.map(h => (
                  <div key={h} className="absolute w-full border-t border-[var(--border)]"
                    style={{ top: `${(h - START_H) * HOUR_H}px`, opacity: 0.4 }} />
                ))}
                {/* Today column tint */}
                {d.date === TODAY && (
                  <div className="absolute inset-0"
                    style={{ background: "var(--accent)", opacity: 0.04 }} />
                )}
                {/* Events */}
                {dayEvents.map(evt => {
                  const color = getColor(evt.project);
                  const isActive = evt.project === activeId;
                  return (
                    <div key={evt.id}
                      className="absolute inset-x-[1px] overflow-hidden rounded transition-opacity duration-300"
                      style={{
                        top: `${(evt.start - START_H) * HOUR_H + 1}px`,
                        height: `${(evt.end - evt.start) * HOUR_H - 2}px`,
                        background: color,
                        opacity: isActive ? 0.92 : 0.22,
                        boxShadow: isActive ? `0 1px 6px ${color}55` : "none",
                      }}
                    >
                      <p className="truncate px-[3px] pt-[2px] text-[8px] font-semibold leading-tight text-white">
                        {evt.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* End Day */}
      <div className="shrink-0 border-t border-[var(--border)] p-3">
        <button
          className="w-full rounded-lg py-2 text-[12px] font-semibold transition-all hover:brightness-110 active:scale-95"
          style={{ background: PROJECTS.find(p => p.id === activeId)!.color, color: "#fff" }}
        >
          End Day →
        </button>
      </div>
    </div>
  );
}

/* ── desktop: todo + vertical timeline ── */
function ProgressBar({ active, done, total }: { active: Project; done: number; total: number }) {
  const pct = total > 0 ? (done / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-2">
      <span className="shrink-0 text-[11px] font-semibold transition-colors duration-300"
        style={{ color: active.color }}>{active.label}</span>
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--surface-up)]">
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: active.color }} />
      </div>
      <span className="shrink-0 tabular-nums text-[10px] text-[var(--t4)]">{done}/{total}</span>
    </div>
  );
}

function TodoList({ active, doneIds, onToggle }: { active: Project; doneIds: Set<string>; onToggle: (id: string) => void }) {
  return (
    <div className="space-y-0.5 p-2">
      {active.todos.map(item => {
        const done = doneIds.has(item.id);
        return (
          <button key={item.id} onClick={() => onToggle(item.id)}
            className="flex w-full min-w-0 items-center gap-2 rounded-md py-1 pr-2 text-left transition-colors hover:bg-[var(--surface-up)]"
            style={{ paddingLeft: `${item.depth * 16 + 8}px` }}
          >
            <span className="w-2.5 shrink-0 text-[9px] text-[var(--t5)]">
              {item.hasChildren ? "▾" : ""}
            </span>
            <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded text-[8px] font-bold transition-all duration-150"
              style={{ background: done ? active.color : "transparent", border: done ? "none" : "1.5px solid var(--border-hi)", color: "#fff" }}>
              {done ? "✓" : ""}
            </span>
            <span className="truncate transition-all duration-150"
              style={{ color: done ? "var(--t5)" : item.depth === 0 ? "var(--t1)" : "var(--t2)", textDecoration: done ? "line-through" : "none", fontSize: item.depth === 0 ? "12px" : "11px", fontWeight: item.depth === 0 ? 500 : 400 }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function VerticalTimeline({ active }: { active: Project }) {
  return (
    <div className="flex flex-col border-l border-[var(--border)] p-3">
      <p className="mb-1.5 text-[10px] font-semibold text-[var(--t4)]">타임라인</p>
      <div className="flex-1 space-y-[2px]">
        {TIME_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-5 shrink-0 text-right text-[9px] text-[var(--t5)]">{label}</span>
            <div className="flex-1">
              {active.time[i] > 0 ? (
                <div className="h-[7px] rounded-[3px] transition-all duration-500"
                  style={{ width: `${active.time[i]}%`, background: active.color, boxShadow: `0 0 4px ${active.color}55` }} />
              ) : (
                <div className="h-px w-full bg-[var(--border)]" />
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-3 w-full rounded-lg py-1.5 text-[11px] font-semibold transition-all hover:brightness-110 active:scale-95"
        style={{ background: active.color, color: "#fff" }}>
        End Day →
      </button>
    </div>
  );
}

/* ── main ── */
export default function MainScreenMock() {
  const [activeId, setActiveId] = useState<ProjId>("p9");
  const [doneIds, setDoneIds] = useState<Set<string>>(() => {
    const s = new Set<string>();
    PROJECTS.forEach(p => p.todos.forEach(t => { if (t.done) s.add(t.id); }));
    return s;
  });

  const active = PROJECTS.find(p => p.id === activeId)!;
  const doneCount = active.todos.filter(t => doneIds.has(t.id)).length;
  const toggle = (id: string) => setDoneIds(prev => {
    const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next;
  });

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border-hi)] bg-[var(--surface)]"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.28)" }}>

      {/* tabs — desktop only */}
      <Tabs activeId={activeId} onSelect={setActiveId} />

      {/* ── mobile: calendar + bottom tab bar ── */}
      <div className="lg:hidden">
        <CalendarGrid activeId={activeId} />
        <BottomTabBar activeId={activeId} onSelect={setActiveId} />
      </div>

      {/* ── desktop: gantt + todo + timeline ── */}
      <div className="hidden lg:block">
        {/* gantt */}
        <div className="border-b border-[var(--border)] px-4 py-2.5">
          <div className="relative mb-2 ml-[76px] h-3">
            {[1, 7, 14, 21, 28].map(d => (
              <span key={d} className="absolute text-[9px] text-[var(--t5)]"
                style={{ left: `${((d - 1) / DAYS) * 100}%`, transform: "translateX(-50%)" }}>{d}</span>
            ))}
          </div>
          <div className="space-y-1.5">
            {PROJECTS.map(p => (
              <div key={p.id} className="flex items-center gap-2">
                <span className="w-[72px] shrink-0 truncate text-right text-[9px] text-[var(--t5)]">{p.label}</span>
                <div className="relative h-3.5 flex-1 rounded-full bg-[var(--surface-up)]">
                  <button onClick={() => setActiveId(p.id)}
                    className="absolute inset-y-0 rounded-full transition-all duration-300 hover:brightness-110"
                    style={{ left: `${((p.gs - 1) / DAYS) * 100}%`, width: `${((p.ge - p.gs + 1) / DAYS) * 100}%`, background: p.color, opacity: activeId === p.id ? 1 : 0.25, boxShadow: activeId === p.id ? `0 0 8px ${p.color}88` : "none" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* progress */}
        <ProgressBar active={active} done={doneCount} total={active.todos.length} />
        {/* todo + timeline */}
        <div className="grid grid-cols-[1fr_176px]">
          <div className="max-h-[280px] overflow-y-auto [scrollbar-width:none]">
            <TodoList active={active} doneIds={doneIds} onToggle={toggle} />
          </div>
          <VerticalTimeline active={active} />
        </div>
      </div>
    </div>
  );
}
