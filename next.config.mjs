/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
    // 1. React Strict Mode 활성화 (개발 중 엄격한 검사)
    reactStrictMode: true,

    // 2. SWC Minify 활성화 (더 빠른 빌드와 코드 크기 축소)
    swcMinify: true,

    // 3. 이미지 최적화 (외부 도메인에서 가져오는 이미지 허용)
    images: {
        domains: ["example.com"], // 외부 도메인 사용 시 해당 도메인 추가
        formats: ["image/avif", "image/webp"], // 최신 이미지 포맷 지원
    },

    // 4. 국제화 (i18n) 설정 - 다국어 지원 필요할 경우
    i18n: {
        locales: ["en", "ko"], // 지원 언어 목록
        defaultLocale: "ko", // 기본 언어
    },

    // 5. 환경 변수 설정 (서버/클라이언트에서 사용될 변수)
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
    },

    // 6. 웹팩(Webpack) 설정 커스터마이징 (필요 시)
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = { fs: false }; // 클라이언트에서 fs 모듈 오류 방지
        }
        return config;
    },
};

export default nextConfig;
