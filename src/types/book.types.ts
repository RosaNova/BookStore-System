export interface Book {
    id: number;
    title: string;
    description?: string;
    price: number;
    stock?: number;
    author_id?: number;
    category_id?: number;
    published_date?: string;
    book_img: string;
    author: string;
    rating: number;
    pages: number;
    genre: string;
    featured?: boolean;
    badge?: string;
    originalPrice?: number;
}

export interface BookResponse {
    status: string;
    data: Book[];
}

