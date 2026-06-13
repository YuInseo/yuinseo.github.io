import { LangProvider } from '../i18n/LangContext';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }];
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang === 'en' ? 'en' : 'ko';
  return (
    <LangProvider lang={lang}>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
        <Nav />
        {children}
        <Footer />
      </div>
    </LangProvider>
  );
}
