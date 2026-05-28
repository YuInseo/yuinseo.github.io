import type { Metadata } from "next";
import Nav from "../../components/Nav";
import DownloadButton from "./DownloadButton";

export const metadata: Metadata = {
  title: "Artisan's Compass",
  description: "하루를 기록하는 Windows 앱",
};

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
  { name: "Code.exe",    time: "4h 23m" },
  { name: "chrome.exe",  time: "2h 15m" },
  { name: "Figma.exe",   time: "1h 08m" },
  { name: "Notion.exe",  time: "45m" },
  { name: "Slack.exe",   time: "32m" },
];

export default function ArtisansCompassPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />

      {/* Intro */}
      <section className="mx-auto max-w-2xl px-5 pb-14 pt-20">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Artisan&apos;s Compass
        </h1>
        <p className="mb-10 text-[15px] leading-relaxed text-[var(--t3)]">
          하루를 기록하는 Windows 앱이에요.
        </p>
        <DownloadButton />
      </section>

      <hr className="border-[var(--border)]" />

      {/* Timeline */}
      <section className="mx-auto max-w-2xl px-5 py-14">
        <p className="mb-5 text-sm font-medium text-[var(--t2)]">타임테이블</p>
        <div className="overflow-hidden rounded-lg border border-[var(--border-hi)] bg-[var(--surface)] p-4">
          <div className="mb-3 flex gap-2">
            <div className="rounded bg-[var(--surface-up)] px-2.5 py-1 text-[11px] font-semibold text-[var(--t2)]">
              타임라인
            </div>
            <div className="px-2.5 py-1 text-[11px] text-[var(--t5)]">앱 사용량</div>
          </div>
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

          <div className="my-4 border-t border-[var(--border)]" />

          <div className="mb-2 flex gap-2">
            <div className="px-2.5 py-1 text-[11px] text-[var(--t5)]">타임라인</div>
            <div className="rounded bg-[var(--surface-up)] px-2.5 py-1 text-[11px] font-semibold text-[var(--t2)]">
              앱 사용량
            </div>
          </div>
          <div className="space-y-2">
            {appUsageRows.map((app) => (
              <div key={app.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--tl-a)" }} />
                  <span className="text-[var(--t2)]">{app.name}</span>
                </div>
                <span className="tabular-nums text-[var(--t4)]">{app.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-[var(--border)]" />

      {/* Archive modes */}
      <section className="mx-auto max-w-2xl px-5 py-14">
        <p className="mb-8 text-sm font-medium text-[var(--t2)]">데일리 아카이브 모드</p>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="border-l-2 pl-5" style={{ borderColor: "var(--archive-1)" }}>
            <p className="mb-1.5 text-sm font-semibold text-[var(--t1)]">고정 모드</p>
            <p className="text-sm leading-relaxed text-[var(--t3)]">
              자정 00:00 정각에 다음 날로 넘어가요.
            </p>
          </div>
          <div className="border-l-2 pl-5" style={{ borderColor: "var(--archive-2)" }}>
            <p className="mb-1.5 text-sm font-semibold text-[var(--t1)]">동적 모드</p>
            <p className="text-sm leading-relaxed text-[var(--t3)]">
              앱을 닫기 전까지 당일로 기록해요. 새벽 작업자용.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-[var(--border)]" />

      {/* Calendar */}
      <section className="mx-auto max-w-2xl px-5 py-14">
        <p className="mb-5 text-sm font-medium text-[var(--t2)]">루틴 캘린더</p>
        <div className="overflow-hidden rounded-lg border border-[var(--border-hi)] bg-[var(--surface)] p-4">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <span className="rounded bg-[var(--surface-up)] px-2 py-0.5 text-[11px] text-[var(--t3)]">
              오늘: Feb 6
            </span>
            <span className="rounded bg-[var(--surface-up)] px-2 py-0.5 text-[11px] font-medium text-[var(--t2)]">
              Project 9 · Feb 6
            </span>
          </div>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--t2)]">February 2026</span>
            <div className="flex gap-2 text-[10px] text-[var(--t5)]">
              <span>&lt;</span>
              <span>&gt;</span>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-xs">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="py-3 font-semibold text-[var(--t5)]">{d}</div>
            ))}
            {[...Array(5)].map((_, i) => <div key={i} className="py-3" />)}
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`py-3 ${day === 6 ? "rounded font-bold" : "text-[var(--t4)]"}`}
                style={
                  day === 6
                    ? { backgroundColor: "var(--t1)", color: "var(--bg)", borderRadius: "4px" }
                    : undefined
                }
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-[var(--border)]" />

      {/* Other features */}
      <section className="mx-auto max-w-2xl px-5 py-14">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { title: "위젯 모드", desc: "바탕화면에 올려두고 쓸 수 있어요. 위치·크기 잠금 가능." },
            { title: "테마", desc: "여러 색상 테마. 위젯과 메인 화면에 각각 적용 가능." },
            { title: "설정", desc: "타임테이블 카테고리, 작업 외 앱, 아카이브 모드 등." },
          ].map((item) => (
            <div key={item.title}>
              <p className="mb-1.5 text-sm font-medium text-[var(--t2)]">{item.title}</p>
              <p className="text-sm leading-relaxed text-[var(--t4)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-5 py-8 text-center text-xs text-[var(--t5)]">
        Artisan&apos;s Compass
      </footer>
    </div>
  );
}
