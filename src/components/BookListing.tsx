'use client'

import ProductCard from '@/components/ProductCard'
import { Book } from '@/types'

export interface BookListingProps {
    books: Book[] | null
}

export function BookListing({ books }: BookListingProps) {
    console.log('Books fetched:', books?.length)
    return (
        <>
            {books ? (
                books.map((book, index) => {
                    return (
                        <ProductCard key={index} book={book} />
                    )
                })
            ) : (
                <div className='text-xl font-bold'>No books available!</div>
            )}
        </>
    )
}

