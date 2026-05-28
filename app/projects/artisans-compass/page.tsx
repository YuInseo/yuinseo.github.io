import type { Metadata } from "next";
import Nav from "../../components/Nav";
import DownloadButton from "./DownloadButton";

export const metadata: Metadata = {
  title: "Artisan's Compass",
  description: "하루를 기록하는 Windows 앱",
};

const timelineRows = [
  { time: "00:00", bars: [] as { w: string; color: string }[] },
  { time: "02:00", bars: [{ w: "55%", color: "#7c6cf4" }] },
  { time: "04:00", bars: [] },
  { time: "08:00", bars: [] },
  { time: "10:00", bars: [{ w: "85%", color: "#7c6cf4" }] },
  { time: "12:00", bars: [] },
  { time: "14:00", bars: [] },
  { time: "16:00", bars: [{ w: "60%", color: "#7c6cf4" }, { w: "50%", color: "#3e3e5a" }] },
  { time: "18:00", bars: [] },
  { time: "20:00", bars: [{ w: "35%", color: "#5a4fc4" }] },
  { time: "22:00", bars: [] },
];

export default function ArtisansCompassPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e2ec]">
      <Nav />

      {/* Intro */}
      <section className="mx-auto max-w-2xl px-5 pb-14 pt-20">
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Artisan&apos;s Compass
        </h1>
        <p className="mb-2 text-[15px] leading-[1.8] text-[#7070a0]">
          뭘 했는지 자꾸 잊어버려서 만들었어요. 타임테이블로 하루가 어떻게 흘렀는지 보고,
          어떤 앱을 얼마나 썼는지도 자동으로 기록해요. 루틴 캘린더로 반복 일과를 등록해두면
          Ctrl + Drag로 여러 개를 한꺼번에 옮길 수 있어요. 작게 써야 할 때는 위젯 모드로,
          취향에 따라 테마도 바꿀 수 있어요.
        </p>
        <p className="mb-10 text-[15px] leading-[1.8] text-[#7070a0]">
          새벽까지 작업하다 보면 자정이 넘어도 같은 날 기록으로 보고 싶을 때가 있어요.
          그런 것도 옵션으로 뒀어요.
        </p>
        <DownloadButton />
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-2xl px-5 pb-16">
        <p className="mb-4 text-[15px] leading-[1.8] text-[#7070a0]">
          타임테이블은 이렇게 생겼어요.
          하루 24시간 축에 작업 블록이 쌓이고, 옆 탭에서 앱별 사용 시간도 볼 수 있어요.
        </p>
        <div className="overflow-hidden rounded-lg border border-[#252530] bg-[#13131a] p-4">
          <div className="mb-3 flex gap-2">
            <div className="rounded bg-[#252530] px-2.5 py-1 text-[11px] font-semibold text-[#c8c8e0]">
              타임라인
            </div>
            <div className="px-2.5 py-1 text-[11px] text-[#3e3e68]">앱 사용량</div>
          </div>
          <div className="space-y-[3px] text-[10px] text-[#3e3e68]">
            {timelineRows.map((row, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-8 shrink-0 text-right">{row.time}</span>
                <div className="flex-1 space-y-[2px]">
                  {row.bars.map((bar, i) => (
                    <div
                      key={i}
                      className="h-2.5 rounded-[2px]"
                      style={{ width: bar.w, backgroundColor: bar.color }}
                    />
                  ))}
                  {row.bars.length === 0 && (
                    <div className="h-px w-full bg-[#1e1e28]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive modes */}
      <section className="mx-auto max-w-2xl px-5 pb-16">
        <p className="mb-6 text-[15px] leading-[1.8] text-[#7070a0]">
          데일리 아카이브 모드는 두 가지예요.
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="border-l-2 border-[#7c6cf4] pl-5">
            <p className="mb-1.5 text-sm font-semibold text-[#c8c8e0]">고정 모드</p>
            <p className="text-sm leading-relaxed text-[#6a6a98]">
              자정 00:00 정각에 다음 날 아카이브로 넘어가요. 24일이 끝나면 25일이 시작되는 방식.
            </p>
          </div>
          <div className="border-l-2 border-[#e07a40] pl-5">
            <p className="mb-1.5 text-sm font-semibold text-[#c8c8e0]">동적 모드</p>
            <p className="text-sm leading-relaxed text-[#6a6a98]">
              앱을 닫기 전까지 당일로 기록해요. 새벽 2시까지 작업해도 24일로 남아요. 새벽 작업자용.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="mx-auto max-w-2xl px-5 pb-16">
        <p className="mb-4 text-[15px] leading-[1.8] text-[#7070a0]">
          루틴 캘린더는 Ctrl + Drag로 여러 루틴을 한꺼번에 잡아서 옮길 수 있어요.
        </p>
        <div className="overflow-hidden rounded-lg border border-[#252530] bg-[#13131a] p-4">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <span className="rounded bg-[#252530] px-2 py-0.5 text-[11px] text-[#8888a8]">
              오늘: Feb 6
            </span>
            <span className="rounded bg-[#7c6cf4]/20 px-2 py-0.5 text-[11px] font-medium text-[#9b8dff]">
              Project 9 · Feb 6
            </span>
          </div>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#c8c8e0]">February 2026</span>
            <div className="flex gap-2 text-[10px] text-[#3e3e68]">
              <span>&lt;</span>
              <span>&gt;</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center text-[10px]">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="py-1 font-semibold text-[#3e3e68]">{d}</div>
            ))}
            {[...Array(5)].map((_, i) => <div key={i} />)}
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
              <div
                key={day}
                className={`rounded py-1 ${
                  day === 6
                    ? "bg-[#7c6cf4] font-bold text-white"
                    : "text-[#6a6a98]"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-2xl px-5 pb-32">
        <p className="text-sm text-[#3e3e68]">
          아직 개발 중이에요. 버그 제보나 피드백은 언제든지 환영해요.
        </p>
      </section>

      <footer className="border-t border-[#1e1e28] px-5 py-8 text-center text-xs text-[#2e2e48]">
        Artisan&apos;s Compass
      </footer>
    </div>
  );
}
