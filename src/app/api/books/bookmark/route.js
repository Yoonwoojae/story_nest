// src/app/api/books/bookmark/route.js
import { NextResponse } from 'next/server';

// 임시 데이터 저장소 (실제로는 DB를 사용해야 함)
const bookmarks = new Map();

export async function POST(request) {
    try {
        const { bookId, action } = await request.json();

        // 실제 구현에서는 사용자 인증 체크가 필요합니다
        // if (!authenticated) {
        //   return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
        // }

        // 임시 사용자 ID (실제로는 인증된 사용자의 ID를 사용)
        const userId = 'temp-user-id';

        // 사용자의 북마크 목록 가져오기
        const userBookmarks = bookmarks.get(userId) || new Set();

        if (action === 'add') {
            userBookmarks.add(bookId);
        } else if (action === 'remove') {
            userBookmarks.delete(bookId);
        }

        // 북마크 저장
        bookmarks.set(userId, userBookmarks);

        return NextResponse.json({
            success: true,
            bookmarked: action === 'add',
            bookmarks: Array.from(userBookmarks)
        });

    } catch (error) {
        console.error('Bookmark error:', error);
        return NextResponse.json(
            { error: '북마크 처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}

// 사용자의 북마크 목록 조회
export async function GET(request) {
    try {
        // 실제 구현에서는 사용자 인증 체크가 필요합니다
        const userId = 'temp-user-id';
        const userBookmarks = bookmarks.get(userId) || new Set();

        return NextResponse.json({
            bookmarks: Array.from(userBookmarks)
        });

    } catch (error) {
        console.error('Bookmark fetch error:', error);
        return NextResponse.json(
            { error: '북마크 목록 조회 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
