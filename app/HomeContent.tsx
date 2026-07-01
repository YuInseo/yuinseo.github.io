'use client';
import Link from "next/link";
import ScrollReveal from "./components/ScrollReveal";
import Hero from "./components/home/Hero";
import TechStack from "./components/home/TechStack";
import ProjectCard from "./components/home/ProjectCard";
import ContactCta from "./components/home/ContactCta";
import { useLang } from "./i18n/LangContext";
import { POSTS } from "./blog/posts";
import type { Post } from "./blog/posts";

function postTitle(post: Post, lang: string) {
  return lang === 'en' && post.titleEn ? post.titleEn : post.title;
}

export default function HomeContent() {
  const { lang, t } = useLang();
  const recentPosts = POSTS.slice(0, 3);

  return (
    <main className="mx-auto max-w-2xl px-5">

      <Hero />

      <TechStack />

      <ProjectCard />

      <section className="pb-14">
        <ScrollReveal>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.home.sectionCerts}</p>
        </ScrollReveal>
        <div className="space-y-0">
          {[
            { label: t.home.certVisualDesign, detail: t.home.certVisualDesignDetail, note: t.home.certVisualDesignBridge },
            { label: t.home.certToeic, detail: t.home.certToeicDetail },
            { label: t.home.certTechnical, detail: t.home.certTechnicalDetail },
          ].map((row, i) => (
            <ScrollReveal key={row.label} delay={i * 60}>
              <div className="border-b border-[var(--border)] py-3.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[14px] text-[var(--t2)]">{row.label}</span>
                  <span className="text-[12px] text-[var(--t5)]">{row.detail}</span>
                </div>
                {row.note && (
                  <p className="mt-1 text-[12px] text-[var(--t4)]">→ {row.note}</p>
                )}
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
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--t4)]">{t.home.sectionBlog}</p>
          <p className="mb-5 text-[13px] leading-relaxed text-[var(--t3)]">{t.home.blogLead}</p>
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

      <ContactCta />

    </main>
  );
}
