import { images, type ImageKey } from '@/content/images'

export type ProductCategory = {
  slug: string
  name: string
  navLabel: string
  description: string
}

export type Product = {
  slug: string
  name: string
  categorySlug: string
  imageKey: ImageKey
  brandSlug?: string
  packSize?: string
  origin?: string
  catalogueImage?: string
}

export const productCategories: ProductCategory[] = [
  {
    slug: 'pasta',
    name: 'Pasta',
    navLabel: 'Pasta',
    description: 'Pasta from the Glorious Ascent food catalogue.',
  },
  {
    slug: 'legumes',
    name: 'Legumes',
    navLabel: 'Legumes',
    description: 'Legumes and canned beans as presented in the catalogue.',
  },
  {
    slug: 'sauces',
    name: 'Sauces & Ketchup',
    navLabel: 'Sauces',
    description: 'Sauces and tomato ketchup.',
  },
  {
    slug: 'oils',
    name: 'Oils',
    navLabel: 'Oils',
    description: 'Olive oil and vegetable cooking oil.',
  },
  {
    slug: 'condiments',
    name: 'Condiments',
    navLabel: 'Condiments',
    description: 'Mayonnaise, mustard and vinegar.',
  },
  {
    slug: 'tea',
    name: 'Tea',
    navLabel: 'Tea',
    description: 'Black tea and green tea.',
  },
  {
    slug: 'grocery',
    name: 'Grocery',
    navLabel: 'Grocery',
    description: 'Honey, custard powder, fine sugar and iodized salt.',
  },
]

export const homeCategories = [
  { slug: 'pasta', name: 'Pasta', imageKey: 'pasta' as const, href: '/products/pasta' },
  { slug: 'legumes', name: 'Legumes', imageKey: 'legumes' as const, href: '/products/legumes' },
  { slug: 'sauces', name: 'Sauces & Ketchup', imageKey: 'sauces' as const, href: '/products/sauces' },
  { slug: 'olive-oil', name: 'Olive Oil', imageKey: 'oliveOil' as const, href: '/products/oils' },
  { slug: 'cooking-oil', name: 'Cooking Oil', imageKey: 'cookingOil' as const, href: '/products/oils' },
  { slug: 'honey', name: 'Honey', imageKey: 'honey' as const, href: '/products/grocery' },
  { slug: 'mayonnaise', name: 'Mayonnaise', imageKey: 'mayonnaise' as const, href: '/products/condiments' },
  { slug: 'mustard', name: 'Mustard', imageKey: 'mustard' as const, href: '/products/condiments' },
  { slug: 'vinegar', name: 'Vinegar', imageKey: 'vinegar' as const, href: '/products/condiments' },
  { slug: 'tea', name: 'Tea', imageKey: 'tea' as const, href: '/products/tea' },
  { slug: 'sugar', name: 'Sugar', imageKey: 'sugar' as const, href: '/products/grocery' },
  { slug: 'salt', name: 'Salt', imageKey: 'salt' as const, href: '/products/grocery' },
]

export const products: Product[] = [
  { slug: 'pasta', name: 'Pasta', categorySlug: 'pasta', imageKey: 'pasta' },
  { slug: 'legumes', name: 'Legumes', categorySlug: 'legumes', imageKey: 'legumes' },
  { slug: 'canned-beans', name: 'Canned beans', categorySlug: 'legumes', imageKey: 'legumes' },
  { slug: 'sauces', name: 'Sauces', categorySlug: 'sauces', imageKey: 'sauces' },
  { slug: 'tomato-ketchup', name: 'Tomato ketchup', categorySlug: 'sauces', imageKey: 'ketchup' },
  { slug: 'olive-oil', name: 'Olive oil', categorySlug: 'oils', imageKey: 'oliveOil' },
  { slug: 'vegetable-cooking-oil', name: 'Vegetable cooking oil', categorySlug: 'oils', imageKey: 'cookingOil' },
  { slug: 'honey', name: 'Honey', categorySlug: 'grocery', imageKey: 'honey' },
  { slug: 'mayonnaise', name: 'Mayonnaise', categorySlug: 'condiments', imageKey: 'mayonnaise' },
  { slug: 'mustard', name: 'Mustard', categorySlug: 'condiments', imageKey: 'mustard' },
  { slug: 'vinegar', name: 'Vinegar', categorySlug: 'condiments', imageKey: 'vinegar' },
  { slug: 'custard-powder', name: 'Custard powder', categorySlug: 'grocery', imageKey: 'custard' },
  { slug: 'black-tea', name: 'Black tea', categorySlug: 'tea', imageKey: 'tea' },
  { slug: 'green-tea', name: 'Green tea', categorySlug: 'tea', imageKey: 'greenTea' },
  { slug: 'fine-sugar', name: 'Fine sugar', categorySlug: 'grocery', imageKey: 'sugar' },
  { slug: 'iodized-salt', name: 'Iodized salt', categorySlug: 'grocery', imageKey: 'salt' },
]

export const allProductNames = products.map((product) => product.name)

export function getCategory(slug: string) {
  return productCategories.find((category) => category.slug === slug)
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.categorySlug === slug)
}

export function getRelatedProducts(product: Product, limit = 3) {
  const same = products.filter(
    (item) => item.categorySlug === product.categorySlug && item.slug !== product.slug,
  )
  const rest = products.filter(
    (item) => item.slug !== product.slug && item.categorySlug !== product.categorySlug,
  )
  return [...same, ...rest].slice(0, limit)
}

export function catalogueImagePath(slug: string) {
  return `/catalogue/${slug}.jpg`
}

export function productHref(product: Product) {
  return `/products/${product.categorySlug}/${product.slug}`
}

export function productImage(product: Product) {
  return images[product.imageKey]
}
