import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import Preloader from './components/Preloader'
import CursorFollower from './components/CursorFollower'
import Home from './sections/Home'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function AppLayout() {
  const location = useLocation()
  useSmoothScroll()
  const onCheckout = location.pathname === '/checkout'

  return (
    <>
      <Preloader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="*" element={<main className="not-found"><span>404</span><h1>Looks like you took a little detour.</h1><Link className="button button--primary" to="/">Back to the cafe</Link></main>} />
      </Routes>
      <Footer />
      {!onCheckout && <WhatsAppFab />}
      <CursorFollower />
      <CartDrawer />
      <Toaster position="top-center" toastOptions={{ duration: 2600 }} />
    </>
  )
}

export default function App() {
  return <BrowserRouter><AppLayout /></BrowserRouter>
}
