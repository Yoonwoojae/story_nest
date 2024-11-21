// src/components/learn/modes/BasicMode.js
import { useEffect, useRef } from 'react';

export default function BasicMode({
    content,
    autoScroll,
    scrollSpeed,
    fontSize,
    isCompleted,
    onComplete,
    onProgressUpdate
}) {
    const contentRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    // 자동 스크롤
    useEffect(() => {
        // 스크롤 중인 인터벌 정리
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        }

        if (autoScroll) {
            scrollIntervalRef.current = setInterval(() => {
                const currentPosition = window.pageYOffset;
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

                if (currentPosition >= maxScroll) {
                    clearInterval(scrollIntervalRef.current);
                    return;
                }

                window.scrollBy({
                    top: scrollSpeed,
                    behavior: 'auto'
                });

                const progress = (currentPosition / maxScroll) * 100;
                onProgressUpdate?.(Math.min(100, progress));
            }, 50);
        }

        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        };
    }, [autoScroll, scrollSpeed]);

    // 스크롤 진행률 추적
    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentPosition = window.pageYOffset;
            const progress = (currentPosition / maxScroll) * 100;
            onProgressUpdate?.(Math.min(100, progress));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="mt-4">
            {/* 본문 영역 */}
            <div ref={contentRef}>
                <div
                    style={{ fontSize: `${fontSize}pt` }}
                    className="text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>

            {/* 완료 버튼 - 하단 여백 추가 */}
            <div className="mt-8 mb-8 flex justify-end">
                <button
                    onClick={() => onComplete?.(!isCompleted)}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                        isCompleted
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                >
                    {isCompleted ? '학습 완료 취소' : '학습 완료'}
                </button>
            </div>
        </div>
    );
}
