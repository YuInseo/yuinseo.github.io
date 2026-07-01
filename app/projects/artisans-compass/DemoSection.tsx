"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import FeatureTabs from "./FeatureTabs";

// The live demo is the real Artisan's Compass renderer running in the
// browser (Electron IPC mocked) — client-only, so no SSR.
const ArtisansAppDemo = dynamic(() => import("./demo/DesktopDemo"), {
  ssr: false,
  loading: () => (
    <div
      className="flex w-full items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--t3)]"
      style={{ height: 640 }}
    >
      데모 로딩 중...
    </div>
  ),
});

// Real app views → FeatureTabs ids
const VIEW_TO_FEATURE: Record<string, string> = {
  daily: "day",
  weekly: "calendar",
  pomodoro: "pomodoro",
  statistics: "stats",
};

export default function DemoSection() {
  const [featureId, setFeatureId] = useState("day");
  // null until first client measure — avoids mounting the heavy demo twice
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleViewChange = (view: string) => {
    setFeatureId(VIEW_TO_FEATURE[view] ?? "day");
  };

  if (isDesktop === null) return null;

  return isDesktop ? (
    <div>
      <ArtisansAppDemo variant="desktop" onViewChange={handleViewChange} />
      <div className="mx-auto max-w-2xl">
        <FeatureTabs activeId={featureId} />
      </div>
    </div>
  ) : (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <ArtisansAppDemo variant="mobile" onViewChange={handleViewChange} />
      <div className="border-t border-[var(--border)] bg-[var(--surface)] px-5 pb-6 pt-5">
        <FeatureTabs activeId={featureId} borderless />
      </div>
    </div>
  );
}
