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

  return (
    <>
      <DemoApp
        mobileView={activeView}
        onMobileViewChange={handleViewChange}
        diaryOpen={diaryOpen}
        onDiaryOpenChange={setDiaryOpen}
      />
      <div className="mx-auto max-w-2xl">
        <FeatureTabs activeId={diaryOpen ? "diary" : activeView} />
      </div>
    </>
  );
}
