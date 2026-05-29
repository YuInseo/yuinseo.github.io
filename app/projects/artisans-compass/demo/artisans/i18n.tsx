// Mock i18n for the web demo — no react-i18next initialization needed

const KO: Record<string, string> = {
  "calendar.totalFocus": "총 집중 시간",
  "calendar.peakFocus": "주요 활동 시간",
  "calendar.currentTime": "현재 시각",
  "calendar.firstLaunch": "첫 실행",
  "calendar.focusSession": "집중 세션",
  "calendar.appStarted": "앱 시작",
  "calendar.appClosed": "앱 종료",
  "settings.timeline.gridMode": "15분 그리드 모드",
  "settings.timeline.filterWorkApps": "작업 앱만 표시",
  "settings.timeline.showPlannedSessions": "예정 세션 표시",
  "settings.timeline.configureWorkApps": "작업 앱 설정",
  "settings.timeline.configureIgnoredApps": "제외 앱 설정",
  "settings.timeline.nightTimeStart": "야간 시작",
  "settings.timeline.configureIgnoredAppsDesc": "앱을 타임라인에서 제외합니다.",
  "settings.timeline.configureWorkAppsDesc": "작업으로 분류할 앱을 설정합니다.",
  "settings.timeline.ignoredAppsList": "제외된 앱",
  "settings.timeline.workAppsList": "작업 앱 목록",
  "settings.timeline.noIgnoredApps": "제외된 앱 없음",
  "settings.timeline.noAppsInList": "목록에 앱 없음",
  "settings.timeline.addIgnoredApp": "앱 제외 추가",
  "settings.timeline.addWorkApp": "작업 앱 추가",
  "settings.timeline.selectAppToIgnore": "제외할 앱 선택",
  "settings.timeline.selectAppToAdd": "추가할 앱 선택",
  "settings.timeline.allAppsIgnored": "모든 앱이 제외됨",
  "settings.timeline.allAppsAdded": "모든 앱이 추가됨",
  "common.done": "완료",
};

export function useTranslation() {
  return {
    t: (key: string) => KO[key] ?? key,
    i18n: { language: "ko" },
  };
}
