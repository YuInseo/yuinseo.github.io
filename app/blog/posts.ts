export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  body: { heading?: string; text: string }[];
};

export const CATEGORIES = ["Artisan's Compass", "포트폴리오"];

export const POSTS: Post[] = [
  {
    slug: "timetable-auto-tracking",
    title: "앱 전환 이력을 자동으로 감지하는 방법",
    date: "2025-06-01",
    category: "Artisan's Compass",
    summary: "Windows에서 포그라운드 앱이 바뀔 때마다 이를 감지해 타임테이블에 기록하는 구조를 정리했다.",
    body: [
      {
        text: "타임테이블 자동 기록 기능을 구현하려면 현재 포그라운드 앱이 무엇인지, 언제 바뀌었는지를 알아야 한다.",
      },
      {
        heading: "SetWinEventHook",
        text: "Windows API의 SetWinEventHook을 사용하면 포그라운드 창이 전환될 때마다 콜백을 받을 수 있다. EVENT_SYSTEM_FOREGROUND 이벤트를 구독하면 된다. 직접 폴링하는 방식보다 CPU 사용량이 훨씬 낮다.",
      },
      {
        heading: "프로세스 이름 추출",
        text: "콜백으로 받은 HWND에서 GetWindowThreadProcessId → OpenProcess → GetProcessImageFileName 순으로 호출하면 실행 파일 경로를 얻을 수 있다. 여기서 파일명만 잘라서 앱 이름으로 사용한다.",
      },
      {
        heading: "세션 기록 방식",
        text: "앱이 전환될 때 이전 앱의 시작 시각과 전환 시각을 묶어 하나의 세션으로 저장한다. 저장소는 SQLite를 사용했고, 날짜별로 파티션을 나눠 아카이브 조회 속도를 확보했다.",
      },
    ],
  },
  {
    slug: "scroll-reveal-intersection-observer",
    title: "IntersectionObserver로 스크롤 등장 애니메이션 구현",
    date: "2025-05-28",
    category: "포트폴리오",
    summary: "포트폴리오 사이트에 스크롤 시 요소가 올라오며 나타나는 효과를 추가했다. requestAnimationFrame 없이도 충분히 부드럽다.",
    body: [
      {
        text: "각 섹션이 뷰포트에 진입할 때 opacity + translateY 전환을 적용하고 싶었다. CSS transition만으로 처리하고 싶어서 JS는 클래스 토글 역할만 하도록 구성했다.",
      },
      {
        heading: "핵심 아이디어",
        text: "IntersectionObserver로 요소가 뷰포트 10% 이상 노출되는 순간을 감지한다. 감지되면 visible 상태를 true로 바꾸고, style에 직접 opacity·transform을 적용한다. 한 번 나타난 뒤에는 observer를 disconnect해서 역방향 스크롤 시 다시 숨겨지지 않도록 했다.",
      },
      {
        heading: "stagger 딜레이",
        text: "같은 섹션 안에서 카드들이 순서대로 나타나게 하려면 delay props만 다르게 넘기면 된다. transition의 delay 값을 ms 단위로 받아서 style에 그대로 쓴다. 80ms 간격이 자연스러웠다.",
      },
      {
        heading: "주의할 점",
        text: "초기 상태를 opacity: 0으로 설정하면 JS가 느리게 로드될 때 콘텐츠가 보이지 않는 문제가 생긴다. Next.js 환경에서는 hydration 이후에 observer가 붙기 때문에 큰 문제는 없었지만, 서버 렌더링 단계에서는 항상 visible 처리를 고려해야 한다.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string) {
  return POSTS.filter((p) => p.category === category);
}
