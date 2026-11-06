# 이오리 | Portfolio Website (Cyberpunk / Neon Edition)

Business-Minded Developer 포지션을 위한 이오리의 개인 포트폴리오입니다.
딥 매트 블랙 배경에 일렉트릭 그린 · 네온 옐로우 · 핫핑크 포인트 컬러와 글로우 효과,
터미널/코드 블록 스타일 인터페이스를 적용한 사이버펑크 테마입니다.

## Design System

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `--bg` | `#050507` | 딥 매트 블랙 배경 |
| `--neon-green` | `#39FF14` | 주요 액션 · 활성 상태 · 성과 수치 |
| `--neon-yellow` | `#F5FF00` | 보조 강조 · 코드 문자열 · 전략(Strategy) |
| `--neon-pink` | `#FF2D95` | 프롬프트 · 과제(Challenge) · 경고 |
| 폰트 | Orbitron / JetBrains Mono / Noto Sans KR | 디스플레이 / 터미널 / 본문 |

- 네온 테두리 + 코너 브래킷 카드, 글리치 타이포그래피, 스캔라인·그리드 배경
- `prefers-reduced-motion` 지원, 키보드 포커스 링, Skip link

## Features

- Home → About → Skills → Projects → Contact 원페이지 구성, PC·태블릿·모바일 반응형
- **Hero**: 슬로건 + 비즈니스/데이터 역량 키워드 3개(BUSINESS INSIGHT · DATA-DRIVEN · BUILD & SHIP) + 프로필 터미널 + 지표 카운트업
- **Projects**: 모든 프로젝트를 `Challenge → Strategy → Result` 구조로 서술하고 정량 지표 카드 표시
- **Contact**: 터미널 스타일 인터랙티브 컨택트
  - 명령어: `help` `whoami` `email` `phone` `github` `resume` `send` `clear`
  - `send`는 이름 → 이메일 → 제목 → 메시지 → 확인(y/n) 순서의 대화형 전송 플로우
  - ↑/↓ 명령 기록, Tab 자동완성, Ctrl+L 화면 지우기, 빠른 실행 chip 버튼
  - `FORM` 탭으로 일반 입력 폼 전환 가능 (JavaScript 비활성 시 폼이 기본 표시)
- 고정 내비게이션, 타이핑 애니메이션, 스크롤 진행 표시, TOP 버튼, SEO·Open Graph 메타데이터

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript (빌드 의존성 없음)
- Web3Forms (문의 전송) / Netlify (배포)

## Verification

정적 사이트이므로 별도 빌드 과정이 없습니다. 로컬에서는 다음 명령으로 확인할 수 있습니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속 후 내비게이션, 터미널 명령(`help`, `send`), 프로젝트 링크, 반응형 레이아웃을 확인합니다.

## Contact form

터미널 `send`와 `FORM` 탭 모두 `index.html`의 Web3Forms access key와 `https://api.web3forms.com/submit` 엔드포인트를 사용합니다.
이메일 수신처는 Web3Forms에서 해당 키에 연결된 수신처를 따릅니다. 사이트에 표시되는 연락 이메일을
바꾸는 것만으로 Web3Forms 수신처가 변경되지는 않습니다.

- 필수 입력값 검증(터미널은 단계별 검증), 중복 제출 방지, 전송 중·성공·실패 상태 제공
- 입력한 제목을 메일 제목에 반영하고, 발신자의 이메일을 Reply-To로 설정, 전송 채널(`terminal`/`form`) 구분 필드 포함
- 실패 시 재시도와 이메일 직접 연락 링크 제공

## Content notes

- 인적사항: 이오리(여), **한국 오리대학교 경영학과** 학사. 졸업 연월 `2024. 02`, GPA `3.87/4.5`, 주요 이수 과목은 요청에 따라 임의 설정한 값입니다.
- 연락처(`leeori.dev@gmail.com`, `010-1234-5678`)와 배포 URL(`https://leeori.netlify.app/`)은 플레이스홀더입니다. 실제 값으로 교체하세요.
- 프로젝트 Result의 정량 지표(예: 비교 시간 -95%, 중복 0건, CI 검증 100%)는 면접용 서술 구조를 보여주기 위한 **예시 수치**입니다. 실제 측정값으로 반드시 교체하세요.
- 프로젝트 기능·기술 설명은 실제 서비스와 공개 프로젝트 소개 페이지(`https://fsclass-n.github.io/{homepick,nomadpick,picktiming}/`)를 기준으로 작성했습니다.
- `images/portfolio.webp`는 현재 사이트 Hero의 1440×900 헤드리스 캡처(1080×675 리사이즈)입니다. 내용을 바꾸면 다시 캡처해 교체하세요.
