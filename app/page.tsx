import Link from "next/link";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />
      <main className="mx-auto max-w-2xl px-5">
        <section className="pb-16 pt-28">
          <h1 className="mb-6 text-3xl font-bold tracking-tight">유인서</h1>
          <p className="text-[15px] leading-[1.8] text-[var(--t3)]">
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
            <span className="text-[15px] text-[var(--t2)] underline decoration-[var(--border-hi)] underline-offset-4 transition-colors group-hover:decoration-[var(--accent-hi)]">
              Artisan&apos;s Compass
            </span>
            <span className="text-xs text-[var(--t5)] transition-colors group-hover:text-[var(--accent)]">
              Windows 앱
            </span>
          </Link>
        </section>

        <section className="pb-32">
          <p className="text-sm text-[var(--t5)]">글은 아직 없어요.</p>
        </section>
      </main>

      <footer className="px-5 pb-10 text-xs text-[var(--t5)]">© 2025 yuinseo</footer>
    </div>
  );
}
