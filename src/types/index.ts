export interface Book {
    id: string;
    title: string;
    author: string; // author
    cover: string; // cover
    price: number;
    tags: string[];
    slug: string;
}