# 세모 <img src="https://github.com/user-attachments/assets/5b44b7ae-e23b-4e6f-a965-d8d8f896aa87" width="115" align="left" />

나만의 수학 오답노트

<br />

> Team Delta Front

<p>
  학생이 만든 오답을 모아
  <strong>학습 흐름을 끊김 없이 이어주는</strong>
  <em>나만의 수학 오답노트 플랫폼</em>
</p>

세모는 오답을 단순히 “저장”하는 서비스가 아니라, 오답을 다시 풀고 정리하는 과정을 습관으로 만들 수 있게 돕는 학습 공간입니다.<br />
등록 → 확인 → 복습 → 시각화까지 한 흐름으로 연결해, 오답 정리가 실제 실력 향상으로 이어지도록 설계했습니다.

```
오답이 쌓이면, 다시 풀고 정리할 이유가 생기고
그 과정이 반복되면 공부가 “지속되는” 경험으로 바뀝니다.
```
### 세모로 공부하면, 성적이 달라지는 이유

```
- 오답을 유형이 아니라 왜 틀렸는지까지 파헤쳐서 보여줘요.
- 필요한 오답만 쏙쏙! 시험지 PDF로 만들어요.
- 오답이 아닌 틀린 이유를 명확히 알려줘요.  
- 유사 문제로 완전히 익숙해질 때까지 풀어요.
- 현재 기준 예상 점수와 다음 학습 목표를 알려줘요.
```
---

## 팀원

|                                          밥비                                          |                                               빙빙                                               |
| :------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: |
| [<img src="https://github.com/Dubabbi.png" width="200px">](https://github.com/Dubabbi) | [<img src="https://github.com/kimkimjunjun.png" width="200px">](https://github.com/kimkimjunjun) |
|                          [윤소은](https://github.com/Dubabbi)                          |                            [김준휘](https://github.com/kimkimjunjun)                             |

---

## 🛠 Tech Stack

| 역할                         | 종류                                                                                                                                                                                                             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monorepo / Workspace**     | ![pnpm Workspace](https://img.shields.io/badge/pnpm_Workspace-F69220?style=flat&logo=pnpm&logoColor=white)                                                                                                       |
| **Framework**                | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)                                                                                                                |
| **Library**                  | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)                                                                                                                        |
| **Programming Language**     | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)                                                                                                         |
| **Data Fetching / HTTP**     | ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=reactquery&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)       |
| **Styling**                  | ![Vanilla Extract](https://img.shields.io/badge/Vanilla_Extract-FFB4D9?style=flat&logo=css3&logoColor=black)                                                                                                     |
| **UI Docs / Visual Testing** | ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=storybook&logoColor=white) ![Chromatic](https://img.shields.io/badge/Chromatic-FC521F?style=flat&logo=chromatic&logoColor=white)      |
| **Testing**                  | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)            |
| **Linting / Formatting**     | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)                  |
| **CI / Deployment (CD)**     | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) |

## 🧭 Workflow & Conventions

> 팀 생산성을 위해 “예측 가능한 규칙”을 우선합니다.
> 작업은 이슈 기반으로 분리하고, PR 단위로 공유/리뷰/머지합니다.

---

## 🌿 Branch

### 🧭 Branch Strategy (GitHub Flow + develop)

우리 브랜치 전략은 **GitHub Flow 기반 + develop 통합 브랜치** 방식입니다.

- **develop**: 개발용(통합 브랜치) — 모든 작업 브랜치는 develop로 PR 후 머지
- **main**: 배포용(릴리즈 브랜치) — 배포 시점에만 develop → main 머지

<br/>

### 🌱 Branch Naming Convention

> 이슈 기반으로 브랜치를 생성하며, 브랜치명은 아래 규칙을 따릅니다.

| 브랜치                     | 용도           | 규칙 / 예시                     |
| -------------------------- | -------------- | ------------------------------- |
| `develop`                  | 개발용(통합)   | 모든 작업 브랜치는 develop로 PR |
| `main`                     | 배포용(릴리즈) | 배포 시점에만 develop → main    |
| `feat/#<issue>/<name>`     | 기능 작업      | `feat/#1/card`                  |
| `fix/#<issue>/<name>`      | 버그 수정      | `fix/#12/splash-redirect`       |
| `refactor/#<issue>/<name>` | 리팩토링       | `refactor/#2/my-page`           |
| `style/#<issue>/<name>`    | 스타일/포맷    | `style/#31/import-order`        |
| `test/#<issue>/<name>`     | 테스트         | `test/#18/bar-graph-utils`      |
| `chore/#<issue>/<name>`    | 설정/잡무      | `chore/#7/commitlint`           |

---

## 🧾 Pull Request

### 🧷 PR Title Convention

#### PR 제목 규칙

> PR 제목은 아래 형식으로 작성합니다.

