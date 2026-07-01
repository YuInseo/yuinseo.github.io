export type Translations = {
  nav: {
    blog: string;
    projects: string;
    resume: string;
  };
  home: {
    tagline: string;
    heroTitle1: string;
    heroTitle2: string;
    heroSub: string;
    ctaGithub: string;
    ctaResume: string;
    sectionStack: string;
    stackLead: string;
    sectionCerts: string;
    certVisualDesign: string;
    certVisualDesignDetail: string;
    certVisualDesignBridge: string;
    certToeic: string;
    certToeicDetail: string;
    certTechnical: string;
    certTechnicalDetail: string;
    certsMore: string;
    sectionProjects: string;
    projectBadge: string;
    projectSummary: string;
    projectHighlights: string[];
    projectCta: string;
    sectionBlog: string;
    blogLead: string;
    blogMore: string;
    contactTitle: string;
    contactSub: string;
    ctaEmail: string;
  };
  blog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    more: string;
  };
  certs: {
    eyebrow: string;
    title: string;
    sectionEducation: string;
    sectionLanguage: string;
    sectionTechnical: string;
    education: {
      name: string;
      desc: string;
      tags: string[];
    };
    language: {
      name: string;
      desc: string;
      tags: string[];
    };
    technical: {
      infoProcessing: { name: string; desc: string };
      itq: { name: string; desc: string; tags: string[] };
      gtq: { name: string; desc: string; tags: string[] };
      compUtil: { name: string; desc: string; tags: string[] };
    };
  };
  artisans: {
    intro: string;
    introDetail: string;
    sectionDemo: string;
    sectionArchive: string;
    archiveDesc: string;
    fixedMode: string;
    fixedModeDesc: string;
    fixedModeDetail: string;
    dynamicMode: string;
    dynamicModeDesc: string;
    dynamicModeDetail: string;
    sectionOther: string;
    features: { label: string; desc: string }[];
  };
};

