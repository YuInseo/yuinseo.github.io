export type SkillGroup = {
  label: { ko: string; en: string };
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: { ko: 'Core', en: 'Core' },
    items: ['TypeScript', 'React', 'Next.js (App Router)'],
  },
  {
    label: { ko: 'Desktop', en: 'Desktop' },
    items: ['Electron'],
  },
  {
    label: { ko: 'UI & Styling', en: 'UI & Styling' },
    items: ['Tailwind CSS', 'Radix UI', 'Dark/Light Theme'],
  },
  {
    label: { ko: 'State & Tooling', en: 'State & Tooling' },
    items: ['Zustand', 'Git · GitHub', 'i18n (KO/EN)', 'SEO'],
  },
];
