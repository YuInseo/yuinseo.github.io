# 구직용 포트폴리오 메인 페이지 개편 기획안

> 2026-07 · 피드백 4가지(포지셔닝, 기술 스택, 프로젝트 요약, CTA) 반영
> 대상 파일: `app/HomeContent.tsx`, `app/components/Nav.tsx`, `app/i18n/translations.ts`

---

## 1. 페이지 전체 구조 (위 → 아래 스크롤 순서)

| 순서 | 섹션 | 목적 | 비고 |
|---|---|---|---|
| 0 | 헤더 (sticky) | 어디서든 GitHub·이력서 접근 | CTA 추가 |
| 1 | 히어로 | 3초 안에 "누구인지 + 무엇을 하는지" 전달 | 포지셔닝 + CTA 버튼 |
| 2 | 기술 스택 | "무엇을 다룰 수 있는가"를 스캔 가능하게 | **신설**, 학력보다 위 |
| 3 | 프로젝트 | 문제 → 해결 → 역할 구조로 기술력 증명 | 카피 전면 재작성 |
| 4 | 학력 & 자격증 | 보조 신뢰 요소 | 프로젝트 아래로 **이동** |
| 5 | 블로그 | 학습 태도·커뮤니케이션 능력 증명 | 유지 |
| 6 | 푸터 / 컨택트 | 마지막 스크롤에서 행동 유도 | 연락 CTA 추가 |

채용 담당자의 시선 흐름 기준: **"누구지?" → "뭘 쓸 줄 알지?" → "뭘 만들었지?" → "검증 가능한가?" → "연락하자"** 순서로 배치.

---

## 2. 섹션별 카피라이팅

### ① 헤더 (Nav)

- 좌측: `유인서` (로고 겸 홈 링크)
- 중앙/우측 메뉴: `프로젝트` · `블로그`
- 우측 끝 (CTA 영역):
  - **GitHub** — 아이콘 버튼 (외부 링크, `target="_blank"`)
  - **이력서** — 강조 버튼 (accent 배경). PDF 또는 Notion 링크
- 기존 KO/EN 토글, 테마 토글 유지

### ② 히어로

```
(eyebrow)  FRONTEND DEVELOPER

(H1)       사용자 경험을 개선하는
           프론트엔드 개발자, 유인서입니다.

(서브)     React와 TypeScript로 웹을, Electron으로 데스크톱 앱을 만듭니다.
           "쓰다 보면 불편한 순간"을 찾아내 직접 제품으로 해결해 왔습니다.
           기획부터 디자인, 개발, 배포까지 혼자 완주해 본 경험이
           팀에서 빠르게 맥락을 잡는 힘이 된다고 믿습니다.

(CTA 버튼)  [GitHub 보러가기 →]   [이력서 열기 ↗]
```

- EN 버전 eyebrow: `FRONTEND DEVELOPER` / H1: `Yuinseo — a frontend developer focused on user experience.`
- 포인트: "indie developer"의 강점(끝까지 만들어 본 경험)은 버리지 않고, **직무 타이틀 아래의 서사**로 재배치.

### ③ 기술 스택 (신설)

```
(섹션 레이블)  TECH STACK

(리드 카피)   실무에서 바로 쓰는 도구들입니다.
              단순 나열이 아니라, 아래 프로젝트에서 실제로 사용한 기술만 담았습니다.
```

| 그룹 | 항목 |
|---|---|
| Core | TypeScript · React · Next.js (App Router) |
| Desktop | Electron (Windows 앱 배포 경험) |
| Styling | Tailwind CSS · 반응형/다크 테마 구현 |
| 기타 | Git/GitHub · i18n(KO/EN) · SEO(sitemap, robots) |

- 각 그룹을 칩(chip) 형태로 나열. 항목별 숙련도 바(bar)는 **넣지 않음** — 근거 없는 수치는 오히려 감점 요인.
- "실제 프로젝트에서 쓴 것만" 이라는 리드 카피가 신뢰를 만든다.

### ④ 프로젝트 (카피 전면 재작성)

**Before**: "하루를 기록하는 생산성 앱. 앱 사용 이력이 타임테이블에 자동으로 쌓이고…" (서비스 설명 위주)

**After** — 카드 구성:

