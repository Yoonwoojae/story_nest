// src/components/learn/modes/components/CategorySelector.js
export default function CategorySelector({
    categories,
    activeCategory,
    onCategoryChange
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center space-x-1.5 transition-colors ${
                        activeCategory === cat.id
                            ? `bg-${cat.color}-100 text-${cat.color}-800 ring-1 ring-${cat.color}-400`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {cat.icon && <cat.icon size={14} />}
                    <span>{cat.label}</span>
                </button>
            ))}
        </div>
    );
}
