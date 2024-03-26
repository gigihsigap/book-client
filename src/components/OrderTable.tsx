import { useState, useEffect } from 'react'
import { useUpdateCartQuantityContext } from '@/context/Stores'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Price from '@/components/Price'
import { getCartSubTotal } from '@/lib/cartUtils'

import { CartItem } from '@/types'
import Image from 'next/image'


interface OrderTableProps {
  cart: CartItem[]
}

function OrderTable({ cart }: OrderTableProps): JSX.Element {
  const updateCartQuantity = useUpdateCartQuantityContext()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState<number>(0)

  useEffect(() => {
    setCartItems(cart)
    setSubtotal(getCartSubTotal(cart))
  }, [cart])

  function updateItem(id: string, quantity: number | string): void {
    updateCartQuantity(id, Number(quantity))
  }

  return (
    <div className='min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full'>
      <table className='mx-auto'>
        <thead>
          <tr className='uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light'>
            <th className='font-primary font-normal px-6 py-4'>Book</th>
            <th className='font-primary font-normal px-6 py-4'>Price</th>
            <th className='font-primary font-normal px-6 py-4 hidden sm:table-cell'>Status</th>
            <th className='font-primary font-normal px-6 py-4'>Remove</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-palette-lighter'>
          {cartItems.map(item => (
            <tr key={item.book.id} className='text-sm sm:text-base text-gray-600 text-center'>
              <td className='font-primary font-medium px-4 sm:px-6 py-4 flex items-center'>
                <Image
                  src={item.book.cover || ''}
                  alt={item.book.cover || ''}
                  height={64}
                  width={64}
                  className={`hidden sm:inline-flex`}
                />
                <Link passHref href={`/products/${item.book.slug}`}>
                  <div className='pt-1 hover:text-palette-dark'>
                    {item.book.title}
                  </div>
                </Link>
              </td>
              <td className='font-primary font-medium px-4 sm:px-6 py-4'>
                {/* <input
                  type='number'
                  inputMode='numeric'
                  id='variant-quantity'
                  name='variant-quantity'
                  min='1'
                  step='1'
                  value={item.variantQuantity}
                  onChange={(e) => updateItem(item.variantId, e.target.value)}
                  className='text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light'
                /> */}
                <Price
                  currency='$'
                  num={item.book.price}
                  numSize='text-lg'
                />
              </td>
              <td className='font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell'>
                PENDING
              </td>
              <td className='font-primary font-medium px-4 sm:px-6 py-4'>
                <button
                  aria-label='delete-item'
                  className=''
                  onClick={() => updateItem(item.book.id.toString(), 0)}
                >
                  <FontAwesomeIcon icon={faTimes} className='w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter' />
                </button>
              </td>
            </tr>
          ))}
          {
            subtotal === 0 ?
              null
              :
              <tr className='text-center'>
                <td></td>
                <td className='font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4'>Subtotal</td>
                <td className='font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4'>
                  <Price
                    currency='$'
                    num={subtotal}
                    numSize='text-xl'
                  />
                </td>
                <td></td>
              </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable