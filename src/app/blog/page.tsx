import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "개발 관련 글들을 공유합니다.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Blog</h1>
        <p className="text-[rgb(var(--muted-foreground))]">
          개발하면서 배운 것들을 기록합니다.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-[rgb(var(--muted-foreground))]">
          <p className="text-lg">아직 작성된 포스트가 없습니다.</p>
          <p className="text-sm mt-2">
            <code className="bg-[rgb(var(--muted))] px-2 py-1 rounded">
              posts/
            </code>{" "}
            폴더에 .mdx 파일을 추가해보세요.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group p-6 rounded-xl border hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--muted))] transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold mb-1.5 group-hover:text-[rgb(var(--accent))] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[rgb(var(--muted-foreground))] line-clamp-2">
                    {post.description}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-[rgb(var(--background))] border text-[rgb(var(--muted-foreground))]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <time className="text-xs text-[rgb(var(--muted-foreground))] whitespace-nowrap mt-1 shrink-0">
                  {post.date}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
