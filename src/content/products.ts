export type ProductCategory = {
  slug: string
  name: string
  navLabel: string
  description: string
  image: string
}

export type Product = {
  slug: string
  name: string
  categorySlug: string
  image: string
  gallery?: string[]
  brandSlug?: string
  packSize?: string
  origin?: string
}

const img = (file: string) => `/Products/${file}`

export const productCategories: ProductCategory[] = [
  {
    slug: 'pasta',
    name: 'Pasta',
    navLabel: 'Pasta',
    description: 'Pasta for retail, foodservice and private-label programmes.',
    image: img('penne_pasta_450gm_Packet_Zarella.png'),
  },
  {
    slug: 'sauces',
    name: 'Sauces & Ketchup',
    navLabel: 'Sauces',
    description: 'Sauces, ketchup and ready-to-use cooking sauces.',
    image: img('Pizza_Sause_American_Hat.png'),
  },
  {
    slug: 'oils',
    name: 'Oils',
    navLabel: 'Oils',
    description: 'Olive oil, edible oil and frying oil in retail and bulk formats.',
    image: img('Olive_Oil_1L_bottle_Legacy_Valley.png'),
  },
  {
    slug: 'condiments',
    name: 'Condiments',
    navLabel: 'Condiments',
    description: 'Mayonnaise, mustard, vinegar and tahina.',
    image: img('Mayanoisse_American_Hat.png'),
  },
  {
    slug: 'dairy',
    name: 'Dairy',
    navLabel: 'Dairy',
    description: 'Milk powder, condensed and evaporated milk, cheese and flavoured cream.',
    image: img('Milk_Powder_2.5Kg_tin_American_Hat.png'),
  },
  {
    slug: 'grocery',
    name: 'Grocery',
    navLabel: 'Grocery',
    description: 'Custard powder, rose water and canned sardines.',
    image: img('Sardines_in_sunflower_oil_125gm_box_American_Hat.png'),
  },
]

export const homeCategories = [
  {
    slug: 'pasta',
    name: 'Pasta',
    href: '/products/pasta',
    image: img('penne_pasta_450gm_Packet_Zarella.png'),
  },
  {
    slug: 'sauces',
    name: 'Sauces',
    href: '/products/sauces',
    image: img('Pizza_Sause_American_Hat.png'),
  },
  {
    slug: 'olive-oil',
    name: 'Olive Oil',
    href: '/products/oils',
    image: img('Olive_Oil_1L_bottle_Legacy_Valley.png'),
  },
  {
    slug: 'cooking-oil',
    name: 'Cooking Oil',
    href: '/products/oils',
    image: img('Frying_Oil_18L_American_Hat.png'),
  },
  {
    slug: 'mayonnaise',
    name: 'Mayonnaise',
    href: '/products/condiments',
    image: img('Mayanoisse_American_Hat.png'),
  },
  {
    slug: 'mustard',
    name: 'Mustard',
    href: '/products/condiments',
    image: img('Dijon_Mustard_1Kg_American_Hat.png'),
  },
  {
    slug: 'vinegar',
    name: 'Vinegar',
    href: '/products/condiments',
    image: img('Vinegar_1USGallon_Bottle_American_Hat.png'),
  },
  {
    slug: 'dairy',
    name: 'Dairy',
    href: '/products/dairy',
    image: img('Milk_Powder_2.5Kg_tin_American_Hat.png'),
  },
  {
    slug: 'cheese',
    name: 'Cheese',
    href: '/products/dairy',
    image: img('Mozerella_Cheese_2Kg_American_Hat.png'),
  },
  {
    slug: 'seafood',
    name: 'Seafood',
    href: '/products/grocery',
    image: img('Sardines_in_sunflower_oil_125gm_box_American_Hat.png'),
  },
]

