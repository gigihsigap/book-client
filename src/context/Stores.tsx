'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createShopifyCheckout, updateShopifyCheckout, saveLocalData } from '../lib/cartUtils'
import { Cart, CartItem, CartProviderProps } from '@/types'

const CartContext = createContext<[Cart, string, boolean]>([[], '', false])
const AddToCartContext = createContext<(newItem: CartItem) => void>(() => {})
const UpdateCartQuantityContext = createContext<(id: string, quantity: number) => void>(() => {}) // Changed quantity type to number
const ProfileContext = createContext<(number)>(0)
const PurchaseMadeContext = createContext<(cost: number) => void>(() => {})

export function useCartContext(): [Cart, string, boolean] {
  return useContext(CartContext)
}

export function useAddToCartContext(): (newItem: CartItem) => void {
  return useContext(AddToCartContext)
}

export function useUpdateCartQuantityContext(): (id: string, quantity: number) => void { // Changed quantity type to number
  return useContext(UpdateCartQuantityContext)
}

export function useProfileContext(): (number) {
  return useContext(ProfileContext)
}

export function usePurchaseMadeContext(): (cost: number) => void { // Changed quantity type to number
  return useContext(PurchaseMadeContext)
}

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Cart>([])
  const [points, setPoints] = useState<number>(100)
  const [checkoutId, setCheckoutId] = useState<string>('')
  const [checkoutUrl, setCheckoutUrl] = useState<string>('/1') // Where the user will check out to
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    // setLocalData(setCart, setCheckoutId, setCheckoutUrl)
  }, [])

  useEffect(() => {
    const onReceiveMessage = (e: StorageEvent) => {
      // setLocalData(setCart, setCheckoutId, setCheckoutUrl)
    }

    window.addEventListener('storage', onReceiveMessage)
    return () => {
      window.removeEventListener('storage', onReceiveMessage)
    }
  }, [])

  async function addToCart(newItem: CartItem): Promise<void> {
    setIsLoading(true)
  
    if (cart.length === 0) {
      setCart([newItem])
  
      // const response = await createShopifyCheckout(newItem)
      // setCheckoutId(response.id)
      // setCheckoutUrl(response.webUrl)
      // saveLocalData([newItem], response.id, response.webUrl)
    } else {
      let newCart = [...cart]
      let itemAdded = false
  
      newCart.forEach(item => {
        if (item.book.id.toString() === newItem.book.id.toString()) {
          item.variantQuantity += newItem.variantQuantity
          itemAdded = true
        }
      })
  
      let newCartWithItem = [...newCart]
      if (!itemAdded) {
        newCartWithItem = [...newCart, newItem]
      }
  
      setCart(newCartWithItem)
      await updateShopifyCheckout(newCartWithItem, checkoutId)
      saveLocalData(newCartWithItem, checkoutId, checkoutUrl)
    }
  
    setIsLoading(false)
  }
  
  async function updateCartItemQuantity(id: string, quantity: number | string): Promise<void> {
    setIsLoading(true)
    let newQuantity: number
  
    if (typeof quantity === 'string') {
      newQuantity = Math.floor(Number(quantity))
    } else {
      newQuantity = Number(quantity)
    }
  
    let newCart = [...cart]
    newCart.forEach(item => {
      if (item.book.id.toString() === id) {
        item.variantQuantity = newQuantity
      }
    })
  
    newCart = newCart.filter(i => i.variantQuantity !== 0)
    setCart(newCart)
  
    await updateShopifyCheckout(newCart, checkoutId)
    saveLocalData(newCart, checkoutId, checkoutUrl)
    setIsLoading(false)
  }

  async function purchaseMade(cost: number): Promise<void> {
    setIsLoading(true)
    if (points >= cost) {
      const calculatePoints = points - cost
      setCart([])
      saveLocalData([], checkoutId, checkoutUrl)
      setPoints(calculatePoints)
      alert("You have purchased the item!");
    } else {
      alert("Not enough points to make this purchase!");
    }
    setIsLoading(false)
  }

  return (
    <CartContext.Provider value={[cart, checkoutUrl, isLoading]}>
      <ProfileContext.Provider value={points}>
        <AddToCartContext.Provider value={addToCart}>
          <UpdateCartQuantityContext.Provider value={updateCartItemQuantity}>
            <PurchaseMadeContext.Provider value={purchaseMade}>
            {children}
            </PurchaseMadeContext.Provider>
          </UpdateCartQuantityContext.Provider>
        </AddToCartContext.Provider>
      </ProfileContext.Provider>
    </CartContext.Provider>
  )
}
