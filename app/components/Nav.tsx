import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--border-hi)] backdrop-blur-md"
      style={{ background: "var(--nav-bg)" }}
    >
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[var(--t1)] transition-colors hover:text-[var(--accent)]"
        >
          yuinseo
        </Link>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5 text-sm text-[var(--t4)]">
            <Link href="/blog" className="transition-colors hover:text-[var(--t1)]">블로그</Link>
            <Link href="/projects/artisans-compass" className="transition-colors hover:text-[var(--t1)]">프로젝트</Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
