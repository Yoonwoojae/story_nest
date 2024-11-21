// src/components/learn/modes/components/AutoScrollManager.js
import { useEffect, useRef } from 'react';

export default function AutoScrollManager({
    isActive,
    speed,
    onProgressUpdate,
    onAutoScrollEnd
}) {
    const scrollIntervalRef = useRef(null);
    const lastScrollPosition = useRef(0);

    const startScrolling = () => {
        if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
        }

        if (speed <= 0.1) return; // 최소 속도 제한

        scrollIntervalRef.current = setInterval(() => {
            const currentScroll = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            // 스크롤이 끝에 도달했는지 확인
            if (currentScroll >= maxScroll) {
                onAutoScrollEnd?.();
                return;
            }

            // 스크롤 위치 업데이트
            window.scrollTo({
                top: currentScroll + (speed * 2),
                behavior: 'auto'
            });

            // 진행률 업데이트
            const progress = (currentScroll / maxScroll) * 100;
            onProgressUpdate?.(progress);
            lastScrollPosition.current = currentScroll;
        }, 20);
    };

    useEffect(() => {
        if (isActive) {
            startScrolling();
        } else {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        }

        return () => {
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
        };
    }, [isActive, speed]);

    return null;
}

// src/components/learn/modes/components/SpeedControl.js
import { useCallback } from 'react';

export default function SpeedControl({ speed, onSpeedChange }) {
    const handleSpeedChange = useCallback((event) => {
        const newSpeed = parseFloat(event.target.value);
        onSpeedChange(newSpeed);
    }, [onSpeedChange]);

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">스크롤 속도</span>
                <span className="font-medium text-indigo-600">{speed.toFixed(1)}x</span>
            </div>
            <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={speed}
                onChange={handleSpeedChange}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                style={{
                    background: `linear-gradient(to right, rgb(79, 70, 229) 0%, rgb(79, 70, 229) ${
                        (speed / 3) * 100
                    }%, rgb(229, 231, 235) ${(speed / 3) * 100}%, rgb(229, 231, 235) 100%)`
                }}
            />
            <div className="flex justify-between text-xs text-gray-400">
                <span>천천히</span>
                <span>보통</span>
                <span>빠르게</span>
            </div>
        </div>
    );
}

// src/components/learn/modes/components/ReadingToolbar.js
import { Play, Pause, Settings } from 'lucide-react';

export default function ReadingToolbar({
    title,
    progress,
    autoScroll,
    onAutoScrollToggle,
    speed,
    onSpeedChange
}) {
    return (
        <div className="fixed bottom-8 left-8 bg-white rounded-lg shadow-lg p-4 space-y-4 max-w-xs">
            {/* 자동 스크롤 버튼 */}
            <button
                onClick={() => onAutoScrollToggle(!autoScroll)}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    autoScroll
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                {autoScroll ? (
                    <>
                        <Pause size={16} />
                        <span>일시정지</span>
                    </>
                ) : (
                    <>
                        <Play size={16} />
                        <span>자동 스크롤</span>
                    </>
                )}
            </button>

            {/* 속도 조절 */}
            {autoScroll && (
                <div className="pt-2 border-t">
                    <SpeedControl
                        speed={speed}
                        onSpeedChange={onSpeedChange}
                    />
                </div>
            )}

            {/* 현재 진행률 */}
            <div className="text-sm text-gray-500 text-center">
                {Math.round(progress)}% 읽음
            </div>
        </div>
    );
}
