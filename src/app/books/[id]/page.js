// src/app/books/[id]/page.js
import BookDetailHeader from '@/components/books/BookDetailHeader';
import BookInfo from '@/components/books/BookInfo';
import BookDetailTabs from '@/components/books/BookDetailTabs';
import RelatedBooks from '@/components/books/RelatedBooks';

async function getBookDetails(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`, {
            next: {
                revalidate: 3600
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch book details: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch book details');
    }
}

// Metadata를 비동기로 생성하는 함수
export async function generateMetadata(context) {
    const params = await context.params; // params를 await로 대기

    try {
        const book = await getBookDetails(params.id);

        return {
            title: `${book.title} | 독서 문해력 향상 플랫폼`,
            description: book.description.substring(0, 160),
            openGraph: {
                title: book.title,
                description: book.description.substring(0, 160),
                images: [book.coverImage],
            },
        };
    } catch (error) {
        return {
            title: '도서 상세 | 독서 문해력 향상 플랫폼',
            description: '도서 상세 정보 페이지입니다.',
        };
    }
}

// 연관 도서 데이터 가져오기
async function getRelatedBooks(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/books/${id}/related`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch related books');
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// 책 상세 페이지
export default async function BookDetailPage(context) {
    const params = await context.params; // params를 await로 대기

    try {
        const [book, relatedBooks] = await Promise.all([
            getBookDetails(params.id),
            getRelatedBooks(params.id)
        ]);

        if (!book) {
            throw new Error('Book not found');
        }

        return (
            <main className="min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <BookDetailHeader bookId={params.id} />
                    <BookInfo book={book} />
                    <BookDetailTabs book={book} />
                    <RelatedBooks
                        currentBook={book}
                        relatedBooks={relatedBooks}
                    />
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error in BookDetailPage:', error);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        도서를 찾을 수 없습니다
                    </h1>
                    <p className="text-gray-600">
                        요청하신 도서를 찾을 수 없거나 오류가 발생했습니다.
                    </p>
                </div>
            </div>
        );
    }
}

// 정적 경로를 생성하기 위한 함수
export function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
    ];
}
