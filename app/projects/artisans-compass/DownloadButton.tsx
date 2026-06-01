"use client";

import { useEffect, useState } from "react";

interface Release {
  tag_name: string;
  assets: { name: string; browser_download_url: string }[];
}

export default function DownloadButton() {
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMobile(/Android|iPhone|iPad|iPod|Mobile/i.test(ua));

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
    return <div className="h-11 w-56 animate-pulse rounded-lg bg-[var(--border-hi)]" />;
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        <button disabled className="download-btn cursor-not-allowed opacity-50">
          <AndroidIcon />
          Android 앱 준비 중
        </button>
        <p className="text-xs text-[var(--t5)]">Windows 버전은 PC에서 다운로드할 수 있어요.</p>
      </div>
    );
  }

  const href = exe?.browser_download_url ?? "https://github.com/YuInseo/artisans-compass/releases/latest";

  return (
    <div className="flex flex-col gap-2">
      <a href={href} className="download-btn">
        <DownloadIcon />
        Windows 설치 파일 다운로드
      </a>
      {release && exe && (
        <p className="text-xs text-[var(--t5)]">
          {release.tag_name} · {exe.name}
        </p>
      )}
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24C15.14 8.3 13.62 7.9 12 7.9s-3.14.4-4.47 1.01L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C3.93 11.04 2.5 13.62 2.5 16.5h19c0-2.88-1.43-5.46-3.9-7.02zM9 13.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
    </svg>
  );
}