export const products: Product[] = [
  {
    slug: 'penne-pasta-450g',
    name: 'Penne Pasta',
    categorySlug: 'pasta',
    brandSlug: 'zarella',
    packSize: '450g packet',
    image: img('penne_pasta_450gm_Packet_Zarella.png'),
  },
  {
    slug: 'rigatoni-pasta-400g',
    name: 'Rigatoni Pasta',
    categorySlug: 'pasta',
    brandSlug: 'zarella',
    packSize: '400g',
    image: img('Rigatoni_Pasta_400gm_zarella.png'),
  },
  {
    slug: 'macaroni-pasta-400g',
    name: 'Macaroni Pasta',
    categorySlug: 'pasta',
    brandSlug: 'zarella',
    packSize: '400g',
    image: img('Macaroni_Pasta_400gm_Zarella.png'),
  },
  {
    slug: 'vermicelli-450g',
    name: 'Vermicelli',
    categorySlug: 'pasta',
    brandSlug: 'zarella',
    packSize: '450g',
    image: img('Vermicelli_450gm_Zarella.png'),
  },
  {
    slug: 'tomato-ketchup-340g',
    name: 'Tomato Ketchup',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    packSize: '340g bottle',
    image: img('Tomato_Ketchup_340gm_bottle_American_Hat.png'),
  },
  {
    slug: 'tomato-ketchup-5kg',
    name: 'Tomato Ketchup',
    categorySlug: 'sauces',
    brandSlug: 'tash',
    packSize: '5kg',
    image: img('Tomato_Ketchup_5KG_Tash_Brand.png'),
  },
  {
    slug: 'hot-chilli-sauce',
    name: 'Hot Chilli Sauce',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    image: img('Hot_Chilli_Sauce_American_Hat.png'),
  },
  {
    slug: 'bbq-sauce-510ml',
    name: 'BBQ Sauce',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    packSize: '510ml',
    image: img('BBQ_Sauce_510ML_America_Hat.png'),
  },
  {
    slug: 'pasta-sauce',
    name: 'Pasta Sauce',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    image: img('Pasta_Sause_American_Hat.png'),
  },
  {
    slug: 'pizza-sauce',
    name: 'Pizza Sauce',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    image: img('Pizza_Sause_American_Hat.png'),
    gallery: [img('Piza_Sause_American_Hat.png')],
  },
  {
    slug: 'olive-oil-250ml',
    name: 'Olive Oil',
    categorySlug: 'oils',
    brandSlug: 'legacy-valley',
    packSize: '250ml bottle',
    image: img('Olive_Oil_250ml_bottle_Legacy_Valley.png'),
  },
  {
    slug: 'olive-oil-500ml',
    name: 'Olive Oil',
    categorySlug: 'oils',
    brandSlug: 'legacy-valley',
    packSize: '500ml bottle',
    image: img('Olive_Oil_500ml_bottle_Legacy_Valley.png'),
  },
  {
    slug: 'olive-oil-1l',
    name: 'Olive Oil',
    categorySlug: 'oils',
    brandSlug: 'legacy-valley',
    packSize: '1L bottle',
    image: img('Olive_Oil_1L_bottle_Legacy_Valley.png'),
  },
  {
    slug: 'olive-oil-4l-legacy-valley',
    name: 'Olive Oil',
    categorySlug: 'oils',
    brandSlug: 'legacy-valley',
    packSize: '4L tin',
    image: img('Olive_Oil_4L_Tin_Legacy_Valley.png'),
  },
  {
    slug: 'olive-oil-4l-zaitha',
    name: 'Olive Oil',
    categorySlug: 'oils',
    brandSlug: 'zaitha',
    packSize: '4L tin',
    image: img('Olive_Oil_4L_Tin_Zaitha.png'),
  },
  {
    slug: 'edible-oil-17-5l',
    name: 'Edible Oil',
    categorySlug: 'oils',
    brandSlug: 'zaitha',
    packSize: '17.5L tin',
    image: img('Edible_Oil_17.5L_Tin_Zaitha.png'),
  },
  {
    slug: 'frying-oil-18l',
    name: 'Frying Oil',
    categorySlug: 'oils',
    brandSlug: 'american-hat',
    packSize: '18L',
    image: img('Frying_Oil_18L_American_Hat.png'),
  },
  {
    slug: 'classic-mayonnaise',
    name: 'Classic Mayonnaise',
    categorySlug: 'condiments',
    brandSlug: 'american-hat',
    packSize: 'Retail and foodservice formats',
    image: img('Mayanoisse_American_Hat.png'),
  },
  {
    slug: 'mayonnaise-5kg',
    name: 'Mayonnaise',
    categorySlug: 'condiments',
    brandSlug: 'american-hat',
    packSize: '5kg bucket',
    image: img('Mayonnaise_5KG_Bucket_American_Hat.png'),
  },
  {
    slug: 'dijon-mustard-1kg',
    name: 'Dijon Mustard',
    categorySlug: 'condiments',
    brandSlug: 'american-hat',
    packSize: '1kg',
    image: img('Dijon_Mustard_1Kg_American_Hat.png'),
    gallery: [img('Dijon_Mustard_1Kg_American_Hat_2.png')],
  },
  {
    slug: 'vinegar-1-us-gallon',
    name: 'Vinegar',
    categorySlug: 'condiments',
    brandSlug: 'american-hat',
    packSize: '1 US gallon bottle',
    image: img('Vinegar_1USGallon_Bottle_American_Hat.png'),
  },
  {
    slug: 'tahina-10kg',
    name: 'Tahina Sesame Paste',
    categorySlug: 'condiments',
    brandSlug: 'zaitha',
    packSize: '10kg tin',
    image: img('Tahina_Sesame_Paste_10KG_Tin_Zaitha.png'),
  },
  {
    slug: 'milk-powder-2-5kg',
    name: 'Milk Powder',
    categorySlug: 'dairy',
    brandSlug: 'american-hat',
    packSize: '2.5kg tin',
    image: img('Milk_Powder_2.5Kg_tin_American_Hat.png'),
    gallery: [
      img('Milk_Powder_2.5Kg_tin_American_Hat_2.png'),
      img('Milk_Powder_2.5Kg_tin_American_Hat_3.png'),
      img('Milk_Powder_2.5Kg_tin_American_Hat_4.png'),
    ],
  },
  {
    slug: 'condensed-milk-390g',
    name: 'Condensed Milk',
    categorySlug: 'dairy',
    brandSlug: 'american-hat',
    packSize: '390g',
    image: img('Condensed_Milk_390gm_American_Hat.png'),
  },
  {
    slug: 'evaporated-milk-410g',
    name: 'Evaporated Milk',
    categorySlug: 'dairy',
    brandSlug: 'american-hat',
    packSize: '410g tin',
    image: img('Evapourated_Milk_410gm_Tin_American_Hat.png'),
  },
  {
    slug: 'mozzarella-cheese-2kg',
    name: 'Mozzarella Cheese',
    categorySlug: 'dairy',
    brandSlug: 'american-hat',
    packSize: '2kg',
    image: img('Mozerella_Cheese_2Kg_American_Hat.png'),
  },
  {
    slug: 'cream-honey',
    name: 'Cream — Honey Flavour',
    categorySlug: 'dairy',
    brandSlug: 'tash',
    image: img('Cream_Honey_Flavour_Tash.png'),
  },
  {
    slug: 'cream-banana',
    name: 'Cream — Banana Flavour',
    categorySlug: 'dairy',
    brandSlug: 'tash',
    image: img('Cream_Banana_Flavour_Tash.png'),
  },
  {
    slug: 'cream-strawberry',
    name: 'Cream — Strawberry Flavour',
    categorySlug: 'dairy',
    brandSlug: 'tash',
    image: img('Cream_Strawberry_Flavour_Tash.png'),
  },
  {
    slug: 'custard-powder-200g',
    name: 'Custard Powder — Vanilla',
    categorySlug: 'grocery',
    brandSlug: 'american-hat',
    packSize: '200g',
    image: img('Custard_Powder_Vanilla_Flavour_200gm_American_Hat.png'),
  },
  {
    slug: 'rose-water',
    name: 'Rose Water',
    categorySlug: 'grocery',
    brandSlug: 'tash',
    image: img('Rose_Water_Tash.png'),
  },
  {
    slug: 'sardines-125g',
    name: 'Sardines in Sunflower Oil',
    categorySlug: 'grocery',
    brandSlug: 'american-hat',
    packSize: '125g',
    origin: 'Morocco',
    image: img('Sardines_in_sunflower_oil_125gm_box_American_Hat.png'),
    gallery: [
      img('Sardines_in_sunflower_oil_125gm_box_American_Hat_2.png'),
      img('Sardines_in_sunflower_oil_125gm_box_American_Hat_3.png'),
      img('Sardines_in_sunflower_oil_125gm_box_American_Hat_4.png'),
    ],
  },
]

export const allProductNames = [...new Set(products.map((product) => product.name))]

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

export function productHref(product: Product) {
  return `/products/${product.categorySlug}/${product.slug}`
}

export function productImage(product: Product) {
  return product.image
}

export function productGallery(product: Product) {
  return [product.image, ...(product.gallery ?? [])]
}
