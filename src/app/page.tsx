import { fetchBooks } from '@/actions/fetch-books'
import { Books } from '@/components/BookListing'
import { LoadMore } from '@/components/LoadMore'
import StoreHeading from '@/components/StoreHeading'

export default async function Home() {
  const books = await fetchBooks(1)

  return (
    <div className='container mx-auto p-4 min-h-screen max-w-5xl'>
      <StoreHeading />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <Books books={books}/>
        <LoadMore />
        
      </div>
    </div>
  )
}
