// src/components/books/BookInfo.js
'use client';

import { Star, Users, BookOpen, Share2, Bookmark } from 'lucide-react';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import ShareButton from '@/components/common/ShareButton';
import BookmarkButton from '@/components/common/BookmarkButton';

export default function BookInfo({ book }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* 왼쪽: 커버 이미지 */}
            <div className="md:col-span-1">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="mt-4 flex gap-2">
                    <BookmarkButton bookId={book.id} />
                    <ShareButton />
                </div>
            </div>

            {/* 오른쪽: 도서 정보 */}
            <div className="md:col-span-2 space-y-6">
                {/* 기본 정보 */}
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span>{book.category}</span>
                        <span>•</span>
                        <span>{book.level}</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                    <p className="text-lg text-gray-600 mb-4">{book.author}</p>
                </div>

                {/* 통계 */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="font-medium">{book.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-400 mr-1" />
                        <span>{book.reviewCount.toLocaleString()} 리뷰</span>
                    </div>
                    <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-gray-400 mr-1" />
                        <span>난이도: {book.level}</span>
                    </div>
                </div>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2">
                    {book.tags.map(tag => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* 설명 */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">책 소개</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {book.description}
                    </p>
                </div>

                {/* 학습 시작 버튼 - 모바일에서만 표시 */}
                <div className="md:hidden">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                        학습 시작하기
                    </Button>
                </div>
            </div>
        </div>
    );
}