- **`Type: 작업 내용`**
- `Type`은 **앞 글자 대문자**로 통일합니다.
  예) `Feat: 홈 그래프 모션 추가`, `Fix: 스플래시 재노출 문제 해결`

<br/>

### 🧩 PR Template Convention

PR은 아래 템플릿을 기반으로 **가능한 자세하게** 작성합니다.

```md
<!---- 'Closes #'다음에 완료한 이슈 넘버를 작성해 주세요. ex) Closes #4 !-->

## 🔗 관련 이슈

Closes #

## 💡 작업 내용

## 💬 원하는 리뷰 방식(선택)

## 📸 Screenshots or Video(선택)
```

- UI 변경이 있는 경우 **스크린샷 필수**
- 인터렉션/흐름이 중요한 경우 **영상 또는 GIF 권장**
- 리뷰어에게 부탁하고 싶은 점/확인이 필요한 부분/도움이 필요한 부분은
  **“원하는 리뷰 방식”에 주저하지 말고 작성**합니다.

### 🏷️ Label Policy

- 리뷰/머지 전에 **라벨을 꼭 달아 주세요.**
- 작업 담당자와 작업 성격을 추후 필터링할 수 있어요.

### ✅ Merge Rule

**최소 1명 승인(Approve)** 후 merge 가능합니다.
가능한 한 PR 단위를 작게 유지해 리뷰 부담을 낮춥니다.
merge된 브랜치는 바로 삭제하여 불필요한 브랜치가 누적되는 것을 방지합니다.

---

## 🧾 Commit

### 🧾 Commit Message Format

아래 포맷을 사용합니다.

- **`type: 작업 내용`**
- 예: `fix: ~~ 버그 수정`, `feat: ~~ 기능 구현`

### 🏷️ Commit Types

| Type          | 설명                               | 예시                                                       |
| ------------- | ---------------------------------- | ---------------------------------------------------------- |
| ✨ `feat`     | 기능 구현 / 신규 기능 추가         | `feat: 홈 그래프 모션 추가`                                |
| 🐛 `fix`      | 버그 수정                          | `fix: 스플래시가 로그인 리다이렉트 후 다시 뜨는 문제 수정` |
| 📝 `docs`     | 문서 수정(README/Wiki/가이드 등)   | `docs: PR 템플릿 추가`                                     |
| 🎨 `style`    | 포맷/스타일 변경(동작 변화 없음)   | `style: import 정렬 및 포맷 정리`                          |
| 🧪 `test`     | 테스트 추가/수정                   | `test: 그래프 유틸 테스트 추가`                            |
| 🧹 `chore`    | 설정/잡무(기능과 직접 관련 없음)   | `chore: husky 설정 추가`                                   |
| 🏗️ `build`    | 빌드/번들/배포 관련 변경           | `build: next 빌드 설정 수정`                               |
| 🧩 `refactor` | 리팩토링(동작 변화 없이 구조 개선) | `refactor: bar graph 모션 로직 훅으로 분리`                |

---

## 🧱 Coding Convention

> 우리 팀의 코드 품질과 유지보수성을 높이기 위해 기본 코딩 컨벤션을 정리합니다.
> 모든 신규/수정 코드는 본 규칙을 기본으로 따르며, 예외가 필요한 경우 PR에서 근거를 함께 남깁니다.

### 🧭 기본 원칙

TypeScript 기반으로 작성하고, 스타일은 Vanilla Extract(`.css.ts`)만 사용합니다.
절대 경로 import를 사용하며, index를 key로 쓰지 않습니다. `var` 키워드는 금지합니다.

또한 공통(shared) 코드는 특정 페이지/도메인에 강하게 의존하지 않도록 설계하여 결합도를 낮게 유지합니다.
전역 상태 접근이나 사이드 이펙트는 최소화하고, 필요 시 props/인터페이스로 주입해 교체 가능성을 확보합니다.

<br/>

<details>
  <summary>🏷️ 네이밍 컨벤션</summary>
  <br/>

| 대상              | 규칙                                   | 예시                                            |
| ----------------- | -------------------------------------- | ----------------------------------------------- |
| 폴더/파일명       | kebab-case                             | `bar-graph-01.tsx`, `use-bar-graph-motion.ts`   |
| 컴포넌트/타입     | PascalCase                             | `BarGraph01`, `CardGraph01Props`                |
| 변수/함수         | camelCase                              | `handleClick`, `isActive`                       |
| 상수              | BIG_SNAKE_CASE                         | `GRAPH_TABS`, `STATE_KEY`                       |
| Props 타입        | 컴포넌트명 + `Props`                   | `ButtonProps`, `AnswerSectionProps`             |
| API 응답 타입     | `XXXResponse`                          | `GetUserListResponse`                           |
| 함수 접두사       | 의미에 맞는 접두사 사용                | `get/create/check/handle/is/has/can...`         |
| TanStack Query 훅 | `use` + 행위 + 대상 + `Query/Mutation` | `useGetUserListQuery`, `usePostCommentMutation` |

