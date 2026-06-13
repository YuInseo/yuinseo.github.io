import type { Metadata } from "next";
import BlogContent from '../../blog/BlogContent';

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: params.lang === 'en' ? 'Blog' : '블로그',
    description: params.lang === 'en'
      ? 'Today I Learned — things I pick up while building.'
      : 'Today I Learned — 개발하면서 배운 것들',
  };
}

export default function BlogPage() {
  return <BlogContent />;
}
