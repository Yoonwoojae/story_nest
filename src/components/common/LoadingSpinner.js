// src/components/common/LoadingSpinner.js
export const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
);

// src/components/common/SectionSkeleton.js
export const SectionSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                    <div className="h-24 bg-gray-100 rounded-lg"></div>
                </div>
            ))}
        </div>
    </div>
);
