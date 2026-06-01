"use client";
import { useState } from "react";

const FEATURES = [
  {
    id: "day",
    label: "오늘",
    title: "오늘 할일",
    desc: "하루의 모든 작업을 한 화면에서 관리해요. 프로젝트를 전환하며 할일을 체크하고, 일일 퀘스트로 오늘의 핵심 목표를 명확히 잡을 수 있어요.",
    points: [
      "프로젝트별 할일 목록과 실시간 진행률 바",
      "계층형 할일 — 상위·하위 항목으로 세분화",
      "일일 퀘스트로 오늘 하루의 핵심 목표 설정",
      "Gantt 차트로 여러 프로젝트 기간을 한눈에 조망",
      "하루 종료 시 타임테이블과 함께 아카이브에 자동 저장",
    ],
  },
  {
    id: "calendar",
    label: "캘린더",
    title: "주간 캘린더",
    desc: "3일 단위로 작업 세션을 시각화해요. 언제, 어떤 앱으로, 얼마나 작업했는지를 프로젝트 색상으로 구분해 한눈에 파악할 수 있어요.",
    points: [
      "3일 뷰 — 좌우 스와이프 또는 버튼으로 날짜 이동",
      "핀치 제스처로 시간 축 자유 확대·축소 (24~130px/시간)",
      "월간 미니 캘린더를 펼쳐 원하는 날짜로 바로 이동",
      "현재 시간 표시선으로 지금 위치 즉시 파악",
      "프로젝트별 색상으로 작업 세션 시각적 구분",
    ],
  },
  {
    id: "pomodoro",
    label: "포모도로",
    title: "포모도로 타이머",
    desc: "25분 집중과 5분 휴식을 반복하는 포모도로 기법으로 작업 리듬을 잡아요. 완료된 세션은 자동으로 오늘의 집중 기록에 쌓여요.",
    points: [
      "25분 집중 / 5분 휴식 원클릭 전환",
      "원형 진행 그래프로 남은 시간 직관적 확인",
      "완료된 포모도로 카운터 및 🍅 시각화",
      "집중 중 떠오른 생각을 노트에 즉시 기록",
      "오늘의 총 포커스 시간 자동 집계",
    ],
  },
  {
    id: "stats",
    label: "아카이브",
    title: "데일리 아카이브",
    desc: "날짜별 작업 세션이 타임테이블로 자동 기록돼요. 과거 날짜를 탐색하며 어떤 하루를 보냈는지 되돌아볼 수 있어요.",
    points: [
      "날짜 탐색으로 과거 기록 열람",
      "앱 전환 이력이 타임테이블로 자동 저장",
      "총 집중 시간 · 세션 수 · 주요 활동 요약 카드",
      "여정 로그 — 하루를 글로 남기는 일기 기능",
      "비주얼 리캡 및 작업 스크린샷 갤러리",
    ],
  },
  {
    id: "settings",
    label: "설정",
    title: "설정",
    desc: "타임테이블 표시 방식부터 작업 앱 필터까지 원하는 대로 조정할 수 있어요. 앱별 자동 추적, 테마, 알림 기능도 추후 추가될 예정이에요.",
    points: [
      "타임라인 그리드 모드 — 15분 간격 또는 연속 표시",
      "현재 시간 표시선 켜기·끄기",
      "야간 시간 마커로 새벽 작업 구간 강조",
      "작업 앱 필터 — 집중 세션만 골라보기",
      "앱별 자동 추적, 테마, 알림, 내보내기 (업데이트 예정)",
    ],
  },
];

interface Props {
  activeId?: string;
  onSelect?: (id: string) => void;
}

export default function FeatureTabs({ activeId: controlledId, onSelect }: Props = {}) {
  const [internalId, setInternalId] = useState("day");
  const activeId = controlledId ?? internalId;
  const setActive = (id: string) => { setInternalId(id); onSelect?.(id); };

  const feature = FEATURES.find(f => f.id === activeId) ?? FEATURES[0];

  return (
    <div className="mt-8">
      <div className="flex gap-1 overflow-x-auto border-b border-[var(--border)] [scrollbar-width:none]">
        {FEATURES.map(f => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
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

      <div className="pt-5">
        <p className="mb-2 text-[13px] font-semibold text-[var(--t1)]">{feature.title}</p>
        <p className="mb-4 text-[13px] leading-relaxed text-[var(--t3)]">{feature.desc}</p>
        <ul className="space-y-2.5">
          {feature.points.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              <span className="text-[13px] leading-relaxed text-[var(--t3)]">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
