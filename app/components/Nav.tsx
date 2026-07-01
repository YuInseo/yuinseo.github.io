'use client';
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import GithubIcon from "./GithubIcon";
import { useLang } from "../i18n/LangContext";
import { GITHUB_URL, RESUME_URL } from "../data/links";

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
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-5 text-sm text-[var(--t4)] sm:flex">
            <Link href={`/${lang}/blog`} className="transition-colors hover:text-[var(--t1)]">{t.nav.blog}</Link>
            <Link href={`/${lang}/projects/artisans-compass`} className="transition-colors hover:text-[var(--t1)]">{t.nav.projects}</Link>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--t4)] transition-colors hover:text-[var(--t1)]"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent rounded-md px-3 py-1.5 text-[12px] font-semibold transition-colors"
          >
            {t.nav.resume}
          </a>
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
