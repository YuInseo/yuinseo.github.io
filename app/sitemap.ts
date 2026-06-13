import { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yuinseo.github.io";
  const langs = ["ko", "en"] as const;

  const blogPosts = langs.flatMap((lang) =>
    POSTS.map((post) => ({
      url: `${base}/${lang}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    ...langs.map((lang) => ({
      url: `${base}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    })),
    ...langs.map((lang) => ({
      url: `${base}/${lang}/projects/artisans-compass`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...langs.map((lang) => ({
      url: `${base}/${lang}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...langs.map((lang) => ({
      url: `${base}/${lang}/certifications`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...blogPosts,
  ];
}
