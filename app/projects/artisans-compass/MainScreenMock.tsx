"use client";

import { useState } from "react";

type ProjId = "general" | "artisans" | "p2" | "p4" | "p9" | "p6";

interface Todo {
  id: string;
  label: string;
  depth: number;
  hasChildren?: boolean;
  done?: boolean;
}

interface Project {
  id: ProjId;
  label: string;
  color: string;
  gs: number;
  ge: number;
  todos: Todo[];
  time: number[];
}

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

const TIME_LABELS = ["00","02","04","06","08","10","12","14","16","18","20","22"];
const DAYS = 27;

/* ─── shared sub-components ─── */

function Tabs({ activeId, onSelect }: { activeId: ProjId; onSelect: (id: ProjId) => void }) {
  return (
    <div className="flex items-end overflow-x-auto border-b border-[var(--border)] bg-[var(--bg)] px-1 pt-1 [scrollbar-width:none]">
      {PROJECTS.map(p => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className="relative shrink-0 px-3 pb-2 pt-1.5 text-[11px] font-medium transition-colors"
          style={{ color: activeId === p.id ? p.color : "var(--t5)" }}
        >
          {p.label}
          <span
            className="absolute inset-x-1 bottom-0 h-0.5 rounded-t-full transition-opacity duration-200"
            style={{ background: p.color, opacity: activeId === p.id ? 1 : 0 }}
          />
        </button>
      ))}
    </div>
  );
}

function ProgressBar({ active, doneCount, total }: { active: Project; doneCount: number; total: number }) {
  const pct = total > 0 ? (doneCount / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-2">
      <span className="shrink-0 text-[11px] font-semibold transition-colors duration-300" style={{ color: active.color }}>
        {active.label}
      </span>
      <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--surface-up)]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: active.color }}
        />
      </div>
      <span className="shrink-0 tabular-nums text-[10px] text-[var(--t4)]">{doneCount}/{total}</span>
    </div>
  );
}

