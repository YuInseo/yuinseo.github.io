import type { Metadata } from "next";
import ArtisansContent from '../../../projects/artisans-compass/ArtisansContent';

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  if (params.lang === 'en') {
    return {
      title: "Artisan's Compass",
      description: "A Windows productivity app for logging your day. App usage history builds up automatically in a timetable, with projects, todos, pomodoro, and archive in one flow.",
      keywords: ["Windows app", "productivity app", "timetable", "pomodoro", "daily log", "time tracking", "Artisan's Compass"],
      openGraph: {
        title: "Artisan's Compass — A Windows Productivity App for Logging Your Day",
        description: "App usage history builds up automatically in a timetable, with projects, todos, pomodoro, and archive all connected in one flow.",
        url: "https://yuinseo.github.io/en/projects/artisans-compass",
        type: "website",
      },
      twitter: {
        card: "summary",
        title: "Artisan's Compass — A Windows Productivity App for Logging Your Day",
        description: "App usage history builds up automatically in a timetable, with projects, todos, pomodoro, and archive all connected in one flow.",
      },
      alternates: {
        canonical: "https://yuinseo.github.io/en/projects/artisans-compass",
      },
    };
  }
  return {
    title: "Artisan's Compass",
    description: "앱 사용 이력 자동 기록, 타임테이블, 포모도로, 프로젝트 관리가 하나의 흐름으로 연결되는 Windows 생산성 앱. 매일 밤 하루를 닫으면 그날의 기록이 영구 보관됩니다.",
    keywords: ["Windows 앱", "생산성 앱", "타임테이블", "포모도로", "하루 기록", "시간 관리", "Artisan's Compass"],
    openGraph: {
      title: "Artisan's Compass — 하루를 기록하는 Windows 생산성 앱",
      description: "앱 사용 이력 자동 기록, 타임테이블, 포모도로, 프로젝트 관리가 하나의 흐름으로 연결되는 Windows 생산성 앱.",
      url: "https://yuinseo.github.io/ko/projects/artisans-compass",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Artisan's Compass — 하루를 기록하는 Windows 생산성 앱",
      description: "앱 사용 이력 자동 기록, 타임테이블, 포모도로, 프로젝트 관리가 하나의 흐름으로 연결되는 Windows 생산성 앱.",
    },
    alternates: {
      canonical: "https://yuinseo.github.io/ko/projects/artisans-compass",
    },
  };
}

export default function ArtisansCompassPage() {
  return <ArtisansContent />;
}
