// src/app/learn/[bookId]/page.js
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import LearningContent from '@/components/learn/LearningContent';
import AutoScrollControls from '@/components/learn/modes/components/AutoScrollControls';
import LearningNotes from '@/components/learn/LearningNotes';
import LearningProgress from '@/components/learn/LearningProgress';
import { fetchBookContent } from '@/lib/api/bookService';
import FontSizeControl from '@/components/learn/FontSizeControl';

export default function LearnPage() {
    const { bookId } = useParams();
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [autoScroll, setAutoScroll] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(1.0);
    const [fontSize, setFontSize] = useState(16);
    const [isCompleted, setIsCompleted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const loadBookContent = async () => {
            try {
                const data = await fetchBookContent(bookId);
                setBookData(data);
            } catch (error) {
                console.error('Failed to load book content:', error);
            } finally {
                setLoading(false);
            }
        };

        loadBookContent();
    }, [bookId]);

    const handleProgressUpdate = (newProgress) => {
        setProgress(newProgress);
    };

    const handleCompletion = (completed) => {
        setIsCompleted(completed);
        if (completed) {
            setAutoScroll(false); // 완료시 자동 스크롤 중지
        }
    };

    const handleComplete = (isCompleting) => {
        console.log('Completion status changing to:', isCompleting); // 디버깅용
        setIsCompleted(isCompleting);
        if (autoScroll && isCompleting) {
            setAutoScroll(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] mt-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!bookData) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] mt-16">
                <div className="text-gray-500">콘텐츠를 불러올 수 없습니다.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="pt-16"> {/* 헤더 높이만큼 상단 패딩 */}
                <div className="max-w-7xl mx-auto flex">
                    {/* 왼쪽 콘텐츠 영역 */}
                    <div className="flex-1 bg-white border-r border-gray-200">
                        <div className="px-6">
                            <LearningContent
                                bookData={bookData}
                                autoScroll={autoScroll}
                                scrollSpeed={scrollSpeed}
                                fontSize={fontSize}
                                isCompleted={isCompleted}
                                onComplete={handleComplete}
                                onProgressUpdate={setProgress}
                            />
                        </div>
                    </div>

                    {/* 오른쪽 사이드바 */}
                    <div className="w-[320px]">
                        <div className="sticky top-16 p-5 space-y-4">
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-medium text-gray-900">글자 크기</h3>
                                    <span className="text-sm text-gray-500">{fontSize}pt</span>
                                </div>
                                <input
                                    type="range"
                                    min="12"
                                    max="24"
                                    step="1"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                    className="w-full accent-indigo-600"
                                />
                            </div>
                            <AutoScrollControls
                                autoScroll={autoScroll}
                                scrollSpeed={scrollSpeed}
                                onAutoScrollToggle={setAutoScroll}
                                onSpeedChange={setScrollSpeed}
                            />
                            <LearningProgress
                                progress={progress}
                                isCompleted={isCompleted}
                                onComplete={handleComplete}
                            />
                            <LearningNotes bookId={bookId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
