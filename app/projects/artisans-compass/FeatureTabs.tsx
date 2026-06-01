"use client";
import { useState } from "react";

const FEATURES = [
  {
    id: "day",
    label: "오늘",
    title: "오늘 할일",
    desc: "프로젝트별 할일 목록과 진행 현황을 한눈에 볼 수 있어요. 일일 퀘스트를 설정해 집중력을 높이고, 하루를 종료하면 타임테이블과 함께 자동으로 아카이브에 기록돼요.",
  },
  {
    id: "calendar",
    label: "캘린더",
    title: "주간 캘린더",
    desc: "주간 단위로 작업 패턴을 시각화해요. 프로젝트별 색상으로 일정이 구분되고, 좌우로 스와이프하면 이전·다음 주로 이동할 수 있어요.",
  },
  {
    id: "pomodoro",
    label: "포모도로",
    title: "포모도로 타이머",
    desc: "25분 집중 사이클로 생산성을 높여요. 완료된 포모도로는 자동으로 오늘의 집중 기록에 누적되고, 세션 중 메모도 남길 수 있어요.",
  },
  {
    id: "stats",
    label: "아카이브",
    title: "데일리 아카이브",
    desc: "날짜별 작업 세션이 타임테이블로 기록돼요. 앱 전환 기록이 자동 수집되어 어떤 앱을 언제 얼마나 사용했는지 돌아볼 수 있어요.",
  },
  {
    id: "settings",
    label: "설정",
    title: "설정",
    desc: "타임테이블 그리드 모드, 야간 시간 마커, 현재 시간 표시 등을 커스터마이즈할 수 있어요. 작업 앱 필터로 집중 세션만 골라 볼 수도 있어요.",
  },
];

export default function FeatureTabs() {
  const [activeId, setActiveId] = useState("day");
  const feature = FEATURES.find(f => f.id === activeId)!;

  return (
    <div className="mt-8">
      <div className="flex gap-1 overflow-x-auto border-b border-[var(--border)] [scrollbar-width:none]">
        {FEATURES.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveId(f.id)}
            className="relative shrink-0 px-4 pb-2.5 pt-2 text-[13px] font-medium transition-colors"
            style={{ color: activeId === f.id ? "var(--t1)" : "var(--t4)" }}
          >
            {f.label}
            {activeId === f.id && (
              <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-t-full bg-[var(--accent)]" />
            )}
          </button>
        ))}
      </div>
      <div className="pt-5 transition-all duration-200">
        <p className="mb-1.5 text-[13px] font-semibold text-[var(--t1)]">{feature.title}</p>
        <p className="text-[13px] leading-relaxed text-[var(--t3)]">{feature.desc}</p>
      </div>
    </div>
  );
}
