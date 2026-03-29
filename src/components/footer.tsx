import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-between text-sm text-[rgb(var(--muted-foreground))]">
        <p>© {new Date().getFullYear()} YuInseo. All rights reserved.</p>
        <Link
          href="https://github.com/YuInseo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[rgb(var(--foreground))] transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  );
}
