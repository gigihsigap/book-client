import Image from 'next/image'
import Link from 'next/link'
import Price from '@/components/Price'
import { Book } from '@/types'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

type ProductCardProps = {
    book: Book
}

function ProductCard({ book }: ProductCardProps) {
  const handle = book.slug
  const title = book.title
  const description = book.author
  const price = book.price

  const imageNode = book.cover

  return (
    <Link
      href={`/books/${handle}`}
      passHref
    >
      <div className="h-120 rounded shadow-lg mx-auto border border-palette-lighter">
        <div className="h-64 border-b-2 border-palette-lighter relative">
          <Image
            src={imageNode}
            alt={imageNode}
            layout="fill"
            objectFit="contain"
            className="transform duration-500 ease-in-out scale-90 hover:scale-100"
          />
        </div>
        <div className="h-48 relative">
          <div className="font-primary text-lg pt-4 px-4 font-semibold">
            {title}
          </div>
          <div className="text-md text-gray-600 p-4 font-primary font-light">
            {description}
          </div>
          <div
            className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle"
          >
            <Price
              currency="$"
              num={price}
              numSize="text-lg"
            />
          </div>
        </div>
      </div>
    </Link>
    // <Card>
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
  )
}

export default ProductCard
