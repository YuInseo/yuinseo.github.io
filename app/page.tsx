'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Root() {
  const router = useRouter();
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('ytv_lang') : null;
    router.replace(
      saved === 'en' ? '/en' :
      saved === 'ko' ? '/ko' :
      navigator.language.startsWith('ko') ? '/ko' : '/en'
    );
  }, [router]);
  return null;
}
