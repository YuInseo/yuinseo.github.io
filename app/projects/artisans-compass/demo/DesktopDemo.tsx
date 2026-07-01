"use client";

// Desktop live demo — this is the real Artisan's Compass renderer
// (vendored under ./artisans) running against the mock IPC backend.
// Mirrors the app's App.tsx composition, minus onboarding/updater/debug.

import { useEffect, useState } from 'react';

import { installMockIpc } from './mock-ipc';
installMockIpc(); // must run before any store touches window.ipcRenderer

import './artisans/i18n';
import './artisans-demo.css';

import { AppLayout } from '@/components/layout/AppLayout';
import { TimelineSection } from '@/components/dashboard/TimelineSection';
import { DailyPanel } from '@/components/dashboard/DailyPanel';
import { ClosingRitualModal } from '@/components/dashboard/ClosingRitualModal';
import { InspirationModal } from '@/components/dashboard/InspirationModal';
import { ReminderModal } from '@/components/dashboard/ReminderModal';
import { DailyArchiveModal } from '@/components/dashboard/DailyArchiveModal';
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsModal } from '@/components/settings-modal';
import { Project } from "@/types";
import { useDataStore } from "@/hooks/useDataStore";
import { useTodoStore } from "@/hooks/useTodoStore";
import { Toaster } from "@/components/ui/sonner";
import { TodoSidebar } from "@/components/dashboard/TodoSidebar";
import { WeeklyView } from "@/components/dashboard/WeeklyView";
import { StatisticsPanel } from "@/components/dashboard/StatisticsPanel";
import { ArtisansCompassProvider, useUIExtensions } from "@/core/ArtisansCompassProvider";

import { ProjectList } from '@/components/dashboard/ProjectList';
import { PomodoroPanel } from '@/components/dashboard/PomodoroPanel';
import { usePomodoroStore } from '@/hooks/usePomodoroStore';

import { useSmartDate } from '@/hooks/useSmartDate';
import { useAppKeyboardShortcuts } from '@/hooks/useAppKeyboardShortcuts';
import { useClosingRitual } from '@/hooks/useClosingRitual';

export type DemoVariant = 'desktop' | 'mobile';

interface DemoAppProps {
    variant: DemoVariant;
    onViewChange?: (view: string) => void;
}

