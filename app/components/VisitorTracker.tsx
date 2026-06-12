'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NTFY_TOPIC = 'yuinseo-site-v9k4x2mw8p';
const STORAGE_KEY = 'ytv_first_visit_done';

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
    if (localStorage.getItem(STORAGE_KEY)) return;
    // Mark immediately to prevent duplicate sends on rapid re-renders
    localStorage.setItem(STORAGE_KEY, '1');

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
        await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
          method: 'POST',
          body: `페이지: ${pathname}\n시간: ${kstTime} (KST)\n기기: ${device}\n위치: ${location}`,
          headers: {
            Title: '👀 새 방문자',
            Priority: 'default',
            Tags: 'wave',
          },
        });
      } catch {
        // ntfy call failed — localStorage flag already set, won't retry
      }
    };

    notify();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
