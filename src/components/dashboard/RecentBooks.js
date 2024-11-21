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
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
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
                        priority
                    />

                    {/* 오버레이 정보 */}
                    <div className={`
            absolute inset-0 bg-black/70
            flex flex-col justify-between p-4
            opacity-0 transition-opacity duration-300
            ${isHovered ? 'opacity-100' : ''}
          `}>
                        <div>
                            <h3 className="text-xl font-bold text-white">{book.title}</h3>
                            <p className="text-sm text-gray-300 mt-1">{book.author}</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full"
                                        style={{ width: `${book.progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm text-white mt-1">
                                    <span>{book.progress}%</span>
                                    <span>{book.currentPage} / {book.totalPages} 페이지</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg
                           transition-colors text-sm font-medium backdrop-blur-sm"
                                >
                                    상세보기
                                </button>
                                <button
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg
                           transition-colors text-sm font-medium"
                                >
                                    이어읽기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상세 정보 모달 */}
            <BookDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                book={book}
            />
        </>
    );
}

// 상세 정보 모달 컴포넌트
function BookDetailModal({ isOpen, onClose, book }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 배경 오버레이 */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 모달 컨텐츠 */}
            <div className="relative bg-white rounded-2xl w-full max-w-3xl m-4 shadow-xl overflow-hidden">
                <div className="flex">
                    {/* 책 커버 영역 */}
                    <div className="w-1/3 p-8 bg-gray-50">
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={book.cover}
                                alt={book.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="mt-6 space-y-4">
                            <div>
                                <div className="text-sm text-gray-500 mb-1">진행률</div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${book.progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                    <span>{book.progress}%</span>
                                    <span>{book.currentPage} / {book.totalPages} 페이지</span>
                                </div>
                            </div>
                            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition-colors">
                                이어읽기
                            </button>
                        </div>
                    </div>

                    {/* 상세 정보 영역 */}
                    <div className="flex-1 p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{book.title}</h3>
                                <p className="text-gray-500 mt-1">{book.author}</p>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">최근 읽은 시간</div>
                                <div className="text-lg font-semibold mt-1">{book.lastReadTime || '2시간 전'}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">누적 읽은 시간</div>
                                <div className="text-lg font-semibold mt-1">{book.totalReadTime || '8시간 30분'}</div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-900 mb-2">책 소개</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {book.description}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-900 mb-2">독서 노트</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <textarea
                                    className="w-full bg-transparent border-0 resize-none focus:ring-0 text-sm"
                                    placeholder="독서 중 메모하고 싶은 내용을 기록해보세요."
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-900 mb-2">읽기 통계</h4>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-sm text-gray-500">평균 독서 시간</div>
                                    <div className="text-lg font-semibold mt-1">32분</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-sm text-gray-500">독서 횟수</div>
                                    <div className="text-lg font-semibold mt-1">15회</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-sm text-gray-500">완독까지</div>
                                    <div className="text-lg font-semibold mt-1">2시간</div>
                                </div>
                            </div>
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
                <div className="mb-8">
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
