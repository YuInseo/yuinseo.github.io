import type { Metadata } from "next";
import { Github, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "개발한 프로젝트들을 소개합니다.",
};

const projects = [
  {
    title: "Artisans Compass",
    description: "공개 프로젝트입니다.",
    tags: ["Next.js", "TypeScript"],
    github: "https://github.com/YuInseo/artisans-compass",
    demo: null,
  },
  // 프로젝트를 여기에 추가하세요
];

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Projects</h1>
        <p className="text-[rgb(var(--muted-foreground))]">
          지금까지 만든 프로젝트들입니다.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group p-6 rounded-xl border hover:border-[rgb(var(--accent))] transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-lg font-semibold group-hover:text-[rgb(var(--accent))] transition-colors">
                {project.title}
              </h2>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
                    aria-label="Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
              {project.description}
            </p>

            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full border bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
