// src/components/learn/modes/components/AnnotationCard.js
export default function AnnotationCard({
    annotation,
    onUpdate,
    onDelete
}) {
    const { category, text, note, timestamp } = annotation;
    const categoryInfo = defaultCategories.find(c => c.id === category);

    return (
        <div className={`p-4 rounded-lg bg-${categoryInfo.color}-50`}>
            <div className="flex justify-between items-start mb-2">
                <span className={`text-sm font-medium text-${categoryInfo.color}-800 flex items-center`}>
                    {categoryInfo.icon && <categoryInfo.icon size={14} className="mr-1" />}
                    {categoryInfo.label}
                </span>
                <button
                    onClick={onDelete}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <X size={14} />
                </button>
            </div>
            <div className="text-sm mb-2 font-medium">{text}</div>
            <textarea
                value={note}
                onChange={(e) => onUpdate({ note: e.target.value })}
                placeholder="메모를 입력하세요..."
                className={`w-full p-2 text-sm border rounded-lg bg-white/50 focus:ring-1 focus:ring-${categoryInfo.color}-400`}
                rows="2"
            />
            <div className="text-xs text-gray-400 mt-2">
                {new Date(timestamp).toLocaleString()}
            </div>
        </div>
    );
}
