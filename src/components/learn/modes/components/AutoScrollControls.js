// src/components/learn/modes/components/AutoScrollControls.js
import { Play, Pause } from 'lucide-react';

export default function AutoScrollControls({
    autoScroll,
    scrollSpeed,
    onAutoScrollToggle,
    onSpeedChange
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
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

            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">스크롤 속도</span>
                    <span className="text-gray-700">{scrollSpeed.toFixed(1)}x</span>
                </div>
                <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={scrollSpeed}
                    onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-400">
                    <span>느리게</span>
                    <span>보통</span>
                    <span>빠르게</span>
                </div>
            </div>
        </div>
    );
}
