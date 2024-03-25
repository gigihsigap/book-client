// import { fetchBooks } from "@/actions/fetch-books";
// import { Books } from "@/components/books";
// import { LoadMore } from "@/components/load-more";
// import StoreHeading from "@/components/StoreHeading";

// export default async function Home() {
//   const books = await fetchBooks(1);

//   return (
//     <div className="container mx-auto p-4 min-h-screen max-w-5xl">
//       <StoreHeading />
//       Your Order
//     </div>
//   );
// }

"use client"

import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import CartTable from '@/components/CartTable'
import CheckOutButton from '@/components/CheckOutButton'
import BackToProductButton from '@/components/BackToProductButton'
import { useCartContext } from '@/context/Store'

function OrderPage() {
  const pageTitle = `Cart | ${process.env.siteTitle}`  
  const [cart, checkoutUrl] = useCartContext()

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <SEO title={pageTitle} />
      <PageTitle text="Your Order" />
      <CartTable 
        cart={cart}
      />
      <div className="max-w-sm mx-auto space-y-4 px-2">
        <CheckOutButton webUrl={checkoutUrl} />
        <BackToProductButton />
      </div>

    </div>
  )
}

export default OrderPage
