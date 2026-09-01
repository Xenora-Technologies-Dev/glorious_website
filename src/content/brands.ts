import type { ImageKey } from '@/content/images'

export type Brand = {
  slug: string
  name: string
  href: string
  note?: string
  hasPortfolio: boolean
  atmosphere: ImageKey
}

export const brands: Brand[] = [
  { slug: 'american-hat', name: 'American Hat', href: '/brands/american-hat', hasPortfolio: true, atmosphere: 'pasta' },
  {
    slug: 'zahita',
    name: 'Zahita',
    href: '/brands/zahita',
    note: 'Also referenced as Zaitha in catalogue artwork.',
    hasPortfolio: true,
    atmosphere: 'oliveOil',
  },
  { slug: 'tash', name: 'Tash', href: '/brands/tash', hasPortfolio: true, atmosphere: 'spices' },
  { slug: 'dachi', name: 'Dachi', href: '/brands/dachi', hasPortfolio: true, atmosphere: 'tea' },
  { slug: 'zarella', name: 'Zarella', href: '/brands/zarella', hasPortfolio: true, atmosphere: 'honey' },
  { slug: 'delicia', name: 'Delicia', href: '/brands/delicia', hasPortfolio: true, atmosphere: 'sauces' },
  { slug: 'ficus', name: 'Ficus Food', href: '/brands/ficus', hasPortfolio: true, atmosphere: 'legumes' },
  {
    slug: 'legacy-valley',
    name: 'Legacy Valley',
    href: '/brands/legacy-valley',
    note: 'Present in supplied branding artwork. A product portfolio is not listed from the catalogue.',
    hasPortfolio: false,
    atmosphere: 'warehouse',
  },
]

export const catalogueBrands = brands.filter((brand) => brand.hasPortfolio)

export function getBrand(slug: string) {
  return brands.find((brand) => brand.slug === slug)
}
