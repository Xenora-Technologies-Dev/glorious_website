import type { ImageKey } from '@/content/images'

export type BrandLogoAspect = 'landscape' | 'square' | 'portrait'
export type BrandKind = 'owned' | 'partner'

export type Brand = {
  slug: string
  name: string
  href: string
  logo: string
  logoAspect: BrandLogoAspect
  note?: string
  hasPortfolio: boolean
  atmosphere: ImageKey
  kind: BrandKind
}

export const brands: Brand[] = [
  {
    slug: 'american-hat',
    name: 'American Hat',
    href: '/brands/american-hat',
    logo: '/brand/brand_logos/American_Hat_Logo.png',
    logoAspect: 'landscape',
    hasPortfolio: true,
    atmosphere: 'sauces',
    kind: 'owned',
  },
  {
    slug: 'zaitha',
    name: 'Zaitha',
    href: '/brands/zaitha',
    logo: '/brand/brand_logos/Zaitha_logo.png',
    logoAspect: 'landscape',
    hasPortfolio: true,
    atmosphere: 'oliveOil',
    kind: 'owned',
  },
  {
    slug: 'tash',
    name: 'Tash',
    href: '/brands/tash',
    logo: '/brand/brand_logos/Tash_Logo.png',
    logoAspect: 'landscape',
    hasPortfolio: true,
    atmosphere: 'spices',
    kind: 'owned',
    note: 'Includes frozen & protein alongside ambient grocery lines.',
  },
  {
    slug: 'dachi',
    name: 'Dachi',
    href: '/brands/dachi',
    logo: '/brand/brand_logos/Dachi_Logo.png',
    logoAspect: 'square',
    hasPortfolio: true,
    atmosphere: 'legumes',
    kind: 'owned',
  },
  {
    slug: 'zarella',
    name: 'Zarella',
    href: '/brands/zarella',
    logo: '/brand/brand_logos/Zarella_Logo.png',
    logoAspect: 'portrait',
    hasPortfolio: true,
    atmosphere: 'pasta',
    kind: 'owned',
  },
  {
    slug: 'delicia',
    name: 'Delicia',
    href: '/brands/delicia',
    logo: '/brand/brand_logos/Delicia_Logo.png',
    logoAspect: 'landscape',
    hasPortfolio: true,
    atmosphere: 'pasta',
    kind: 'owned',
  },
  {
    slug: 'legacy-valley',
    name: 'Legacy Valley',
    href: '/brands/legacy-valley',
    logo: '/brand/brand_logos/Legacy_Valley_Logo.png',
    logoAspect: 'portrait',
    hasPortfolio: true,
    atmosphere: 'oliveGrove',
    kind: 'owned',
  },
  {
    slug: 'glorious-pack',
    name: 'Glorious Pack',
    href: '/brands/glorious-pack',
    logo: '/brand/glorious-pack/logo.png',
    logoAspect: 'square',
    hasPortfolio: true,
    atmosphere: 'warehouse',
    kind: 'owned',
    note: 'Disposable products for foodservice and retail — Cleaner Today / Greener Tomorrow.',
  },
]

export type PartnerBrand = {
  slug: string
  name: string
  logo: string
}

