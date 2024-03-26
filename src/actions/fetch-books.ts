import { Book } from '@/types'

export async function fetchBooks(page: number, attr: string, value: string): Promise<Book[] | null> {
    const perPage = 16
    const offset = (page - 1) * perPage
    const apiUrl = `https://book-server-henna.vercel.app/api/book?offset=${offset}&limit=${perPage}&attr=${attr}&value=${value}`

    try {
        const response = await fetch(apiUrl)
        
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`)

        const {data} = await response.json()
        return data
    } catch(error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export async function fetchBookBySlug(slug: string): Promise<Book | null> {
    console.log("fetchBookBySlug", slug)
    const apiUrl = `https://book-server-henna.vercel.app/api/book?attr=slug&value=${slug}`

    try {
        const response = await fetch(apiUrl)
        
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`)

        const {data} = await response.json()
        const bookDetail = data[0] || {}

        return bookDetail
    } catch(error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export async function fetchAllBookSlugs(): Promise<string[] | null> {
    const apiUrl = `https://book-server-henna.vercel.app/api/book/slug`

    try {
        const response = await fetch(apiUrl)
        
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`)

        const {data} = await response.json()

        return data
    } catch(error) {
        console.error('Error fetching data:', error)
        return null
    }
}

// const perPage = 24
// const apiUrl = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`