// src/components/learn/LearningProgress.js
export default function LearningProgress({
    progress,
    isCompleted,
    onComplete
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">읽기 진행률</span>
                        <span className="text-gray-700">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-indigo-600 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* 완료 버튼 */}
                <button
                    onClick={() => onComplete(!isCompleted)}
                    className={`w-full px-4 py-2 rounded-lg transition-colors ${
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
