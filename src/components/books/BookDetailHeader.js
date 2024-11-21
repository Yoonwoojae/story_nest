// src/components/books/BookDetailHeader.js
'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { ChevronLeft } from 'lucide-react';
import ShareButton from '@/components/common/ShareButton';

export default function BookDetailHeader({ bookId }) {
    const router = useRouter();

    const handleStartLearning = () => {
        router.push(`/learn/${bookId}`);
    };

    return (
        <div className="mb-8">
            <Button
                variant="ghost"
                className="flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => router.back()}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                돌아가기
            </Button>

            <div className="mt-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">도서 상세</h1>
                <div className="flex gap-2">
                    <ShareButton />
                    <Button
                        onClick={handleStartLearning}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        학습 시작하기
                    </Button>
                </div>
            </div>
        </div>
    );
}
