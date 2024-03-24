import { Book } from '@/types';

export async function fetchBooks(page: number): Promise<Book[] | null> {
    const perPage = 15;
    const offset = (page - 1) * perPage;
    const apiUrl = `https://book-server-henna.vercel.app/api/book?offset=${offset}&limit=${perPage}`;

    try {
        const response = await fetch(apiUrl);

        
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const {data} = await response.json();

        console.log("Data", data)
        return data; // Assuming 'books' contains an array of Book objects
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

// const perPage = 24;
// const apiUrl = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`;