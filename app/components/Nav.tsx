'use client';
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useLang } from "../i18n/LangContext";

export default function Nav() {
  const { lang, setLang, t } = useLang();
  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--border-hi)] backdrop-blur-md"
      style={{ background: "var(--nav-bg)" }}
    >
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
        <Link
          href={`/${lang}`}
          className="font-semibold tracking-tight text-[var(--t1)] transition-colors hover:text-[var(--accent)]"
        >
          yuinseo
        </Link>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5 text-sm text-[var(--t4)]">
            <Link href={`/${lang}/blog`} className="transition-colors hover:text-[var(--t1)]">{t.nav.blog}</Link>
            <Link href={`/${lang}/projects/artisans-compass`} className="transition-colors hover:text-[var(--t1)]">{t.nav.projects}</Link>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[var(--t4)]">
            <button
              onClick={() => setLang('ko')}
              className={`transition-colors hover:text-[var(--t1)]${lang === 'ko' ? ' font-semibold text-[var(--t1)]' : ''}`}
            >
              KO
            </button>
            <span>/</span>
            <button
              onClick={() => setLang('en')}
              className={`transition-colors hover:text-[var(--t1)]${lang === 'en' ? ' font-semibold text-[var(--t1)]' : ''}`}
            >
              EN
            </button>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
