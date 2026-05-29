"use client";

import { useState } from "react";
import { TimeTableGraph } from "./artisans/components/dashboard/TimeTableGraph";
import type { Session, Project, AppSettings } from "./artisans/types";

// ─── Colors ───────────────────────────────────────────────────────────────────
const BG  = "#0d0d0d";
const S   = "#1a1714";
const SU  = "#242120";
const B   = "#2e2a27";
const BH  = "#3e3a36";
const T1  = "#f8f4ee";
const T2  = "#c8bfb0";
const T3  = "#8a8070";
const T4  = "#5a5248";
const T5  = "#3a3530";
const ACC = "#f0a030";

// ─── Mock projects for timetable coloring ────────────────────────────────────
const TIMETABLE_PROJECTS: Project[] = [
  { id: "1", name: "CLIP Studio Paint", type: "Main", startDate: "2026-05-01", endDate: "2026-06-30", isCompleted: false, color: "#f0a030" },
  { id: "2", name: "Artisan's Compass", type: "Sub",  startDate: "2026-05-01", endDate: "2026-06-30", isCompleted: false, color: "#4a90e2" },
  { id: "3", name: "Code",              type: "Sub",  startDate: "2026-05-01", endDate: "2026-06-30", isCompleted: false, color: "#38bdf8" },
];

// ─── Mock sessions (2026-05-28) ───────────────────────────────────────────────
const BASE = new Date(2026, 4, 28); // May 28 2026
const ts = (h: number, m = 0) => new Date(BASE.getFullYear(), BASE.getMonth(), BASE.getDate(), h, m).getTime();
const MOCK_SESSIONS: Session[] = [
  { start: ts(1, 30), end: ts(2, 0),  duration: 1800,  process: "Artisan's Compass" },
  { start: ts(2,  0), end: ts(5, 15), duration: 11700, process: "CLIP Studio Paint" },
  { start: ts(5, 30), end: ts(6, 0),  duration: 1800,  process: "Artisan's Compass" },
  { start: ts(9,  0), end: ts(10, 45),duration: 6300,  process: "Code" },
  { start: ts(11, 0), end: ts(11, 30),duration: 1800,  process: "CLIP Studio Paint" },
];
const MOCK_SETTINGS: AppSettings = { timelineGridMode: '15min', nightTimeStart: 24, showCurrentTimeIndicator: true };

// ─── Gantt data ───────────────────────────────────────────────────────────────
const TOTAL_DAYS = 36;   // May 10 → June 14
const TODAY_OFF  = 18;   // May 28 = offset 18

interface GanttProject { id: string; name: string; color: string; gs: number; ge: number }
const GANTT_PROJECTS: GanttProject[] = [
  { id: "gen",      name: "일반 작업",        color: "#8a8070", gs: 0,  ge: 35 },
  { id: "artisans", name: "Artisan's Compass",color: "#4a90e2", gs: 0,  ge: 8  },
  { id: "p2",       name: "Project 2",        color: "#e06090", gs: 2,  ge: 12 },
  { id: "p4",       name: "Project 4",        color: "#40b080", gs: 8,  ge: 16 },
  { id: "p9",       name: "Project 9",        color: "#f0a030", gs: 3,  ge: 18 },
  { id: "p6",       name: "Project 6",        color: "#38bdf8", gs: 13, ge: 25 },
];

