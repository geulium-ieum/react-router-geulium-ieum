# Geulium-ieum (그리움 이음)
온라인 추모 및 가족 그룹 관리 서비스
## 개요
그리움 이음은 고인을 추모하는 공간을 생성하고, 가족 단위의 그룹을 통해 추억을 공유하며 소통할 수 있는 플랫폼을 제공합니다. 사용자는 온라인 추모관을 통해 헌화, 방명록, 앨범 등 다양한 방식으로 고인을 기릴 수 있습니다.
## 기술 스택
- 언어: TypeScript
- 프레임워크: React Router (구 Remix), Tailwind CSS
- 디자인: Shadcn/UI

.env 값
- VITE_API_URL=API 주소
- VITE_SECRET_KEY="gisecrets"
- VITE_NAVER_CLIENT_ID=네이버 클라이언트 ID
- VITE_KAKAO_CLIENT_ID=카카오 클라이언트 ID
- VITE_NAVER_CALLBACK_URL="http://localhost:5173/auth/naver/login"
- VITE_NAVER_AUTH_REDIRECT_URI="http://localhost:5173/auth/naver/login"
- VITE_KAKAO_AUTH_REDIRECT_URI="http://localhost:5173/auth/kakao/login"