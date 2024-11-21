// src/components/books/RelatedBooks.js
'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function RelatedBooks({ currentBook, relatedBooks }) {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scroll = (direction) => {
        const container = document.getElementById('related-books-container');
        const scrollAmount = 300; // 한 번에 스크롤할 픽셀 양

        if (direction === 'left') {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!relatedBooks?.length) {
        return null;
    }

    return (
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">연관 도서</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-1 rounded-full hover:bg-gray-100"
                        aria-label="이전 도서"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-1 rounded-full hover:bg-gray-100"
                        aria-label="다음 도서"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* 스크롤 가능한 도서 목록 */}
            <div
                id="related-books-container"
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollBehavior: 'smooth' }}
            >
                {relatedBooks.map((book) => (
                    <div
                        key={book.id}
                        className="flex-none w-48"
                    >
                        <a
                            href={`/books/${book.id}`}
                            className="block transition hover:opacity-80"
                        >
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                                {book.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-indigo-600">
                                    {book.rating}
                                </span>
                                <span className="text-xs text-gray-500">
                  ({book.reviewCount.toLocaleString()}개의 리뷰)
                                </span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
