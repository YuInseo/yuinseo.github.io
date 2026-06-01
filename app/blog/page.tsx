import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { POSTS, CATEGORIES } from "./posts";

export const metadata: Metadata = {
  title: "블로그",
  description: "Today I Learned — 개발하면서 배운 것들",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />

      <section className="mx-auto max-w-2xl px-5 pb-20 pt-20">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          today i learned
        </p>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">블로그</h1>
        <p className="mb-14 text-[14px] text-[var(--t4)]">개발하면서 배운 것들을 짧게 기록합니다.</p>

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
                      href={`/blog/${post.slug}`}
                      className="group flex items-baseline justify-between gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-[var(--surface)]"
                    >
                      <span className="text-[14px] font-medium text-[var(--t2)] transition-colors group-hover:text-[var(--t1)]">
                        {post.title}
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

      <Footer />
    </div>
  );
}