```
(타이틀)    Artisan's Compass
(배지)      Electron · Windows 데스크톱 앱 · 1인 개발

(한 줄 요약)
  앱 사용 이력을 자동 수집해 타임테이블로 시각화하는 생산성 데스크톱 앱.
  기획 → 디자인 → 개발 → 배포 전 과정을 혼자 담당했습니다.

(기술적 하이라이트 — 불릿 3개)
  • Electron + React + TypeScript로 Windows 네이티브 수준의 앱 구현
  • 초 단위로 쌓이는 앱 사용 로그를 렌더링 병목 없이 타임테이블 그리드에
    실시간 반영하는 데이터 집계 구조 설계
  • 웹 포트폴리오에 실제 앱 UI를 인터랙티브 데모로 이식 —
    설치 없이 브라우저에서 핵심 기능을 직접 체험 가능

(CTA)      [라이브 데모 체험 →]   [GitHub 저장소 ↗]
```

- 공식: **무엇을(서비스 한 줄) → 어떻게(기술 스택·아키텍처) → 무엇이 어려웠고 어떻게 풀었나(문제 해결) → 내 역할**.
- "1인 개발" 배지가 역할 질문을 선제적으로 해결.
- 인터랙티브 데모(`/projects/artisans-compass`)는 이 사이트의 최대 무기이므로 CTA로 반드시 노출.

### ⑤ 학력 & 자격증 (아래로 이동)

```
(섹션 레이블)  EDUCATION & CERTIFICATIONS
```

- 기존 리스트 유지(시각디자인 학사, 정보처리기사, TOEIC 800, ITQ/GTQ).
- 시각디자인 항목에 한 줄 추가: `→ UI 디자인을 직접 할 수 있는 프론트엔드 개발자의 기반`
  (전공을 직무 강점으로 연결하는 브릿지 카피)

### ⑥ 블로그

```
(섹션 레이블)  WRITING
(리드 카피)    문제를 만나면 기록합니다. 최근에 배운 것들:
```

- 최신 2~3개 노출 유지. React Context 등 기술 글이 상단에 오도록.

### ⑦ 푸터 / 컨택트

```
(H2)   함께 일할 프론트엔드 개발자를 찾고 계신가요?

(서브)  이력서와 코드로 더 자세히 보여드릴 수 있습니다.

(CTA)  [이메일 보내기]  [GitHub]  [이력서 PDF]
```

---

## 3. Next.js 구현 팁

### 컴포넌트 구조

```
app/
  HomeContent.tsx          # 섹션 조립만 담당 (얇게 유지)
  components/home/
    Hero.tsx               # 히어로 + CTA 버튼
    TechStack.tsx          # 칩 그리드
    ProjectCard.tsx        # 프로젝트 카드 (하이라이트 불릿 포함)
    ContactCta.tsx         # 푸터 위 컨택트 밴드
  data/
    skills.ts              # 기술 스택 데이터 (그룹/항목 배열)
    projects.ts            # 프로젝트 메타 + 하이라이트 불릿
```

- **콘텐츠는 데이터 파일로 분리** (`data/*.ts`): 프로젝트가 늘어나도 컴포넌트 수정 없이 배열에 추가. i18n 키(`translations.ts`)와 동일한 패턴이라 이질감 없음.
- CTA 버튼은 `<a href target="_blank" rel="noopener noreferrer">` + `aria-label` 필수. 이력서는 `/resume.pdf`를 `public/`에 두면 GitHub Pages에서 바로 서빙됨.

### UI 팁

1. **히어로 CTA는 primary/secondary 구분**: 이력서 버튼 = accent 채움, GitHub = 아웃라인. 시선이 하나로 모이게.
2. **기술 스택 칩은 텍스트 기반으로 담백하게**: 기존 border/surface 토큰(`--border`, `--surface`) 재사용. 로고 아이콘 그리드는 다크 테마에서 관리 비용이 큼.
3. **기존 `ScrollReveal` 재사용**: 새 섹션에도 동일한 등장 애니메이션을 적용해 톤 일관성 유지.
4. **모바일 우선 확인**: 채용 담당자의 첫 접속이 모바일인 경우가 많음. 히어로 CTA 두 개가 375px에서 줄바꿈 없이 들어가는지 체크.

---

## 4. i18n 반영 메모

`translations.ts`의 `home`에 추가 필요한 키:

- `tagline` 값 변경: `'indie developer'` → `'frontend developer'`
- `heroTitle`, `heroSub`, `ctaGithub`, `ctaResume`
- `sectionStack`, `stackLead`, 스택 그룹 라벨
- `projectSummary`, `projectHighlights: string[]`, `projectRoleBadge`
- `contactTitle`, `contactSub`, `ctaEmail`
