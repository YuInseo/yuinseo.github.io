// Web demo stub — Firestore sync is disabled; all pushes/pulls are no-ops.
import { AppSettings, Project } from '@/types';

export type Unsubscribe = () => void;

export async function touchProfile(): Promise<void> { }

export async function pushSettings(_settings: AppSettings): Promise<void> { }
export async function pullSettings(): Promise<AppSettings | null> { return null; }
export function subscribeSettings(_cb: (s: AppSettings | null) => void): Unsubscribe { return () => { }; }

export async function pushProjects(_projects: Project[]): Promise<void> { }
export async function pullProjects(): Promise<Project[] | null> { return null; }
export function subscribeProjects(_cb: (p: Project[] | null) => void): Unsubscribe { return () => { }; }

export async function pushDailyLog(_dateStr: string, _log: any): Promise<void> { }
export async function pullDailyLog(_dateStr: string): Promise<any | null> { return null; }
export async function pullMonthlyLogs(_yearMonth: string): Promise<Record<string, any>> { return {}; }

export function makeDebouncedPusher<T>(_pusher: (value: T) => Promise<void>, _delayMs: number): (value: T) => void {
    return () => { };
}
