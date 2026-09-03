import { Layout } from '@/components/layout/Layout'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage })),
)
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage })),
)
const ProductsPage = lazy(() =>
  import('@/pages/ProductsPage').then((module) => ({ default: module.ProductsPage })),
)
const ProductCategoryPage = lazy(() =>
  import('@/pages/ProductCategoryPage').then((module) => ({
    default: module.ProductCategoryPage,
  })),
)
const ProductDetailPage = lazy(() =>
  import('@/pages/ProductDetailPage').then((module) => ({ default: module.ProductDetailPage })),
)
const BrandsPage = lazy(() =>
  import('@/pages/BrandsPage').then((module) => ({ default: module.BrandsPage })),
)
const BrandDetailPage = lazy(() =>
  import('@/pages/BrandDetailPage').then((module) => ({ default: module.BrandDetailPage })),
)
const PrivateLabelPage = lazy(() =>
  import('@/pages/PrivateLabelPage').then((module) => ({ default: module.PrivateLabelPage })),
)
const GlobalSourcingPage = lazy(() =>
  import('@/pages/GlobalSourcingPage').then((module) => ({
    default: module.GlobalSourcingPage,
  })),
)
const PackagingPage = lazy(() =>
  import('@/pages/PackagingPage').then((module) => ({ default: module.PackagingPage })),
)
const InsightsPage = lazy(() =>
  import('@/pages/InsightsPage').then((module) => ({ default: module.InsightsPage })),
)
const InsightDetailPage = lazy(() =>
  import('@/pages/InsightDetailPage').then((module) => ({ default: module.InsightDetailPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((module) => ({ default: module.ContactPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
)

function RouteFallback() {
  return <div className="min-h-svh bg-cream" aria-hidden="true" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:category" element={<ProductCategoryPage />} />
            <Route path="products/:category/:product" element={<ProductDetailPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="brands/zahita" element={<Navigate to="/brands/zaitha" replace />} />
            <Route path="brands/:brand" element={<BrandDetailPage />} />
            <Route path="private-label" element={<PrivateLabelPage />} />
            <Route path="global-sourcing" element={<GlobalSourcingPage />} />
            <Route path="packaging" element={<PackagingPage />} />
            <Route path="insights" element={<InsightsPage />} />
            <Route path="insights/:slug" element={<InsightDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
