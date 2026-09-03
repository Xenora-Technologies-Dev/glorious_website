import type { ImageKey } from '@/content/images'

export type BrandLogoAspect = 'landscape' | 'square' | 'portrait'

export type Brand = {
  slug: string
  name: string
  href: string
  logo: string
  logoAspect: BrandLogoAspect
  note?: string
  hasPortfolio: boolean
  atmosphere: ImageKey
}

export const brands: Brand[] = [
  {
    slug: 'american-hat',
    name: 'American Hat',
    href: '/brands/american-hat',
    logo: '/brand/brand_logos/American_Hat_Logo.png',
    logoAspect: 'landscape',
    hasPortfolio: true,
    atmosphere: 'pasta',
  },
  {
    slug: 'zaitha',
    name: 'Zaitha',
    href: '/brands/zaitha',
    logo: '/brand/brand_logos/Zaitha_logo.png',
    logoAspect: 'landscape',
    hasPortfolio: true,
    atmosphere: 'oliveOil',
  },
  {
    slug: 'tash',
    name: 'Tash',
    href: '/brands/tash',
    logo: '/brand/brand_logos/Tash_Logo.png',
    logoAspect: 'landscape',
    hasPortfolio: true,
    atmosphere: 'spices',
  },
  {
    slug: 'dachi',
    name: 'Dachi',
    href: '/brands/dachi',
    logo: '/brand/brand_logos/Dachi_Logo.png',
    logoAspect: 'square',
    hasPortfolio: true,
    atmosphere: 'tea',
  },
  {
    slug: 'zarella',
    name: 'Zarella',
    href: '/brands/zarella',
    logo: '/brand/brand_logos/Zarella_Logo.png',
    logoAspect: 'portrait',
    hasPortfolio: true,
    atmosphere: 'honey',
  },
  {
    slug: 'delicia',
    name: 'Delicia',
    href: '/brands/delicia',
    logo: '/brand/brand_logos/Delicia_Logo.png',
    logoAspect: 'landscape',
    hasPortfolio: true,
    atmosphere: 'sauces',
  },
  {
    slug: 'legacy-valley',
    name: 'Legacy Valley',
    href: '/brands/legacy-valley',
    logo: '/brand/brand_logos/Legacy_Valley_Logo.png',
    logoAspect: 'portrait',
    hasPortfolio: true,
    atmosphere: 'warehouse',
  },
]

export const catalogueBrands = brands.filter((brand) => brand.hasPortfolio)

export function getBrand(slug: string) {
  const key = slug === 'zahita' ? 'zaitha' : slug
  return brands.find((brand) => brand.slug === key)
}
