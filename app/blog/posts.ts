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
    slug: "fouc-nextjs-dark-theme",
    title: "Next.js 정적 사이트에서 다크 테마 깜빡임 잡기",
    date: "2026-06-01",
    category: "포트폴리오",
    summary: "포트폴리오 사이트에서 첫 로드 시 스타일이 깨지고 새로고침해야 정상이 되는 현상을 수정했다. JS 하이드레이션 전 CSS 기본값 문제였다.",
    body: [
      {
        text: "사이트를 처음 열면 Nav 링크가 파란색으로 보이고, 데모 앱의 모바일·데스크톱 레이아웃이 동시에 나타났다. 새로고침하면 정상으로 돌아왔다.",
      },
      {
        heading: "원인",
        text: "next-themes는 클라이언트 측 JavaScript가 실행된 후에야 <html>에 .dark 클래스를 붙인다. 그 전 찰나에 브라우저는 :root(라이트 테마) 기준으로 렌더링한다. Tailwind의 hidden lg:block 같은 반응형 클래스도 CSS가 완전히 로드되기 전엔 무효라, 숨겨야 할 요소가 함께 보였다.",
      },
      {
        heading: "해결 방법",
        text: ":root와 .dark에 동일하게 다크 테마 변수를 선언하고, 라이트 테마는 .light 클래스로 분리했다. 이렇게 하면 JS가 실행되기 전 기본 상태에서도 다크 변수가 적용된다. 추가로 a { color: inherit; text-decoration: none; }를 globals.css에 넣어 Tailwind preflight 로드 전 링크 기본 스타일을 방지했다.",
      },
      {
        heading: "추가 설정",
        text: "ThemeProvider에 enableSystem={false}를 추가해 시스템 테마 감지를 비활성화했다. OS 다크 모드를 따라가다 상태가 불일치하는 케이스를 줄이는 게 목적이다.",
      },
    ],
  },
  {
    slug: "react-context-theme-sync",
    title: "React Context로 사이트 테마를 데모 앱에 연동하기",
    date: "2026-05-15",
    category: "포트폴리오",
    summary: "포트폴리오 사이트의 다크·라이트 테마 전환이 내부 데모 앱 색상에도 자동으로 반영되도록 구현했다. prop drilling 없이 Context 하나로 해결했다.",
    body: [
      {
        text: "데모 앱은 자체 색상 상수를 갖고 있었는데, 사이트 테마를 바꿔도 데모 앱은 항상 다크 색상으로 고정돼 있었다. 사이트 테마와 연동해야 했다.",
      },
      {
        heading: "구조",
        text: "next-themes의 useTheme()으로 resolvedTheme을 읽어 'light'이면 라이트 팔레트, 그 외엔 다크 팔레트를 선택한다. 이 색상 객체를 DemoColorsContext.Provider로 감싸서 하위 컴포넌트 어디서든 useDemoColors() 훅으로 꺼내 쓸 수 있게 했다.",
      },
      {
        heading: "prop drilling을 피한 이유",
        text: "데모 앱 내부 컴포넌트가 13개 이상이었다. 모든 컴포넌트에 colors prop을 전달하면 수정할 때마다 시그니처를 바꿔야 한다. Context를 쓰면 최상위에서만 색상을 결정하고, 하위 컴포넌트는 그냥 훅 하나만 호출하면 된다.",
      },
      {
        heading: "주의할 점",
        text: "useTheme()은 클라이언트에서만 동작한다. 서버 렌더링 시점엔 resolvedTheme이 undefined라, 기본값을 다크로 설정해두지 않으면 첫 렌더에서 색상이 빠져 깜빡이는 문제가 생긴다.",
      },
    ],
  },
  {
    slug: "mobile-desktop-layout-separation",
    title: "모바일·데스크톱 레이아웃을 하나의 컴포넌트에서 분리하기",
    date: "2026-05-01",
    category: "포트폴리오",
    summary: "데모 앱 컴포넌트에서 모바일과 데스크톱 레이아웃이 뒤엉켜 있었다. Tailwind 반응형 클래스와 embedded prop 패턴으로 깔끔하게 분리했다.",
    body: [
      {
        text: "데모 앱은 데스크톱에선 3패널 레이아웃, 모바일에선 하단 탭 바 형태로 보여야 했다. 처음엔 하나의 컴포넌트 안에서 조건부 렌더링으로 처리했는데, 코드가 복잡해져서 분리했다.",
      },
      {
        heading: "hidden / block 패턴",
        text: "Tailwind의 hidden lg:block과 lg:hidden을 활용해 데스크톱 전용 컴포넌트와 모바일 전용 컴포넌트를 각각 만들었다. 두 컴포넌트는 같은 상태(activeView, diaryOpen)를 부모에서 받아 동기화된다.",
      },
      {
        heading: "embedded prop",
        text: "모바일에선 데모 앱과 설명 텍스트를 하나의 카드로 묶었다. 그런데 데모 앱 컴포넌트 자체도 border와 shadow를 갖고 있어서 겹쳐 보이는 문제가 있었다. embedded 불리언 prop을 추가해서, embedded일 때 내부 border/shadow/borderRadius를 제거하도록 처리했다.",
      },
      {
        heading: "결과",
        text: "DemoSection이 모바일 카드와 데스크톱 레이아웃을 각각 렌더하고, DemoApp은 embedded 여부에 따라 외형만 달리한다. 각 레이아웃 코드가 완전히 독립돼서 한쪽을 수정해도 다른 쪽에 영향이 없다.",
      },
    ],
  },
  {
    slug: "css-keyframes-tab-slide",
    title: "CSS keyframes로 탭 전환 슬라이드 애니메이션 구현",
    date: "2026-04-20",
    category: "포트폴리오",
    summary: "모바일 데모 앱에서 탭을 전환할 때 콘텐츠가 좌우로 슬라이드되며 교체되는 효과를 구현했다. JS 없이 CSS keyframes만으로 처리했다.",
    body: [
      {
        text: "탭을 누를 때 콘텐츠가 뚝 바뀌는 느낌이 어색했다. 왼쪽 탭을 누르면 콘텐츠가 오른쪽에서 들어오고, 오른쪽 탭을 누르면 왼쪽에서 들어오는 방향성 있는 전환을 만들고 싶었다.",
      },
      {
        heading: "방향 판단",
        text: "탭 인덱스 배열에서 이전 탭과 현재 탭의 위치를 비교한다. 현재 인덱스가 이전보다 크면 오른쪽으로 이동한 것이므로 콘텐츠는 오른쪽에서 들어온다(slideInRight). 반대면 slideInLeft.",
      },
      {
        heading: "CSS keyframes",
        text: "slideInRight는 translateX(28px)에서 0으로, slideInLeft는 translateX(-28px)에서 0으로 이동하면서 opacity도 0→1로 전환된다. 지속 시간 0.22s에 ease-out 커브를 써서 빠르게 정착하는 느낌을 줬다.",
      },
      {
        heading: "클래스 적용 방식",
        text: "탭이 바뀔 때마다 콘텐츠 div에 demo-slide-right 또는 demo-slide-left 클래스를 부여한다. 애니메이션이 끝나면 클래스를 제거해야 다음 전환 때 다시 애니메이션이 트리거된다. animationend 이벤트 대신 key prop을 바꾸는 방식으로 컴포넌트를 재마운트해서 처리했다.",
      },
    ],
  },
  {
    slug: "mobile-calendar-swipe",
    title: "모바일 캘린더에 터치 스와이프로 주간 이동 구현",
    date: "2026-04-10",
    category: "포트폴리오",
    summary: "모바일 데모 캘린더에서 좌우 스와이프로 날짜를 이동하는 제스처를 구현했다. onTouchStart / onTouchEnd로 간단하게 처리할 수 있었다.",
    body: [
      {
        text: "3일 단위로 날짜를 표시하는 캘린더에서 버튼으로만 날짜를 이동하면 모바일에서 부자연스러웠다. 터치 스와이프로도 이동할 수 있어야 했다.",
      },
      {
        heading: "기본 구현",
        text: "onTouchStart에서 터치 시작 x좌표를 저장하고, onTouchEnd에서 끝 x좌표와 비교해 차이가 50px 이상이면 스와이프로 판단한다. 왼쪽으로 스와이프하면 다음 날짜, 오른쪽이면 이전 날짜로 이동한다.",
      },
      {
        heading: "threshold 값",
        text: "50px보다 작으면 스크롤 도중 의도치 않게 날짜가 이동하는 경우가 생겼고, 너무 크면 제스처가 잘 안 느껴졌다. 50px이 가장 자연스러웠다.",
      },
      {
        heading: "고민했던 부분",
        text: "페이지 자체 스크롤과 충돌하는 문제가 있었다. 수직 스와이프와 수평 스와이프를 구분하기 위해 x 변위가 y 변위보다 클 때만 날짜 이동 처리를 하도록 했다. 그렇지 않으면 위아래 스크롤 중에도 날짜가 바뀌는 문제가 생긴다.",
      },
    ],
  },
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
        text: "각 섹션이 뷰포트에 진입할 때 opacity + translateY 전환을 적용하고 싶었다. CSS transition만으로 처리하고 싶어서 JS는 상태 토글 역할만 하도록 구성했다.",
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
