"use client";

import { useState, useEffect, useRef } from "react";
import { TimeTableGraph } from "./artisans/components/dashboard/TimeTableGraph";
import type { Session, Project, AppSettings } from "./artisans/types";

// ─── Theme ────────────────────────────────────────────────────────────────────
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

// ─── Dynamic today ────────────────────────────────────────────────────────────
const TODAY = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
const TODAY_STR = TODAY.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const GANTT_TODAY_IDX = 18;
const GANTT_DAYS = 36;
const GANTT_START = (() => { const d = new Date(TODAY); d.setDate(d.getDate() - GANTT_TODAY_IDX); return d; })();

// ─── Mock sessions (today) ────────────────────────────────────────────────────
const ts = (h: number, m = 0) =>
  new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate(), h, m).getTime();
const MOCK_SESSIONS: Session[] = [
  { start: ts(1, 30), end: ts(2,  0), duration: 1800,  process: "Artisan's Compass" },
  { start: ts(2,  0), end: ts(5, 15), duration: 11700, process: "CLIP Studio Paint" },
  { start: ts(5, 30), end: ts(6,  0), duration: 1800,  process: "Artisan's Compass" },
  { start: ts(9,  0), end: ts(10,45), duration: 6300,  process: "Code" },
  { start: ts(11, 0), end: ts(11,30), duration: 1800,  process: "CLIP Studio Paint" },
];

const TIMETABLE_PROJECTS: Project[] = [
  { id: "1", name: "CLIP Studio Paint", type: "Main", startDate: "", endDate: "", isCompleted: false, color: "#f0a030" },
  { id: "2", name: "Artisan's Compass", type: "Sub",  startDate: "", endDate: "", isCompleted: false, color: "#4a90e2" },
  { id: "3", name: "Code",              type: "Sub",  startDate: "", endDate: "", isCompleted: false, color: "#38bdf8" },
];

const MOCK_SETTINGS: AppSettings = { timelineGridMode: "15min", nightTimeStart: 24, showCurrentTimeIndicator: true };

// ─── Gantt ────────────────────────────────────────────────────────────────────
interface GanttProject { id: string; name: string; color: string; gs: number; ge: number }
const GANTT_PROJECTS: GanttProject[] = [
  { id: "gen",      name: "일반 작업",         color: "#8a8070", gs: 0,  ge: 35 },
  { id: "artisans", name: "Artisan's Compass", color: "#4a90e2", gs: 0,  ge: GANTT_TODAY_IDX - 10 },
  { id: "p2",       name: "Project 2",         color: "#e06090", gs: 2,  ge: 12 },
  { id: "p4",       name: "Project 4",         color: "#40b080", gs: 8,  ge: 16 },
  { id: "p9",       name: "Project 9",         color: "#f0a030", gs: 3,  ge: GANTT_TODAY_IDX + 3 },
  { id: "p6",       name: "Project 6",         color: "#38bdf8", gs: 13, ge: 25 },
];

// ─── Todos ────────────────────────────────────────────────────────────────────
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
    id: "p2", name: "Project 2", color: "#e06090",
    todos: [
      { id: "p2a", text: "기획안 작성",    done: true,  depth: 0 },
      { id: "p2b", text: "디자인 시안",    done: false, depth: 0 },
      { id: "p2c", text: "클라이언트 피드백", done: false, depth: 0 },
    ],
  },
  {
    id: "p4", name: "Project 4", color: "#40b080",
    todos: [
      { id: "p4a", text: "초안 작업",    done: true,  depth: 0 },
      { id: "p4b", text: "피드백 반영",  done: true,  depth: 0 },
      { id: "p4c", text: "최종 납품",    done: false, depth: 0 },
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
      { id: "p6a", text: "리서치",     done: true,  depth: 0 },
      { id: "p6b", text: "프로토타입", done: false, depth: 0 },
      { id: "p6c", text: "테스트",     done: false, depth: 0 },
    ],
  },
];

// ─── Week sessions for Calendar ───────────────────────────────────────────────
const WEEK_SESSIONS: Record<number, { s: number; e: number; name: string; color: string }[]> = {
  0: [{ s: 540, e: 660, name: "CLIP Studio Paint", color: "#f0a030" }],
  1: [{ s: 120, e: 300, name: "CLIP Studio Paint", color: "#f0a030" }, { s: 540, e: 660, name: "Code", color: "#38bdf8" }],
  2: [{ s: 90,  e: 330, name: "CLIP Studio Paint", color: "#f0a030" }, { s: 390, e: 480, name: "Artisan's Compass", color: "#4a90e2" }],
  3: [{ s: 600, e: 720, name: "Code", color: "#38bdf8" }],
  4: [{ s: 60,  e: 375, name: "CLIP Studio Paint", color: "#f0a030" }, { s: 480, e: 630, name: "Code", color: "#38bdf8" }],
  5: [{ s: 90,  e: 120, name: "Artisan's Compass", color: "#4a90e2" }, { s: 120, e: 315, name: "CLIP Studio Paint", color: "#f0a030" }, { s: 540, e: 645, name: "Code", color: "#38bdf8" }, { s: 660, e: 690, name: "CLIP Studio Paint", color: "#f0a030" }],
  6: [{ s: 240, e: 480, name: "CLIP Studio Paint", color: "#f0a030" }],
};

