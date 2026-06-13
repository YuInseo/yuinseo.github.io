'use client';
import { createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { translations, type Translations } from './translations';

type Lang = 'ko' | 'en';
interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: Translations; }
const LangContext = createContext<Ctx>({ lang: 'ko', setLang: () => {}, t: translations.ko });

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const setLang = (next: Lang) => {
    if (typeof window !== 'undefined') localStorage.setItem('ytv_lang', next);
    router.push(pathname.replace(/^\/(ko|en)/, `/${next}`));
  };
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
