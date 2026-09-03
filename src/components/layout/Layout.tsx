import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { PageTransition } from '@/components/layout/PageTransition'
import { Cursor } from '@/components/ui/Cursor'
import { overlayRoutes } from '@/content/navigation'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { Outlet, useLocation } from 'react-router-dom'

export function Layout() {
  useSmoothScroll()
  const location = useLocation()
  const overlay = overlayRoutes.includes(location.pathname)

  return (
    <div className="min-h-svh overflow-x-hidden bg-cream">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-navy-deep"
      >
        Skip to content
      </a>
      <Cursor />
      <PageTransition />
      <Navbar overlay={overlay} />
      <main id="main" className="min-w-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
