import api from '../api/axios';
import type { BookCategory, BookCategoryResponse, BookCountResponse, BookPriceResponse, BookResponse } from '../types/book.types';

const bookService = {
    getBooks: async (): Promise<BookResponse> => {
        const response = await api.get<BookResponse>('/books');
        return response.data;
    },
    getBookCategories: async (): Promise<BookCategoryResponse> => {
        const response = await api.get<BookCategoryResponse>('/bookcategory');
        return response.data;
    },
    getBookPrice: async (): Promise<BookPriceResponse> => {
        const response = await api.get<BookPriceResponse>('/bookprice');
        return response.data;
    },
    getBookCount: async (): Promise<BookCountResponse> => {
        const response = await api.get<BookCountResponse>('/books/countbook');
        return response.data;
    }
};

export default bookService;





