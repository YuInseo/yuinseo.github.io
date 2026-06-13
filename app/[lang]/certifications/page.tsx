import type { Metadata } from "next";
import CertsContent from '../../certifications/CertsContent';

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }];
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: params.lang === 'en' ? 'Education & Certifications' : '학력 & 자격증',
    description: params.lang === 'en' ? 'Education and certifications' : '학력 및 보유 자격증',
  };
}

export default function CertificationsPage() {
  return <CertsContent />;
}
