import { fetchBooks } from '@/actions/fetch-books'
import { BookListing } from '@/components/BookListing'
import { LoadMore } from '@/components/LoadMore'
import PageTitle from '@/components/PageTitle'

export default async function Search({ params }: { params: {title: string}}) {
  const books = await fetchBooks(1, 'title', params.title)
  console.log("Books searched:", books?.length)
  return (
    <div className='container mx-auto p-4 min-h-screen max-w-5xl'>
      <PageTitle text='Glasgow Books' />
      <p className='max-w-xl text-center px-2 mx-auto text-base text-gray-600 mb-12'>
        Searching for books with the title <span className='font-semibold'>"{params.title}"</span>
      </p>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <BookListing books={books}/>
        <LoadMore page={1} attr={'title'} value={params.title} />
      </div>
    </div>
  )
}
