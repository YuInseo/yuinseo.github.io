"use client";
import { useState } from "react";
import DemoApp, { type MobileView } from "./demo/DemoApp";
import FeatureTabs from "./FeatureTabs";

export default function DemoSection() {
  const [activeView, setActiveView] = useState<MobileView>("day");

  return (
    <>
      <DemoApp mobileView={activeView} onMobileViewChange={setActiveView} />
      <div className="mx-auto max-w-2xl">
        <FeatureTabs activeId={activeView} onSelect={id => setActiveView(id as MobileView)} />
      </div>
    </>
  );
}
