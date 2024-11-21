// src/lib/api/books.js
export async function getBookDetails(id) {
    if (!id) throw new Error('Book ID is required');

    try {
        const response = await fetch(`/api/books/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching book details: ${error.message}`);
    }
}

export async function getBookReviews(bookId, page = 1) {
    try {
        const response = await fetch(`/api/books/${bookId}/reviews?page=${page}`);

        if (!response.ok) {
            throw new Error('Failed to fetch book reviews');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching book reviews: ${error.message}`);
    }
}

export async function getBookStats(bookId) {
    try {
        const response = await fetch(`/api/books/${bookId}/stats`);

        if (!response.ok) {
            throw new Error('Failed to fetch book statistics');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching book statistics: ${error.message}`);
    }
}
