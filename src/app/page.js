// src/app/page.js
import Image from 'next/image';
import heroImage from '@/assets/images/hero_section.jpg';
import gamificationImage from '@/assets/images/game_section.jpg';
import featuresImage from '@/assets/images/ai_section.jpg';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-white mt-16">
            {/* Hero Section */}
            <div className="relative bg-white w-full">
                <div className="w-full h-[70vh]">
                    <div className="flex h-full">
                        {/* 왼쪽 콘텐츠 영역 */}
                        <div className="w-1/2 relative">
                            <div className="absolute inset-0 bg-indigo-600 overflow-hidden">
                                {/* 배경 패턴 */}
                                <BackgroundPattern />

                                {/* 메인 콘텐츠 */}
                                <div className="relative z-10 p-20 h-full flex flex-col justify-center">
                                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                                        <span className="block mb-2">AI와 함께하는</span>
                                        <span className="block text-indigo-200">
                                            즐거운 독서 여행
                                        </span>
                                    </h1>
                                    <p className="mt-8 text-xl leading-8 text-indigo-100">
                                        6-13세 아이들을 위한 맞춤형 독서 플랫폼
                                        <br />
                                        AI가 제안하는 흥미로운 책과 함께
                                        <br />
                                        독서의 즐거움을 발견하세요.
                                    </p>
                                    <div className="mt-12 flex items-center gap-x-8">
                                        <Link href="/signup">
                                            <button className="rounded-full bg-white text-indigo-600 px-10 py-4 text-lg font-medium shadow-sm hover:bg-indigo-50 transition-colors">
                                                무료로 시작하기
                                            </button>
                                        </Link>
                                        <button className="rounded-full px-10 py-4 text-lg font-medium text-white border-2 border-white hover:bg-white/10 transition-colors">
                                            더 알아보기 →
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 오른쪽으로 튀어나가는 부분 */}
                            <div className="absolute right-0 top-0 bottom-0 w-[150px] bg-indigo-600 overflow-hidden">
                                {/* 패턴 연장 */}
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    width="100%"
                                    height="100%"
                                    fill="none"
                                >
                                    <rect
                                        width="100%"
                                        height="100%"
                                        fill="url(#hero-pattern)"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* 오른쪽 이미지 영역 */}
                        <div className="w-1/2 relative">
                            <div
                                className="absolute top-0 bottom-0 left-0 right-[-150px] bg-indigo-600"
                                style={{
                                    clipPath: 'inset(0 0 0 0 round 0 0 0 150px)',
                                }}
                            >
                                {/* 패턴 연장 */}
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    width="100%"
                                    height="100%"
                                    fill="none"
                                >
                                    <rect
                                        width="100%"
                                        height="100%"
                                        fill="url(#hero-pattern)"
                                    />
                                </svg>
                            </div>
                            <div className="relative h-full w-full overflow-hidden">
                                <Image
                                    src={heroImage}
                                    alt="Hero image"
                                    className="h-full w-full object-cover"
                                    style={{
                                        clipPath: 'inset(0 0 0 0 round 0 0 0 150px)',
                                    }}
                                    fill
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="relative overflow-hidden py-24">
                {/* 배경 이미지 */}
                <div className="absolute inset-0">
                    <Image
                        src={featuresImage}
                        alt="Features background"
                        fill
                        className="object-cover object-center"
                        style={{ opacity: 0.5 }}
                    />
                </div>

                {/* 컨텐츠 */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="text-indigo-600 font-semibold">
                AI 독서 도우미
                        </span>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                AI 기술로 더 스마트해진 독서 경험
                        </h2>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="text-indigo-600 mb-4 text-4xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-4 text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gamification Section */}
            <section className="relative overflow-hidden py-24">
                {/* 배경 이미지 */}
                <div className="absolute inset-0">
                    <Image
                        src={gamificationImage}
                        alt="Features background"
                        fill
                        className="object-cover object-center"
                        style={{ opacity: 0.5 }}
                    />
                </div>

                {/* 컨텐츠 */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="text-indigo-600 font-semibold">
                즐거운 독서 경험
                        </span>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                독서가 게임처럼 재미있어요
                        </h2>
                    </div>
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {gamificationFeatures.map((feature) => (
                            <div
                                key={feature.title}
                                className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                                <p className="mt-2 text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden bg-indigo-600 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            지금 바로 시작하세요
                        </h2>
                        <p className="mt-4 text-lg text-indigo-100">
                            14일 무료 체험으로 Story Nest의 모든 기능을 경험해보세요
                        </p>
                        <Link href="/signup">
                            <button className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50">
                                무료 체험 시작하기
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

const features = [
    {
        title: 'AI 기반 독해력 진단',
        description: '정확한 읽기 수준 분석으로 최적의 학습 경로를 제시합니다.',
        icon: '🤖'
    },
    {
        title: '맞춤형 도서 추천',
        description: 'AI가 아이의 관심사와 수준에 맞는 최적의 도서를 추천해드려요.',
        icon: '📚'
    },
    {
        title: '자동 퀴즈 생성',
        description: 'AI가 읽은 내용을 바탕으로 재미있는 이해력 퀴즈를 만들어줍니다.',
        icon: '✍️'
    }
];

const gamificationFeatures = [
    {
        title: '독서 챌린지',
        description: '매일매일 새로운 독서 목표에 도전해보세요',
        icon: '🎯'
    },
    {
        title: '연속 독서 스트릭',
        description: '매일 조금씩 읽으면 특별한 보상이 기다려요',
        icon: '🔥'
    },
    {
        title: '레벨과 배지',
        description: '독서왕으로 성장하는 나만의 여정',
        icon: '⭐'
    },
    {
        title: '독서 통계',
        description: '한눈에 보는 나의 독서 기록',
        icon: '📊'
    }
];

{/* Hero Section 배경 패턴 부분 수정 - 랜덤 생성 */}
const BackgroundPattern = () => {
    // 아이콘 종류 배열
    const icons = ['book', 'search', 'star', 'phone', 'question'];
    // 아이콘 50개 생성을 위한 배열
    const iconInstances = Array.from({ length: 50 });

    return (
        <svg
            className="absolute inset-0 w-full h-full"
            width="100%"
            height="100%"
            fill="none"
        >
            <defs>
                {/* 책 아이콘 */}
                <symbol id="book" viewBox="0 0 40 40">
                    <path
                        d="M8 8h24v30H8z M8 12h24 M8 16h24"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeOpacity="0.2"
                    />
                </symbol>

                {/* 돋보기 아이콘 */}
                <symbol id="search" viewBox="0 0 40 40">
                    <circle
                        cx="16"
                        cy="16"
                        r="12"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeOpacity="0.2"
                    />
                    <line
                        x1="25"
                        y1="25"
                        x2="35"
                        y2="35"
                        stroke="white"
                        strokeWidth="2"
                        strokeOpacity="0.2"
                    />
                </symbol>

                {/* 핸드폰 아이콘 */}
                <symbol id="phone" viewBox="0 0 40 40">
                    <rect
                        x="12"
                        y="4"
                        width="16"
                        height="32"
                        rx="3"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeOpacity="0.2"
                    />
                    <line
                        x1="16"
                        y1="30"
                        x2="24"
                        y2="30"
                        stroke="white"
                        strokeWidth="2"
                        strokeOpacity="0.2"
                    />
                </symbol>

                {/* 별 아이콘 */}
                <symbol id="star" viewBox="0 0 40 40">
                    <path
                        d="M20 4l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z"
                        fill="white"
                        fillOpacity="0.2"
                    />
                </symbol>

                {/* 물음표 아이콘 */}
                <symbol id="question" viewBox="0 0 40 40">
                    <path
                        d="M12 12a8 8 0 1 1 16 0c0 4-6 6-6 10m6 6h0"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                        strokeOpacity="0.2"
                    />
                    <circle
                        cx="20"
                        cy="32"
                        r="1"
                        fill="white"
                        fillOpacity="0.2"
                    />
                </symbol>
            </defs>

            {/* 랜덤하게 아이콘 생성 */}
            {iconInstances.map((_, index) => {
                // 랜덤 위치 생성 (5% ~ 95%)
                const x = Math.floor(Math.random() * 90 + 5);
                const y = Math.floor(Math.random() * 90 + 5);
                // 랜덤 크기 생성 (40 ~ 60)
                const size = Math.floor(Math.random() * 20 + 40);
                // 랜덤 아이콘 선택
                const iconType = icons[Math.floor(Math.random() * icons.length)];

                return (
                    <use
                        key={index}
                        href={`#${iconType}`}
                        x={`${x}%`}
                        y={`${y}%`}
                        width={size}
                        height={size}
                    />
                );
            })}

            {/* 랜덤한 작은 점들 생성 */}
            {Array.from({ length: 30 }).map((_, index) => {
                const x = Math.floor(Math.random() * 100);
                const y = Math.floor(Math.random() * 100);

                return (
                    <circle
                        key={`dot-${index}`}
                        cx={`${x}%`}
                        cy={`${y}%`}
                        r="1"
                        fill="white"
                        fillOpacity="0.1"
                    />
                );
            })}
        </svg>
    );
};
