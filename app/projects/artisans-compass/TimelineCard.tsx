"use client";

import { useState } from "react";

const timelineRows = [
  { time: "00:00", bars: [] as { w: string; v: string }[] },
  { time: "02:00", bars: [{ w: "55%", v: "var(--tl-a)" }] },
  { time: "04:00", bars: [] },
  { time: "08:00", bars: [] },
  { time: "10:00", bars: [{ w: "85%", v: "var(--tl-a)" }] },
  { time: "12:00", bars: [] },
  { time: "14:00", bars: [] },
  { time: "16:00", bars: [{ w: "60%", v: "var(--tl-a)" }, { w: "50%", v: "var(--tl-b)" }] },
  { time: "18:00", bars: [] },
  { time: "20:00", bars: [{ w: "35%", v: "var(--tl-a)" }] },
  { time: "22:00", bars: [] },
];

const appUsageRows = [
  { name: "Code.exe",   time: "4h 23m" },
  { name: "chrome.exe", time: "2h 15m" },
  { name: "Figma.exe",  time: "1h 08m" },
  { name: "Notion.exe", time: "45m" },
  { name: "Slack.exe",  time: "32m" },
];

export default function TimelineCard() {
  const [tab, setTab] = useState<"timeline" | "usage">("timeline");

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border-hi)] bg-[var(--surface)] p-4">
      <div className="mb-3 flex gap-1">
        <button
          onClick={() => setTab("timeline")}
          className={`rounded px-2.5 py-1 text-[11px] transition-colors ${
            tab === "timeline"
              ? "bg-[var(--surface-up)] font-semibold text-[var(--t2)]"
              : "text-[var(--t5)] hover:text-[var(--t3)]"
          }`}
        >
          타임라인
        </button>
        <button
          onClick={() => setTab("usage")}
          className={`rounded px-2.5 py-1 text-[11px] transition-colors ${
            tab === "usage"
              ? "bg-[var(--surface-up)] font-semibold text-[var(--t2)]"
              : "text-[var(--t5)] hover:text-[var(--t3)]"
          }`}
        >
          앱 사용량
        </button>
      </div>

      {tab === "timeline" && (
        <div className="space-y-[3px] text-[10px] text-[var(--t5)]">
          {timelineRows.map((row, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-8 shrink-0 text-right">{row.time}</span>
              <div className="flex-1 space-y-[2px]">
                {row.bars.map((bar, i) => (
                  <div
                    key={i}
                    className="h-2.5 rounded-[2px]"
                    style={{ width: bar.w, backgroundColor: bar.v }}
                  />
                ))}
                {row.bars.length === 0 && (
                  <div className="h-px w-full bg-[var(--border)]" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "usage" && (
        <div className="space-y-2.5">
          {appUsageRows.map((app) => (
            <div key={app.name} className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--tl-a)" }}
                />
                <span className="text-[var(--t2)]">{app.name}</span>
              </div>
              <span className="tabular-nums text-[var(--t4)]">{app.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