function TodoList({
  active, doneIds, onToggle,
}: {
  active: Project;
  doneIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-0.5 p-2">
      {active.todos.map(item => {
        const done = doneIds.has(item.id);
        return (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className="flex w-full min-w-0 items-center gap-2 rounded-md py-1 pr-2 text-left transition-colors hover:bg-[var(--surface-up)]"
            style={{ paddingLeft: `${item.depth * 16 + 8}px` }}
          >
            <span className="w-2.5 shrink-0 text-[9px] text-[var(--t5)]">
              {item.hasChildren ? "▾" : ""}
            </span>
            <span
              className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded text-[8px] font-bold transition-all duration-150"
              style={{
                background: done ? active.color : "transparent",
                border: done ? "none" : "1.5px solid var(--border-hi)",
                color: "#fff",
              }}
            >
              {done ? "✓" : ""}
            </span>
            <span
              className="truncate transition-all duration-150"
              style={{
                color: done ? "var(--t5)" : item.depth === 0 ? "var(--t1)" : "var(--t2)",
                textDecoration: done ? "line-through" : "none",
                fontSize: item.depth === 0 ? "12px" : "11px",
                fontWeight: item.depth === 0 ? 500 : 400,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* vertical bars (desktop right panel) */
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
                <div
                  className="h-[7px] rounded-[3px] transition-all duration-500"
                  style={{
                    width: `${active.time[i]}%`,
                    background: active.color,
                    boxShadow: `0 0 4px ${active.color}55`,
                  }}
                />
              ) : (
                <div className="h-px w-full bg-[var(--border)]" />
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-3 w-full rounded-lg py-1.5 text-[11px] font-semibold transition-all hover:brightness-110 active:scale-95"
        style={{ background: active.color, color: "#fff" }}
      >
        End Day →
      </button>
    </div>
  );
}

/* horizontal bars (mobile bottom strip) */
function HorizontalTimeline({ active }: { active: Project }) {
  const max = Math.max(...active.time, 1);
  return (
    <div className="border-t border-[var(--border)] px-3 pb-3 pt-2">
      <p className="mb-2 text-[10px] font-semibold text-[var(--t4)]">타임라인</p>
      <div className="flex items-end gap-[3px]" style={{ height: "44px" }}>
        {TIME_LABELS.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-0.5">
            <div className="flex w-full flex-1 items-end">
              {active.time[i] > 0 ? (
                <div
                  className="w-full rounded-sm transition-all duration-500"
                  style={{
                    height: `${Math.round((active.time[i] / max) * 32) + 4}px`,
                    background: active.color,
                    opacity: 0.85,
                    boxShadow: `0 0 4px ${active.color}44`,
                  }}
                />
              ) : (
                <div className="mb-0.5 w-full" style={{ height: "2px", background: "var(--border)" }} />
              )}
            </div>
            <span className="text-[8px] leading-none text-[var(--t5)]">{label}</span>
          </div>
        ))}
      </div>
      <button
        className="mt-3 w-full rounded-lg py-2 text-[12px] font-semibold transition-all hover:brightness-110 active:scale-95"
        style={{ background: active.color, color: "#fff" }}
      >
        End Day →
      </button>
    </div>
  );
}

/* ─── main export ─── */

export default function MainScreenMock() {
  const [activeId, setActiveId] = useState<ProjId>("p9");
  const [doneIds, setDoneIds] = useState<Set<string>>(() => {
    const s = new Set<string>();
    PROJECTS.forEach(p => p.todos.forEach(t => { if (t.done) s.add(t.id); }));
    return s;
  });

  const active = PROJECTS.find(p => p.id === activeId)!;
  const doneCount = active.todos.filter(t => doneIds.has(t.id)).length;

  const toggle = (id: string) =>
    setDoneIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div
      className="overflow-hidden rounded-xl border border-[var(--border-hi)] bg-[var(--surface)]"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.28)" }}
    >
      {/* tabs — shared */}
      <Tabs activeId={activeId} onSelect={setActiveId} />

      {/* gantt — desktop only */}
      <div className="hidden border-b border-[var(--border)] px-4 py-2.5 lg:block">
        <div className="relative mb-2 ml-[76px] h-3">
          {[1, 7, 14, 21, 28].map(d => (
            <span
              key={d}
              className="absolute text-[9px] text-[var(--t5)]"
              style={{ left: `${((d - 1) / DAYS) * 100}%`, transform: "translateX(-50%)" }}
            >
              {d}
            </span>
          ))}
        </div>
        <div className="space-y-1.5">
          {PROJECTS.map(p => (
            <div key={p.id} className="flex items-center gap-2">
              <span className="w-[72px] shrink-0 truncate text-right text-[9px] text-[var(--t5)]">
                {p.label}
              </span>
              <div className="relative h-3.5 flex-1 rounded-full bg-[var(--surface-up)]">
                <button
                  onClick={() => setActiveId(p.id)}
                  className="absolute inset-y-0 rounded-full transition-all duration-300 hover:brightness-110"
                  style={{
                    left: `${((p.gs - 1) / DAYS) * 100}%`,
                    width: `${((p.ge - p.gs + 1) / DAYS) * 100}%`,
                    background: p.color,
                    opacity: activeId === p.id ? 1 : 0.25,
                    boxShadow: activeId === p.id ? `0 0 8px ${p.color}88` : "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* progress bar — shared */}
      <ProgressBar active={active} doneCount={doneCount} total={active.todos.length} />

      {/* ── mobile layout ── */}
      <div className="lg:hidden">
        <div className="max-h-[220px] overflow-y-auto [scrollbar-width:none]">
          <TodoList active={active} doneIds={doneIds} onToggle={toggle} />
        </div>
        <HorizontalTimeline active={active} />
      </div>

      {/* ── desktop layout ── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_176px]">
        <div className="max-h-[280px] overflow-y-auto [scrollbar-width:none]">
          <TodoList active={active} doneIds={doneIds} onToggle={toggle} />
        </div>
        <VerticalTimeline active={active} />
      </div>
    </div>
  );
}
