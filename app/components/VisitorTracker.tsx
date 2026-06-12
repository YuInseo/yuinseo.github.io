'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NTFY_TOPIC = 'yuinseo-site-v9k4x2mw8p';
const STORAGE_PREFIX = 'ytv_visited:';

function parseBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/SamsungBrowser\//.test(ua)) return 'Samsung Internet';
  if (/OPR\/|Opera\//.test(ua)) return 'Opera';
  if (/Chrome\//.test(ua)) {
    const v = ua.match(/Chrome\/([\d]+)/)?.[1];
    return v ? `Chrome ${v}` : 'Chrome';
  }
  if (/Firefox\//.test(ua)) {
    const v = ua.match(/Firefox\/([\d]+)/)?.[1];
    return v ? `Firefox ${v}` : 'Firefox';
  }
  if (/Version\//.test(ua) && /Safari\//.test(ua)) {
    const v = ua.match(/Version\/([\d.]+)/)?.[1];
    return v ? `Safari ${v}` : 'Safari';
  }
  return '알 수 없음';
}

function parseOS(ua: string): string {
  const android = ua.match(/Android ([\d.]+)/);
  if (android) return `Android ${android[1]}`;
  const ios = ua.match(/OS ([\d_]+) like Mac OS X/);
  if (ios) return `iOS ${ios[1].replace(/_/g, '.')}`;
  const win = ua.match(/Windows NT ([\d.]+)/);
  if (win) {
    const map: Record<string, string> = { '10.0': 'Windows 10/11', '6.3': 'Windows 8.1', '6.1': 'Windows 7' };
    return map[win[1]] ?? `Windows NT ${win[1]}`;
  }
  const mac = ua.match(/Mac OS X ([\d_]+)/);
  if (mac) return `macOS ${mac[1].replace(/_/g, '.')}`;
  if (/Linux/.test(ua)) return 'Linux';
  return '알 수 없음';
}

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const storageKey = STORAGE_PREFIX + pathname;
    if (localStorage.getItem(storageKey)) return;
    localStorage.setItem(storageKey, '1');

    const notify = async () => {
      const ua = navigator.userAgent;
      const browser = parseBrowser(ua);
      const os = parseOS(ua);

      const kstTime = new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
      }).format(new Date());

      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const lang = navigator.language ?? '알 수 없음';
      const screen = `${window.screen.width}×${window.screen.height}`;
      const dpr = window.devicePixelRatio ? `${window.devicePixelRatio}x` : '';
      const touch = navigator.maxTouchPoints > 0 ? '터치 있음' : '터치 없음';
      const cpu = (navigator as { hardwareConcurrency?: number }).hardwareConcurrency;
      const mem = (navigator as { deviceMemory?: number }).deviceMemory;
      const conn = (navigator as { connection?: { effectiveType?: string } }).connection?.effectiveType;
      const referrer = document.referrer
        ? (() => { try { return new URL(document.referrer).hostname; } catch { return document.referrer; } })()
        : '직접 접속';

      let geo = { city: '', country: '', org: '', ip: '' };
      try {
        const r = await fetch('https://ipapi.co/json/');
        const d = await r.json();
        geo = {
          city: d.city ?? '',
          country: d.country_name ?? '',
          org: d.org ?? '',
          ip: d.ip ?? '',
        };
      } catch { /* geo 실패 시 빈 값으로 진행 */ }

      const location = [geo.city, geo.country].filter(Boolean).join(', ') || '알 수 없음';

      const lines = [
        `📄 ${pathname}`,
        `⏰ ${kstTime} (KST)`,
        ``,
        `🌍 ${location}${geo.org ? ` · ${geo.org}` : ''}`,
        `🔒 IP: ${geo.ip || '알 수 없음'}`,
        `💻 ${browser} · ${os}`,
        `🖥️ ${screen}${dpr ? ` (${dpr})` : ''} · ${touch}`,
        `🌐 언어: ${lang} · 시간대: ${tz}`,
        `🔗 유입: ${referrer}`,
        ...(conn ? [`📶 네트워크: ${conn}`] : []),
        ...((cpu || mem) ? [`⚙️ ${[cpu ? `CPU ${cpu}코어` : '', mem ? `RAM ${mem}GB` : ''].filter(Boolean).join(' · ')}`] : []),
      ];

      try {
        const params = new URLSearchParams({ title: '👀 새 방문자', tags: 'wave', priority: 'default' });
        await fetch(`https://ntfy.sh/${NTFY_TOPIC}?${params}`, {
          method: 'POST',
          body: lines.join('\n'),
        });
      } catch { /* silent fail */ }
    };

    notify();
  }, [pathname]);

  return null;
}
