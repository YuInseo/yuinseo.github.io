import Link from "next/link";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e2ec]">
      <Nav />

      <main className="mx-auto max-w-3xl px-5">
        {/* Hero */}
        <section className="pb-20 pt-24">
          <p className="mb-3 text-sm text-[#6a6a98]">안녕하세요</p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
            유인서입니다.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-[#8888b8]">
            개발자이자 메이커 — 쓸 만한 도구를 직접 만들고 기록합니다.
          </p>
        </section>

        <hr className="border-[#252530]" />

        {/* Projects */}
        <section className="py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold">프로젝트</h2>
          </div>
          <Link
            href="/projects/artisans-compass"
            className="group flex flex-col gap-3 rounded-2xl border border-[#252530] bg-[#17171e] p-6 transition-all hover:border-[#353548] hover:bg-[#1e1e28]"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#7c6cf4]/15 px-3 py-1 text-xs font-medium text-[#9b8dff]">
                Windows App
              </span>
              <span className="text-[#2e2e48] transition-colors group-hover:text-[#6a6a98]">
                →
              </span>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-[#e2e2ec]">Artisan&apos;s Compass</h3>
              <p className="text-sm text-[#6a6a98]">
                타임테이블 · 앱 사용량 · 데일리 아카이브 · 루틴 캘린더
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Electron", "React", "TypeScript"].map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-[#1e1e2a] px-2.5 py-1 text-xs text-[#4a4a78]"
                >
                  {t}
                </span>
              ))}
            </div>
          </Link>
        </section>

        <hr className="border-[#252530]" />

        {/* Blog */}
        <section className="py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold">블로그</h2>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#252530] py-16 text-center">
            <p className="text-[#6a6a98]">아직 작성된 글이 없어요.</p>
            <p className="text-sm text-[#3a3a58]">곧 업데이트할게요.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#252530] px-5 py-8 text-center text-xs text-[#3a3a58]">
        © 2025 yuinseo
      </footer>
    </div>
  );
}
