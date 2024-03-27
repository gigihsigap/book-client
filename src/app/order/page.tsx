'use client'

import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import OrderTable from '@/components/OrderTable'
import CheckOutButton from '@/components/CheckOutButton'
import BackToProductButton from '@/components/BackToProductButton'
import { useCartContext, useProfileContext, usePurchaseMadeContext } from '@/context/Stores'
import { getCartSubTotal } from '@/lib/cartUtils'

function OrderPage() {
  const pageTitle = `Cart | ${process.env.siteTitle}`  
  const [cart, checkoutUrl] = useCartContext()
  const purchaseMade = usePurchaseMadeContext()
  const points = useProfileContext()

  // Function to handle checkout
  const handleCheckout = () => {
    const totalCost = getCartSubTotal(cart);
    purchaseMade(totalCost)
  };

  return (
    <div className='container mx-auto mb-20 min-h-screen'>
      <SEO title={pageTitle} />
      <PageTitle text='Your Order' />
      <h1 className='leading-relaxed font-primary text-3xl text-center mt-4 py-2 sm:py-4'>
        Remaining Funds: <span className='font-semibold'>$ {points}</span>
      </h1>
      <OrderTable 
        cart={cart}
      />
      <div className='max-w-sm mx-auto space-y-4 px-2'>
        {cart.length > 0 && (
          <CheckOutButton webUrl={checkoutUrl} onClick={handleCheckout} />
        )}
        <BackToProductButton />
      </div>
    </div>
  )
}

export default OrderPage
