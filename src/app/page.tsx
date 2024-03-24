import { fetchBooks } from "@/actions/fetch-books";
import { Books } from "@/components/books";
import { LoadMore } from "@/components/load-more";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

export default async function Home() {
  const books = await fetchBooks(1);

  return (
    <div className="container mx-auto p-4 min-h-screen max-w-5xl">
      <h1 className="text-3xl font-bold mb-4 text-center"> Infinite Books </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Books  books={books}/>
        <LoadMore />
      </div>
    </div>
  );
}
