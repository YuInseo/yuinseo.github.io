import Link from "next/link";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e2ec]">
      <Nav />

      <main className="mx-auto max-w-3xl px-5">
        {/* Hero */}
        <section className="pb-24 pt-28">
          <p className="mb-4 text-sm text-[#3e3e68]">안녕하세요</p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            유인서입니다.
          </h1>
          <p className="max-w-sm text-base leading-relaxed text-[#6a6a98]">
            개발자이자 메이커 — 쓸 만한 도구를 직접 만들고 기록합니다.
          </p>
        </section>

        <hr className="border-[#1e1e28]" />

        {/* Projects */}
        <section className="py-14">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#3e3e68]">
            프로젝트
          </h2>
          <Link
            href="/projects/artisans-compass"
            className="group flex items-start justify-between py-3"
          >
            <div>
              <p className="font-medium text-[#c8c8e0] transition-colors group-hover:text-[#9b8dff]">
                Artisan&apos;s Compass
              </p>
              <p className="mt-1 text-sm text-[#3e3e68]">
                Windows 생산성 앱 · 타임테이블 / 앱 사용량 / 데일리 아카이브
              </p>
            </div>
            <span className="ml-6 mt-0.5 shrink-0 text-[#2e2e48] transition-colors group-hover:text-[#7c6cf4]">
              →
            </span>
          </Link>
        </section>

        <hr className="border-[#1e1e28]" />

        {/* Blog */}
        <section className="py-14">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#3e3e68]">
            블로그
          </h2>
          <p className="text-sm text-[#2e2e48]">
            아직 작성된 글이 없어요. 곧 업데이트할게요.
          </p>
        </section>
      </main>

      <footer className="border-t border-[#1e1e28] px-5 py-8 text-center text-xs text-[#2e2e48]">
        © 2025 yuinseo
      </footer>
    </div>
  );
}
