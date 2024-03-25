"use client"

import ProductCard from '@/components/ProductCard';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Book } from '@/types';

export interface BookProps {
    books: Book[] | null;
}

export function Books({ books }: BookProps) {
    console.log("Books fetched:", books?.length)
    return (
        <>
            {books ? (
                books.map((book, index) => {
                    return (
                        // <Card key={book.id}>
                        //     <CardContent className='flex flex-col items-center justify-center p-4'>
                        //         <img
                        //             src={book.cover}
                        //             alt={book.title}
                        //             className='object-contain h-48 rounded'
                        //         />
                        //     </CardContent>
                        //     <CardFooter className='text-center flex flex-col p-4'>
                        //         <CardTitle className='my-2'>{book.title}</CardTitle>
                        //         <CardDescription>{book.author}</CardDescription>
                        //         <span>{book.price}</span>
                        //     </CardFooter>
                        // </Card>
                        <ProductCard key={index} book={book} />
                    )
                })
            ) : (
                <div className='text-xl font-bold'>No books available!</div>
            )}
        </>
    )
}

