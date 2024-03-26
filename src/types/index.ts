import { ReactNode } from 'react'

export interface CartItem {
    book: Book
    variantQuantity: number
}
  
export type Cart = CartItem[]
  
export interface CartProviderProps {
    children: ReactNode
}

export interface Book {
    id: number
    title: string
    author: string // author
    cover: string // cover
    price: number
    tags: string[]
    slug: string
    created_at: string
    updated_at: string
}