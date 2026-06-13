import HomeContent from '../HomeContent';

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: string } }) {
  return {
    description: params.lang === 'en'
      ? 'An indie developer building apps that reduce everyday inconveniences.'
      : '생활의 불편함을 줄여주는 앱을 만드는 indie developer.',
  };
}

export default function Home() {
  return <HomeContent />;
}
