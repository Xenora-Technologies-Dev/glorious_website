import { productCategories } from '@/content/products'
import { brands } from '@/content/brands'

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

export type MegaKey = 'products' | 'brands' | 'solutions'

export type PrimaryNavItem = {
  label: string
  href?: string
  mega?: MegaKey
}

export const primaryNav: PrimaryNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products', mega: 'products' },
  { label: 'Brands', href: '/brands', mega: 'brands' },
  { label: 'Solutions', mega: 'solutions' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact Us', href: '/contact' },
]

export const productMega = {
  categories: productCategories.map((category) => ({
    label: category.navLabel,
    href: `/products/${category.slug}`,
  })),
  featured: (['american-hat', 'zaitha', 'delicia'] as const).map((slug) => {
    const brand = brands.find((item) => item.slug === slug)!
    return {
      label: brand.name,
      href: brand.href,
      logo: brand.logo,
      logoAspect: brand.logoAspect,
    }
  }),
  extra: { label: 'Private Label', href: '/private-label' },
}

export const brandMega = brands.map((brand) => ({
  label: brand.name,
  href: brand.href,
  logo: brand.logo,
  logoAspect: brand.logoAspect,
}))

export const solutionsMega = [
  { label: 'Global Sourcing', href: '/global-sourcing', copy: 'Origin to market' },
  { label: 'Private Label', href: '/private-label', copy: 'Manufacture under your brand' },
  { label: 'Packaging', href: '/packaging', copy: 'Labeling and documentation' },
  { label: 'Factories & Partners', href: '/factories', copy: 'Manufacturing network' },
] as const

export const footerLinks = {
  company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Global Sourcing', href: '/global-sourcing' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact Us', href: '/contact' },
  ],
  products: [
    { label: 'All products', href: '/products' },
    { label: 'Food', href: '/products' },
    { label: 'Frozen & Protein', href: '/products/frozen' },
    { label: 'Non-food', href: '/products/non-food' },
    { label: 'Commodities', href: '/products/commodities' },
    { label: 'Confectionery', href: '/products/confectionery' },
    { label: 'Beverages', href: '/products/beverages' },
  ],
  services: [
    { label: 'Private Label', href: '/private-label' },
    { label: 'Packaging', href: '/packaging' },
    { label: 'Global Sourcing', href: '/global-sourcing' },
    { label: 'Factories & Partners', href: '/factories' },
    { label: 'Request a Quote', href: '/contact?intent=quote' },
  ],
} as const
