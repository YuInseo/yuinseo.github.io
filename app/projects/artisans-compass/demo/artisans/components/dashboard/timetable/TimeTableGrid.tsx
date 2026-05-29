import { Fragment } from 'react';
import { format, differenceInMinutes, isSameDay, getDay } from 'date-fns';
import { cn } from "../../../lib/utils";
import { useTranslation } from "../../../i18n";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger, ContextMenuSeparator, ContextMenuItem, ContextMenuCheckboxItem } from "../../../components/ui/context-menu";
import { Settings2, Briefcase } from "lucide-react";

export function TimeTableGrid({
    sessionBlocks, TOTAL_MINUTES, TOTAL_HOURS, date, now, firstOpenedAt,
    nightTimeStart, appSessions, plannedSessions, settings, renderMode,
    onUpdateSettings, toggleWorkFilter, openModal
}: any) {
    const { t } = useTranslation();

    return (
        <Fragment>
            <ContextMenu>
                <ContextMenuTrigger className="flex-1 relative mx-2 my-3 block">
                    {/* Grid Lines & Time Labels */}
                    {Array.from({ length: Math.ceil(TOTAL_HOURS / 2) + 1 }, (_, i) => i * 2).map(h => (
                        <div key={h} className="absolute w-full flex items-center group pointer-events-none"
                            style={{ top: `${(h / TOTAL_HOURS) * 100}%`, transform: 'translateY(-50%)' }}>
                            <div className="w-8 text-right pr-1">
                                <span className="text-[10px] text-muted-foreground/40 font-mono tabular-nums block">
                                    {h === 0 ? '00:00' : h < 24 ? `${h.toString().padStart(2, '0')}:00` : `+${(h - 24).toString().padStart(2, '0')}:00`}
                                </span>
                            </div>
                            <div className="flex-1 border-t border-border/20 w-full" />
                        </div>
                    ))}

                    {/* Vertical Divider */}
                    <div className="absolute top-0 bottom-0 left-8 border-l border-border/20 h-full pointer-events-none" />

                    {/* Current Time Indicator */}
                    {(() => {
                        if (settings?.showCurrentTimeIndicator === false) return null;
                        const d = date ? new Date(date) : new Date(now);
                        d.setHours(0, 0, 0, 0);
                        const diffMins = differenceInMinutes(now, d);
                        const shouldShow = diffMins >= 0 && diffMins < TOTAL_MINUTES;
                        if (!shouldShow) return null;
                        const topPct = (diffMins / TOTAL_MINUTES) * 100;
                        return (
                            <div className="absolute left-8 right-0 z-20 pointer-events-auto flex items-center group cursor-help"
                                style={{ top: `${topPct}%`, transform: 'translateY(-50%)' }}>
                                <div className="w-full border-t-2 border-red-500/50 border-dashed" />
                                <div className="absolute -left-1 -translate-x-1/2 w-4 h-4 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    <div className="absolute left-full ml-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/10 backdrop-blur px-1.5 py-0.5 rounded text-[9px] font-bold text-red-500 font-mono border border-red-500/20 whitespace-nowrap pointer-events-none z-50 uppercase tracking-wider">
                                        {format(now, 'HH:mm')} {t('calendar.currentTime')}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Night Time Indicator */}
                    {nightTimeStart !== undefined && nightTimeStart < 24 && (() => {
                        const nightMins = nightTimeStart * 60;
                        if (nightMins < 0 || nightMins > TOTAL_MINUTES) return null;
                        const topPct = (nightMins / TOTAL_MINUTES) * 100;
                        return (
                            <div className="absolute left-8 right-0 z-10 pointer-events-auto flex items-center group cursor-help"
                                style={{ top: `${topPct}%`, transform: 'translateY(-50%)' }}>
                                <div className="w-full border-t border-indigo-500/40 border-dashed" />
                                <div className="absolute -left-1 -translate-x-1/2 w-4 h-4 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-background border-2 border-indigo-500/80 rounded-full" />
                                    <div className="absolute left-full ml-1 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-500/10 backdrop-blur px-1.5 py-0.5 rounded text-[9px] font-bold text-indigo-500 font-mono border border-indigo-500/20 whitespace-nowrap pointer-events-none z-50 uppercase tracking-wider">
                                        {`${nightTimeStart.toString().padStart(2, '0')}:00`} {t('settings.timeline.nightTimeStart')}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Session Blocks */}
                    <div className="absolute top-0 bottom-0 left-8 right-0">
                        <TooltipProvider delayDuration={0}>
                            {sessionBlocks.map((block: any, i: number) => (
                                <ContextMenu key={i}>
                                    <ContextMenuTrigger>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className={cn(
                                                        "absolute rounded-sm transition-colors cursor-pointer z-10 flex flex-col justify-center px-2 overflow-hidden",
                                                        !block.color && !block.isNightTime && "bg-primary/80 text-primary-foreground",
                                                        block.isNightTime && "bg-yellow-500/90 dark:bg-yellow-600/90 text-yellow-950 dark:text-yellow-100"
                                                    )}
                                                    style={{
                                                        top: block.top, height: block.height, left: block.left, width: block.width,
                                                        backgroundColor: block.isNightTime ? undefined : (block.color || undefined)
                                                    }}
                                                >
                                                    {block.isNightTime && (
                                                        <div className="absolute top-1 right-1 z-20 opacity-100 drop-shadow-md">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-yellow-950 dark:text-yellow-100"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className="flex flex-col gap-0.5 bg-background/95 backdrop-blur border-border p-3 shadow-xl z-50 min-w-[180px]">
                                                <p className="font-bold text-sm text-foreground mb-1">{block.title}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                                    <span className="font-mono">{block.timeRange}</span>
                                                    <span>•</span>
                                                    <span>{block.duration}</span>
                                                </div>
                                                {Object.keys(block.appDistribution).length > 0 && (
                                                    <div className="flex flex-col gap-1 border-t border-border/50 pt-2 mt-1">
                                                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Apps in this block</span>
                                                        {Object.entries(block.appDistribution)
                                                            .sort(([, a], [, b]) => (b as number) - (a as number))
                                                            .map(([appName, duration]) => {
                                                                const d = duration as number;
                                                                const m = Math.floor(d / 60), s = d % 60;
                                                                return (
                                                                    <div key={appName} className="flex justify-between items-center text-xs">
                                                                        <span className="truncate max-w-[120px] text-muted-foreground/80">{appName}</span>
                                                                        <span className="font-mono text-[10px] opacity-70 ml-2">{m > 0 ? `${m}m` : `${s}s`}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                )}
                                            </TooltipContent>
                                        </Tooltip>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-52">
                                        <ContextMenuCheckboxItem
                                            checked={!settings?.timelineGridMode || settings?.timelineGridMode === '15min'}
                                            onCheckedChange={(checked) => onUpdateSettings?.({ ...settings, timelineGridMode: checked ? '15min' : 'continuous' })}
                                        >{t('settings.timeline.gridMode')}</ContextMenuCheckboxItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuCheckboxItem checked={settings?.filterTimelineByWorkApps} onCheckedChange={toggleWorkFilter}>
                                            {t('settings.timeline.filterWorkApps')}
                                        </ContextMenuCheckboxItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem onSelect={() => openModal('work', block)} className="gap-2 cursor-pointer">
                                            <Briefcase className="w-4 h-4" />{t('settings.timeline.configureWorkApps')}
                                        </ContextMenuItem>
                                        <ContextMenuItem onSelect={() => openModal('ignored', block)} className="gap-2 cursor-pointer">
                                            <Settings2 className="w-4 h-4" />{t('settings.timeline.configureIgnoredApps')}
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))}
                        </TooltipProvider>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-52">
                    <ContextMenuCheckboxItem
                        checked={!settings?.timelineGridMode || settings?.timelineGridMode === '15min'}
                        onCheckedChange={(checked) => onUpdateSettings?.({ ...settings, timelineGridMode: checked ? '15min' : 'continuous' })}
                    >{t('settings.timeline.gridMode')}</ContextMenuCheckboxItem>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem checked={settings?.filterTimelineByWorkApps} onCheckedChange={toggleWorkFilter}>
                        {t('settings.timeline.filterWorkApps')}
                    </ContextMenuCheckboxItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onSelect={() => openModal('work')} className="gap-2 cursor-pointer">
                        <Briefcase className="w-4 h-4" />{t('settings.timeline.configureWorkApps')}
                    </ContextMenuItem>
                    <ContextMenuItem onSelect={() => openModal('ignored')} className="gap-2 cursor-pointer">
                        <Settings2 className="w-4 h-4" />{t('settings.timeline.configureIgnoredApps')}
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </Fragment>
    );
}
