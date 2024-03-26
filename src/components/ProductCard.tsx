import Image from 'next/legacy/image'
import Link from 'next/link'
import Price from '@/components/Price'
import { Book } from '@/types'
import { capitalizeFirstLetter } from '@/lib/utils'

type ProductCardProps = {
    book: Book
}

function ProductCard({ book }: ProductCardProps) {
  const handle = book.slug
  let title = book.title
  const titleWords = title.split(' ')
  if (titleWords.length > 5){
    title = titleWords.slice(0, 4).join(' ') + '...';
  }
  let author = book.author
  const authorWords = author.split(',')
  if (authorWords.length > 2){
    author = authorWords.slice(0, 2).join(',') + '...';
  }
  const price = book.price
  const tags = book.tags

  const imageNode = book.cover

  return (
    <Link
      href={`/books/${handle}`}
      passHref
    >
      <div className='h-120 rounded shadow-lg mx-auto border border-palette-lighter'>
        <div className='h-64 border-b-2 border-palette-lighter relative'>
          <Image
            src={imageNode}
            alt={imageNode}
            layout='fill'
            objectFit='contain'
            sizes='10'
            priority={true}
            className='transform duration-500 ease-in-out scale-90 hover:scale-100'
          />
        </div>
        <div className='h-48 relative'>
          <div className='font-primary text-lg pt-2 px-4 font-semibold'>
            {title}
          </div>
          <div className='text-sm text-gray-600 pt-2 px-4 font-primary font-light'>
            {author}
          </div>
          <div
            className='text-palette-dark font-primary font-medium text-base absolute bottom-0 left-0 mb-4 pl-4 pr-4 pb-1 pt-2 bg-palette 
            rounded-tl-sm triangle'
          >
            <>
                {tags ? (
                    tags.map((tag, index) => {
                        return (
                            <span key={index}>{`${capitalizeFirstLetter(tag)} `}</span>
                        )
                    })
                ) : (
                    <></>
                )}
            </>
          </div>
          <div
            className='text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle'
          >
            <Price
              currency='$'
              num={price}
              numSize='text-lg'
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
