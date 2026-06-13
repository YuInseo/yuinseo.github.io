import type { Metadata } from "next";
import ArtisansContent from "./ArtisansContent";

export const metadata: Metadata = {
  title: "Artisan's Compass",
  description: "앱 사용 이력 자동 기록, 타임테이블, 포모도로, 프로젝트 관리가 하나의 흐름으로 연결되는 Windows 생산성 앱. 매일 밤 하루를 닫으면 그날의 기록이 영구 보관됩니다.",
  keywords: ["Windows 앱", "생산성 앱", "타임테이블", "포모도로", "하루 기록", "시간 관리", "Artisan's Compass"],
  openGraph: {
    title: "Artisan's Compass — 하루를 기록하는 Windows 생산성 앱",
    description: "앱 사용 이력 자동 기록, 타임테이블, 포모도로, 프로젝트 관리가 하나의 흐름으로 연결되는 Windows 생산성 앱.",
    url: "https://yuinseo.github.io/projects/artisans-compass",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Artisan's Compass — 하루를 기록하는 Windows 생산성 앱",
    description: "앱 사용 이력 자동 기록, 타임테이블, 포모도로, 프로젝트 관리가 하나의 흐름으로 연결되는 Windows 생산성 앱.",
  },
  alternates: {
    canonical: "https://yuinseo.github.io/projects/artisans-compass",
  },
};

export default function ArtisansCompassPage() {
  return <ArtisansContent />;
}
