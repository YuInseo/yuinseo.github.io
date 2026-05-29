import { useMemo } from 'react';
import { differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { Session, Project, PlannedSession, AppSettings } from '../../../types';
import { useTranslation } from '../../../i18n';

export function useTimeTableData(
    sessions: Session[],
    date: Date | undefined,
    liveSession: Session | null | undefined,
    projects: Project[],
    now: Date,
    renderMode: 'fixed' | 'dynamic',
    plannedSessions: PlannedSession[],
    nightTimeStart: number,
    settings: AppSettings | null | undefined,
    activeProjectId: string | undefined
) {
    const { t } = useTranslation();
    const TOTAL_HOURS = 24;

    const { eventsWithRelativeTime, TOTAL_MINUTES = 1440 } = useMemo(() => {
        const isValidDate = (d: any) => d instanceof Date && !isNaN(d.getTime());
        const uniqueSessions = liveSession
            ? sessions.filter(s => Math.abs(new Date(s.start).getTime() - new Date(liveSession.start).getTime()) > 1000)
            : sessions;
        const allSessions = liveSession ? [...uniqueSessions, liveSession] : sessions;
        if (allSessions.length === 0) return { eventsWithRelativeTime: [], TOTAL_MINUTES: 1440 };

        const dayStart = date ? new Date(date) : new Date(now);
        if (!isValidDate(dayStart)) { dayStart.setTime(new Date().getTime()); }
        dayStart.setHours(0, 0, 0, 0);

        const mapped = allSessions.map(session => {
            const s = new Date(session.start);
            const e = (session === liveSession) ? now : new Date(session.end);
            if (!isValidDate(s) || !isValidDate(e)) return null;
            let startMins = differenceInMinutes(s, dayStart);
            let endMins = differenceInMinutes(e, dayStart);
            if (startMins < 0) startMins = 0;
            return { ...session, s, e, startMins, endMins, durationMins: endMins - startMins };
        }).filter(Boolean) as any[];

        return { eventsWithRelativeTime: mapped, TOTAL_MINUTES: 1440 };
    }, [sessions, liveSession, date, now]);

    interface RenderEvent {
        id: string; title: string; startDate: Date; endDate: Date;
        startMins: number; endMins: number; durationMins: number;
        appDistribution: Record<string, number>; type?: string; startHour: number;
        color?: string; isIgnored?: boolean; forceSide?: 'left' | 'right';
    }

    const sessionBlocks = useMemo(() => {
        const MIDNIGHT_MINS = 1440;
        const events: RenderEvent[] = [];

        // Pre-merge consecutive sessions (gap < 5m)
        const mergedSessions: any[] = [];
        if (eventsWithRelativeTime.length > 0) {
            const sorted = [...eventsWithRelativeTime].sort((a, b) => a.startMins - b.startMins);
            let current: any = null;
            sorted.forEach(session => {
                const appName = session.process || t('calendar.focusSession');
                const dur = differenceInSeconds(session.e, session.s);
                if (!current) { current = { ...session, title: appName, appDistribution: { [appName]: dur } }; return; }
                const gap = session.startMins - current.endMins;
                if (gap < 5) {
                    current.endMins = Math.max(current.endMins, session.endMins);
                    current.e = session.e.getTime() > current.e.getTime() ? session.e : current.e;
                    current.durationMins = current.endMins - current.startMins;
                    current.appDistribution[appName] = (current.appDistribution[appName] || 0) + dur;
                    const maxDur = Math.max(...Object.values(current.appDistribution) as number[]);
                    if ((current.appDistribution[appName] || 0) >= maxDur) current.title = appName;
                } else {
                    mergedSessions.push(current);
                    current = { ...session, title: appName, appDistribution: { [appName]: dur } };
                }
            });
            if (current) mergedSessions.push(current);
        }

        // Snap to 15-min grid
        const snapped: any[] = [];
        mergedSessions.forEach(block => {
            const snapStart = Math.round(block.startMins / 15) * 15;
            const snapEnd = Math.round(block.endMins / 15) * 15;
            if (snapStart === snapEnd) return;
            snapped.push({ ...block, startMins: snapStart, endMins: snapEnd, durationMins: snapEnd - snapStart });
        });

        // Post-snap merge
        const finalBlocks: any[] = [];
        if (snapped.length > 0) {
            snapped.sort((a, b) => a.startMins - b.startMins);
            let curr = snapped[0];
            for (let i = 1; i < snapped.length; i++) {
                const next = snapped[i];
                if (curr.endMins >= next.startMins) {
                    curr.endMins = Math.max(curr.endMins, next.endMins);
                    curr.durationMins = curr.endMins - curr.startMins;
                    curr.e = next.e;
                    Object.entries(next.appDistribution).forEach(([app, d]) => {
                        curr.appDistribution[app] = (curr.appDistribution[app] || 0) + (d as number);
                    });
                    let maxD = 0, dom = curr.title;
                    Object.entries(curr.appDistribution).forEach(([app, d]) => { if ((d as number) > maxD) { maxD = (d as number); dom = app; } });
                    curr.title = dom;
                } else { finalBlocks.push(curr); curr = next; }
            }
            finalBlocks.push(curr);
        }

        // Generate render events
        finalBlocks.forEach(block => {
            const processName = block.title;
            const matchedProject = projects.find(p => p.name === processName);
            const isIgnored = settings?.ignoredApps?.some(ign =>
                ign === processName || ign.toLowerCase() === processName.toLowerCase() ||
                processName.toLowerCase().includes(ign.toLowerCase())
            );
            const color = isIgnored ? (settings?.ignoredAppsColor || '#808080') : (matchedProject?.color || undefined);

            const createEvent = (sMins: number, eMins: number, side: 'left' | 'right' | undefined) => {
                const sDate = new Date(date || now); sDate.setHours(0, 0, 0, 0); sDate.setMinutes(sMins);
                const eDate = new Date(date || now); eDate.setHours(0, 0, 0, 0); eDate.setMinutes(eMins);
                events.push({
                    id: `block-${sMins}-${processName}`,
                    title: processName,
                    startDate: sDate, endDate: eDate,
                    startMins: sMins >= MIDNIGHT_MINS ? sMins - MIDNIGHT_MINS : sMins,
                    endMins: sMins >= MIDNIGHT_MINS ? eMins - MIDNIGHT_MINS : eMins,
                    durationMins: eMins - sMins,
                    appDistribution: block.appDistribution,
                    type: matchedProject?.type,
                    startHour: Math.floor(sMins / 60) % 24,
                    color, isIgnored, forceSide: side
                });
            };

            const s = block.startMins, e = block.endMins;
            if (renderMode === 'dynamic') {
                if (s < MIDNIGHT_MINS && e > MIDNIGHT_MINS) {
                    createEvent(s, MIDNIGHT_MINS, 'left');
                    createEvent(MIDNIGHT_MINS, e, 'right');
                } else if (s >= MIDNIGHT_MINS) {
                    createEvent(s, e, 'right');
                } else {
                    createEvent(s, e, undefined);
                }
            } else {
                const clampedEnd = Math.min(e, 24 * 60);
                if (s < clampedEnd) createEvent(s, clampedEnd, undefined);
            }
        });

        if (renderMode === 'dynamic' && events.some(e => e.forceSide === 'right')) {
            events.forEach(e => { if (e.forceSide !== 'right') e.forceSide = 'left'; });
        }

        return events.map(evt => {
            const top = (evt.startMins / TOTAL_MINUTES) * 100;
            const height = ((evt.endMins - evt.startMins) / TOTAL_MINUTES) * 100;
            let left = "0%", width = "100%";
            if (evt.forceSide === 'left') width = "50%";
            else if (evt.forceSide === 'right') { left = "50%"; width = "50%"; }

            const isNightTime = (() => {
                if (evt.isIgnored) return false;
                const h = evt.startHour, limit = 5;
                if (h < limit) return nightTimeStart < 24 ? true : h >= (nightTimeStart - 24);
                return nightTimeStart < 24 && h >= nightTimeStart;
            })();

            return {
                top: `${top}%`, height: `${height}%`, left, width,
                title: evt.title,
                timeRange: `${format(evt.startDate, 'HH:mm')} - ${format(evt.endDate, 'HH:mm')}`,
                duration: `${evt.durationMins} m`,
                durationMins: evt.durationMins,
                isShort: evt.durationMins < 15,
                fullApps: Object.keys(evt.appDistribution).join(', '),
                type: evt.type,
                appDistribution: evt.appDistribution,
                isNightTime,
                color: evt.color,
                forceSide: evt.forceSide
            };
        });
    }, [sessions, date, liveSession, now, projects, nightTimeStart, settings, renderMode, plannedSessions, eventsWithRelativeTime]);

    return { sessionBlocks, TOTAL_MINUTES, TOTAL_HOURS };
}