</details>

<details>
  <summary>⚛️ React 컴포넌트 규칙</summary>
  <br/>

컴포넌트는 접근성을 기본으로 고려합니다. 버튼/탭/다이얼로그 등 상호작용 요소는 적절한 role과 aria 속성을 제공하고, 클릭 가능한 요소는 키보드 조작 가능해야 합니다.

렌더 성능을 위해 불필요한 재렌더를 피하고, `useMemo`, `useCallback`, `React.memo`는 “효과가 명확한 경우에만” 적용합니다.

리스트 렌더링 시 key는 반드시 안정적인 식별자(id)를 사용합니다. `index` key는 금지합니다.

</details>

<details>
  <summary>🎨 스타일링 규칙 (Vanilla Extract)</summary>
  <br/>

스타일은 반드시 `.css.ts`에서 정의하고, 디자인 토큰을 우선 사용합니다.
컴포넌트 상태나 타입 변화는 `recipe`와 `variant`로 표현하고, 불필요하게 중복되는 style 선언은 제거합니다.

반응형은 `@media`, `@container` 등을 사용하되, 동일 패턴이 반복되면 공통 상수/유틸로 승격합니다.

</details>

<details>
  <summary>🪝 Hooks 규칙</summary>
  <br/>

커스텀 훅은 파일명/함수명이 반드시 `use*`로 시작해야 합니다.
훅이 로딩/에러 상태를 다룬다면 호출부에서 상태를 명확히 구분할 수 있도록 설계합니다.

제네릭 훅은 타입 매개변수 기본값이 적절한지 검토하고, TanStack Query 훅은 네이밍 컨벤션(`use + 행위 + 대상 + Query/Mutation`)을 따릅니다.

</details>

<details>
  <summary>🔌 API 규칙</summary>
  <br/>

API 코드는 TanStack Query 통합을 전제로 작성하며, QueryKey Factory 사용을 권장합니다.
응답 타입은 제네릭/불변 데이터 기준으로 타입 안정성을 확보하고, 네이밍은 `HTTP메서드 + 명사` 형태를 따릅니다(`getUserList`, `postComment` 등).
`async/await` 패턴은 프로젝트 내에서 일관되게 유지합니다.

</details>

<details>
  <summary>🧭 라우팅 규칙</summary>
  <br/>

라우팅 구조는 중첩 레이아웃과 에러 경계를 적절히 활용합니다.
동적 import 기반 코드 스플리팅을 고려해 chunk 분리를 검토하고, 라우트 전환 시 상태 보존이 필요한 경우 전략을 명확히 합니다.

</details>

<details>
  <summary>🧊 상수 규칙</summary>
  <br/>

상수는 BIG_SNAKE_CASE로 작성하고 `export const`로 내보냅니다.
의미 있는 이름을 사용하며, 리터럴은 `as const`로 타입을 좁혀 안정성을 확보합니다.

</details>

<details>
  <summary>🛡️ 보안/성능 체크</summary>
  <br/>

민감한 값(API 키/시크릿 등)은 하드코딩하지 않고 환경 변수로 관리합니다.
외부 라이브러리를 추가할 때는 “왜 필요한지”와 “대체 가능성/교체 용이성”을 PR에 남깁니다.
성능 최적화 도구(`memo`, `useMemo`, `useCallback`)는 근거가 있는 곳에만 적용합니다.

</details>

<details>
  <summary>📚 Storybook 규칙</summary>
  <br/>

스토리 파일은 가능한 한 props 변형을 충분히 커버하도록 작성합니다.
주요 variant, disabled/active 상태, edge case 값(빈 값/최대치/최소치 등)을 포함해 컴포넌트 사용 범위를 문서화합니다.

</details>

---

## 🤖 CI / CD

### 🧪 CI (GitHub Actions)

PR이 `develop`, `main`에 올라오면 아래 체크가 자동 수행됩니다.

- `lint`
- `typecheck`
- `test`
- `build`

### 🚀 CD (Vercel)

배포는 **Vercel**로 운영합니다.
(배포 플로우는 팀 정책에 맞게 `develop`/`main` 기준으로 관리합니다.)

---

<div align="center">
<img width="200" alt="image" src="https://github.com/user-attachments/assets/dec0520d-88a7-4caf-8660-77ed40352212" />

**Delta-front Wiki**
_세모 · 나만의 수학 오답노트_

[Home](https://github.com/Central-MakeUs/Delta-front/wiki) · [CI/CD](https://github.com/Central-MakeUs/Delta-front/wiki/CI-CD) · [Convention](https://github.com/Central-MakeUs/Delta-front/wiki/PR-%26-Branch-Strategy) · [Troubleshooting](https://github.com/Central-MakeUs/Delta-front/wiki/Troubleshooting)

</div>
