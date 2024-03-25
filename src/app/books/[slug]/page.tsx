import BackToProductButton from "@/components/BackToProductButton"
import ProductSection from '@/components/ProductSection'
import { fetchBookBySlug } from "@/actions/fetch-books"
import { Book } from "@/types";

export default function BookDetails({ params }: { params: {slug: string}}) {
  // const books = await fetchBooks(1);

  const book: Book = {
    "id": 3,
    "created_at": "2024-03-24T19:10:47.252Z",
    "updated_at": "2024-03-24T19:10:47.252Z",
    "title": "Social Dynamics in Swiss Society",
    "author": "Robin Tillmann, Marieke Voorpostel, Peter Farago",
    "cover": "https://www.dbooks.org/img/books/3319895575s.jpg",
    "price": 15,
    "tags": [
        "culture"
    ],
    "slug": "social-dynamics-in-swiss-society"
  }

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductSection book={book} />
    </div>   
  )
}

// export async function getStaticPaths() {
//   // const productSlugs = await getProductSlugs()
//   const paths = productSlugs.map((slug) => {    
//     const product = String(slug.node.handle)
//     return {
//       params: { product }
//     }
//   })
//   return {
//     paths,
//     fallback: false,
//   }
// }

// export async function getStaticProps({ params }: Book) {
//   // const productData = await getProduct(params.product) 
//   const productData = await fetchBookBySlug(params.slug) 
//   return {
//     props: {
//       productData,
//     },
//   }
// }

// function ProductPage({ productData }) {  
//   return (
//     <div className="min-h-screen py-12 sm:pt-20">
//       <BackToProductButton />
//       <ProductSection productData={productData} />
//     </div>
//   )
// }

{/* <div>Details about book {params.slug}</div> */}
