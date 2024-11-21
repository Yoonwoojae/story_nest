// src/components/learn/modes/components/BookHeader.js
export default function BookHeader({
    title,
    progress,
    autoScroll,
    onAutoScrollToggle
}) {
    return (
        <div className="py-4 px-6 flex items-center justify-between bg-white/95 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
                <h2 className="text-lg font-medium text-gray-900 truncate max-w-md">
                    {title}
                </h2>
                <div className="text-sm text-gray-500">
                    {Math.round(progress)}% 완료
                </div>
            </div>
            <button
                onClick={() => onAutoScrollToggle(!autoScroll)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    autoScroll
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                {autoScroll ? '일시정지' : '자동 스크롤'}
            </button>
        </div>
    );
}

