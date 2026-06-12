'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NTFY_TOPIC = 'yuinseo-site-v9k4x2mw8p';
const STORAGE_PREFIX = 'ytv_visited:';

function getDeviceLabel(ua: string): string {
  if (/iPhone/.test(ua)) return 'iPhone';
  if (/iPad/.test(ua)) return 'iPad';
  if (/Android.*Mobile/.test(ua)) return 'Android 폰';
  if (/Android/.test(ua)) return 'Android 태블릿';
  if (/Windows/.test(ua)) return 'Windows PC';
  if (/Macintosh/.test(ua)) return 'Mac';
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
      const kstTime = new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date());

      const device = getDeviceLabel(navigator.userAgent);

      let location = '알 수 없음';
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        const geo = await geoRes.json();
        const city = geo.city ?? '';
        const country = geo.country_name ?? '';
        if (country) location = city ? `${city}, ${country}` : country;
      } catch {
        // Geo lookup failed — proceed without location
      }

      try {
        const params = new URLSearchParams({
          title: '👀 새 방문자',
          tags: 'wave',
          priority: 'default',
        });
        await fetch(`https://ntfy.sh/${NTFY_TOPIC}?${params}`, {
          method: 'POST',
          body: `페이지: ${pathname}\n시간: ${kstTime} (KST)\n기기: ${device}\n위치: ${location}`,
        });
      } catch {
        // ntfy call failed — localStorage flag already set, won't retry
      }
    };

    notify();
  }, [pathname]);

  return null;
}