// ─── Todo data ────────────────────────────────────────────────────────────────
interface Todo { id: string; text: string; done: boolean; depth: number; hasChildren?: boolean }
interface DemoProject { id: string; name: string; color: string; todos: Todo[] }
const INIT_PROJECTS: DemoProject[] = [
  {
    id: "gen", name: "일반 작업", color: "#8a8070",
    todos: [
      { id: "g1", text: "이메일 답장", done: true, depth: 0 },
      { id: "g2", text: "회의 자료 준비", done: false, depth: 0 },
      { id: "g3", text: "주간 정리 문서", done: true, depth: 0 },
    ],
  },
  {
    id: "artisans", name: "Artisan's Compass", color: "#4a90e2",
    todos: [
      { id: "a1", text: "타임테이블 UI 개선", done: true, depth: 0, hasChildren: true },
      { id: "a2", text: "색상 팔레트 추가",   done: true, depth: 1 },
      { id: "a3", text: "애니메이션 적용",    done: true, depth: 1 },
      { id: "a4", text: "다크모드 수정",      done: false, depth: 0 },
      { id: "a5", text: "빌드 & 배포",        done: false, depth: 0 },
    ],
  },
  {
    id: "p9", name: "Project 9", color: "#f0a030",
    todos: [
      { id: "p9a", text: "커미션 A",    done: true,  depth: 0, hasChildren: true },
      { id: "p9b", text: "레이어 정리", done: true,  depth: 1 },
      { id: "p9c", text: "선따기",      done: true,  depth: 1 },
      { id: "p9d", text: "채색",        done: false, depth: 1 },
      { id: "p9e", text: "리터치",      done: false, depth: 1 },
      { id: "p9f", text: "개인 작업",   done: false, depth: 0, hasChildren: true },
      { id: "p9g", text: "배경 드로잉", done: false, depth: 1 },
      { id: "p9h", text: "최종 정리",   done: false, depth: 1 },
    ],
  },
  {
    id: "p6", name: "Project 6", color: "#38bdf8",
    todos: [
      { id: "p6a", text: "리서치",      done: true,  depth: 0 },
      { id: "p6b", text: "프로토타입",  done: false, depth: 0 },
      { id: "p6c", text: "테스트",      done: false, depth: 0 },
    ],
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, onSet }: { active: string; onSet: (v: string) => void }) {
  const icons = [
    { id: "day",     icon: <CalIcon /> },
    { id: "quest",   icon: <TargetIcon /> },
    { id: "stats",   icon: <BarIcon /> },
    { id: "settings",icon: <GearIcon /> },
  ];
  return (
    <div style={{ width: 46, background: BG, borderRight: `1px solid ${B}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0", gap: 4, flexShrink: 0 }}>
      {icons.map(item => (
        <button key={item.id} onClick={() => onSet(item.id)}
          style={{ width: 34, height: 34, borderRadius: 8, background: active === item.id ? SU : "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: active === item.id ? T1 : T4, transition: "all 0.15s" }}
          onMouseEnter={e => { if (active !== item.id) (e.currentTarget as HTMLElement).style.background = SU; }}
          onMouseLeave={e => { if (active !== item.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >{item.icon}</button>
      ))}
    </div>
  );
}

// ─── Gantt ────────────────────────────────────────────────────────────────────
function GanttView({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const pct = (n: number) => `${(n / TOTAL_DAYS) * 100}%`;
  const dayLabels: { day: number; offset: number; isToday: boolean }[] = [];
  const monthMarkers: { label: string; offset: number }[] = [];
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const d = new Date(2026, 4, 10 + i);
    if (d.getDate() === 1) monthMarkers.push({ label: `${d.getFullYear()}.${d.getMonth() + 1}`, offset: i });
    if (i % 3 === 0) dayLabels.push({ day: d.getDate(), offset: i, isToday: i === TODAY_OFF });
  }

  return (
    <div style={{ borderBottom: `1px solid ${B}`, background: S, padding: "5px 0 6px", flexShrink: 0 }}>
      <div style={{ position: "relative", height: 13, marginLeft: 72, marginRight: 4 }}>
        {dayLabels.map(d => (
          <span key={d.offset} style={{ position: "absolute", left: pct(d.offset), transform: "translateX(-50%)", fontSize: 9, color: d.isToday ? ACC : T4, fontWeight: d.isToday ? 700 : 400, pointerEvents: "none" }}>{d.day}</span>
        ))}
        {monthMarkers.map(m => (
          <span key={m.label} style={{ position: "absolute", left: pct(m.offset), transform: "translateX(-50%)", fontSize: 9, color: T2, fontWeight: 600, pointerEvents: "none" }}>{m.label}</span>
        ))}
      </div>
      <div style={{ paddingLeft: 4, paddingRight: 4 }}>
        {GANTT_PROJECTS.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
            <span style={{ width: 66, textAlign: "right", fontSize: 8.5, flexShrink: 0, color: activeId === p.id ? p.color : T4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
            <div style={{ flex: 1, height: 9, background: SU, borderRadius: 5, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: pct(TODAY_OFF), top: 0, bottom: 0, width: 1, background: ACC, opacity: 0.4, pointerEvents: "none" }} />
              <button onClick={() => onSelect(p.id)} title={p.name}
                style={{ position: "absolute", left: pct(p.gs), width: `${((p.ge - p.gs + 1) / TOTAL_DAYS) * 100}%`, top: 0, height: "100%", background: p.color, opacity: activeId === p.id ? 1 : 0.28, borderRadius: 5, boxShadow: activeId === p.id ? `0 0 8px ${p.color}77` : "none", transition: "all 0.2s", cursor: "pointer", border: "none" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Left: Recap panel ────────────────────────────────────────────────────────
function RecapPanel({ quest }: { quest: string }) {
  return (
    <div style={{ borderRight: `1px solid ${B}`, background: S, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 14px", gap: 10, overflow: "hidden" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: quest ? `${ACC}18` : SU, border: `1.5px solid ${quest ? ACC + "44" : BH}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={quest ? ACC : T4} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      </div>
      {quest ? (
        <>
          <p style={{ fontSize: 11, fontWeight: 600, color: ACC, textAlign: "center" }}>퀘스트 진행 중</p>
          <p style={{ fontSize: 11, color: T2, textAlign: "center", lineHeight: 1.6, wordBreak: "keep-all" }}>{quest}</p>
        </>
      ) : (
        <>
          <p style={{ fontSize: 12, fontWeight: 600, color: T2, textAlign: "center", margin: 0 }}>진행 중인 퀘스트 없음</p>
          <p style={{ fontSize: 11, color: T4, textAlign: "center", lineHeight: 1.6, margin: 0 }}>오늘의 구체적인 목표를<br/>아직 설정하지 않았습니다.</p>
        </>
      )}
    </div>
  );
}

// ─── Center: Todo panel ───────────────────────────────────────────────────────
function TodoPanel({ projects, activeId, onSelectProject, todos, onToggle, quest, onSetQuest }: {
  projects: DemoProject[]; activeId: string; onSelectProject: (id: string) => void;
  todos: Todo[]; onToggle: (id: string) => void;
  quest: string; onSetQuest: (q: string) => void;
}) {
  const [showInput, setShowInput] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const proj = projects.find(p => p.id === activeId)!;
  const done = todos.filter(t => t.done).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${B}`, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: 0 }}>오늘 할일</p>
          <p style={{ fontSize: 11, color: T3, margin: "2px 0 0" }}>May 28, 2026</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select value={activeId} onChange={e => onSelectProject(e.target.value)}
            style={{ background: SU, border: `1px solid ${BH}`, borderRadius: 6, color: T2, fontSize: 11, padding: "4px 8px", cursor: "pointer", outline: "none" }}>
            {projects.map(p => <option key={p.id} value={p.id} style={{ background: S }}>{p.name}</option>)}
          </select>
          <span style={{ fontSize: 10, color: T4, fontVariantNumeric: "tabular-nums" }}>{done}/{todos.length}</span>
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ height: 2, background: SU, flexShrink: 0 }}>
        <div style={{ height: "100%", width: todos.length ? `${(done / todos.length) * 100}%` : "0%", background: proj.color, transition: "width 0.3s" }} />
      </div>
      {/* Todos */}
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 6px 0", scrollbarWidth: "thin" as const }}>
        {todos.map(todo => (
          <button key={todo.id} onClick={() => onToggle(todo.id)}
            style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", paddingLeft: `${todo.depth * 18 + 8}px`, paddingRight: 8, paddingTop: 5, paddingBottom: 5, borderRadius: 6, background: "transparent", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.1s" }}
            onMouseEnter={e => (e.currentTarget.style.background = SU)}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <span style={{ width: 10, fontSize: 9, color: T5, flexShrink: 0 }}>{todo.hasChildren ? "▾" : ""}</span>
            <span style={{ width: 14, height: 14, borderRadius: 3, flexShrink: 0, border: todo.done ? "none" : `1.5px solid ${BH}`, background: todo.done ? proj.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", transition: "all 0.15s" }}>
              {todo.done ? "✓" : ""}
            </span>
            <span style={{ fontSize: todo.depth === 0 ? 12 : 11, fontWeight: todo.depth === 0 ? 500 : 400, color: todo.done ? T4 : (todo.depth === 0 ? T1 : T2), textDecoration: todo.done ? "line-through" : "none", transition: "all 0.15s" }}>
              {todo.text}
            </span>
          </button>
        ))}
      </div>
      {/* Quest section */}
      <div style={{ borderTop: `1px solid ${B}`, padding: "14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flexShrink: 0 }}>
        {quest ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 20, background: `${ACC}15`, border: `1px solid ${ACC}30` }}>
            <span style={{ fontSize: 13 }}>🎯</span>
            <span style={{ fontSize: 12, color: T2 }}>{quest}</span>
            <button onClick={() => onSetQuest("")} style={{ background: "none", border: "none", cursor: "pointer", color: T4, fontSize: 14, padding: 0, lineHeight: 1 }}>×</button>
          </div>
        ) : showInput ? (
          <form style={{ width: "100%", display: "flex", gap: 6 }} onSubmit={e => { e.preventDefault(); if (inputVal.trim()) { onSetQuest(inputVal.trim()); setInputVal(""); setShowInput(false); } }}>
            <input autoFocus value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="오늘의 퀘스트를 입력하세요..."
              style={{ flex: 1, background: SU, border: `1px solid ${BH}`, borderRadius: 6, color: T1, fontSize: 12, padding: "6px 10px", outline: "none" }} />
            <button type="submit" style={{ background: ACC, border: "none", borderRadius: 6, color: BG, fontSize: 11, fontWeight: 600, padding: "6px 12px", cursor: "pointer" }}>설정</button>
            <button type="button" onClick={() => setShowInput(false)} style={{ background: SU, border: "none", borderRadius: 6, color: T2, fontSize: 11, padding: "6px 10px", cursor: "pointer" }}>취소</button>
          </form>
        ) : (
          <>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: SU, border: `1.5px solid ${BH}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T4} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: T2, margin: "0 0 4px" }}>진행 중인 퀘스트 없음</p>
              <p style={{ fontSize: 11, color: T4, lineHeight: 1.6, margin: 0 }}>오늘의 구체적인 목표를<br/>아직 설정하지 않았습니다.</p>
            </div>
            <button onClick={() => setShowInput(true)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 18px", borderRadius: 8, background: ACC, border: "none", color: BG, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8b840")}
              onMouseLeave={e => (e.currentTarget.style.background = ACC)}>
              + 일일 퀘스트 설정
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
const CalIcon    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const TargetIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const BarIcon    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const GearIcon   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function DemoApp() {
  const [projects, setProjects] = useState(INIT_PROJECTS);
  const [activeId, setActiveId]  = useState("p9");
  const [activeView, setActiveView] = useState("day");
  const [quest, setQuest]        = useState("");
  const [settings, setSettings]  = useState<AppSettings>(MOCK_SETTINGS);

  const activeProject = projects.find(p => p.id === activeId)!;
  const toggleTodo = (id: string) =>
    setProjects(prev => prev.map(p =>
      p.id !== activeId ? p : { ...p, todos: p.todos.map(t => t.id === id ? { ...t, done: !t.done } : t) }
    ));

  return (
    /* artisans-demo class provides shadcn CSS vars; dark enables dark: variants */
    <div className="artisans-demo dark" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Pretendard', sans-serif" }}>
      <div style={{ background: BG, borderRadius: 10, border: `1px solid ${BH}`, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.6)", maxWidth: 1100, margin: "0 auto", height: "min(720px, 88vh)", display: "flex", flexDirection: "column" }}>

        {/* Title bar */}
        <div style={{ background: S, borderBottom: `1px solid ${B}`, height: 40, padding: "0 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
            {["#ff5f56","#ffbd2e","#27c93f"].map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
          </div>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: T3, letterSpacing: "0.1em" }}>ARTISAN&apos;S COMPASS</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: SU, border: `1px solid ${B}`, borderRadius: 6, padding: "4px 10px", flex: 1, maxWidth: 200, marginLeft: "auto" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T4} strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span style={{ fontSize: 11, color: T4 }}>프로젝트 검색...</span>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0, background: `${ACC}18`, border: `1px solid ${ACC}30`, borderRadius: 6, color: ACC, fontSize: 11, fontWeight: 600, padding: "4px 10px", cursor: "pointer" }}>
            + 새 프로젝트
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
          <Sidebar active={activeView} onSet={setActiveView} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            <GanttView activeId={activeId} onSelect={setActiveId} />
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.7fr 220px", minHeight: 0 }}>
              <RecapPanel quest={quest} />
              <TodoPanel
                projects={projects} activeId={activeId} onSelectProject={setActiveId}
                todos={activeProject.todos} onToggle={toggleTodo}
                quest={quest} onSetQuest={setQuest}
              />
              {/* Real TimeTableGraph from artisans source */}
              <div style={{ borderLeft: `1px solid ${B}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <TimeTableGraph
                  sessions={MOCK_SESSIONS}
                  date={new Date(2026, 4, 28)}
                  projects={TIMETABLE_PROJECTS}
                  settings={settings}
                  onUpdateSettings={setSettings}
                  renderMode="fixed"
                  nightTimeStart={24}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
