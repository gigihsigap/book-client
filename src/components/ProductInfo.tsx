import Price from '@/components/Price'
import { Book } from '@/types'

type ProductInfoProps = {
    book: Book
}

function ProductInfo({ book }: ProductInfoProps) {
  return (
    <div className=" font-primary">
      <h1 className="leading-relaxed font-extrabold text-3xl py-2 sm:py-4">
        {book.title}
      </h1>
      <p className="font-medium text-lg">
        {book.author}
      </p>
      <div className="text-xl font-medium py-4 px-1">
        <Price
          currency="$"
          num={book.price}
          numSize="text-2xl"
        />
      </div>
    </div>
  )
}

export default ProductInfo
