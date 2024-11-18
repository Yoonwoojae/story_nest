// src/components/dashboard/RecentBooks.js
'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { formatDate } from '@/utils/date';
import '@/styles/scrollbar.css';
import harryPotterCover1 from '@/assets/images/ai_section.jpg';
import harryPotterCover2 from '@/assets/images/game_section.jpg';
import harryPotterCover3 from '@/assets/images/hero_section.jpg';

// 테스트용 데이터
const recentBooks = [
    {
        id: 1,
        title: '해리포터와 마법사의 돌',
        cover: harryPotterCover1,
        progress: 80,
        lastRead: '2024-01-15',
        currentPage: 245,
        totalPages: 300,
        description: '마법사의 돌을 찾아 떠나는 해리포터의 모험...',
        readingTime: 180, // minutes
        genre: '판타지',
        level: '중급',
    },
    {
        id: 2,
        title: '해리포터와 비밀의 방',
        cover: harryPotterCover2,
        progress: 40,
        lastRead: '2024-01-15',
        currentPage: 245,
        totalPages: 300,
        description: '마법사의 돌을 찾아 떠나는 해리포터의 모험...',
        readingTime: 180, // minutes
        genre: '판타지',
        level: '중급',
    },
    {
        id: 3,
        title: '해리포터와 아즈카반의 죄수',
        cover: harryPotterCover3,
        progress: 55,
        lastRead: '2024-01-15',
        currentPage: 245,
        totalPages: 300,
        description: '마법사의 돌을 찾아 떠나는 해리포터의 모험...',
        readingTime: 180, // minutes
        genre: '판타지',
        level: '중급',
    },
    {
        id: 4,
        title: '해리포터와 아즈카반의 죄수',
        cover: harryPotterCover3,
        progress: 55,
        lastRead: '2024-01-15',
        currentPage: 245,
        totalPages: 300,
        description: '마법사의 돌을 찾아 떠나는 해리포터의 모험...',
        readingTime: 180, // minutes
        genre: '판타지',
        level: '중급',
    },
    {
        id: 5,
        title: '해리포터와 아즈카반의 죄수',
        cover: harryPotterCover3,
        progress: 55,
        lastRead: '2024-01-15',
        currentPage: 245,
        totalPages: 300,
        description: '마법사의 돌을 찾아 떠나는 해리포터의 모험...',
        readingTime: 180, // minutes
        genre: '판타지',
        level: '중급',
    },
    {
        id: 6,
        title: '해리포터와 아즈카반의 죄수',
        cover: harryPotterCover3,
        progress: 55,
        lastRead: '2024-01-15',
        currentPage: 245,
        totalPages: 300,
        description: '마법사의 돌을 찾아 떠나는 해리포터의 모험...',
        readingTime: 180, // minutes
        genre: '판타지',
        level: '중급',
    },
    {
        id: 7,
        title: '해리포터와 아즈카반의 죄수',
        cover: harryPotterCover3,
        progress: 55,
        lastRead: '2024-01-15',
        currentPage: 245,
        totalPages: 300,
        description: '마법사의 돌을 찾아 떠나는 해리포터의 모험...',
        readingTime: 180, // minutes
        genre: '판타지',
        level: '중급',
    },
    // ... 더 많은 책 데이터
];

function RecentBookCard({ book }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative group p-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`
       relative w-60 h-80 rounded-lg overflow-hidden shadow-lg
       transition-all duration-300 ease-in-out
       ${isHovered ? 'transform scale-105 shadow-xl' : ''}
     `}>
                {/* 책 커버 이미지 */}
                <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />

                {/* 호버 시 나타나는 오버레이 정보 */}
                <div className={`
         absolute inset-0 bg-black/70
         flex flex-col justify-between p-4
         opacity-0 transition-opacity duration-300
         ${isHovered ? 'opacity-100' : ''}
       `}>
                    {/* 상단 정보 */}
                    <div>
                        <h3 className="font-bold text-lg text-white">{book.title}</h3>
                        <p className="text-sm text-gray-300 mt-1">{book.genre} · {book.level}</p>
                        <div className="bg-white/20 rounded px-2 py-1 text-white text-xs inline-block mt-2">
                            {Math.floor(book.readingTime / 60)}시간 {book.readingTime % 60}분
                        </div>
                    </div>

                    {/* 중간 정보 */}
                    <div className="space-y-2">
                        <p className="text-sm text-gray-300">
                            {book.currentPage} / {book.totalPages} 페이지
                        </p>
                        <div className="text-sm text-gray-300 line-clamp-3">
                            {book.description}
                        </div>
                    </div>

                    {/* 하단 정보 */}
                    <div className="space-y-4">
                        {/* 진행률 바 */}
                        <div>
                            <div className="relative w-full h-2 bg-gray-200/30 rounded-full overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-500"
                                    style={{ width: `${book.progress}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-white text-sm">{book.progress}%</p>
                                <p className="text-white text-sm">{formatDate(book.lastRead)}</p>
                            </div>
                        </div>

                        {/* 버튼들 */}
                        <div className="flex gap-2">
                            <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md
                              hover:bg-indigo-500 transition-colors text-sm font-semibold">
                                이어읽기
                            </button>
                            <button className="flex-1 bg-white/10 text-white px-4 py-2 rounded-md
                              hover:bg-white/20 transition-colors text-sm font-semibold
                              backdrop-blur-sm">
                                상세정보
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RecentBooks() {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // 스크롤 상태 체크
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    // 마우스 드래그 시작
    const handleMouseDown = (e) => {
        if (scrollRef.current) {
            setIsDragging(true);
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
        }
    };

    // 마우스 드래그 중
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        if (scrollRef.current) {
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 1.1; // 스크롤 속도 감소
            scrollRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    // 마우스 드래그 종료
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // 마우스가 영역을 벗어났을 때
    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            handleScroll();
            return () => scrollElement.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // 버튼 클릭 스크롤
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="bg-white pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 섹션 타이틀 */}
                <div className="mb-8 text-center">
                    {/* 섹션 타이틀을 더 크고 명확하게 수정 */}
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900">최근 도서</h2>
                        <p className="mt-3 text-xl font-semibold text-gray-600">최근에 읽고 있는 도서 목록입니다</p>
                    </div>

                    {/* 하단 상태 표시 부분 */}
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                        <div className="ml-auto">
                            <button className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center">
                                전체보기
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 책 목록 부분 */}
                <div className="relative">
                    {showLeftArrow && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                      w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center
                      hover:bg-gray-50 transition-colors"
                        >
                            <svg
                                className="w-6 h-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {showRightArrow && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                      w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center
                      hover:bg-gray-50 transition-colors"
                        >
                            <svg
                                className="w-6 h-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div
                        ref={scrollRef}
                        className="flex space-x-6 overflow-x-auto scrollbar-hide select-none"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            cursor: isDragging ? 'grabbing' : 'grab',
                            scrollBehavior: isDragging ? 'auto' : 'smooth'  // 드래그 중일 때는 부드러운 스크롤 비활성화
                        }}
                    >
                        {recentBooks.map((book) => (
                            <RecentBookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