// ─── Stats data ───────────────────────────────────────────────────────────────
const WEEK_STATS = [
  { label: "일", mins: 312 }, { label: "월", mins: 480 }, { label: "화", mins: 390 },
  { label: "수", mins: 240 }, { label: "목", mins: 510 }, { label: "금", mins: 390 },
  { label: "오늘", mins: 390 },
];
const PROJ_STATS = [
  { name: "CLIP Studio Paint", color: "#f0a030", mins: 195 },
  { name: "Code",              color: "#38bdf8", mins: 105 },
  { name: "Artisan's Compass", color: "#4a90e2", mins:  60 },
  { name: "기타",              color: "#8a8070", mins:  30 },
];

// ─── SVG icons ────────────────────────────────────────────────────────────────
const CalIcon    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const GridIcon   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const TargetIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const BarIcon    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const GearIcon   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
const SyncIcon   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>;
const BellIcon   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, onSet }: { active: string; onSet: (v: string) => void }) {
  const top = [
    { id: "day",      icon: <GridIcon /> },
    { id: "calendar", icon: <CalIcon /> },
    { id: "pomodoro", icon: <TargetIcon /> },
    { id: "stats",    icon: <BarIcon /> },
    { id: "settings", icon: <GearIcon /> },
  ];
  const btn = (item: { id: string; icon: React.ReactNode }, extra?: React.ReactNode) => (
    <button key={item.id} onClick={() => onSet(item.id)} title={item.id}
      style={{ width: 34, height: 34, borderRadius: 8, background: active === item.id ? SU : "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: active === item.id ? T1 : T4, transition: "all 0.15s", position: "relative" }}
      onMouseEnter={e => { if (active !== item.id) (e.currentTarget as HTMLElement).style.background = SU; }}
      onMouseLeave={e => { if (active !== item.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
      {item.icon}{extra}
    </button>
  );
  return (
    <div style={{ width: 46, background: BG, borderRight: `1px solid ${B}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0", gap: 4, flexShrink: 0 }}>
      {top.map(item => btn(item))}
      <div style={{ flex: 1 }} />
      {btn({ id: "sync", icon: <SyncIcon /> })}
      <div style={{ position: "relative" }}>
        {btn({ id: "bell", icon: <BellIcon /> })}
        <div style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: "#e05050", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

// ─── Gantt ────────────────────────────────────────────────────────────────────
const GANTT_DAY_W = 26; // px per day
const GANTT_NAME_W = 80;

function GanttView({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const CONTENT_W = GANTT_DAYS * GANTT_DAY_W;
  const BAR_H = 22;

  useEffect(() => {
    if (scrollRef.current) {
      const target = GANTT_TODAY_IDX * GANTT_DAY_W - scrollRef.current.clientWidth / 2 + 80;
      scrollRef.current.scrollLeft = Math.max(0, target);
    }
  }, []);

  const labels: { i: number; day: number; isToday: boolean }[] = [];
  const months: { i: number; label: string }[] = [];
  for (let i = 0; i < GANTT_DAYS; i++) {
    const d = new Date(GANTT_START); d.setDate(GANTT_START.getDate() + i);
    if (d.getDate() === 1 || i === 0) months.push({ i, label: `${d.getFullYear()}.${d.getMonth() + 1}` });
    if (i % 2 === 0) labels.push({ i, day: d.getDate(), isToday: i === GANTT_TODAY_IDX });
  }

  return (
    <div style={{ borderBottom: `1px solid ${B}`, background: S, flexShrink: 0, display: "flex", overflow: "hidden" }}>
      {/* Fixed name column */}
      <div style={{ width: GANTT_NAME_W, flexShrink: 0, paddingTop: 18 }}>
        {GANTT_PROJECTS.map(p => (
          <div key={p.id} style={{ height: BAR_H + 5, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8 }}>
            <span style={{ fontSize: 9, color: activeId === p.id ? p.color : T4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: GANTT_NAME_W - 10, fontWeight: activeId === p.id ? 600 : 400 }}>{p.name}</span>
          </div>
        ))}
      </div>
      {/* Scrollable date+bar area */}
      <div ref={scrollRef} style={{ flex: 1, overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none" as const }}>
        <div style={{ width: CONTENT_W, paddingBottom: 6, position: "relative" }}>
          {/* Date/month header */}
          <div style={{ position: "relative", height: 18, marginBottom: 2 }}>
            {months.map(m => (
              <span key={m.label} style={{ position: "absolute", left: m.i * GANTT_DAY_W + 2, fontSize: 9, color: T2, fontWeight: 600, pointerEvents: "none", whiteSpace: "nowrap" }}>{m.label}</span>
            ))}
            {labels.map(d => (
              <span key={d.i} style={{ position: "absolute", left: d.i * GANTT_DAY_W, transform: "translateX(-50%)", fontSize: 9, color: d.isToday ? ACC : T5, fontWeight: d.isToday ? 700 : 400, pointerEvents: "none" }}>{d.day}</span>
            ))}
          </div>
          {/* Today vertical dashed line (spans all rows) */}
          <div style={{ position: "absolute", left: GANTT_TODAY_IDX * GANTT_DAY_W, top: 0, bottom: 0, width: 1, background: `repeating-linear-gradient(to bottom, #e05050 0px, #e05050 4px, transparent 4px, transparent 8px)`, opacity: 0.7, zIndex: 2, pointerEvents: "none" }} />
          {/* Bars */}
          {GANTT_PROJECTS.map(p => {
            const barW = (p.ge - p.gs) * GANTT_DAY_W;
            return (
              <div key={p.id} style={{ position: "relative", height: BAR_H, marginBottom: 5, background: `${SU}88`, borderRadius: 5, overflow: "hidden" }}>
                <button onClick={() => onSelect(p.id)} title={p.name}
                  style={{ position: "absolute", left: p.gs * GANTT_DAY_W, width: barW, top: 0, height: "100%", background: p.color, opacity: activeId === p.id ? 0.92 : 0.28, borderRadius: 5, border: "none", cursor: "pointer", display: "flex", alignItems: "center", paddingLeft: 7, overflow: "hidden", boxShadow: activeId === p.id ? `0 0 10px ${p.color}66` : "none", transition: "all 0.2s" }}>
                  {barW > 50 && <span style={{ fontSize: 10, color: "#fff", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", pointerEvents: "none" }}>{p.name}</span>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Recap (left panel) ───────────────────────────────────────────────────────
function RecapPanel({ quest }: { quest: string }) {
  return (
    <div style={{ borderRight: `1px solid ${B}`, background: S, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 14px", gap: 10 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: quest ? `${ACC}18` : SU, border: `1.5px solid ${quest ? ACC + "44" : BH}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={quest ? ACC : T4} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
        </div>
        {quest ? (
          <>
            <p style={{ fontSize: 11, fontWeight: 600, color: ACC, textAlign: "center", margin: 0 }}>퀘스트 진행 중</p>
            <p style={{ fontSize: 11, color: T2, textAlign: "center", lineHeight: 1.6, wordBreak: "keep-all", margin: 0 }}>{quest}</p>
          </>
        ) : (
          <>
            <p style={{ fontSize: 12, fontWeight: 600, color: T2, textAlign: "center", margin: 0 }}>진행 중인 퀘스트 없음</p>
            <p style={{ fontSize: 11, color: T4, textAlign: "center", lineHeight: 1.6, margin: 0 }}>오늘의 구체적인 목표를<br />아직 설정하지 않았습니다.</p>
          </>
        )}
      </div>
      <div style={{ borderTop: `1px solid ${B}`, padding: "8px 10px" }}>
        <button style={{ display: "flex", alignItems: "center", gap: 5, width: "100%", background: "transparent", border: "none", color: T4, fontSize: 11, cursor: "pointer", padding: "4px 6px", borderRadius: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          목표 설정
        </button>
      </div>
    </div>
  );
}

// ─── Todo panel (center) ──────────────────────────────────────────────────────
function TodoPanel({ projects, activeId, onSelectProject, todos, onToggle, quest, onSetQuest, onEndDay, dayEnded }: {
  projects: DemoProject[]; activeId: string; onSelectProject: (id: string) => void;
  todos: Todo[]; onToggle: (id: string) => void;
  quest: string; onSetQuest: (q: string) => void;
  onEndDay: () => void; dayEnded: boolean;
}) {
  const [showInput, setShowInput] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const proj = projects.find(p => p.id === activeId) ?? projects[0];
  const done = todos.filter(t => t.done).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${B}`, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: T1, margin: 0 }}>오늘 할일</p>
          <p style={{ fontSize: 11, color: T3, margin: "2px 0 0" }}>{TODAY_STR}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select value={activeId} onChange={e => onSelectProject(e.target.value)}
            style={{ background: SU, border: `1px solid ${BH}`, borderRadius: 6, color: T2, fontSize: 11, padding: "4px 8px", cursor: "pointer", outline: "none" }}>
            {projects.map(p => <option key={p.id} value={p.id} style={{ background: S }}>{p.name}</option>)}
          </select>
          <span style={{ fontSize: 10, color: T4, fontVariantNumeric: "tabular-nums" }}>{done}/{todos.length}</span>
        </div>
      </div>
      {/* Progress */}
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
            <span style={{ width: 14, height: 14, borderRadius: 3, flexShrink: 0, border: todo.done ? "none" : `1.5px solid ${BH}`, background: todo.done ? proj.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", transition: "all 0.15s" }}>{todo.done ? "✓" : ""}</span>
            <span style={{ fontSize: todo.depth === 0 ? 12 : 11, fontWeight: todo.depth === 0 ? 500 : 400, color: todo.done ? T4 : (todo.depth === 0 ? T1 : T2), textDecoration: todo.done ? "line-through" : "none", transition: "all 0.15s" }}>{todo.text}</span>
          </button>
        ))}
      </div>
      {/* Quest */}
      <div style={{ borderTop: `1px solid ${B}`, padding: "10px 14px", flexShrink: 0 }}>
        {quest ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 20, background: `${ACC}15`, border: `1px solid ${ACC}30` }}>
            <span style={{ fontSize: 13 }}>🎯</span>
            <span style={{ fontSize: 12, color: T2, flex: 1 }}>{quest}</span>
            <button onClick={() => onSetQuest("")} style={{ background: "none", border: "none", cursor: "pointer", color: T4, fontSize: 14, padding: 0 }}>×</button>
          </div>
        ) : showInput ? (
          <form style={{ display: "flex", gap: 6 }} onSubmit={e => { e.preventDefault(); if (inputVal.trim()) { onSetQuest(inputVal.trim()); setInputVal(""); setShowInput(false); } }}>
            <input autoFocus value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="오늘의 퀘스트..."
              style={{ flex: 1, background: SU, border: `1px solid ${BH}`, borderRadius: 6, color: T1, fontSize: 12, padding: "6px 10px", outline: "none" }} />
            <button type="submit" style={{ background: ACC, border: "none", borderRadius: 6, color: BG, fontSize: 11, fontWeight: 600, padding: "6px 10px", cursor: "pointer" }}>설정</button>
            <button type="button" onClick={() => setShowInput(false)} style={{ background: SU, border: "none", borderRadius: 6, color: T2, fontSize: 11, padding: "6px 8px", cursor: "pointer" }}>✕</button>
          </form>
        ) : (
          <button onClick={() => setShowInput(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, width: "100%", padding: "6px 10px", borderRadius: 8, background: `${ACC}10`, border: `1px dashed ${ACC}30`, color: T4, fontSize: 11, cursor: "pointer" }}>
            🎯 일일 퀘스트 설정...
          </button>
        )}
      </div>
      {/* End Day */}
      <div style={{ borderTop: `1px solid ${B}`, padding: "8px 14px", display: "flex", alignItems: "center", flexShrink: 0, background: S }}>
        <button onClick={onEndDay}
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "8px 0", borderRadius: 8, background: dayEnded ? T5 : ACC, border: "none", color: dayEnded ? T3 : BG, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          {dayEnded ? "하루 완료! 수고했어요 ✨" : "하루 종료"}
        </button>
      </div>
    </div>
  );
}

// ─── Archive View (일일 아카이브) ─────────────────────────────────────────────
const ARCHIVE_TABS = ["일일 아카이브", "개요", "과제", "포커스"];
// Fake screenshot thumbnails using colored gradients
const FAKE_THUMBS = [
  { bg: "linear-gradient(135deg,#1a1a2e,#16213e)", label: "VSCode" },
  { bg: "linear-gradient(135deg,#2d1b4e,#1a0e2e)", label: "Figma" },
  { bg: "linear-gradient(135deg,#0d2137,#0a1628)", label: "Browser" },
  { bg: "linear-gradient(135deg,#1e3a1e,#0d1f0d)", label: "Terminal" },
  { bg: "linear-gradient(135deg,#3a1a00,#1f0e00)", label: "Photoshop" },
  { bg: "linear-gradient(135deg,#1a2a3a,#0d1520)", label: "Discord" },
];

function ArchiveView({ settings, onUpdateSettings }: { settings: AppSettings; onUpdateSettings: (s: AppSettings) => void }) {
  const [dateOffset, setDateOffset] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [thumbIdx, setThumbIdx] = useState(0);
  const [journal, setJournal] = useState("");

  const archiveDate = new Date(TODAY);
  archiveDate.setDate(TODAY.getDate() + dateOffset);
  const dateStr = archiveDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const isToday = dateOffset === 0;

  // Sessions for archive date — use real sessions for today, empty for others
  const archiveSessions: Session[] = isToday ? MOCK_SESSIONS : [];
  const totalFocusMins = isToday ? 390 : 0;
  const th = Math.floor(totalFocusMins / 60);
  const tm = totalFocusMins % 60;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header tabs + date nav */}
      <div style={{ borderBottom: `1px solid ${B}`, padding: "6px 16px", display: "flex", alignItems: "center", gap: 4, flexShrink: 0, background: S }}>
        {ARCHIVE_TABS.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            style={{ padding: "4px 12px", borderRadius: 6, background: activeTab === i ? SU : "transparent", border: "none", color: activeTab === i ? T1 : T4, fontSize: 12, fontWeight: activeTab === i ? 600 : 400, cursor: "pointer" }}>
            {tab}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={() => setDateOffset(o => o - 1)}
          style={{ background: "transparent", border: "none", color: T3, fontSize: 16, cursor: "pointer", padding: "0 4px" }}>←</button>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 10px", background: SU, borderRadius: 6, border: `1px solid ${B}` }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T3} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span style={{ fontSize: 12, color: T1, fontWeight: 600 }}>{dateStr}</span>
        </div>
        <button onClick={() => setDateOffset(o => Math.min(0, o + 1))}
          style={{ background: "transparent", border: "none", color: T3, fontSize: 16, cursor: "pointer", padding: "0 4px" }}>→</button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Left: journal + gallery */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", borderRight: `1px solid ${B}` }}>
          {/* Visual recap button + date */}
          <div style={{ padding: "16px 20px 8px", flexShrink: 0 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 8, background: SU, border: `1px solid ${BH}`, color: T2, fontSize: 12, cursor: "pointer", marginBottom: 16 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
              비주얼 리캡
            </button>
            <p style={{ fontSize: 28, fontWeight: 700, color: T1, margin: "0 0 12px", lineHeight: 1.2 }}>{dateStr}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: T4, fontWeight: 600 }}>여정 로그</span>
              <div style={{ flex: 1, height: 1, background: B }} />
            </div>
          </div>
          {/* Journal area */}
          <div style={{ flex: 1, overflow: "auto", padding: "0 20px" }}>
            {journal ? (
              <p style={{ fontSize: 13, color: T2, lineHeight: 1.8 }}>{journal}</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
                <p style={{ fontSize: 13, color: T5, fontStyle: "italic", margin: 0 }}>이 날에는 활동을 기록하지 않았습니다.</p>
                <textarea value={journal} onChange={e => setJournal(e.target.value)}
                  placeholder="오늘의 기록을 남겨보세요..."
                  style={{ width: "100%", minHeight: 60, background: "transparent", border: "none", borderBottom: `1px solid ${B}`, color: T2, fontSize: 12, padding: "6px 0", outline: "none", lineHeight: 1.7, resize: "none", boxSizing: "border-box" as const }} />
              </div>
            )}
            {/* Screenshot gallery */}
            {isToday && (
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 8 }}>
                  {FAKE_THUMBS.map((t, i) => (
                    <button key={i} onClick={() => setThumbIdx(i)}
                      style={{ aspectRatio: "16/9", borderRadius: 6, background: t.bg, border: `2px solid ${thumbIdx === i ? ACC : "transparent"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transition: "border-color 0.15s" }}>
                      <span style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>{t.label}</span>
                    </button>
                  ))}
                </div>
                {/* Selected thumb preview */}
                <div style={{ borderRadius: 8, background: FAKE_THUMBS[thumbIdx].bg, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${B}`, position: "relative" }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>{FAKE_THUMBS[thumbIdx].label}</span>
                  <div style={{ position: "absolute", bottom: 8, right: 10, fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{thumbIdx + 1}/{FAKE_THUMBS.length}</div>
                </div>
              </div>
            )}
          </div>
          {/* Bottom action */}
          <div style={{ borderTop: `1px solid ${B}`, padding: "8px 20px", flexShrink: 0 }}>
            <button style={{ background: "transparent", border: "none", color: T4, fontSize: 12, cursor: "pointer", padding: "4px 0" }}>
              🗂 작업 로그 추가
            </button>
          </div>
        </div>

        {/* Right: Timetable */}
        <div style={{ width: 240, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ borderBottom: `1px solid ${B}`, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, background: S }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ACC} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style={{ fontSize: 11, fontWeight: 600, color: T2 }}>타임테이블</span>
            <div style={{ flex: 1 }} />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T4} strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <TimeTableGraph
              sessions={archiveSessions}
              date={archiveDate}
              projects={TIMETABLE_PROJECTS}
              settings={settings}
              onUpdateSettings={onUpdateSettings}
              renderMode="fixed"
              nightTimeStart={24}
            />
          </div>
          {/* Focus stats footer */}
          <div style={{ borderTop: `1px solid ${B}`, padding: "10px 12px", background: S, flexShrink: 0, display: "flex", gap: 16 }}>
            <div>
              <p style={{ fontSize: 10, color: T4, margin: "0 0 2px" }}>총 집중 시간</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: T1, margin: 0, fontVariantNumeric: "tabular-nums" }}>{th}h {tm}m</p>
            </div>
            <div>
              <p style={{ fontSize: 10, color: T4, margin: "0 0 2px" }}>주요 활동</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: T1, margin: 0 }}>{isToday ? "오전" : "—"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Pomodoro View ────────────────────────────────────────────────────────────
function PomodoroView() {
  const [running, setRunning] = useState(false);
  const [secs, setSecs] = useState(25 * 60);
  const [count, setCount] = useState(0);
  const [note, setNote] = useState("");
  const totalSecs = 25 * 60;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecs(s => {
        if (s <= 1) { setRunning(false); setCount(c => c + 1); return totalSecs; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const mins = Math.floor(secs / 60);
  const sec = secs % 60;
  const progress = (totalSecs - secs) / totalSecs;
  const R = 80;
  const circ = 2 * Math.PI * R;

  return (
    <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
      {/* Center timer */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ position: "relative", width: 200, height: 200 }}>
          <svg width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="100" cy="100" r={R} fill="none" stroke={SU} strokeWidth="8" />
            <circle cx="100" cy="100" r={R} fill="none" stroke={ACC} strokeWidth="8"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)}
              strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: T1, fontVariantNumeric: "tabular-nums", fontFamily: "monospace", letterSpacing: 2 }}>
              {String(mins).padStart(2, "0")}:{String(sec).padStart(2, "0")}
            </span>
            <span style={{ fontSize: 11, color: T4 }}>포모도로</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => { setRunning(false); setSecs(totalSecs); }}
            style={{ width: 38, height: 38, borderRadius: "50%", background: SU, border: `1px solid ${BH}`, color: T3, cursor: "pointer", fontSize: 16 }}>↺</button>
          <button onClick={() => setRunning(r => !r)}
            style={{ width: 54, height: 54, borderRadius: "50%", background: ACC, border: "none", color: BG, cursor: "pointer", fontSize: 20, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {running ? "⏸" : "▶"}
          </button>
          <button onClick={() => { setRunning(false); setSecs(5 * 60); }}
            style={{ width: 38, height: 38, borderRadius: "50%", background: SU, border: `1px solid ${BH}`, color: T3, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>5m</button>
        </div>
        <p style={{ fontSize: 13, color: T4 }}>포모도로를 시작할 항목을 선택해주세요.</p>
      </div>
      {/* Right sidebar */}
      <div style={{ width: 280, borderLeft: `1px solid ${B}`, display: "flex", flexDirection: "column", background: S, overflow: "auto" }}>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${B}` }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: "0 0 12px" }}>개요</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[{ label: "오늘의 포모스", val: count }, { label: "오늘의 포커스", val: count > 0 ? `${count * 25}m` : "0m" }].map(item => (
              <div key={item.label}>
                <p style={{ fontSize: 10, color: T4, margin: "0 0 4px" }}>{item.label}</p>
                <p style={{ fontSize: 24, fontWeight: 700, color: T1, margin: 0, fontVariantNumeric: "tabular-nums" }}>{item.val}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${B}` }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: "0 0 10px" }}>집중 기록</p>
          {count === 0 ? (
            <p style={{ fontSize: 12, color: T4, margin: 0 }}>오늘 집중한 기록이 없습니다.</p>
          ) : (
            Array.from({ length: count }, (_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12 }}>🍅</span>
                <span style={{ fontSize: 11, color: T2 }}>포모도로 #{i + 1} 완료 (25분)</span>
              </div>
            ))
          )}
        </div>
        <div style={{ padding: "14px 16px", flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: "0 0 10px" }}>집중 노트</p>
          <textarea value={note} onChange={e => setNote(e.target.value)}
            placeholder="당신의 생각을 기록해보세요... 무슨 생각이 있나요?"
            style={{ width: "100%", minHeight: 80, background: SU, border: `1px solid ${BH}`, borderRadius: 6, color: T2, fontSize: 11, padding: "8px", resize: "vertical", outline: "none", lineHeight: 1.6, boxSizing: "border-box" as const }} />
        </div>
      </div>
    </div>
  );
}

// ─── Calendar View ────────────────────────────────────────────────────────────
function CalendarView() {
  const [weekOffset, setWeekOffset] = useState(0);
  const now = new Date();
  const baseWeekStart = new Date(now);
  baseWeekStart.setDate(now.getDate() - now.getDay());
  baseWeekStart.setHours(0, 0, 0, 0);
  const weekStart = new Date(baseWeekStart);
  weekStart.setDate(weekStart.getDate() + weekOffset * 7);

  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(weekStart); d.setDate(weekStart.getDate() + i); return d; });
  const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const TOTAL = 1440;
  const todayStr = now.toDateString();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const h = scrollRef.current.scrollHeight;
      scrollRef.current.scrollTop = (h / 24) * 1; // scroll to 01:00 so early sessions visible
    }
  }, []);

  const monthStr = weekStart.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  // Generate sessions per day for any week offset (shift session times for other weeks)
  const getSessionsForDay = (dayIdx: number) => {
    const base = WEEK_SESSIONS[dayIdx] || [];
    if (weekOffset === 0) return base;
    // For other weeks: shift session times slightly based on weekOffset for variety
    const shift = (weekOffset * 37) % 60;
    return base.map(s => ({ ...s, s: Math.max(0, s.s + shift), e: Math.max(30, s.e + shift) }));
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${B}`, padding: "8px 16px", display: "flex", alignItems: "center", gap: 16, flexShrink: 0, background: S }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: T1 }}>캘린더</span>
        <span style={{ fontSize: 13, color: T4, cursor: "pointer" }}>반복 루틴</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: T1 }}>{monthStr}</span>
        <button onClick={() => setWeekOffset(o => o - 1)}
          style={{ background: SU, border: `1px solid ${B}`, borderRadius: 5, color: T2, fontSize: 13, padding: "2px 10px", cursor: "pointer" }}>←</button>
        <button onClick={() => setWeekOffset(0)}
          style={{ background: weekOffset === 0 ? `${ACC}22` : SU, border: `1px solid ${weekOffset === 0 ? ACC + "44" : B}`, borderRadius: 5, color: weekOffset === 0 ? ACC : T2, fontSize: 11, padding: "3px 8px", cursor: "pointer" }}>오늘</button>
        <button onClick={() => setWeekOffset(o => o + 1)}
          style={{ background: SU, border: `1px solid ${B}`, borderRadius: 5, color: T2, fontSize: 13, padding: "2px 10px", cursor: "pointer" }}>→</button>
      </div>
      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "44px repeat(7, 1fr)", borderBottom: `1px solid ${B}`, flexShrink: 0, background: S }}>
        <div />
        {days.map((d, i) => {
          const isToday = d.toDateString() === todayStr;
          return (
            <div key={i} style={{ textAlign: "center", padding: "6px 4px", borderLeft: `1px solid ${B}` }}>
              <div style={{ fontSize: 9, color: T4, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 3 }}>{DAY_LABELS[i]}</div>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: isToday ? ACC : "transparent", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", fontSize: 13, fontWeight: isToday ? 700 : 400, color: isToday ? BG : T1 }}>{d.getDate()}</div>
            </div>
          );
        })}
      </div>
      {/* Scrollable grid */}
      <div ref={scrollRef} style={{ flex: 1, overflow: "auto", display: "grid", gridTemplateColumns: "44px repeat(7, 1fr)" }}>
        {/* Time column */}
        <div style={{ position: "relative", height: 1200 }}>
          {Array.from({ length: 13 }, (_, i) => i * 2).map(h => (
            <div key={h} style={{ position: "absolute", top: `${(h / 24) * 100}%`, width: "100%", paddingRight: 4, transform: "translateY(-50%)" }}>
              <span style={{ fontSize: 9, color: T5, fontFamily: "monospace", float: "right" }}>{h === 0 ? "" : `${String(h).padStart(2, "0")}:00`}</span>
            </div>
          ))}
        </div>
        {/* Day columns */}
        {days.map((d, i) => {
          const sessions = getSessionsForDay(i);
          const isToday = d.toDateString() === todayStr;
          return (
            <div key={i} style={{ borderLeft: `1px solid ${B}`, position: "relative", height: 1200, background: isToday ? `${ACC}05` : "transparent" }}>
              {Array.from({ length: 25 }, (_, h) => (
                <div key={h} style={{ position: "absolute", top: `${(h / 24) * 100}%`, left: 0, right: 0, borderTop: `1px solid ${B}22`, pointerEvents: "none" }} />
              ))}
              {isToday && (
                <div style={{ position: "absolute", top: `${(nowMins / TOTAL) * 100}%`, left: 0, right: 0, zIndex: 10, pointerEvents: "none" }}>
                  <div style={{ borderTop: "2px solid #e88060", marginLeft: -4 }} />
                  <div style={{ position: "absolute", left: -4, top: "50%", transform: "translateY(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#e88060" }} />
                </div>
              )}
              {sessions.map((s, j) => (
                <div key={j} style={{ position: "absolute", top: `${(s.s / TOTAL) * 100}%`, height: `${Math.max(0.5, (s.e - s.s) / TOTAL) * 100}%`, left: 2, right: 2, background: s.color, opacity: 0.82, borderRadius: 4, padding: "2px 4px", overflow: "hidden" }}>
                  <span style={{ fontSize: 9, color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}>{s.name}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Settings View ────────────────────────────────────────────────────────────
function SettingsView({ settings, onUpdate }: { settings: AppSettings; onUpdate: (s: AppSettings) => void }) {
  const rows = [
    { section: "타임라인", items: [
      { label: "현재 시간 표시", active: settings.showCurrentTimeIndicator !== false, toggle: () => onUpdate({ ...settings, showCurrentTimeIndicator: !settings.showCurrentTimeIndicator }) },
      { label: "15분 그리드 모드", active: !settings.timelineGridMode || settings.timelineGridMode === "15min", toggle: () => onUpdate({ ...settings, timelineGridMode: settings.timelineGridMode === "15min" ? "continuous" : "15min" }) },
      { label: "야간 시간 마커", active: settings.nightTimeStart !== 24, toggle: () => onUpdate({ ...settings, nightTimeStart: settings.nightTimeStart === 24 ? 22 : 24 }) },
    ]},
    { section: "일반", items: [
      { label: "작업 앱 필터", active: !!settings.filterTimelineByWorkApps, toggle: () => onUpdate({ ...settings, filterTimelineByWorkApps: !settings.filterTimelineByWorkApps }) },
    ]},
  ];
  return (
    <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
      {rows.map(sec => (
        <div key={sec.section} style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 10, fontWeight: 600, color: T3, margin: "0 0 8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{sec.section}</p>
          {sec.items.map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${B}` }}>
              <span style={{ fontSize: 12, color: T2 }}>{item.label}</span>
              <button onClick={item.toggle} style={{ width: 38, height: 22, borderRadius: 11, background: item.active ? ACC : BH, border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                <div style={{ position: "absolute", top: 4, left: item.active ? 20 : 4, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
              </button>
            </div>
          ))}
        </div>
      ))}
      <div style={{ padding: "12px 14px", background: SU, borderRadius: 8, border: `1px solid ${B}`, marginTop: 8 }}>
        <p style={{ fontSize: 11, color: T3, margin: 0, lineHeight: 1.6 }}>💡 실제 앱에서는 앱별 자동 추적 설정, 테마, 알림, 내보내기 등의 기능을 지원해요.</p>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function DemoApp() {
  const [projects, setProjects] = useState(INIT_PROJECTS);
  const [activeId, setActiveId] = useState("p9");
  const [activeView, setActiveView] = useState("day");
  const [quest, setQuest] = useState("");
  const [settings, setSettings] = useState<AppSettings>(MOCK_SETTINGS);
  const [dayEnded, setDayEnded] = useState(false);

  const activeProject = projects.find(p => p.id === activeId) ?? projects[0];
  const toggleTodo = (id: string) =>
    setProjects(prev => prev.map(p =>
      p.id !== activeId ? p : { ...p, todos: p.todos.map(t => t.id === id ? { ...t, done: !t.done } : t) }
    ));

  const viewLabel: Record<string, string> = {
    day: "오늘", calendar: "캘린더", pomodoro: "포모도로", stats: "일일 아카이브", settings: "설정",
  };

  return (
    <div className="artisans-demo dark" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Pretendard', sans-serif" }}>
      <div style={{ background: BG, borderRadius: 10, border: `1px solid ${BH}`, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.6)", maxWidth: 1100, margin: "0 auto", height: "min(720px, 88vh)", display: "flex", flexDirection: "column" }}>

        {/* Title bar */}
        <div style={{ background: S, borderBottom: `1px solid ${B}`, height: 40, padding: "0 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
          </div>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: T3, letterSpacing: "0.1em" }}>ARTISAN&apos;S COMPASS</span>
          <span style={{ fontSize: 12, color: T2, fontWeight: 500 }}>{viewLabel[activeView] ?? activeView}</span>
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

            {activeView === "day" && (
              <>
                <GanttView activeId={activeId} onSelect={setActiveId} />
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.7fr 220px", minHeight: 0 }}>
                  <RecapPanel quest={quest} />
                  <TodoPanel
                    projects={projects} activeId={activeId} onSelectProject={setActiveId}
                    todos={activeProject.todos} onToggle={toggleTodo}
                    quest={quest} onSetQuest={setQuest}
                    onEndDay={() => setDayEnded(d => !d)} dayEnded={dayEnded}
                  />
                  <div style={{ borderLeft: `1px solid ${B}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ borderBottom: `1px solid ${B}`, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, background: S }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ACC} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span style={{ fontSize: 11, fontWeight: 600, color: T2 }}>타임테이블</span>
                    </div>
                    <TimeTableGraph
                      sessions={MOCK_SESSIONS}
                      date={TODAY}
                      projects={TIMETABLE_PROJECTS}
                      settings={settings}
                      onUpdateSettings={setSettings}
                      renderMode="fixed"
                      nightTimeStart={24}
                    />
                  </div>
                </div>
              </>
            )}

            {activeView === "calendar" && <CalendarView />}
            {activeView === "pomodoro" && <PomodoroView />}
            {activeView === "stats" && <ArchiveView settings={settings} onUpdateSettings={setSettings} />}

            {activeView === "settings" && (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                <div style={{ padding: "10px 16px", borderBottom: `1px solid ${B}`, background: S, flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: T1 }}>설정</span>
                </div>
                <SettingsView settings={settings} onUpdate={setSettings} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
