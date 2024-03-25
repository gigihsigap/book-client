"use client"

import { useState } from 'react'
import BackToProductButton from '@/components/BackToProductButton'
import ProductInfo from '@/components/ProductInfo'
import ProductForm from '@/components/ProductForm'
import { Book } from '@/types'

type ProductDetailsProps = {
    book: Book
}

function ProductDetails({ book }: ProductDetailsProps) {
  const [variantPrice, setVariantPrice] = useState(book.price)

  return (
    <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
      <BackToProductButton />
      <ProductInfo 
        book={book}
      />
      <ProductForm 
        book={book}
      />
    </div>
  )
}

export default ProductDetails
