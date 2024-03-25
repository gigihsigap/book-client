"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createShopifyCheckout, updateShopifyCheckout, setLocalData, saveLocalData } from '../lib/cartUtils';
import { Cart, CartItem, CartProviderProps } from '@/types';

const CartContext = createContext<[Cart, string, boolean]>([[], '', false]);
const AddToCartContext = createContext<(newItem: CartItem) => void>(() => {});
const UpdateCartQuantityContext = createContext<(id: string, quantity: number) => void>(() => {}); // Changed quantity type to number

export function useCartContext(): [Cart, string, boolean] {
  return useContext(CartContext);
}

export function useAddToCartContext(): (newItem: CartItem) => void {
  return useContext(AddToCartContext);
}

export function useUpdateCartQuantityContext(): (id: string, quantity: number) => void { // Changed quantity type to number
  return useContext(UpdateCartQuantityContext);
}

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Cart>([]);
  const [checkoutId, setCheckoutId] = useState<string>('');
  const [checkoutUrl, setCheckoutUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setLocalData(setCart, setCheckoutId, setCheckoutUrl);
  }, []);

  useEffect(() => {
    const onReceiveMessage = (e: StorageEvent) => {
      setLocalData(setCart, setCheckoutId, setCheckoutUrl);
    };

    window.addEventListener('storage', onReceiveMessage);
    return () => {
      window.removeEventListener('storage', onReceiveMessage);
    };
  }, []);

  async function addToCart(newItem: CartItem): Promise<void> {
    setIsLoading(true);
  
    if (cart.length === 0) {
      setCart([newItem]);
  
      const response = await createShopifyCheckout(newItem);
      setCheckoutId(response.id);
      setCheckoutUrl(response.webUrl);
      saveLocalData([newItem], response.id, response.webUrl);
    } else {
      let newCart = [...cart];
      let itemAdded = false;
  
      newCart.forEach(item => {
        if (item.variantId === newItem.variantId) {
          item.variantQuantity += newItem.variantQuantity;
          itemAdded = true;
        }
      });
  
      let newCartWithItem = [...newCart];
      if (!itemAdded) {
        newCartWithItem = [...newCart, newItem];
      }
  
      setCart(newCartWithItem);
      await updateShopifyCheckout(newCartWithItem, checkoutId);
      saveLocalData(newCartWithItem, checkoutId, checkoutUrl);
    }
  
    setIsLoading(false);
  }
  
  async function updateCartItemQuantity(id: string, quantity: number | string): Promise<void> {
    setIsLoading(true);
    let newQuantity: number;
  
    if (typeof quantity === 'string') {
      newQuantity = Math.floor(Number(quantity));
    } else {
      newQuantity = Number(quantity);
    }
  
    let newCart = [...cart];
    newCart.forEach(item => {
      if (item.variantId === id) {
        item.variantQuantity = newQuantity;
      }
    });
  
    newCart = newCart.filter(i => i.variantQuantity !== 0);
    setCart(newCart);
  
    await updateShopifyCheckout(newCart, checkoutId);
    saveLocalData(newCart, checkoutId, checkoutUrl);
    setIsLoading(false);
  }
  return (
    <CartContext.Provider value={[cart, checkoutUrl, isLoading]}>
      <AddToCartContext.Provider value={addToCart}>
        <UpdateCartQuantityContext.Provider value={updateCartItemQuantity}>
          {children}
        </UpdateCartQuantityContext.Provider>
      </AddToCartContext.Provider>
    </CartContext.Provider>
  );
}
