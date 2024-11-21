// src/hooks/useBookData.js
import { useQuery } from '@tanstack/react-query';

export function useBookData(bookId) {
    return useQuery({
        queryKey: ['book', bookId],
        queryFn: async () => {
            const response = await fetch(`/api/books/${bookId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book data');
            }
            return response.json();
        }
    });
}
