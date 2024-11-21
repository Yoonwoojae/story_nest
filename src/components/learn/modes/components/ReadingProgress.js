// src/components/learn/modes/components/ReadingProgress.js
export default function ReadingProgress({ progress }) {
    return (
        <div className="px-4 pb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>읽기 진행률</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full">
                <div
                    className="bg-indigo-600 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
