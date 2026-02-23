import api from '../api/axios';
import type { BookResponse } from '../types/book.types';

const bookService = {
    getBooks: async (): Promise<BookResponse> => {
        const response = await api.get<BookResponse>('/books');
        return response.data;
    }
};

export default bookService;
