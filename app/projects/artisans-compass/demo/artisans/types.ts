export interface Session {
  start: number;  // Unix timestamp ms
  end: number;    // Unix timestamp ms
  duration: number; // seconds
  process?: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  color?: string;
}

export interface PlannedSession {
  id: string;
  start: number;
  duration: number;
  title: string;
  color?: string;
}

export interface AppSettings {
  timelineGridMode?: 'continuous' | '15min';
  filterTimelineByWorkApps?: boolean;
  showPlannedSessions?: boolean;
  showCurrentTimeIndicator?: boolean;
  showFirstLaunchIndicator?: boolean;
  showRoutinesInTimetable?: boolean;
  showAppOnOffIndicator?: boolean;
  dailyRecordMode?: 'fixed' | 'dynamic';
  nightTimeStart?: number;
  ignoredApps?: string[];
  ignoredAppsColor?: string;
  workApps?: string[];
  weeklyRoutine?: any[];
  [key: string]: any;
}
