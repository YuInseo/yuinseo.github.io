import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight, Github, BookOpen, Briefcase } from "lucide-react";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="mb-20">
        <p className="text-[rgb(var(--accent))] font-mono text-sm mb-3">
          안녕하세요, 저는
        </p>
        <h1 className="text-5xl font-bold tracking-tight mb-4">YuInseo</h1>
        <p className="text-xl text-[rgb(var(--muted-foreground))] mb-8 max-w-2xl">
          풀스택 개발자입니다. 새로운 기술을 탐구하고, 깔끔한 코드를 작성하는
          것을 좋아합니다.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[rgb(var(--accent))] text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Briefcase className="w-4 h-4" />
            프로젝트 보기
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover:bg-[rgb(var(--muted))] transition-colors font-medium"
          >
            <BookOpen className="w-4 h-4" />
            블로그 읽기
          </Link>
          <a
            href="https://github.com/YuInseo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border hover:bg-[rgb(var(--muted))] transition-colors font-medium"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">최근 포스트</h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm text-[rgb(var(--accent))] hover:gap-2 transition-all"
            >
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-4">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-5 rounded-xl border hover:border-[rgb(var(--accent))] hover:bg-[rgb(var(--muted))] transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-[rgb(var(--accent))] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] line-clamp-2">
                      {post.description}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <time className="text-xs text-[rgb(var(--muted-foreground))] whitespace-nowrap mt-1">
                    {post.date}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
