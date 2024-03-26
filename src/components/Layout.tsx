import { ReactNode } from 'react'
import { CartProvider } from '@/context/Store'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <CartProvider>
      <div className='flex flex-col justify-between min-h-screen'>
        <Nav />
        
        <main>
          {children}
        </main>
        
        <Footer />
      </div>
    </CartProvider>
  )
}

export default Layout
