import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        블로그로 돌아가기
      </Link>

      <article>
        <header className="mb-10 pb-8 border-b">
          <div className="flex gap-2 flex-wrap mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-[rgb(var(--muted))] border text-[rgb(var(--muted-foreground))]"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-[rgb(var(--muted-foreground))] mb-4">
            {post.description}
          </p>
          <time className="text-sm text-[rgb(var(--muted-foreground))]">
            {post.date}
          </time>
        </header>

        <div className="prose prose-lg max-w-none leading-relaxed">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
