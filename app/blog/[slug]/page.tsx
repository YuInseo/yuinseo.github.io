import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { POSTS, getPost } from "../posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />

      <article className="mx-auto max-w-2xl px-5 pb-20 pt-20">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <Link
              href="/blog"
              className="text-[12px] text-[var(--t4)] transition-colors hover:text-[var(--t2)]"
            >
              ← 블로그
            </Link>
            <span className="text-[var(--border-hi)]">·</span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]">
              {post.category}
            </span>
          </div>
          <h1 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">{post.title}</h1>
          <p className="text-[13px] text-[var(--t4)]">{formatDate(post.date)}</p>
        </div>

        <p className="mb-10 rounded-lg border-l-2 border-[var(--accent)] bg-[var(--surface)] px-5 py-4 text-[14px] leading-relaxed text-[var(--t3)]">
          {post.summary}
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

      <Footer />
    </div>
  );
}
