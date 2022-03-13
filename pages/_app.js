import '../styles/globals.css'
import { CartProvider } from '../context/cartContext'
import { UserProvider } from '../context/userContext'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <UserProvider>
        <Toaster />
        <Component {...pageProps} />
      </UserProvider>
    </CartProvider>
  )
}

export default MyApp
