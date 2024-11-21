// src/app/books/[id]/error.js
'use client';

import { useEffect } from 'react';
import Button from '@/components/common/Button';

export default function Error({
    error,
    reset,
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    죄송합니다. 문제가 발생했습니다.
                </h2>
                <p className="text-gray-600 mb-8">
                    도서 정보를 불러오는 중 오류가 발생했습니다.
                </p>
                <div className="space-x-4">
                    <Button onClick={() => reset()}>
                        다시 시도
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        이전 페이지
                    </Button>
                </div>
            </div>
        </div>
    );
}
