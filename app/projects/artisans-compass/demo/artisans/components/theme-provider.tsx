"use client";

// Web demo variant of the app's ThemeProvider.
// The real app injects theme CSS variables into document.documentElement;
// here they are applied to a wrapper element instead so the demo cannot
// leak its theme into the hosting portfolio site (which uses the same
// CSS variable names).

import { createContext, useContext, useMemo, useState, CSSProperties } from "react"
import { themes } from "@/config/themes"
import { useDataStore } from "@/hooks/useDataStore";
import { cn } from "@/lib/utils";
import { DemoPortalContext } from "@/lib/demo-portal";

type ThemeName = string; // "light" | "dark" | "midnight" | ...

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: ThemeName
    storageKey?: string
}

type ThemeProviderState = {
    theme: ThemeName
    setTheme: (theme: ThemeName) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    defaultTheme = "dark",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<ThemeName>(defaultTheme)
    const { settings } = useDataStore();

    const { styleVars, isDark } = useMemo(() => {
        let effectiveThemeName = theme;
        if (theme === "system") {
            effectiveThemeName = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        const isDark = effectiveThemeName !== 'light';

        let themeKey = effectiveThemeName;
        if (isDark) {
            themeKey = settings?.themePreset || 'default';
        }
        const themeConfig = themes[themeKey] || themes['default'] || themes['dark'];

        const styleVars: Record<string, string> = {};
        if (themeConfig) {
            Object.entries(themeConfig.colors).forEach(([key, value]) => {
                const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
                styleVars[cssVar] = value;
            });
        }
        return { styleVars, isDark };
    }, [theme, settings?.themePreset]);

    const value = {
        theme,
        setTheme: (theme: ThemeName) => setTheme(theme),
    }

    const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

    return (
        <ThemeProviderContext.Provider value={value}>
            <div
                className={cn("artisans-app-demo h-full w-full font-sans text-foreground bg-background", isDark ? "dark" : "light")}
                style={{ ...styleVars, colorScheme: isDark ? 'dark' : 'light' } as CSSProperties}
            >
                <DemoPortalContext.Provider value={portalEl}>
                    {children}
                </DemoPortalContext.Provider>
                {/* Overlay portal target — keeps Radix portals inside the themed scope */}
                <div ref={setPortalEl} className={cn("artisans-app-demo-portal", isDark ? "dark" : "light")} style={{ ...styleVars, colorScheme: isDark ? 'dark' : 'light' } as CSSProperties} />
            </div>
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
