import HomeContent from '../HomeContent';

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return {
    description: params.lang === 'en'
      ? 'Portfolio of Yuinseo, a frontend developer focused on user experience. React · TypeScript · Next.js · Electron.'
      : '사용자 경험을 개선하는 프론트엔드 개발자 유인서의 포트폴리오. React · TypeScript · Next.js · Electron.',
  };
}

export default function Home() {
  return <HomeContent />;
}
