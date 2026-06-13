import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS, getPost } from "../../../blog/posts";

export function generateStaticParams() {
  return ['ko', 'en'].flatMap(lang =>
    POSTS.map(p => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};
  const title = params.lang === 'en' && post.titleEn ? post.titleEn : post.title;
  const description = params.lang === 'en' && post.summaryEn ? post.summaryEn : post.summary;
  return { title, description };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function PostPage({ params }: { params: { lang: string; slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const title = params.lang === 'en' && post.titleEn ? post.titleEn : post.title;
  const summary = params.lang === 'en' && post.summaryEn ? post.summaryEn : post.summary;
  const backLabel = params.lang === 'en' ? '← Blog' : '← 블로그';

  return (
    <article className="mx-auto max-w-2xl px-5 pb-20 pt-20">
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <Link
            href={`/${params.lang}/blog`}
            className="text-[12px] text-[var(--t4)] transition-colors hover:text-[var(--t2)]"
          >
            {backLabel}
          </Link>
          <span className="text-[var(--border-hi)]">·</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]">
            {post.category}
          </span>
        </div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        <p className="text-[13px] text-[var(--t4)]">{formatDate(post.date)}</p>
      </div>

      <p className="mb-10 rounded-lg border-l-2 border-[var(--accent)] bg-[var(--surface)] px-5 py-4 text-[14px] leading-relaxed text-[var(--t3)]">
        {summary}
      </p>

      <div className="space-y-8">
        {post.body.map((block, i) => (
          <div key={i}>
            {block.heading && (
              <p className="mb-2 text-[13px] font-semibold text-[var(--t1)]">{block.heading}</p>
            )}
            <p className="text-[14px] leading-[1.9] text-[var(--t3)]">{block.text}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
