// Web demo backend — stands in for the Electron main process.
// The vendored app code talks to `window.ipcRenderer` exactly like the real
// renderer does; this module answers those calls from an in-memory store
// seeded with believable demo data. Nothing is persisted across reloads.

import { format, addDays, subDays } from 'date-fns';
import type { AppSettings, Project, Todo, PlannedSession } from './artisans/types';

// ─── Deterministic PRNG (stable per date, organic across the month) ──────────
function hashStr(s: string): number {
    let h = 1779033703;
    for (let i = 0; i < s.length; i++) {
        h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
    }
    return h >>> 0;
}
function mulberry32(seed: number) {
    let a = seed;
    return () => {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ─── Seed: projects ───────────────────────────────────────────────────────────
const today = new Date();
today.setHours(0, 0, 0, 0);
const d = (offset: number) => format(addDays(today, offset), 'yyyy-MM-dd');

const PROJECTS: Project[] = [
    { id: 'p-webtoon', name: '웹툰 12화 원고', type: 'Main', startDate: d(-18), endDate: d(9), isCompleted: false, color: '#4a90e2' },
    { id: 'p-commission', name: '커미션 - 일러스트 A', type: 'Sub', startDate: d(-6), endDate: d(4), isCompleted: false, color: '#e06090' },
    { id: 'p-bg', name: '배경 연습 - 가을 풍경', type: 'Practice', startDate: d(-12), endDate: d(2), isCompleted: false, color: '#40b080' },
    { id: 'p-compass', name: "Artisan's Compass", type: 'Sub', startDate: d(-25), endDate: d(14), isCompleted: false, color: '#f0a030' },
    { id: 'p-fanart', name: '팬아트 - 여름 이벤트', type: 'Sub', startDate: d(-30), endDate: d(-8), isCompleted: true, color: '#9b6dd6' },
];

// ─── Seed: settings ───────────────────────────────────────────────────────────
const SETTINGS: AppSettings = {
    targetProcessPatterns: ['CLIP Studio Paint', 'Photoshop', 'Blender'],
    idleThresholdSeconds: 10,
    backupPaths: [],
    projectTags: ['Main', 'Sub', 'Practice'],
    typeColors: { Main: '#3b82f6', Sub: '#22c55e', Practice: '#eab308' },
    enableCustomProjectColors: true,
    defaultProjectDurationDays: 14,
    visibleProjectRows: 5,
    hasCompletedOnboarding: true,
    screenshotIntervalSeconds: 1800,
    timelapseDurationSeconds: 5,
    showIndentationGuides: true,
    timelineAutoScrollToToday: true,
    showTimelinePreview: true,
    focusGoals: {
        monthly: '웹툰 12화 완성 + 커미션 2건 마감',
        weekly: '원고 3페이지 펜선 끝내기',
        dailyQuest: '12화 7페이지 콘티 다듬기',
        dailyQuestUpdatedAt: Date.now(),
    },
    startOfWeek: 'monday',
    enableScreenshots: false,
    themePreset: 'default',
    workApps: ['CLIP Studio Paint', 'Photoshop', 'Blender', 'Aseprite'],
    knownApps: [
        { name: 'CLIP Studio Paint', process: 'CLIPStudioPaint.exe' },
        { name: 'Photoshop', process: 'Photoshop.exe' },
        { name: 'Blender', process: 'blender.exe' },
        { name: 'Chrome', process: 'chrome.exe' },
        { name: 'Discord', process: 'Discord.exe' },
    ],
    ignoredApps: [],
    ignoredAppsColor: '#808080',
    filterTimelineByWorkApps: false,
    nightTimeStart: 24,
    mainTheme: 'dark',
    showCurrentTimeIndicator: true,
    enableQuotes: true,
    dailyRecordMode: 'dynamic',
    todayTargetHours: 6,
    timelineGridMode: '15min',
    showRoutinesInTimetable: true,
    showPlannedSessions: true,
    showAppOnOffIndicator: true,
    weeklyRoutine: [
        { id: 'r-1', dayOfWeek: 1, startSeconds: 10 * 3600, durationSeconds: 2 * 3600, title: '원고 작업', color: '#4a90e2' },
        { id: 'r-2', dayOfWeek: 3, startSeconds: 14 * 3600, durationSeconds: 3 * 3600, title: '커미션 작업', color: '#e06090' },
        { id: 'r-3', dayOfWeek: 5, startSeconds: 20 * 3600, durationSeconds: 90 * 60, title: '크로키 연습', color: '#40b080' },
    ],
};

// ─── Seed: todos (today) ──────────────────────────────────────────────────────
let todoSeq = 0;
const t = (text: string, completed = false, children?: Todo[]): Todo => ({
    id: `todo-${++todoSeq}`,
    text,
    completed,
    ...(children ? { children } : {}),
    createdAt: Date.now() - todoSeq * 60000,
});

const TODAY_TODOS: Record<string, Todo[]> = {
    'p-webtoon': [
        t('7페이지 콘티 수정', true),
        t('8~9페이지 펜선', false, [
            t('밑그림 정리', true),
            t('인물 펜선', false),
            t('배경 펜선', false),
        ]),
        t('대사 식자 초안', false),
    ],
    'p-commission': [
        t('러프 2안 전달', true),
        t('피드백 반영 - 머리카락 채색', false),
        t('배경 소품 추가', false),
    ],
    'p-bg': [
        t('은행나무 가로수 스터디', true),
        t('노을 색감 팔레트 정리', false),
    ],
    'p-compass': [
        t('타임테이블 라이브 데모 배포', true),
        t('통계 화면 다듬기', false),
    ],
    general: [
        t('메일 답장 - 원고료 정산', true),
        t('태블릿 펜촉 주문', false),
        t('주간 백업', false),
    ],
};

// ─── Session generation ───────────────────────────────────────────────────────
const WORK_APPS = ['CLIP Studio Paint', 'Photoshop', 'Blender'];
const OTHER_APPS = ['Chrome', 'Discord', 'YouTube Music'];

function generateSessionsFor(date: Date): { sessions: any[]; appSessions: { start: number; end: number }[]; firstOpenedAt: number } {
    const dateStr = format(date, 'yyyy-MM-dd');
    const rand = mulberry32(hashStr(dateStr));
    const base = new Date(date); base.setHours(0, 0, 0, 0);
    const at = (mins: number) => base.getTime() + mins * 60000;

    const isToday = dateStr === format(new Date(), 'yyyy-MM-dd');
    const nowMins = isToday ? (Date.now() - base.getTime()) / 60000 : 24 * 60;

    const sessions: any[] = [];
    // 2–4 work blocks starting between 09:30 and 21:00
    const blockCount = 2 + Math.floor(rand() * 3);
    let cursor = 9 * 60 + Math.floor(rand() * 90); // start 09:00–10:30
    const firstOpenedAt = at(cursor - 10 - Math.floor(rand() * 20));

    for (let b = 0; b < blockCount; b++) {
        const app = rand() < 0.72 ? WORK_APPS[Math.floor(rand() * WORK_APPS.length)] : OTHER_APPS[Math.floor(rand() * OTHER_APPS.length)];
        const len = 45 + Math.floor(rand() * 130); // 45–175 min
        const end = Math.min(cursor + len, nowMins - 5);
        if (end - cursor >= 15) {
            sessions.push({
                start: at(cursor),
                end: at(end),
                duration: Math.round((end - cursor) * 60),
                process: app,
            });
        }
        cursor = end + 20 + Math.floor(rand() * 100); // break 20–120 min
        if (cursor >= Math.min(23 * 60, nowMins - 20)) break;
    }

    const lastEnd = sessions.length ? sessions[sessions.length - 1].end : firstOpenedAt;
    const appSessions = [{ start: firstOpenedAt, end: isToday ? Date.now() : lastEnd + 25 * 60000 }];
    return { sessions, appSessions, firstOpenedAt };
}

function plannedSessionsFor(date: Date): PlannedSession[] {
    const dateStr = format(date, 'yyyy-MM-dd');
    if (dateStr !== format(new Date(), 'yyyy-MM-dd')) return [];
    const base = new Date(date); base.setHours(0, 0, 0, 0);
    return [
        { id: 'plan-1', start: base.getTime() + 10 * 3600000, duration: 2 * 3600, title: '원고 펜선', color: '#4a90e2', priority: 'high' },
        { id: 'plan-2', start: base.getTime() + 15 * 3600000, duration: 90 * 60, title: '커미션 채색', color: '#e06090', priority: 'medium' },
        { id: 'plan-3', start: base.getTime() + 21 * 3600000, duration: 3600, title: '크로키 연습', color: '#40b080', priority: 'low' },
    ];
}

const QUOTES = [
    '꾸준함이 재능을 이긴다.',
    '오늘 그린 한 장이 내일의 실력이 된다.',
    '완벽한 선보다 완성된 원고.',
];

// ─── In-memory DB ─────────────────────────────────────────────────────────────
let settings: AppSettings = { ...SETTINGS };
let projects: Project[] = [...PROJECTS];
const monthlyLogs: Record<string, Record<string, any>> = {};

function buildDailyLog(date: Date): any {
    const dateStr = format(date, 'yyyy-MM-dd');
    const { sessions, appSessions, firstOpenedAt } = generateSessionsFor(date);
    const isToday = dateStr === format(new Date(), 'yyyy-MM-dd');
    const rand = mulberry32(hashStr(dateStr + '-log'));
    return {
        date: dateStr,
        sessions,
        appSessions,
        firstOpenedAt,
        screenshots: [],
        plannedSessions: plannedSessionsFor(date),
        projectTodos: isToday ? TODAY_TODOS : undefined,
        quote: QUOTES[Math.floor(rand() * QUOTES.length)],
        journal: isToday ? undefined : (rand() < 0.4 ? '펜선 집중이 잘 된 날. 손목 스트레칭 잊지 말기.' : undefined),
    };
}

function getMonthLogs(yearMonth: string): Record<string, any> {
    if (!monthlyLogs[yearMonth]) {
        const logs: Record<string, any> = {};
        // Generate logs for each past day of that month (up to today)
        const [y, m] = yearMonth.split('-').map(Number);
        const daysInMonth = new Date(y, m, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(y, m - 1, day);
            if (date > today) continue;
            const dateStr = format(date, 'yyyy-MM-dd');
            // ~1 rest day a week
            if (mulberry32(hashStr(dateStr + '-rest'))() < 0.14 && dateStr !== format(new Date(), 'yyyy-MM-dd')) {
                logs[dateStr] = { date: dateStr, sessions: [], screenshots: [], isRestDay: true };
                continue;
            }
            logs[dateStr] = buildDailyLog(date);
        }
        monthlyLogs[yearMonth] = logs;
    }
    return monthlyLogs[yearMonth];
}

// ─── Live tracking simulation ─────────────────────────────────────────────────
type Listener = (data: any) => void;
const trackingListeners = new Set<Listener>();
const sessionCompletedListeners = new Set<Listener>();
const settingsUpdatedListeners = new Set<Listener>();
let liveTimer: ReturnType<typeof setInterval> | null = null;
let liveStart = 0;

function startLiveSession() {
    liveStart = Date.now() - 8 * 60000; // has been drawing for 8 minutes already
    if (liveTimer) clearInterval(liveTimer);
    liveTimer = setInterval(() => {
        const currentSession = {
            start: liveStart,
            end: Date.now(),
            duration: Math.round((Date.now() - liveStart) / 1000),
            process: 'CLIP Studio Paint',
        };
        trackingListeners.forEach((cb) => cb({ currentSession, isTracking: true }));
    }, 3000);
}

// ─── The mock ipcRenderer ─────────────────────────────────────────────────────
const channelListeners: Record<string, Set<Listener>> = {};

async function invoke(channel: string, ...args: any[]): Promise<any> {
    switch (channel) {
        case 'get-settings': return settings;
        case 'save-settings': settings = args[0]; return true;
        case 'get-projects': return projects;
        case 'save-projects': projects = args[0]; return true;
        case 'get-logical-date': return format(new Date(), 'yyyy-MM-dd');
        case 'get-daily-log': {
            const dateStr: string = args[0];
            return getMonthLogs(dateStr.slice(0, 7))[dateStr] ?? null;
        }
        case 'get-monthly-log': return getMonthLogs(args[0]);
        case 'save-daily-log': {
            const [dateStr, log] = args;
            getMonthLogs(dateStr.slice(0, 7))[dateStr] = log;
            return true;
        }
        case 'save-monthly-log': {
            const { yearMonth, data } = args[0];
            monthlyLogs[yearMonth] = data;
            return true;
        }
        case 'get-daily-screenshots': return [];
        case 'get-running-apps': return settings.knownApps ?? [];
        case 'get-plugins': return [];
        case 'get-plugins-dir': return '/demo/plugins';
        case 'get-user-data-path': return '/demo';
        case 'get-window-bounds': return { x: 0, y: 0, width: 1280, height: 800 };
        case 'get-monitor-names': return [];
        case 'get-screen-sources': return [];
        case 'get-screenshot-disk-usage': return { totalBytes: 0, fileCount: 0 };
        case 'check-for-updates': return null;
        case 'open-external':
            if (typeof args[0] === 'string') window.open(args[0], '_blank', 'noopener');
            return true;
        case 'reload-settings':
        case 'set-auto-launch':
            return true;
        case 'export-settings': return { success: false, message: 'Demo build' };
        case 'import-settings': return { success: false, message: 'Demo build' };
        default:
            return null;
    }
}

export function installMockIpc(): void {
    if (typeof window === 'undefined') return;
    if ((window as any).__artisansDemoIpcInstalled) return;
    (window as any).__artisansDemoIpcInstalled = true;

    (window as any).ipcRenderer = {
        invoke,
        send: (_channel: string, ..._args: any[]) => { },
        on: (channel: string, listener: Listener) => {
            (channelListeners[channel] ??= new Set()).add(listener);
        },
        off: (channel: string, listener: Listener) => {
            channelListeners[channel]?.delete(listener);
        },
        removeListener: (channel: string, listener: Listener) => {
            channelListeners[channel]?.delete(listener);
        },
        removeAllListeners: (channel: string) => {
            channelListeners[channel]?.clear();
        },

        getSettings: () => invoke('get-settings'),
        saveSettings: (s: AppSettings) => invoke('save-settings', s),
        getProjects: () => invoke('get-projects'),
        saveProjects: (p: Project[]) => invoke('save-projects', p),
        getMonthlyLog: (yearMonth: string) => invoke('get-monthly-log', yearMonth),
        saveMonthlyLog: (data: { yearMonth: string; data: any }) => invoke('save-monthly-log', data),
        saveDailyLog: (dateStr: string, data: any) => invoke('save-daily-log', dateStr, data),
        getUserDataPath: () => invoke('get-user-data-path'),
        saveTodoImage: async (data: string) => data, // keep the data URL as-is
        getRunningApps: () => invoke('get-running-apps'),
        showNotification: async (_n: { title: string; body: string }) => true,
        getScreenshotDiskUsage: () => invoke('get-screenshot-disk-usage'),

        onSettingsUpdated: (cb: Listener) => {
            settingsUpdatedListeners.add(cb);
            return () => settingsUpdatedListeners.delete(cb);
        },
        onTrackingUpdate: (cb: Listener) => {
            trackingListeners.add(cb);
            return () => trackingListeners.delete(cb);
        },
        onSessionCompleted: (cb: Listener) => {
            sessionCompletedListeners.add(cb);
            return () => sessionCompletedListeners.delete(cb);
        },
        onUpdateState: (_cb: Listener) => () => { },
        onBackendLog: (_cb: Listener) => () => { },
    };

    startLiveSession();
}

// Yesterday reference kept for potential future use of carry-over seeding
export const YESTERDAY_STR = format(subDays(today, 1), 'yyyy-MM-dd');
