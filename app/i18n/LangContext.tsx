'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Translations } from './translations';

type Lang = 'ko' | 'en';
interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: Translations; }
const LangContext = createContext<Ctx>({ lang: 'ko', setLang: () => {}, t: translations.ko });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ko');
  useEffect(() => {
    const saved = localStorage.getItem('ytv_lang') as Lang;
    if (saved === 'ko' || saved === 'en') { setLangState(saved); return; }
    setLangState(navigator.language.startsWith('ko') ? 'ko' : 'en');
  }, []);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem('ytv_lang', l); };
  return <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
