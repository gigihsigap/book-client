import { ReactNode } from 'react';

export interface CartItem {
    variantId: number;
    variantQuantity: number;
    variantPrice: number; // Added optional variantPrice to match the expected type in createShopifyCheckout
    productImage?: string;
    productTitle?: string;
    productHandle?: string;
    variantTitle?: string;
    originalSrc?: string;
}
  
export type Cart = CartItem[];
  
export interface CartProviderProps {
    children: ReactNode;
}

export interface Book {
    id: number;
    title: string;
    author: string; // author
    cover: string; // cover
    price: number;
    tags: string[];
    slug: string;
    created_at: string;
    updated_at: string;
}