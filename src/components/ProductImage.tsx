'use client'

import { useState, useRef } from 'react'
import Image from 'next/legacy/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Book } from '@/types'

type ProductImageProps = {
    book: Book
}

function ProductImage({ book } : ProductImageProps) {
  const [mainImg, setMainImg] = useState(book.cover)

  const ref = useRef<HTMLDivElement>(null)

  function scroll(scrollOffset: number) {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset
    }
  }

  return (
    <div className='w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg'>
        <div className='relative h-96 flex justify-center items-center'> {/* Center the image horizontally and vertically */}
            <Image
                src={mainImg}
                alt={book.title}
                layout='fill'
                objectFit='contain' // Prevent stretching
                priority={true}
                className='transform duration-500 ease-in-out scale-95 hover:scale-100'
            />
        </div>
      <div className='relative flex border-t border-palette-lighter'>
        <button
          aria-label='left-scroll'
          className='h-32 bg-palette-lighter hover:bg-palette-light  absolute left-0 z-10 opacity-75'
          onClick={() => scroll(-300)}
        >
          <FontAwesomeIcon icon={faArrowLeft} className='w-3 mx-1 text-palette-primary' />
        </button>
        <div
          ref={ref}
          style={{ scrollBehavior: 'smooth' }}
          className='flex space-x-1 w-full overflow-auto border-t border-palette-lighter justify-center items-center'
        >
          {
            [book, book, book, book].map((each, index) => (
              <button
                key={index}
                className='relative w-40 h-32 flex-shrink-0 rounded-sm '
                onClick={() => setMainImg(each.cover)}
              >
                <Image
                  src={mainImg}
                  alt={each.title}
                  layout='fill'
                  objectFit='contain' // Prevent stretching
                  className=''
                />
                
              </button>
            ))
          }
        </div>
        <button
          aria-label='right-scroll'
          className='h-32 bg-palette-lighter hover:bg-palette-light  absolute right-0 z-10 opacity-75'
          onClick={() => scroll(300)}
        >
          <FontAwesomeIcon icon={faArrowRight} className='w-3 mx-1 text-palette-primary' />
        </button>
      </div>
    </div>
  )
}

export default ProductImage
