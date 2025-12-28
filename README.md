# CMC Apps Monorepo

나만의 수학 오답노트 "세모"

## 프로젝트 구조

- `app/` - React Native/Expo 앱
- `web/` - Next.js 웹 애플리케이션

## 사전 요구사항

- Node.js >= 18.0.0
- pnpm >= 9.0.0

## 설치

```bash
pnpm install
```

## 개발

### 웹 애플리케이션 실행
```bash
pnpm web
```

### 앱 실행
```bash
pnpm app
```

## 빌드

### 웹 빌드
```bash
pnpm build:web
```

## 린트

### 웹 린트
```bash
pnpm lint:web
```

### 앱 린트
```bash
pnpm lint:app
```

## 개별 패키지 작업

특정 패키지에서 명령어를 실행하려면:

```bash
# web 폴더에서
pnpm --filter web <command>

# app 폴더에서
pnpm --filter app <command>
```

