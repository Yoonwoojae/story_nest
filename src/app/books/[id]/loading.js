// src/app/books/[id]/loading.js
export default function Loading() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="animate-pulse">
                {/* Header Skeleton */}
                <div className="h-8 w-32 bg-gray-200 rounded mb-8" />

                {/* Book Info Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Cover Image */}
                    <div className="aspect-[3/4] bg-gray-200 rounded-lg" />

                    {/* Book Details */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="h-8 w-3/4 bg-gray-200 rounded" />
                        <div className="h-4 w-1/4 bg-gray-200 rounded" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 rounded" />
                            <div className="h-4 w-full bg-gray-200 rounded" />
                            <div className="h-4 w-2/3 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>

                {/* Tabs Skeleton */}
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-4 w-16 bg-gray-200 rounded" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
