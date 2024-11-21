// src/components/dashboard/RecommendedBooks.js
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import cover1 from '@/assets/images/ai_section.jpg';
import cover2 from '@/assets/images/game_section.jpg';
import cover3 from '@/assets/images/hero_section.jpg';
import cover4 from '@/assets/images/ai_section.jpg';
import cover5 from '@/assets/images/game_section.jpg';

// 카테고리 데이터
const categories = [
    { id: 'all', name: '전체' },
    { id: 'recommended', name: '맞춤 추천' },
    { id: 'popular', name: '인기 도서' },
    { id: 'new', name: '신간 도서' },
    { id: 'level', name: '수준별' },
];

// 태그 데이터
const tags = [
    '전체',
    '판타지',
    '과학',
    '역사',
    '예술',
    '철학',
    '문학',
    '사회',
    '기술',
];

// 테스트용 도서 데이터
const books = [
    // 판타지
    {
        id: 1,
        title: '드래곤의 숨결',
        author: '마법사',
        coverImage: cover1,
        rating: 4.8,
        reviewCount: 235,
        level: '중급',
        tags: ['판타지', '모험'],
        description: '마법 세계를 탐험하는 소년의 이야기',
        category: 'recommended',
        pages: 320,
        estimatedTime: '약 6시간',
        fullDescription: '마법 세계에서 펼쳐지는 흥미진진한 모험. 주인공은 드래곤과 교감하는 특별한 능력을 가지고 있습니다. 그의 운명적인 여정이 시작됩니다...',
        learningPoints: [
            '상상력 향상',
            '문제 해결 능력 개발',
            '도덕적 가치관 형성',
            '창의적 사고력 증진'
        ],
        recommendations: [
            '판타지를 좋아하는 독자',
            '모험을 즐기는 독자',
            '상상력이 풍부한 독자',
            '새로운 세계를 탐험하고 싶은 독자'
        ],
        preview: {
            chapter1: '제1장: 드래곤의 부름',
            excerpt: '그날 아침, 하늘에서 들려온 신비로운 소리는 모든 것을 바꾸어 놓았다. 마을 사람들은 모두 귀를 막았지만, 나는 그 소리가 아름답게 들렸다. 마치 오래된 친구의 목소리처럼...'
        },
        relatedBooks: [
            {
                id: 101,
                title: '마법사의 시간',
                coverImage: cover2,
                rating: 4.5
            },
            {
                id: 102,
                title: '용의 기사',
                coverImage: cover3,
                rating: 4.7
            }
        ],
        reviews: [
            {
                user: '판타지러버',
                rating: 5,
                date: '2024-01-15',
                comment: '정말 흥미진진한 스토리였어요! 드래곤과 주인공의 교감이 감동적이었습니다.'
            },
            {
                user: '책벌레',
                rating: 4,
                date: '2024-01-10',
                comment: '상상력이 풍부한 작품이에요. 아이들의 창의력 발달에 좋을 것 같아요.'
            }
        ],
        progress: {
            totalReaders: 1500,
            avgReadTime: '5.5시간',
            completionRate: '85%',
            difficulty: '보통'
        }
    },

    // 과학
    {
        id: 2,
        title: '별들의 과학',
        author: '김우주',
        coverImage: cover2,
        rating: 4.7,
        reviewCount: 189,
        level: '초급',
        tags: ['과학', '우주', '천문학'],
        description: '쉽게 배우는 천문학의 기초',
        category: 'science',
        pages: 250,
        estimatedTime: '약 5시간',
        fullDescription: '우주의 신비를 알기 쉽게 설명한 과학 도서. 별자리부터 블랙홀까지, 천문학의 기초 지식을 재미있게 배울 수 있습니다.',
        learningPoints: [
            '기초 천문학 이해',
            '과학적 사고력 향상',
            '우주에 대한 호기심 개발',
            '관찰력 증진'
        ],
        recommendations: [
            '과학에 관심 있는 독자',
            '우주를 좋아하는 독자',
            '호기심 많은 독자',
            '천문학을 배우고 싶은 독자'
        ],
        preview: {
            chapter1: '제1장: 우리의 태양계',
            excerpt: '태양계는 우리의 거대한 우주 이웃입니다. 태양을 중심으로 8개의 행성이 공전하고 있죠. 각각의 행성은 독특한 특징을 가지고 있어요...'
        },
        relatedBooks: [
            {
                id: 201,
                title: '우주 탐험',
                coverImage: cover3,
                rating: 4.6
            },
            {
                id: 202,
                title: '행성의 비밀',
                coverImage: cover4,
                rating: 4.4
            }
        ],
        reviews: [
            {
                user: '과학소년',
                rating: 5,
                date: '2024-01-12',
                comment: '어려운 천문학 개념을 쉽게 설명해줘서 좋았어요!'
            },
            {
                user: '호기심맨',
                rating: 4,
                date: '2024-01-08',
                comment: '사진이 많아서 이해하기 쉬웠습니다.'
            }
        ],
        progress: {
            totalReaders: 1200,
            avgReadTime: '4.5시간',
            completionRate: '90%',
            difficulty: '쉬움'
        }
    },

    // 역사
    {
        id: 3,
        title: '조선의 하루',
        author: '이역사',
        coverImage: cover3,
        rating: 4.6,
        reviewCount: 167,
        level: '중급',
        tags: ['역사', '조선시대', '문화'],
        description: '조선시대 사람들의 일상생활',
        category: 'history',
        pages: 280,
        estimatedTime: '약 5.5시간',
        fullDescription: '조선시대 사람들은 어떻게 살았을까요? 의식주부터 놀이, 교육까지 생생한 조선의 일상을 만나보세요.',
        learningPoints: [
            '역사적 사고력 향상',
            '문화 이해력 증진',
            '시대 상황 파악',
            '전통문화 이해'
        ],
        recommendations: [
            '역사에 관심 있는 독자',
            '전통문화를 알고 싶은 독자',
            '한국사를 공부하는 독자',
            '문화 탐구를 좋아하는 독자'
        ],
        preview: {
            chapter1: '제1장: 조선 사람들의 아침',
            excerpt: '닭이 울면 일어나 하루를 시작하는 조선 사람들. 양반과 평민의 아침은 어떻게 달랐을까요?'
        },
        relatedBooks: [
            {
                id: 301,
                title: '조선의 교육',
                coverImage: cover4,
                rating: 4.3
            },
            {
                id: 302,
                title: '왕실의 하루',
                coverImage: cover5,
                rating: 4.8
            }
        ],
        reviews: [
            {
                user: '역사덕후',
                rating: 5,
                date: '2024-01-14',
                comment: '상세한 설명과 그림이 매우 좋았어요'
            },
            {
                user: '문화인',
                rating: 4,
                date: '2024-01-07',
                comment: '우리 문화를 이해하는데 큰 도움이 되었습니다'
            }
        ],
        progress: {
            totalReaders: 980,
            avgReadTime: '5시간',
            completionRate: '82%',
            difficulty: '보통'
        }
    },

    // 예술
    {
        id: 4,
        title: '색채의 마법',
        author: '박예술',
        coverImage: cover4,
        rating: 4.9,
        reviewCount: 142,
        level: '초급',
        tags: ['예술', '미술', '색채학'],
        description: '어린이를 위한 색채 이론 입문',
        category: 'art',
        pages: 200,
        estimatedTime: '약 4시간',
        fullDescription: '색은 우리의 감정과 생각을 어떻게 표현할까요? 기본적인 색채 이론부터 감정 표현까지, 색채의 마법 같은 세계를 탐험해보세요.',
        learningPoints: [
            '색채 감각 발달',
            '예술적 표현력 향상',
            '감정 표현력 증진',
            '창의력 개발'
        ],
        recommendations: [
            '미술을 좋아하는 독자',
            '색채에 관심 있는 독자',
            '창작 활동을 하는 독자',
            '감성적인 표현을 배우고 싶은 독자'
        ],
        preview: {
            chapter1: '제1장: 색의 세계로',
            excerpt: '빨강, 파랑, 노랑... 이 세상의 모든 색은 이 세 가지 색에서 시작됩니다. 마법 같은 색의 세계로 떠나볼까요?'
        },
        relatedBooks: [
            {
                id: 401,
                title: '미술의 기초',
                coverImage: cover5,
                rating: 4.5
            },
            {
                id: 402,
                title: '창의적 드로잉',
                coverImage: cover1,
                rating: 4.6
            }
        ],
        reviews: [
            {
                user: '아트러버',
                rating: 5,
                date: '2024-01-13',
                comment: '색에 대해 이렇게 재미있게 설명한 책은 처음이에요!'
            },
            {
                user: '꼬마화가',
                rating: 5,
                date: '2024-01-05',
                comment: '그림 그릴 때 많은 도움이 되고 있어요'
            }
        ],
        progress: {
            totalReaders: 750,
            avgReadTime: '3.8시간',
            completionRate: '95%',
            difficulty: '쉬움'
        }
    },

    // 철학
    {
        id: 5,
        title: '생각하는 방법',
        author: '최사유',
        coverImage: cover5,
        rating: 4.5,
        reviewCount: 156,
        level: '중급',
        tags: ['철학', '사고력', '논리'],
        description: '어린이를 위한 철학 입문서',
        category: 'philosophy',
        pages: 230,
        estimatedTime: '약 5시간',
        fullDescription: '왜? 라는 질문으로 시작하는 철학의 세계. 어린이들의 눈높이에 맞춘 재미있는 철학 이야기를 통해 생각하는 힘을 키워보세요.',
        learningPoints: [
            '논리적 사고력 향상',
            '비판적 사고 능력 개발',
            '문제 해결력 증진',
            '윤리적 판단력 향상'
        ],
        recommendations: [
            '철학에 관심 있는 독자',
            '생각하기를 좋아하는 독자',
            '지혜를 찾는 독자',
            '논리력을 키우고 싶은 독자'
        ],
        preview: {
            chapter1: '제1장: 질문하는 방법',
            excerpt: '\'왜?\'라고 물었을 때, 우리는 새로운 세계를 발견할 수 있어요. 소크라테스도 이렇게 질문하면서 시작했답니다...'
        },
        relatedBooks: [
            {
                id: 501,
                title: '어린이 논리',
                coverImage: cover1,
                rating: 4.4
            },
            {
                id: 502,
                title: '철학자의 질문',
                coverImage: cover2,
                rating: 4.7
            }
        ],
        reviews: [
            {
                user: '생각이',
                rating: 5,
                date: '2024-01-11',
                comment: '아이와 함께 읽으며 많은 대화를 나눌 수 있었어요'
            },
            {
                user: '철학도',
                rating: 4,
                date: '2024-01-03',
                comment: '어려운 개념을 쉽게 설명해줘서 좋았습니다'
            }
        ],
        progress: {
            totalReaders: 890,
            avgReadTime: '4.7시간',
            completionRate: '78%',
            difficulty: '보통'
        }
    },

    {
        id: 6,
        title: '코딩의 시작',
        author: '김개발',
        coverImage: cover1,  // 이미지는 적절히 순환해서 사용
        rating: 4.7,
        reviewCount: 178,
        level: '초급',
        tags: ['프로그래밍', '컴퓨터', '기술'],
        description: '어린이를 위한 코딩 첫걸음',
        category: 'technology',
        pages: 240,
        estimatedTime: '약 5시간',
        fullDescription: '블록 코딩부터 시작하는 쉽고 재미있는 코딩 입문서. 게임을 만들면서 배우는 프로그래밍의 기초.',
        learningPoints: [
            '논리적 사고력 향상',
            '문제 해결 능력 개발',
            '컴퓨터 과학 기초 이해',
            '창의적 프로그래밍 능력'
        ],
        recommendations: [
            '코딩에 관심 있는 독자',
            '게임 만들기를 좋아하는 독자',
            '컴퓨터를 좋아하는 독자',
            '미래 프로그래머'
        ],
        preview: {
            chapter1: '제1장: 코딩이란?',
            excerpt: '코딩은 컴퓨터와 대화하는 방법이에요. 우리가 사용하는 모든 프로그램과 게임은 코딩으로 만들어졌답니다...'
        },
        relatedBooks: [
            {
                id: 601,
                title: '파이썬 첫걸음',
                coverImage: cover2,
                rating: 4.6
            },
            {
                id: 602,
                title: '게임 만들기',
                coverImage: cover3,
                rating: 4.8
            }
        ],
        reviews: [
            {
                user: '코딩초보',
                rating: 5,
                date: '2024-01-16',
                comment: '어려울 줄 알았는데 너무 재미있어요!'
            },
            {
                user: '테크맘',
                rating: 4,
                date: '2024-01-09',
                comment: '아이와 함께 시작하기 좋은 책이에요'
            }
        ],
        progress: {
            totalReaders: 920,
            avgReadTime: '4.8시간',
            completionRate: '88%',
            difficulty: '쉬움'
        }
    },

    {
        id: 7,
        title: '동물들의 세계',
        author: '박자연',
        coverImage: cover2,
        rating: 4.8,
        reviewCount: 203,
        level: '초급',
        tags: ['과학', '생물', '동물'],
        description: '지구의 다양한 동물들을 만나보세요',
        category: 'science',
        pages: 260,
        estimatedTime: '약 4.5시간',
        fullDescription: '육지, 하늘, 바다에 사는 다양한 동물들의 특징과 생활을 알아보는 자연 과학 도서. 실제 사진과 재미있는 일러스트로 가득합니다.',
        learningPoints: [
            '생태계 이해',
            '동물 습성 학습',
            '환경 보호 의식 함양',
            '생명 존중 태도'
        ],
        recommendations: [
            '동물을 좋아하는 독자',
            '자연에 관심 있는 독자',
            '과학을 좋아하는 독자',
            '환경 보호에 관심 있는 독자'
        ],
        preview: {
            chapter1: '제1장: 아프리카의 동물들',
            excerpt: '광활한 사바나에는 수많은 동물들이 살고 있어요. 사자는 동물의 왕이라고 불리지만, 실제로는 암사자가 사냥을 한답니다...'
        },
        relatedBooks: [
            {
                id: 701,
                title: '해양 생물의 세계',
                coverImage: cover3,
                rating: 4.7
            },
            {
                id: 702,
                title: '공룡의 시대',
                coverImage: cover4,
                rating: 4.9
            }
        ],
        reviews: [
            {
                user: '동물친구',
                rating: 5,
                date: '2024-01-17',
                comment: '실제 사진이 많아서 좋았어요!'
            },
            {
                user: '초등맘',
                rating: 5,
                date: '2024-01-14',
                comment: '아이가 매일 밤 읽자고 조르네요'
            }
        ],
        progress: {
            totalReaders: 1100,
            avgReadTime: '4.2시간',
            completionRate: '92%',
            difficulty: '쉬움'
        }
    },

    {
        id: 8,
        title: '세계 음식 여행',
        author: '최맛남',
        coverImage: cover3,
        rating: 4.6,
        reviewCount: 167,
        level: '중급',
        tags: ['문화', '요리', '세계'],
        description: '세계 각국의 맛있는 음식 이야기',
        category: 'culture',
        pages: 220,
        estimatedTime: '약 4시간',
        fullDescription: '세계 각국의 대표 음식과 식문화를 소개하는 책. 음식에 담긴 역사와 문화적 의미를 재미있게 설명합니다.',
        learningPoints: [
            '세계 문화 이해',
            '식문화 학습',
            '지리 지식 습득',
            '다문화 감수성 향상'
        ],
        recommendations: [
            '요리에 관심 있는 독자',
            '세계 문화를 알고 싶은 독자',
            '여행을 좋아하는 독자',
            '새로운 것을 좋아하는 독자'
        ],
        preview: {
            chapter1: '제1장: 이탈리아의 맛',
            excerpt: '피자와 파스타로 유명한 이탈리아. 하지만 이탈리아 음식은 그것뿐만이 아니에요. 각 지역마다 특색 있는 요리가 있답니다...'
        },
        relatedBooks: [
            {
                id: 801,
                title: '세계의 축제',
                coverImage: cover4,
                rating: 4.5
            },
            {
                id: 802,
                title: '전통 음식 이야기',
                coverImage: cover5,
                rating: 4.7
            }
        ],
        reviews: [
            {
                user: '먹방왕',
                rating: 5,
                date: '2024-01-18',
                comment: '다른 나라의 음식이 이렇게 재미있는 줄 몰랐어요'
            },
            {
                user: '여행러버',
                rating: 4,
                date: '2024-01-15',
                comment: '음식을 통해 세계 여행을 하는 것 같았어요'
            }
        ],
        progress: {
            totalReaders: 850,
            avgReadTime: '3.9시간',
            completionRate: '87%',
            difficulty: '보통'
        }
    }
];

