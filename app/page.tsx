import Link from "next/link";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e2ec]">
      <Nav />

      <main className="mx-auto max-w-2xl px-5">
        <section className="pb-16 pt-28">
          <h1 className="mb-6 text-3xl font-bold tracking-tight">유인서</h1>
          <p className="text-[15px] leading-[1.8] text-[#7070a0]">
            불편한 게 있으면 직접 만드는 타입이에요.
            <br />
            지금은 하루를 기록하는 Windows 앱을 만들고 있어요.
          </p>
        </section>

        <section className="pb-6">
          <Link
            href="/projects/artisans-compass"
            className="group inline-flex items-baseline gap-3"
          >
            <span className="text-[15px] text-[#c8c8e0] underline decoration-[#3e3e68] underline-offset-4 transition-colors group-hover:decoration-[#9b8dff]">
              Artisan&apos;s Compass
            </span>
            <span className="text-xs text-[#3e3e68] transition-colors group-hover:text-[#7c6cf4]">
              Windows 앱
            </span>
          </Link>
        </section>

        <section className="pb-32">
          <p className="text-sm text-[#2e2e48]">
            글은 아직 없어요.
          </p>
        </section>
      </main>

      <footer className="px-5 pb-10 text-xs text-[#2e2e48]">
        © 2025 yuinseo
      </footer>
    </div>
  );
}