function DemoApp({ variant, onViewChange }: DemoAppProps) {
    const { settings, saveSettings, loading, projects, searchQuery } = useDataStore();
    const { loadTodos } = useTodoStore();

    useSmartDate();
    useAppKeyboardShortcuts();

    const { mainViews } = useUIExtensions();

    const {
        isRitualOpen,
        setIsRitualOpen,
        lastSessionSessions,
        lastSessionPlannedSessions,
        lastSessionScreenshots,
        lastSessionFirstOpenedAt,
        currentStats,
        handleOpenRitual,
        handleSaveLog
    } = useClosingRitual();

    const [showInspiration, setShowInspiration] = useState(true);
    const [showReminder, setShowReminder] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(variant !== 'mobile');

    // Global Pomodoro Ticker
    useEffect(() => {
        const timer = setInterval(() => {
            usePomodoroStore.getState().tick();
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        loadTodos();
    }, [loadTodos]);

    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [archiveDate, setArchiveDate] = useState<Date>(new Date());

    const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [settingsTab, setSettingsTab] = useState<'general' | 'timeline' | 'tracking' | 'integrations'>('general');
    const [focusedProject, setFocusedProject] = useState<Project | null>(null);

    const [dashboardView, setDashboardViewInternal] = useState<string>('daily');
    const setDashboardView = (view: string) => {
        setDashboardViewInternal(view);
        onViewChange?.(view);
    };

    const [navigationSignal, setNavigationSignal] = useState<{ date: Date, timestamp: number } | null>(null);

    const handleNavigate = (date: Date) => {
        setNavigationSignal({ date, timestamp: Date.now() });
    };

    const handleOpenSettings = (tab: 'general' | 'timeline' | 'tracking' | 'integrations' = 'general') => {
        setSettingsTab(tab);
        setIsSettingsOpen(true);
    };

    const rowCount = settings?.visibleProjectRows || 3;
    const timelineHeight = (rowCount * 50) + 33;

    const handleDateSelect = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(date);
        selected.setHours(0, 0, 0, 0);

        if (selected.getTime() < today.getTime()) {
            setArchiveDate(date);
            setIsArchiveOpen(true);
        }
    };

    if (loading) return null;

    return (
        <ThemeProvider defaultTheme="dark" storageKey="artisans-demo-theme">
            <InspirationModal
                isOpen={showInspiration && !!settings?.hasCompletedOnboarding && settings?.enableQuotes !== false}
                onClose={() => setShowInspiration(false)}
            />
            <ReminderModal
                isOpen={showReminder}
                onClose={() => setShowReminder(false)}
            />
            <AppLayout
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onOpenSettings={() => handleOpenSettings('general')}
                timelineHeight={timelineHeight}
                focusedProject={focusedProject}
                onFocusProject={setFocusedProject}
                dashboardView={dashboardView}
                onDashboardViewChange={setDashboardView}
                timeline={
                    viewMode === 'timeline'
                        ? <TimelineSection
                            searchQuery={searchQuery}
                            focusedProject={focusedProject}
                            navigationSignal={navigationSignal}
                            onOpenSettings={handleOpenSettings}
                            showFocusGoals={!isSidebarOpen && viewMode === 'timeline'}
                        />
                        : <ProjectList searchQuery={searchQuery} />
                }
                planPanel={
                    <WeeklyView
                        currentDate={navigationSignal?.date || new Date()}
                        onDateChange={handleNavigate}
                    />
                }
                todoPanel={
                    <TodoSidebar
                        onSelect={handleDateSelect}
                        navigationSignal={navigationSignal}
                    />
                }
                dailyPanel={
                    <DailyPanel
                        onEndDay={handleOpenRitual}
                        onShowReminder={() => setShowReminder(true)}
                        projects={projects}
                        isSidebarOpen={isSidebarOpen}
                        onOpenSettings={(tab) => handleOpenSettings(tab as 'general' | 'timeline' | 'tracking' | 'integrations')}
                    />
                }
                pomodoroPanel={<PomodoroPanel />}
                statisticsPanel={
                    <StatisticsPanel
                        focusedProject={focusedProject}
                        navigationSignal={navigationSignal}
                    />
                }
                mainViews={mainViews}
            />
            <ClosingRitualModal
                isOpen={isRitualOpen}
                onClose={() => setIsRitualOpen(false)}
                currentStats={currentStats}
                onSaveLog={handleSaveLog}
                projects={projects}
                sessions={lastSessionSessions}
                plannedSessions={lastSessionPlannedSessions}
                screenshots={lastSessionScreenshots}
                firstOpenedAt={lastSessionFirstOpenedAt}
            />
            <DailyArchiveModal
                isOpen={isArchiveOpen}
                onClose={() => {
                    setIsArchiveOpen(false);
                    handleNavigate(new Date());
                }}
                date={archiveDate}
                onDateChange={setArchiveDate}
            />
            <SettingsModal
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                settings={settings}
                onSaveSettings={saveSettings}
                defaultTab={settingsTab}
            />
            <Toaster />
        </ThemeProvider>
    );
}

interface ArtisansAppDemoProps {
    variant?: DemoVariant;
    onViewChange?: (view: string) => void;
}

export default function ArtisansAppDemo({ variant = 'desktop', onViewChange }: ArtisansAppDemoProps) {
    const frameClass = variant === 'desktop'
        ? "relative left-1/2 w-[min(1280px,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--border)] shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
        : "relative w-full overflow-hidden";

    return (
        <div className={frameClass} style={{ height: variant === 'desktop' ? 760 : 640 }}>
            <ArtisansCompassProvider>
                <DemoApp variant={variant} onViewChange={onViewChange} />
            </ArtisansCompassProvider>
        </div>
    );
}
