"use client";
import { useState } from "react";
import DemoApp, { type MobileView } from "./demo/DemoApp";
import FeatureTabs from "./FeatureTabs";

export default function DemoSection() {
  const [activeView, setActiveView] = useState<MobileView>("day");
  const [diaryOpen, setDiaryOpen] = useState(false);

  const handleViewChange = (v: MobileView) => {
    setActiveView(v);
    setDiaryOpen(false);
  };

  const featureId = diaryOpen ? "diary" : activeView;

  return (
    <>
      {/* Mobile: unified card */}
      <div className="lg:hidden overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        <DemoApp
          mobileView={activeView}
          onMobileViewChange={handleViewChange}
          diaryOpen={diaryOpen}
          onDiaryOpenChange={setDiaryOpen}
          embedded
        />
        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-5 pb-6 pt-5">
          <FeatureTabs activeId={featureId} borderless />
        </div>
      </div>
      {/* Desktop: existing layout */}
      <div className="hidden lg:block">
        <DemoApp
          mobileView={activeView}
          onMobileViewChange={handleViewChange}
          diaryOpen={diaryOpen}
          onDiaryOpenChange={setDiaryOpen}
        />
        <div className="mx-auto max-w-2xl">
          <FeatureTabs activeId={featureId} />
        </div>
      </div>
    </>
  );
}
