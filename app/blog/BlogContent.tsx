'use client';
import Link from "next/link";
import { POSTS, CATEGORIES } from "./posts";
import { useLang } from "../i18n/LangContext";
import type { Post } from "./posts";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function postTitle(post: Post, lang: string) {
  return lang === 'en' && post.titleEn ? post.titleEn : post.title;
}

export default function BlogContent() {
  const { lang, t } = useLang();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <section className="mx-auto max-w-2xl px-5 pb-20 pt-20">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {t.blog.eyebrow}
        </p>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">{t.blog.title}</h1>
        <p className="mb-14 text-[14px] text-[var(--t4)]">{t.blog.subtitle}</p>

        <div className="space-y-14">
          {CATEGORIES.map((category) => {
            const posts = POSTS.filter((p) => p.category === category);
            if (posts.length === 0) return null;
            return (
              <div key={category}>
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">
                  {category}
                </p>
                <div className="space-y-1">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${lang}/blog/${post.slug}`}
                      className="group flex items-baseline justify-between gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-[var(--surface)]"
                    >
                      <span className="text-[14px] font-medium text-[var(--t2)] transition-colors group-hover:text-[var(--t1)]">
                        {postTitle(post, lang)}
                      </span>
                      <span className="shrink-0 text-[12px] tabular-nums text-[var(--t5)]">
                        {formatDate(post.date)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
