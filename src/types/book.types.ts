export interface Book {
    id: number;
    title: string;
    description: string;
    price: number;
    stock?: number;
    author: number;
    published_date?: string;
    book_img: string;
    categoryName: string;
}

export interface BookResponse {
    status: string;
    data: Book[];
}

export interface BookPriceResponse {
    status: string;
    data: BookPrice[];
}
export interface BookPrice{
    price: number;
}

export interface BookCategoryResponse {
    status: string;
    data: BookCategory[];
}

export interface BookCategory {
    id : number
    name: string;
}