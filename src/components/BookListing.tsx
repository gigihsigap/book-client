'use client'

import ProductCard from '@/components/ProductCard'
import { Book } from '@/types'

export interface BookListingProps {
    books: Book[] | null
}

export function BookListing({ books }: BookListingProps) {
    return (
        <>
            {books && (books.length > 0) ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {books.map((book, index) => {
                        return (
                        <ProductCard key={index} book={book} />
                        )
                    })}
                </div>  
            ) : (
                <>
                </>
            )}
        </>
    )
}

