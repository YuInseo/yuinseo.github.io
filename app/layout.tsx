import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import VisitorTracker from "./components/VisitorTracker";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://yuinseo.github.io"),
  title: {
    default: "yuinseo",
    template: "%s | yuinseo",
  },
  description: "사용자 경험을 개선하는 프론트엔드 개발자 유인서의 포트폴리오. React · TypeScript · Next.js · Electron.",
  openGraph: {
    siteName: "yuinseo",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <VisitorTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
