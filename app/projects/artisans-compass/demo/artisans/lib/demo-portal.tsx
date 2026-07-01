"use client";

// Demo-only helper: Radix portals normally mount on document.body, which sits
// outside the .artisans-demo scope and would miss the demo's theme variables.
// Overlays instead portal into this dedicated container rendered inside the
// themed wrapper.

import { createContext, useContext } from "react";

export const DemoPortalContext = createContext<HTMLElement | null>(null);

export function useDemoPortalContainer(): HTMLElement | undefined {
    return useContext(DemoPortalContext) ?? undefined;
}
