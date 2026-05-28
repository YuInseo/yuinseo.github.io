import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#252530] bg-[#0f0f14]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[#e2e2ec] transition-colors hover:text-[#7c6cf4]"
        >
          yuinseo
        </Link>
        <div className="flex items-center gap-6 text-sm text-[#6a6a98]">
          <Link href="/blog" className="transition-colors hover:text-[#e2e2ec]">
            블로그
          </Link>
          <Link href="/projects/artisans-compass" className="transition-colors hover:text-[#e2e2ec]">
            프로젝트
          </Link>
        </div>
      </nav>
    </header>
  );
}