// BookDetailModal 컴포넌트
function BookDetailModal({
    book,
    onClose,
    onPrevBook,
    onNextBook,
    hasPrevBook,
    hasNextBook,
}) {
    const [activeTab, setActiveTab] = useState('info'); // 'info', 'preview', 'reviews', 'stats'

    // 화살표 키 이벤트 처리
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' && hasPrevBook) {
                onPrevBook();
            } else if (e.key === 'ArrowRight' && hasNextBook) {
                onNextBook();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [hasPrevBook, hasNextBook, onPrevBook, onNextBook, onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-2xl w-full max-w-5xl m-4 shadow-xl overflow-hidden">
                {/* x 버튼 추가 */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-50 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                >
                    <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row max-h-[90vh]">
                    {/* 왼쪽: 책 커버 및 기본 정보 */}
                    <div className="w-full md:w-1/3 p-8 bg-gray-50">
                        <div className="sticky top-8">
                            <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src={book.coverImage}
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="mt-6 space-y-4">
                                {/* 기본 정보는 이전과 동일 */}
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">난이도</span>
                                    <span className="font-medium text-indigo-600">
                                        {book.level}
                                    </span>
                                </div>
                                {/* ... 다른 기본 정보들 ... */}

                                {/* 소셜 공유 버튼 추가 */}
                                <div className="pt-4 border-t">
                                    <p className="text-sm text-gray-500 mb-3">이 책 공유하기</p>
                                    <ShareButtons book={book} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽: 탭 컨텐츠 */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* 탭 네비게이션 */}
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px">
                                {[
                                    { id: 'info', name: '책 정보' },
                                    { id: 'preview', name: '미리보기' },
                                    { id: 'reviews', name: '독자 리뷰' },
                                    { id: 'stats', name: '학습 통계' },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                      py-4 px-6 font-medium text-sm border-b-2 
                      ${
                                    activeTab === tab.id
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }
                    `}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* 탭 컨텐츠 */}
                        <div className="flex-1 overflow-y-auto p-8">
                            {/* 책 정보 탭 */}
                            {activeTab === 'info' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {book.title}
                                        </h3>
                                        <p className="text-gray-500 mt-1">{book.author}</p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {book.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      책 소개
                                        </h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {book.fullDescription || book.description}
                                        </p>
                                    </div>

                                    {/* 학습 포인트 */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      학습 포인트
                                        </h4>
                                        <ul className="space-y-2">
                                            {book.learningPoints.map((point, index) => (
                                                <li key={index} className="flex items-start">
                                                    <svg
                                                        className="w-5 h-5 text-indigo-600 mr-2 mt-0.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* 연관 도서 */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      연관 도서
                                        </h4>
                                        <RelatedBooks books={book.relatedBooks} />
                                    </div>
                                </div>
                            )}

                            {/* 미리보기 탭 */}
                            {activeTab === 'preview' && (
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    책 미리보기
                                    </h4>
                                    <BookPreview preview={book.preview} />
                                </div>
                            )}

                            {/* 리뷰 탭 */}
                            {activeTab === 'reviews' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="text-lg font-semibold text-gray-900">
                      독자 리뷰
                                        </h4>
                                        <button className="text-sm text-indigo-600 hover:text-indigo-500">
                      리뷰 작성하기
                                        </button>
                                    </div>
                                    <BookReviews reviews={book.reviews} />
                                </div>
                            )}

                            {/* 통계 탭 */}
                            {activeTab === 'stats' && (
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    학습 통계
                                    </h4>
                                    <LearningStats progress={book.progress} />
                                </div>
                            )}
                        </div>

                        {/* 하단 버튼 */}
                        <div className="p-6 border-t bg-white">
                            <div className="flex gap-4">
                                <button
                                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition-colors font-medium"
                                    onClick={() => {
                                        /* 읽기 시작 로직 */
                                    }}
                                >
                  읽기 시작하기
                                </button>
                                <button
                                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    onClick={() => router.push(`/books/${book.id}`)}
                                >
                  상세페이지로 이동
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 도서 카드 컴포넌트
// BookCard 컴포넌트 수정
function BookCard({ book, onClick }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    };

    // 상세 페이지로 이동하는 핸들러
    const handleBookDetail = (e) => {
        e.stopPropagation();
        router.push(`/books/${book.id}`);
    };

    return (
        <div className="group relative cursor-pointer" onClick={onClick}>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                />
                {/* 호버 시 나타나는 오버레이 */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div>
                        <h3 className="text-white font-semibold">{book.title}</h3>
                        <p className="text-gray-300 text-sm">{book.author}</p>
                        <div className="flex items-center mt-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < Math.floor(book.rating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-400'
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-1 text-white text-sm">{book.rating}</span>
                            </div>
                            <span className="text-gray-300 text-sm ml-2">
                ({book.reviewCount})
                            </span>
                        </div>
                    </div>

                    {/* 상세보기 버튼 추가 */}
                    <button
                        onClick={handleBookDetail}
                        className="mt-4 w-full bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                    >
            상세보기
                    </button>
                </div>
            </div>
        </div>
    );
}

// 미리보기 컴포넌트
function BookPreview({ preview }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">{preview.chapter1}</h5>
            <p className="text-sm text-gray-600 line-clamp-3">
                {preview.excerpt}
            </p>
            {preview.excerpt.length > 150 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-indigo-600 text-sm mt-2 hover:text-indigo-500"
                >
                    {isExpanded ? '접기' : '더 보기'}
                </button>
            )}
        </div>
    );
}

// 연관 도서 컴포넌트
function RelatedBooks({ books }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative">
            <div className="flex items-center">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div
                    ref={scrollRef}
                    className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-8"
                >
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="flex-shrink-0 w-32 cursor-pointer hover:opacity-75 transition-opacity"
                        >
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={book.coverImage}
                                    alt={book.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="mt-2 text-sm font-medium text-gray-900 truncate">
                                {book.title}
                            </p>
                            <div className="flex items-center mt-1">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

// 독자 리뷰 컴포넌트
function BookReviews({ reviews }) {
    return (
        <div className="space-y-4">
            {reviews.map((review, index) => (
                <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-indigo-600 font-medium">
                                    {review.user.charAt(0)}
                                </span>
                            </div>
                            <span className="ml-2 font-medium text-gray-900">{review.user}</span>
                        </div>
                        <div className="flex items-center">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}

// 학습 진도 통계 컴포넌트
function LearningStats({ progress }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">총 독자 수</div>
                <div className="text-xl font-semibold text-gray-900">
                    {progress.totalReaders.toLocaleString()}명
                </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">평균 학습 시간</div>
                <div className="text-xl font-semibold text-gray-900">
                    {progress.avgReadTime}
                </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">완독률</div>
                <div className="text-xl font-semibold text-gray-900">
                    {progress.completionRate}
                </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">난이도</div>
                <div className="text-xl font-semibold text-gray-900">
                    {progress.difficulty}
                </div>
            </div>
        </div>
    );
}

// 소셜 공유 컴포넌트
function ShareButtons({ book }) {
    const shareUrl = `https://yoursite.com/books/${book.id}`;
    const shareText = `${book.title} - ${book.description}`;

    const shareHandlers = {
        twitter: () => {
            window.open(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            );
        },
        facebook: () => {
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            );
        },
        kakao: () => {
            // Kakao SDK 필요
            console.log('Kakao share');
        },
    };

    return (
        <div className="flex space-x-4">
            <button
                onClick={shareHandlers.twitter}
                className="p-2 rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-90"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            </button>
            <button
                onClick={shareHandlers.facebook}
                className="p-2 rounded-full bg-[#1877F2] text-white hover:bg-opacity-90"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            </button>
            <button
                onClick={shareHandlers.kakao}
                className="p-2 rounded-full bg-[#FAE100] text-black hover:bg-opacity-90"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.501.265-.974-.243-.718-.768l1.896-4.985C3.415 14.59 1.5 11.638 1.5 8.785 1.5 4.264 6.201.6 12 .6" />
                </svg>
            </button>
        </div>
    );
}

// 메인 컴포넌트
export default function RecommendedBooks() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('전체');
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedBookIndex, setSelectedBookIndex] = useState(null);

    // 카테고리와 태그에 따라 필터링된 도서 목록
    const filteredBooks = books.filter(
        (book) =>
            (selectedCategory === 'all' || book.category === selectedCategory) &&
            (selectedTag === '전체' || book.tags.includes(selectedTag)),
    );

    const handleBookClick = (book) => {
        const index = books.findIndex(b => b.id === book.id);
        setSelectedBook(book);
        setSelectedBookIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
        setSelectedBookIndex(null);
    };

    const handlePrevBook = () => {
        if (selectedBookIndex > 0) {
            const prevIndex = selectedBookIndex - 1;
            setSelectedBookIndex(prevIndex);
            setSelectedBook(books[prevIndex]);
        }
    };

    const handleNextBook = () => {
        if (selectedBookIndex < books.length - 1) {
            const nextIndex = selectedBookIndex + 1;
            setSelectedBookIndex(nextIndex);
            setSelectedBook(books[nextIndex]);
        }
    };

    return (
        <section className="bg-white pt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 섹션 헤더 */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900">추천 도서</h2>
                        <p className="mt-3 text-xl font-semibold text-gray-600">
                            AI가 당신의 관심사와 수준에 맞춰 추천해드립니다
                        </p>
                    </div>
                </div>

                {/* 카테고리 네비게이션 */}
                <nav className="flex space-x-4 mb-8 pb-4 border-b">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${selectedCategory === category.id
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </nav>

                {/* 태그 필터 */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors
                                ${selectedTag === tag
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* 도서 그리드 */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onClick={() => handleBookClick(book)}
                        />
                    ))}
                </div>
            </div>

            {/* 책 상세 모달 */}
            {selectedBook && (
                <BookDetailModal
                    book={selectedBook}
                    onClose={handleCloseModal}
                    onPrevBook={handlePrevBook}
                    onNextBook={handleNextBook}
                    hasPrevBook={selectedBookIndex > 0}
                    hasNextBook={selectedBookIndex < books.length - 1}
                />
            )}
        </section>
    );
}
