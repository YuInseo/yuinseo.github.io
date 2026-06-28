'use client';
import Link from "next/link";
import ScrollReveal from "./components/ScrollReveal";
import { useLang } from "./i18n/LangContext";
import { POSTS } from "./blog/posts";
import type { Post } from "./blog/posts";

function postTitle(post: Post, lang: string) {
  return lang === 'en' && post.titleEn ? post.titleEn : post.title;
}

export default function HomeContent() {
  const { lang, t } = useLang();
  const recentPosts = POSTS.slice(0, 2);

  return (
    <main className="mx-auto max-w-2xl px-5">

      <section className="pb-20 pt-28">
        <ScrollReveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {t.home.tagline}
          </p>
          <h1 className="mb-5 text-3xl font-bold tracking-tight">{t.home.name}</h1>
          <p className="text-[15px] leading-[1.8] text-[var(--t3)]">
            {t.home.intro}
          </p>
        </ScrollReveal>
      </section>

      <section className="pb-14">
        <ScrollReveal>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.home.sectionCerts}</p>
        </ScrollReveal>
        <div className="space-y-0">
          {[
            { label: t.home.certVisualDesign, detail: t.home.certVisualDesignDetail },
            { label: t.home.certToeic, detail: t.home.certToeicDetail },
            { label: t.home.certTechnical, detail: t.home.certTechnicalDetail },
          ].map((row, i) => (
            <ScrollReveal key={row.label} delay={i * 60}>
              <div className="flex items-baseline justify-between border-b border-[var(--border)] py-3.5">
                <span className="text-[14px] text-[var(--t2)]">{row.label}</span>
                <span className="text-[12px] text-[var(--t5)]">{row.detail}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={200}>
          <Link href={`/${lang}/certifications`} className="mt-4 inline-block text-[12px] text-[var(--t4)] transition-colors hover:text-[var(--accent)]">
            {t.home.certsMore}
          </Link>
        </ScrollReveal>
      </section>

      <section className="pb-14">
        <ScrollReveal>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.home.sectionProjects}</p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Link
            href={`/${lang}/projects/artisans-compass`}
            className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-hi)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[15px] font-semibold text-[var(--t1)] transition-colors group-hover:text-[var(--accent)]">
                Artisan&apos;s Compass
              </span>
              <span className="rounded-full border border-[var(--border-hi)] px-2.5 py-0.5 text-[11px] text-[var(--t4)]">
                {t.home.projectBadge}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--t4)]">
              {t.home.projectDesc}
            </p>
          </Link>
        </ScrollReveal>
      </section>

      <section className="pb-14">
        <ScrollReveal>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.home.sectionBlog}</p>
        </ScrollReveal>
        <div className="space-y-0">
          {recentPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 60}>
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="group flex items-baseline justify-between border-b border-[var(--border)] py-3.5"
              >
                <span className="text-[14px] text-[var(--t2)] transition-colors group-hover:text-[var(--t1)]">
                  {postTitle(post, lang)}
                </span>
                <span className="ml-4 shrink-0 text-[12px] text-[var(--t5)]">{post.date.slice(0, 7)}</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={140}>
          <Link href={`/${lang}/blog`} className="mt-4 inline-block text-[12px] text-[var(--t4)] transition-colors hover:text-[var(--accent)]">
            {t.home.blogMore}
          </Link>
        </ScrollReveal>
      </section>

      <section className="pb-32">
        <ScrollReveal>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.home.sectionContact}</p>
        </ScrollReveal>
        <div className="space-y-0">
          <ScrollReveal>
            <div className="flex items-baseline justify-between border-b border-[var(--border)] py-3.5">
              <span className="text-[12px] text-[var(--t5)]">Name</span>
              <span className="text-[14px] text-[var(--t2)]">{t.home.name}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <div className="flex items-baseline justify-between border-b border-[var(--border)] py-3.5">
              <span className="text-[12px] text-[var(--t5)]">Email</span>
              <a href={`mailto:${t.home.contactEmail}`} className="text-[14px] text-[var(--t2)] transition-colors hover:text-[var(--accent)]">
                {t.home.contactEmail}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
