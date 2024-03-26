'use client'

import { fetchBooks } from '@/actions/fetch-books'
import { BookListing } from '@/components/BookListing'
import { LoadMore } from '@/components/LoadMore'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Book } from '@/types'
import { useEffect, useState } from 'react'

export default function Home() {
  const [searchInput, setSearchInput] = useState('')
  const [finalSearchInput, setFinalSearchInput] = useState('')
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  const handleSearch = async () => {
    setLoading(true) // Set loading state to true when starting search
    const searchedBooks = await fetchBooks(1, 'title', searchInput)
    setBooks(searchedBooks || []) // Update books state with search result
    setLoading(false) // Set loading state to false after search completes
    setFinalSearchInput(searchInput) // Update final search input when search is finalized
  }

  useEffect(() => {
    const fetchData = async () => {
      const searchedBooks = await fetchBooks(1, 'title', finalSearchInput);
      setBooks(searchedBooks || []);
      setLoading(false);
    };

    // Fetch data when the component mounts or when finalSearchInput changes
    fetchData();
  }, [finalSearchInput]);

  return (
    <div className='container mx-auto p-4 min-h-screen max-w-5xl'>
      <PageTitle text='Glasgow Books' />
      <p className='max-w-xl text-center px-2 mx-auto text-base text-gray-600 mb-12'>
        Times are tough. Liven up your world with comfy books and cup of joe. ☕
      </p>

      <div className="flex justify-center items-center mb-6">
        <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
          <Input type="text" placeholder={"Search a book"} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <Button onClick={handleSearch}>Search Title</Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-4">
          <Spinner />
        </div>
      ) : !loading && books.length > 0 ? (
        <>
          <BookListing books={books}/>
          <LoadMore page={1} attr={'title'} value={finalSearchInput} />
        </>
      ) : (
        <div className='justify-center text-center mb-6'>
          No books available! 😭
        </div>
      )}

    </div>
  )
}
