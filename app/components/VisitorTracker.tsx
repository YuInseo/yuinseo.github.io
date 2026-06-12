'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NTFY_TOPIC = 'yuinseo-site-v9k4x2mw8p';
const STORAGE_PREFIX = 'ytv_visited:';

function parseBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/SamsungBrowser\//.test(ua)) return 'Samsung Internet';
  if (/OPR\/|Opera\//.test(ua)) return 'Opera';
  if (/Chrome\//.test(ua)) return `Chrome ${ua.match(/Chrome\/([\d]+)/)?.[1] ?? ''}`;
  if (/Firefox\//.test(ua)) return `Firefox ${ua.match(/Firefox\/([\d]+)/)?.[1] ?? ''}`;
  if (/Version\//.test(ua) && /Safari\//.test(ua)) return `Safari ${ua.match(/Version\/([\d.]+)/)?.[1] ?? ''}`;
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

function djb2Hash(str: string): string {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return (h >>> 0).toString(16);
}

function canvasFingerprint(): string {
  try {
    const c = document.createElement('canvas');
    c.width = 240; c.height = 50;
    const ctx = c.getContext('2d');
    if (!ctx) return 'n/a';
    ctx.fillStyle = '#f04'; ctx.fillRect(10, 5, 80, 30);
    ctx.fillStyle = '#069'; ctx.font = '13px Arial';
    ctx.fillText('yuinseo 🔍 ☁️', 12, 26);
    ctx.fillStyle = 'rgba(80,200,0,0.6)'; ctx.font = '16px serif';
    ctx.fillText('visitor', 100, 40);
    return djb2Hash(c.toDataURL());
  } catch { return 'n/a'; }
}

function webglInfo(): { gpu: string; vendor: string } {
  try {
    const c = document.createElement('canvas');
    const gl = (c.getContext('webgl') ?? c.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return { gpu: 'n/a', vendor: 'n/a' };
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return { gpu: gl.getParameter(gl.RENDERER), vendor: gl.getParameter(gl.VENDOR) };
    return {
      gpu: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL),
      vendor: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL),
    };
  } catch { return { gpu: 'n/a', vendor: 'n/a' }; }
}

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const storageKey = STORAGE_PREFIX + pathname;
    if (localStorage.getItem(storageKey)) return;
    localStorage.setItem(storageKey, '1');

    const notify = async () => {
      const ua = navigator.userAgent;
      const kstTime = new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
      }).format(new Date());

      // --- Sync data ---
      const browser = parseBrowser(ua);
      const os = parseOS(ua);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const lang = navigator.language ?? 'n/a';
      const screenRes = `${window.screen.width}×${window.screen.height}`;
      const dpr = window.devicePixelRatio ? `${window.devicePixelRatio}x` : '';
      const touch = navigator.maxTouchPoints > 0 ? `터치 ${navigator.maxTouchPoints}p` : '터치 없음';
      const cpu = (navigator as { hardwareConcurrency?: number }).hardwareConcurrency;
      const mem = (navigator as { deviceMemory?: number }).deviceMemory;
      const conn = (navigator as { connection?: { effectiveType?: string; downlink?: number } }).connection;
      const referrer = document.referrer
        ? (() => { try { return new URL(document.referrer).hostname; } catch { return document.referrer; } })()
        : '직접 접속';
      const histLen = history.length;
      const fp = canvasFingerprint();
      const { gpu, vendor: gpuVendor } = webglInfo();
      const dnt = navigator.doNotTrack === '1' ? 'ON' : 'OFF';

      // --- Async: battery ---
      let batteryLine = '';
      try {
        type BatteryManager = { level: number; charging: boolean };
        const bat = await (navigator as unknown as { getBattery?: () => Promise<BatteryManager> }).getBattery?.();
        if (bat) batteryLine = `🔋 배터리: ${Math.round(bat.level * 100)}% ${bat.charging ? '(충전 중)' : '(미충전)'}`;
      } catch { /* not supported */ }

      // --- Async: media devices ---
      let mediaLine = '';
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const mics = devices.filter(d => d.kind === 'audioinput').length;
        const cams = devices.filter(d => d.kind === 'videoinput').length;
        const speakers = devices.filter(d => d.kind === 'audiooutput').length;
        mediaLine = `🎙️ 마이크 ${mics}개 · 카메라 ${cams}개 · 스피커 ${speakers}개`;
      } catch { /* not supported */ }

      // --- Async: geo ---
      let geo = { city: '', country: '', org: '', ip: '' };
      try {
        const r = await fetch('https://ipapi.co/json/');
        const d = await r.json();
        geo = { city: d.city ?? '', country: d.country_name ?? '', org: d.org ?? '', ip: d.ip ?? '' };
      } catch { /* geo 실패 */ }

      const location = [geo.city, geo.country].filter(Boolean).join(', ') || '알 수 없음';

      const lines = [
        `📄 ${pathname}`,
        `⏰ ${kstTime} (KST)`,
        ``,
        `🌍 ${location}${geo.org ? ` · ${geo.org}` : ''}`,
        `🔒 IP: ${geo.ip || '알 수 없음'}`,
        `💻 ${browser} · ${os}`,
        `🖥️ ${screenRes}${dpr ? ` (${dpr})` : ''} · ${touch}`,
        `🌐 언어: ${lang} · 시간대: ${tz}`,
        `🔗 유입: ${referrer} (히스토리 ${histLen}페이지)`,
        ...(conn ? [`📶 네트워크: ${conn.effectiveType ?? ''}${conn.downlink ? ` · ${conn.downlink}Mbps` : ''}`] : []),
        ...((cpu || mem) ? [`⚙️ ${[cpu ? `CPU ${cpu}코어` : '', mem ? `RAM ${mem}GB` : ''].filter(Boolean).join(' · ')}`] : []),
        `🎨 GPU: ${gpu}${gpuVendor && gpuVendor !== gpu ? ` (${gpuVendor})` : ''}`,
        `🔑 핑거프린트: ${fp}`,
        `🚫 DNT: ${dnt}`,
        ...(batteryLine ? [batteryLine] : []),
        ...(mediaLine ? [mediaLine] : []),
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
