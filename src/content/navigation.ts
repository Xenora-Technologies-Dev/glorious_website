import { productCategories } from '@/content/products'
import { catalogueBrands } from '@/content/brands'

export const navCta = {
  label: 'Start a Conversation',
  href: '/contact',
} as const

export const conversionPaths = [
  { label: 'Request Product Information', href: '/contact?intent=product' },
  { label: 'Request a Quote', href: '/contact?intent=quote' },
  { label: 'Discuss Your Brand', href: '/contact?intent=private-label' },
  { label: 'Become a Partner', href: '/contact?intent=partner' },
  { label: 'Contact Sales', href: '/contact?intent=sales' },
] as const

export const overlayRoutes = ['/', '/about', '/private-label', '/global-sourcing', '/packaging']

export const productMega = {
  categories: productCategories.map((category) => ({
    label: category.navLabel,
    href: `/products/${category.slug}`,
  })),
  featured: [
    { label: 'American Hat', href: '/brands/american-hat' },
    { label: 'Zahita', href: '/brands/zahita' },
    { label: 'Ficus Food', href: '/brands/ficus' },
  ],
  extra: { label: 'Private Label', href: '/private-label' },
}

export const brandMega = catalogueBrands.map((brand) => ({
  label: brand.name,
  href: brand.href,
}))

export const solutionsMega = [
  { label: 'Global Sourcing', href: '/global-sourcing', copy: 'Origin to market' },
  { label: 'Private Label', href: '/private-label', copy: 'Manufacture under your brand' },
  { label: 'Packaging', href: '/packaging', copy: 'Labeling and documentation' },
] as const

export const companyMega = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Global Sourcing', href: '/global-sourcing' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  products: [
    { label: 'All products', href: '/products' },
    { label: 'Pasta', href: '/products/pasta' },
    { label: 'Oils', href: '/products/oils' },
    { label: 'Tea', href: '/products/tea' },
    { label: 'Grocery', href: '/products/grocery' },
  ],
  services: [
    { label: 'Private Label', href: '/private-label' },
    { label: 'Packaging', href: '/packaging' },
    { label: 'Global Sourcing', href: '/global-sourcing' },
    { label: 'Request a Quote', href: '/contact?intent=quote' },
  ],
} as const
