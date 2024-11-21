// src/components/learn/modes/components/FloatingControls.js
import { Play, Pause, ChevronUp, Check } from 'lucide-react';

export default function FloatingControls({
    autoScroll,
    scrollSpeed,
    onAutoScrollToggle,
    onSpeedChange,
    onScrollTop,
    showScrollTop,
    isCompleted,
    onComplete
}) {
    return (
        <div className="fixed bottom-8 left-8 flex flex-col space-y-4">
            {/* 자동 스크롤 컨트롤 */}
            <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
                <button
                    onClick={() => onAutoScrollToggle(!autoScroll)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
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
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>스크롤 속도: {scrollSpeed.toFixed(1)}x</span>
                    </div>
                    <input
                        type="range"
                        min="0.1"
                        max="3.0"
                        step="0.1"
                        value={scrollSpeed}
                        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                        className="w-full"
                    />
                </div>
            </div>

            {/* 완료 버튼 */}
            <button
                onClick={onComplete}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-indigo-600 text-white'
                }`}
            >
                <Check size={16} />
                <span>{isCompleted ? '완료 취소' : '학습 완료'}</span>
            </button>

            {/* 맨 위로 버튼 */}
            {showScrollTop && (
                <button
                    onClick={onScrollTop}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                >
                    <ChevronUp size={20} />
                </button>
            )}
        </div>
    );
}
