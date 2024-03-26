'use client'

import { useState } from 'react'
import { fetchBooks } from '@/actions/fetch-books'
import { BookListing } from '@/components/BookListing'
import { LoadMore } from '@/components/LoadMore'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Book } from '@/types'

export default function Search({ params }: { params: { title: string } }) {
  const [searchInput, setSearchInput] = useState(params.title)
  const [books, setBooks] = useState<Book[]>([])

  const handleSearch = async () => {
    const searchedBooks = await fetchBooks(1, 'title', searchInput)
    console.log("Books searched:", searchedBooks?.length)
    if (searchedBooks && searchedBooks.length > 0) {
      setBooks(searchedBooks)
    }
  }

  

  return (
    <div className='container mx-auto p-4 min-h-screen max-w-5xl'>
      <PageTitle text='Glasgow Books' />
      <p className='max-w-xl text-center px-2 mx-auto text-base text-gray-600 mb-12'>
        Searching for books with the title <span className='font-semibold'>"{params.title}"</span>
      </p>
      <div className="flex justify-center items-center mb-6">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder={"Search a book"} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <BookListing books={books} />
        {/* Assuming LoadMore needs to be placed here */}
        <LoadMore page={1} attr={'title'} value={params.title} />
      </div>
    </div>
  )
}