export const translations: Record<'ko' | 'en', Translations> = {
  ko: {
    nav: {
      blog: '블로그',
      projects: '프로젝트',
      resume: '이력서',
    },
    home: {
      tagline: 'frontend developer',
      heroTitle1: '사용자 경험을 개선하는',
      heroTitle2: '프론트엔드 개발자, 유인서입니다.',
      heroSub: 'React와 TypeScript로 웹을, Electron으로 데스크톱 앱을 만듭니다. "쓰다 보면 불편한 순간"을 찾아내 직접 제품으로 해결해 왔습니다. 기획부터 디자인, 개발, 배포까지 혼자 완주해 본 경험이 팀에서 빠르게 맥락을 잡는 힘이 된다고 믿습니다.',
      ctaGithub: 'GitHub 보러가기',
      ctaResume: '이력서 열기',
      sectionStack: 'Tech Stack',
      stackLead: '실무에서 바로 쓰는 도구들입니다. 단순 나열이 아니라, 아래 프로젝트에서 실제로 사용한 기술만 담았습니다.',
      sectionCerts: '학력 & 자격증',
      certVisualDesign: '시각디자인학과',
      certVisualDesignDetail: '학점은행제 · 2025.06 수료',
      certVisualDesignBridge: 'UI 디자인을 직접 할 수 있는 프론트엔드 개발자의 기반',
      certToeic: 'TOEIC',
      certToeicDetail: '800점',
      certTechnical: '정보처리기사 · ITQ · GTQ 1급',
      certTechnicalDetail: '국가공인',
      certsMore: '자세히 보기 →',
      sectionProjects: '프로젝트',
      projectBadge: 'Electron · Windows 앱 · 1인 개발',
      projectSummary: '앱 사용 이력을 자동 수집해 타임테이블로 시각화하는 생산성 데스크톱 앱. 기획 → 디자인 → 개발 → 배포 전 과정을 혼자 담당했습니다.',
      projectHighlights: [
        'Electron + React + TypeScript로 Windows 네이티브 수준의 앱 구현',
        '초 단위로 쌓이는 앱 사용 로그를 렌더링 병목 없이 타임테이블 그리드에 실시간 반영하는 데이터 집계 구조 설계',
        '실제 앱 UI를 웹에 인터랙티브 데모로 이식 — 설치 없이 브라우저에서 직접 체험 가능',
      ],
      projectCta: '라이브 데모 체험 →',
      sectionBlog: '블로그',
      blogLead: '문제를 만나면 기록합니다. 최근에 배운 것들:',
      blogMore: '더 보기 →',
      contactTitle: '함께 일할 프론트엔드 개발자를 찾고 계신가요?',
      contactSub: '이력서와 코드로 더 자세히 보여드릴 수 있습니다.',
      ctaEmail: '이메일 보내기',
    },
    blog: {
      eyebrow: 'today i learned',
      title: '블로그',
      subtitle: '개발하면서 배운 것들을 짧게 기록합니다.',
      more: '더 보기',
    },
    certs: {
      eyebrow: 'education & certifications',
      title: '학력 & 자격증',
      sectionEducation: '학력',
      sectionLanguage: '어학능력',
      sectionTechnical: '기술',
      education: {
        name: '시각디자인 (학사)',
        desc: '학점은행제를 통해 시각디자인 전공을 이수했습니다.',
        tags: ['학점은행제', '시각디자인학과', '2025.06 수료'],
      },
      language: {
        name: 'TOEIC',
        desc: '국제적으로 통용되는 영어 실무 능력 평가 시험.',
        tags: ['800점'],
      },
      technical: {
        infoProcessing: {
          name: '정보처리기사',
          desc: '소프트웨어 설계·개발·운영·유지보수 전반을 다루는 국가기술자격.',
        },
        itq: {
          name: 'ITQ',
          desc: '실무 중심의 OA 활용 능력을 검증하는 국가공인 자격.',
          tags: ['아래한글', 'MS 엑셀', 'MS 파워포인트'],
        },
        gtq: {
          name: 'GTQ',
          desc: '그래픽 툴 활용 역량을 검증하는 국가공인 자격.',
          tags: ['포토샵', '1급'],
        },
        compUtil: {
          name: '컴퓨터활용능력 1급',
          desc: '스프레드시트·데이터베이스 활용 능력을 검증하는 국가기술자격.',
          tags: ['1급'],
        },
      },
    },
    artisans: {
      intro: '하루를 기록하는 Windows 앱.',
      introDetail: '앱 사용 이력이 타임테이블에 자동으로 쌓이고, 프로젝트·할일·포모도로·아카이브가 한 흐름으로 연결됩니다. 하루를 닫으면 그날 기록이 영구 보관되고요.',
      sectionDemo: '라이브 데모',
      sectionArchive: '데일리 아카이브 모드',
      archiveDesc: '하루가 끝나는 기준을 직접 정할 수 있어요. 생활 패턴에 맞는 걸 고르면 됩니다.',
      fixedMode: '고정 모드',
      fixedModeDesc: '자정 00:00 정각에 다음 날로 전환.',
      fixedModeDetail: '규칙적인 생활 패턴이라면 이쪽이 편하죠. 날짜가 바뀌는 순간 기록이 자동 마감되고 새 하루가 열립니다.',
      dynamicMode: '동적 모드',
      dynamicModeDesc: '앱을 닫기 전까지 당일로 기록. 새벽 작업자용.',
      dynamicModeDetail: '밤새 작업하는 분들을 위한 모드. 앱을 닫는 순간이 하루의 끝이고, 새벽 3시에 닫아도 전날 날짜로 마감됩니다.',
      sectionOther: '기타 기능',
      features: [
        { label: '위젯 모드', desc: '바탕화면에 올려두고 쓰는 모드. 항상 위 고정, 위치·크기 잠금, 투명도 조절.' },
        { label: '테마', desc: '다크·라이트 기반 색상 팔레트. 위젯과 메인 화면에 각각 다른 테마 적용 가능.' },
        { label: '일기', desc: '모바일 앱에서 버튼 하나로 일기 화면 즉시 실행. 감정 태그·사진 첨부 지원.' },
        { label: '설정', desc: '타임라인 그리드 간격, 야간 구간 마커, 하단 바 탭 구성 등 세부 조정 가능.' },
      ],
    },
  },
  en: {
    nav: {
      blog: 'Blog',
      projects: 'Projects',
      resume: 'Resume',
    },
    home: {
      tagline: 'frontend developer',
      heroTitle1: "I'm Yuinseo, a frontend developer",
      heroTitle2: 'focused on user experience.',
      heroSub: 'I build for the web with React and TypeScript, and for the desktop with Electron. I find the moments where software gets in the way and turn them into products. Having taken projects from planning through design, development, and release on my own, I pick up context fast on a team.',
      ctaGithub: 'View GitHub',
      ctaResume: 'Open Resume',
      sectionStack: 'Tech Stack',
      stackLead: 'Tools I use in real work — not a wish list. Everything here was actually used in the project below.',
      sectionCerts: 'Education & Certifications',
      certVisualDesign: 'Visual Design',
      certVisualDesignDetail: 'Credit Bank System · Completed 2025.06',
      certVisualDesignBridge: 'The foundation of a frontend developer who can design UI firsthand',
      certToeic: 'TOEIC',
      certToeicDetail: '800',
      certTechnical: 'Engineer Info Processing · ITQ · GTQ Lv.1',
      certTechnicalDetail: 'National Certified',
      certsMore: 'View all →',
      sectionProjects: 'Projects',
      projectBadge: 'Electron · Windows App · Solo Project',
      projectSummary: 'A productivity desktop app that automatically collects app usage history and visualizes it as a timetable. I owned the entire process: planning → design → development → release.',
      projectHighlights: [
        'Built a Windows desktop app at near-native quality with Electron + React + TypeScript',
        'Designed a data aggregation layer that streams second-by-second usage logs into a timetable grid in real time without rendering bottlenecks',
        'Ported the actual app UI to the web as an interactive demo — try the core features in the browser, no install needed',
      ],
      projectCta: 'Try the live demo →',
      sectionBlog: 'Blog',
      blogLead: 'When I hit a problem, I write it down. Recently learned:',
      blogMore: 'More →',
      contactTitle: 'Looking for a frontend developer to work with?',
      contactSub: 'I can show you more through my resume and code.',
      ctaEmail: 'Send Email',
    },
    blog: {
      eyebrow: 'today i learned',
      title: 'Blog',
      subtitle: 'Short notes on things I learn while building.',
      more: 'More',
    },
    certs: {
      eyebrow: 'education & certifications',
      title: 'Education & Certifications',
      sectionEducation: 'Education',
      sectionLanguage: 'Language',
      sectionTechnical: 'Technical',
      education: {
        name: 'Visual Design (Bachelor\'s)',
        desc: 'Completed a Visual Design major through the Credit Bank System.',
        tags: ['Credit Bank System', 'Visual Design', 'Completed 2025.06'],
      },
      language: {
        name: 'TOEIC',
        desc: 'Internationally recognized English proficiency test for professional contexts.',
        tags: ['800'],
      },
      technical: {
        infoProcessing: {
          name: 'Engineer Information Processing',
          desc: 'National technical qualification covering software design, development, operation, and maintenance.',
        },
        itq: {
          name: 'ITQ',
          desc: 'National qualification verifying practical office automation skills.',
          tags: ['Hangul', 'MS Excel', 'MS PowerPoint'],
        },
        gtq: {
          name: 'GTQ',
          desc: 'National qualification verifying graphic tool proficiency.',
          tags: ['Photoshop', 'Level 1'],
        },
        compUtil: {
          name: 'Computer Utilization Ability Level 1',
          desc: 'National technical qualification for spreadsheet and database skills.',
          tags: ['Level 1'],
        },
      },
    },
    artisans: {
      intro: 'A Windows app for logging your day.',
      introDetail: 'App usage history builds up in a timetable automatically, and projects, todos, pomodoro, and archive are all connected in one flow. Close your day and that day\'s record is permanently stored.',
      sectionDemo: 'Live Demo',
      sectionArchive: 'Daily Archive Mode',
      archiveDesc: 'You decide when your day ends. Pick the mode that fits your routine.',
      fixedMode: 'Fixed Mode',
      fixedModeDesc: 'Rolls over to the next day at exactly 00:00 midnight.',
      fixedModeDetail: 'Great for regular routines. The moment the date changes, the current day\'s log is finalized and a new day opens.',
      dynamicMode: 'Dynamic Mode',
      dynamicModeDesc: 'Logs to the current day until you close the app. For night owls.',
      dynamicModeDetail: 'Made for people who work through the night. Closing the app ends your day — even closing at 3 AM archives it under the previous date.',
      sectionOther: 'Other Features',
      features: [
        { label: 'Widget Mode', desc: 'A mode for your desktop. Always on top, position/size lock, opacity control.' },
        { label: 'Themes', desc: 'Dark and light color palettes. Different themes can be applied to the widget and main window independently.' },
        { label: 'Journal', desc: 'Launch the journal screen instantly with one tap in the mobile app. Supports emotion tags and photo attachments.' },
        { label: 'Settings', desc: 'Fine-tune timeline grid interval, night-time markers, bottom bar tab layout, and more.' },
      ],
    },
  },
};
