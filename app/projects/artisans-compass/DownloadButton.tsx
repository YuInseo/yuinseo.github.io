"use client";

import { useEffect, useState } from "react";

interface Release {
  tag_name: string;
  assets: { name: string; browser_download_url: string }[];
}

export default function DownloadButton() {
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/repos/YuInseo/artisans-compass/releases/latest")
      .then((r) => r.json())
      .then((data: Release) => {
        setRelease(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const exe = release?.assets.find(
    (a) => a.name.endsWith(".exe") && !a.name.endsWith(".blockmap")
  );

  if (loading) {
    return (
      <div className="inline-flex h-14 w-64 animate-pulse items-center justify-center rounded-xl bg-[#252530]" />
    );
  }

  if (!exe) {
    return (
      <a
        href="https://github.com/YuInseo/artisans-compass/releases/latest"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-xl bg-[#7c6cf4] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#9b8dff]"
      >
        <DownloadIcon />
        Releases 페이지로 이동
      </a>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={exe.browser_download_url}
        className="inline-flex items-center gap-3 rounded-xl bg-[#7c6cf4] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#7c6cf4]/20 transition-all hover:bg-[#9b8dff] hover:shadow-[#9b8dff]/30 active:scale-[0.98]"
      >
        <DownloadIcon />
        Windows 설치 파일 다운로드
      </a>
      <span className="text-sm text-[#3e3e68]">
        {release?.tag_name} · {exe.name}
      </span>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
