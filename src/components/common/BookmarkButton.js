// src/components/common/BookmarkButton.js
'use client';

import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

export default function BookmarkButton({ bookId, initialState = false }) {
    const [isBookmarked, setIsBookmarked] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const toggleBookmark = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/books/bookmark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId, action: isBookmarked ? 'remove' : 'add' }),
            });

            if (!response.ok) {
                throw new Error('북마크 처리 실패');
            }

            setIsBookmarked(!isBookmarked);

        } catch (error) {
            console.error('북마크 에러:', error);
            alert('북마크 처리 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={toggleBookmark}
            disabled={isLoading}
            className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg border
        ${isBookmarked
            ? 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
            : 'border-gray-300 hover:bg-gray-50'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
        >
            {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4" />
            ) : (
                <Bookmark className="w-4 h-4" />
            )}
            {isBookmarked ? '저장됨' : '저장하기'}
        </button>
    );
}
