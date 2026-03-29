import type { Metadata } from "next";
import { Github, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "YuInseo 소개",
};

const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "Python"],
  Tools: ["Git", "GitHub Actions", "Docker"],
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">About</h1>
        <p className="text-[rgb(var(--muted-foreground))]">저에 대한 소개입니다.</p>
      </div>

      <section className="mb-12">
        <div className="p-6 rounded-xl border bg-[rgb(var(--muted))]/30">
          <h2 className="text-2xl font-bold mb-4">YuInseo</h2>
          <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-4">
            안녕하세요! 저는 풀스택 개발자입니다. 사용자 경험을 중시하며,
            읽기 쉽고 유지보수하기 좋은 코드를 작성하려고 노력합니다.
          </p>
          <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
            새로운 기술을 배우고 이를 실제 프로젝트에 적용하는 것을 즐깁니다.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="p-4 rounded-xl border">
              <h3 className="font-semibold text-sm text-[rgb(var(--accent))] mb-3 uppercase tracking-wide">
                {category}
              </h3>
              <ul className="space-y-1.5">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-[rgb(var(--muted-foreground))] flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[rgb(var(--accent))] shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Contact</h2>
        <div className="flex gap-4 flex-wrap">
          <a
            href="https://github.com/YuInseo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg border hover:bg-[rgb(var(--muted))] hover:border-[rgb(var(--accent))] transition-all font-medium"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="mailto:your@email.com"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg border hover:bg-[rgb(var(--muted))] hover:border-[rgb(var(--accent))] transition-all font-medium"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
