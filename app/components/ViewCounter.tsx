'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Eye } from 'lucide-react';
import { useLang } from '../i18n/LangContext';

// Free, no-signup hit counter API with CORS support.
// https://abacus.jasoncameron.dev
const ABACUS_BASE = 'https://abacus.jasoncameron.dev';
const NAMESPACE = 'yuinseo-github-io';
const SESSION_PREFIX = 'ytv_viewed:';

// Turn a pathname into a stable counter key, ignoring the /ko · /en
// language prefix so both locales of the same page share one count.
function pageKey(pathname: string): string {
  const stripped = pathname.replace(/^\/(ko|en)(?=\/|$)/, '') || '/';
  const slug = stripped.replace(/^\/+|\/+$/g, '').replace(/[^A-Za-z0-9]+/g, '_');
  return slug ? `page_${slug}` : 'page_home';
}

export default function ViewCounter() {
  const pathname = usePathname();
  const { t } = useLang();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const key = pageKey(pathname);
    const sessionKey = SESSION_PREFIX + key;
    // Increment once per browser session per page; otherwise just read.
    const shouldHit = !sessionStorage.getItem(sessionKey);

    const run = async () => {
      try {
        const endpoint = shouldHit ? 'hit' : 'get';
        const res = await fetch(`${ABACUS_BASE}/${endpoint}/${NAMESPACE}/${key}`);
        if (!res.ok) return;
        const data = await res.json();
        if (typeof data.value === 'number') {
          setCount(data.value);
          if (shouldHit) sessionStorage.setItem(sessionKey, '1');
        }
      } catch {
        /* counter unavailable — stay hidden */
      }
    };

    run();
  }, [pathname]);

  if (count === null) return null;

  return (
    <span className="mt-2 inline-flex items-center gap-1 text-[var(--t5)]" aria-label={t.footer.views(count.toLocaleString())}>
      <Eye className="h-3.5 w-3.5" aria-hidden />
      {t.footer.views(count.toLocaleString())}
    </span>
  );
}
