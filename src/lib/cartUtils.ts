import { Book } from '@/types'
import { createCheckout, updateCheckout } from './shopify'

interface CartItem {
  book: Book
}

export function saveLocalData(cart: CartItem[], checkoutId: string, checkoutUrl: string): void {
  localStorage.setItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME!, JSON.stringify([cart, checkoutId, checkoutUrl]))
}

function getLocalData(): [CartItem[], string, string] | null {
  const data = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME!)
  return data ? JSON.parse(data) : null
}

export function setLocalData(setCart: (cart: CartItem[]) => void, setCheckoutId: (id: string) => void, setCheckoutUrl: (url: string) => void): void {
  const localData = getLocalData()

  if (localData) {
    if (Array.isArray(localData[0])) {
      setCart([...localData[0]])
    } else {
      setCart([localData[0]])
    }
    setCheckoutId(localData[1])
    setCheckoutUrl(localData[2])
  }
}

export async function createShopifyCheckout(newItem: CartItem): Promise<any> {
  const data = await createCheckout(newItem.book.id.toString(), 1)
  return data
}

export async function updateShopifyCheckout(updatedCart: CartItem[], checkoutId: string): Promise<void> {
  const lineItems = updatedCart.map(item => ({
    variantId: item.book.id.toString(),
    quantity: 1,
  }))

  await updateCheckout(checkoutId, lineItems)
}

export function getCartSubTotal(cart: CartItem[]): number {
  if (cart.length === 0) {
    return 0
  } else {
    let totalPrice = 0
    cart.forEach(item => totalPrice += parseFloat(item.book.price.toString()))
    return Math.round(totalPrice * 100) / 100
  }
}
