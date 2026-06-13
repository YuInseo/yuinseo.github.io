import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "블로그",
  description: "Today I Learned — 개발하면서 배운 것들",
};

export default function BlogPage() {
  return <BlogContent />;
}