export const partnerBrands: PartnerBrand[] = [
  { slug: '7up.png', name: "7UP", logo: '/brand/partner_logos/7up.png' },
  { slug: 'actimel.png', name: "Actimel", logo: '/brand/partner_logos/actimel.png' },
  { slug: 'ben-jerrys.png', name: "Ben & Jerry's", logo: '/brand/partner_logos/ben-jerrys.png' },
  { slug: 'betty-crocker.png', name: "Betty Crocker", logo: '/brand/partner_logos/betty-crocker.png' },
  { slug: 'bonafont.png', name: "Bonafont", logo: '/brand/partner_logos/bonafont.png' },
  { slug: 'cadbury.png', name: "Cadbury", logo: '/brand/partner_logos/cadbury.png' },
  { slug: 'cheerios.png', name: "Cheerios", logo: '/brand/partner_logos/cheerios.png' },
  { slug: 'coca-cola.png', name: "Coca-Cola", logo: '/brand/partner_logos/coca-cola.png' },
  { slug: 'dannon.png', name: "Dannon", logo: '/brand/partner_logos/dannon.png' },
  { slug: 'dasani.png', name: "Dasani", logo: '/brand/partner_logos/dasani.png' },
  { slug: 'doritos.png', name: "Doritos", logo: '/brand/partner_logos/doritos.png' },
  { slug: 'evian.png', name: "Evian", logo: '/brand/partner_logos/evian.png' },
  { slug: 'fanta.png', name: "Fanta", logo: '/brand/partner_logos/fanta.png' },
  { slug: 'frosted-flakes.png', name: "Frosted Flakes", logo: '/brand/partner_logos/frosted-flakes.png' },
  { slug: 'galaxy.png', name: "Galaxy", logo: '/brand/partner_logos/galaxy.png' },
  { slug: 'green-giant.png', name: "Green Giant", logo: '/brand/partner_logos/green-giant.png' },
  { slug: 'haagen-dazs.png', name: "Haagen-Dazs", logo: '/brand/partner_logos/haagen-dazs.png' },
  { slug: 'hellmanns.png', name: "Hellmanns", logo: '/brand/partner_logos/hellmanns.png' },
  { slug: 'kelloggs-corn-flakes.png', name: "Kelloggs Corn Flakes", logo: '/brand/partner_logos/kelloggs-corn-flakes.png' },
  { slug: 'kitkat.png', name: "Kitkat", logo: '/brand/partner_logos/kitkat.png' },
  { slug: 'knorr.png', name: "Knorr", logo: '/brand/partner_logos/knorr.png' },
  { slug: 'lays.png', name: "Lays", logo: '/brand/partner_logos/lays.png' },
  { slug: 'lipton.png', name: "Lipton", logo: '/brand/partner_logos/lipton.png' },
  { slug: 'maggi.png', name: "Maggi", logo: '/brand/partner_logos/maggi.png' },
  { slug: 'mazola.png', name: "Mazola", logo: '/brand/partner_logos/mazola.png' },
  { slug: 'milka.png', name: "Milka", logo: '/brand/partner_logos/milka.png' },
  { slug: 'minute-maid.png', name: "Minute Maid", logo: '/brand/partner_logos/minute-maid.png' },
  { slug: 'mms.png', name: "Mms", logo: '/brand/partner_logos/mms.png' },
  { slug: 'nescafe.png', name: "Nescafe", logo: '/brand/partner_logos/nescafe.png' },
  { slug: 'nesquik.png', name: "Nesquik", logo: '/brand/partner_logos/nesquik.png' },
  { slug: 'nestle-pure-life.png', name: "Nestle Pure Life", logo: '/brand/partner_logos/nestle-pure-life.png' },
  { slug: 'old-el-paso.png', name: "Old El Paso", logo: '/brand/partner_logos/old-el-paso.png' },
  { slug: 'oreo.png', name: "Oreo", logo: '/brand/partner_logos/oreo.png' },
  { slug: 'ovaltine.png', name: "Ovaltine", logo: '/brand/partner_logos/ovaltine.png' },
  { slug: 'pataks.png', name: "Pataks", logo: '/brand/partner_logos/pataks.png' },
  { slug: 'pepsi.png', name: "Pepsi", logo: '/brand/partner_logos/pepsi.png' },
  { slug: 'pop-tarts.png', name: "Pop Tarts", logo: '/brand/partner_logos/pop-tarts.png' },
  { slug: 'pringles.png', name: "Pringles", logo: '/brand/partner_logos/pringles.png' },
  { slug: 'ryvita.png', name: "Ryvita", logo: '/brand/partner_logos/ryvita.png' },
  { slug: 'slimfast.png', name: "Slimfast", logo: '/brand/partner_logos/slimfast.png' },
  { slug: 'snickers.png', name: "Snickers", logo: '/brand/partner_logos/snickers.png' },
  { slug: 'special-k.png', name: "Special K", logo: '/brand/partner_logos/special-k.png' },
  { slug: 'sprite.png', name: "Sprite", logo: '/brand/partner_logos/sprite.png' },
  { slug: 'toblerone.png', name: "Toblerone", logo: '/brand/partner_logos/toblerone.png' },
  { slug: 'trident.png', name: "Trident", logo: '/brand/partner_logos/trident.png' },
  { slug: 'tropicana.png', name: "Tropicana", logo: '/brand/partner_logos/tropicana.png' },
  { slug: 'twinings.png', name: "Twinings", logo: '/brand/partner_logos/twinings.png' },
  { slug: 'uncle-bens.png', name: "Uncle Bens", logo: '/brand/partner_logos/uncle-bens.png' },
  { slug: 'volvic.png', name: "Volvic", logo: '/brand/partner_logos/volvic.png' },
  { slug: 'wrigley.png', name: "Wrigley", logo: '/brand/partner_logos/wrigley.png' },
]

export const catalogueBrands = brands.filter((brand) => brand.hasPortfolio)
export const ownedBrands = brands.filter((brand) => brand.kind === 'owned')

export function getBrand(slug: string) {
  const key = slug === 'zahita' ? 'zaitha' : slug
  return brands.find((brand) => brand.slug === key)
}

