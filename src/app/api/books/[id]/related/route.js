// src/app/api/books/[id]/related/route.js
import { NextResponse } from 'next/server';
import { books } from '../../../data';

export const dynamic = 'force-dynamic';

export const GET = async (request, context) => {
    try {
        // params를 먼저 await
        const params = await context.params;
        const bookId = parseInt(params.id, 10);

        const currentBook = books.find(book => book.id === bookId);

        if (!currentBook) {
            return NextResponse.json({
                message: 'Book not found'
            }, {
                status: 404
            });
        }

        const relatedBooks = books
            .filter(book =>
                book.id !== bookId && (
                    book.category === currentBook.category ||
                        book.tags.some(tag => currentBook.tags.includes(tag))
                )
            )
            .sort((a, b) => {
                const aMatchCount = a.tags.filter(tag => currentBook.tags.includes(tag)).length;
                const bMatchCount = b.tags.filter(tag => currentBook.tags.includes(tag)).length;
                return bMatchCount - aMatchCount;
            })
            .slice(0, 10);

        return NextResponse.json(relatedBooks);

    } catch (error) {
        console.error('Error fetching related books:', error);
        return NextResponse.json({
            message: 'Internal server error'
        }, {
            status: 500
        });
    }
};
