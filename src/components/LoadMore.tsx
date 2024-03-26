'use client'

import { useEffect, useState } from 'react'
import { Book } from '@/types'
import { useInView } from 'react-intersection-observer'
import { Spinner } from '@/components/ui/spinner'
import { fetchBooks } from '../actions/fetch-books'
import { Books } from './BookListing'
import { delay } from '../lib/utils'

export function LoadMore() {
    const [books, setBooks] = useState<Book[]>([])
    const [pagesLoaded, setPagesLoaded] = useState(1) // Pages already loaded

    const { ref, inView } = useInView()

    const loadMoreBooks = async () => {
        await delay(100)
        const nextPage = (pagesLoaded % 2) + 1 // Make the scroll infinite
        const newProducts = await fetchBooks(nextPage) ?? []
        setBooks((prevProducts: Book[]) => [...prevProducts, ...newProducts])
        setPagesLoaded(nextPage)
    }

    useEffect(() => {
        if (inView) {
            console.log('Scrolled to the end!')
            loadMoreBooks()
        }
    }, [inView])

    return (
        <>
            <Books books={books} />
            <div className='flex justify-center p-4 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4' ref={ref}>
                <Spinner/>
            </div>
            
        </>
    )
}