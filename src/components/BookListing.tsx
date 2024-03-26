'use client'

import ProductCard from '@/components/ProductCard'
import { Book } from '@/types'

export interface BookProps {
    books: Book[] | null
}

export function Books({ books }: BookProps) {
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

