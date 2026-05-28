import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artisan's Compass — 정리 프로그램",
  description:
    "타임테이블, 앱 사용량 추적, 데일리 아카이브, 캘린더 루틴 관리까지. 당신의 하루를 다듬는 데스크탑 생산성 앱.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
