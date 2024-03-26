'use client'

import { useEffect, useState } from 'react';
import ProductSection from '@/components/ProductSection';
import { fetchBookBySlug } from '@/actions/fetch-books';
import { Book } from '@/types';
import { Spinner } from '@/components/ui/spinner';

export default function BookDetails({ params }: { params: { slug: string } }) {
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBook = await fetchBookBySlug(params.slug);
        console.log("fetchedBooks", fetchedBook)
        if (fetchedBook !== null) {
          setBook(fetchedBook);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchData();
  }, [params.slug]); // Dependency array to re-fetch data when slug changes

  if (!book) {
    return <div className='flex justify-center items-center h-screen'>
      <Spinner/>
    </div>
    ;
  }

  // Assuming you want to render the first book in the array
  return (
    <div className='min-h-screen py-12 sm:pt-20'>
      <ProductSection book={book} />
    </div>
  );
}
