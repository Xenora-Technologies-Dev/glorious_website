export type ProductCategory = {
  slug: string
  name: string
  navLabel: string
  description: string
  image: string
}

export type FrozenGroup = 'chicken' | 'meat' | 'seafood' | 'breaded'

export type Product = {
  slug: string
  name: string
  categorySlug: string
  image: string
  gallery?: string[]
  brandSlug?: string
  packSize?: string
  origin?: string
  frozenGroup?: FrozenGroup
}

const img = (file: string) => `/Products/${file}`
const cat = (file: string) => img(`catalogue/${file}`)
const brandCat = (file: string) => `/brand/catalogue/${file}`

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
    image: '/Products/american-hat/sriracha-chili-sauce-475g.jpeg',
  },
  {
    slug: 'oils',
    name: 'Oils',
    navLabel: 'Oils',
    description: 'Olive oil, edible oil and frying oil in retail and bulk formats.',
    image: img('Olive_Oil_4L_Tin_Zaitha.png'),
  },
  {
    slug: 'condiments',
    name: 'Condiments',
    navLabel: 'Condiments',
    description: 'Mayonnaise, mustard, vinegar and tahina.',
    image: '/Products/american-hat/classic-mayonnaise-1-gallon.jpeg',
  },
  {
    slug: 'canned-food',
    name: 'Canned Food',
    navLabel: 'Canned Food',
    description: 'Canned seafood, beans, vegetables and pulses for retail and foodservice programmes.',
    image: '/Products/american-hat/baked-beans-in-tomato-sauce-400g.jpeg',
  },
  {
    slug: 'grocery',
    name: 'Grocery',
    navLabel: 'Grocery',
    description: 'Honey, spreads, pancake syrup, salt, cheese, popcorn and everyday grocery staples.',
    image: '/Products/american-hat/honey-3kg.jpeg',
  },
  {
    slug: 'frozen',
    name: 'Frozen & Protein',
    navLabel: 'Frozen',
    description: 'Frozen chicken, meat, seafood and breaded or prepared lines for local trade, import and export under the Tash brand.',
    image: '/Products/frozen/frozen-products-intro.png',
  },
  {
    slug: 'non-food',
    name: 'Disposables',
    navLabel: 'Disposables',
    description: 'Disposable products from Glorious Pack for foodservice, retail and institutional buyers — cling film, packaging consumables and everyday disposables built for hygiene and efficiency.',
    image: '/Products/non-food/Glory_Wrap_45cm_300m.png',
  },
  {
    slug: 'commodities',
    name: 'Commodities',
    navLabel: 'Commodities',
    description: 'Commodity trading across pulses, grains, rice and related bulk lines — containerised exports for wholesale and industrial buyers.',
    image: '/Products/commodities/basmati-rice.jpg',
  },
  {
    slug: 'confectionery',
    name: 'Confectionery',
    navLabel: 'Confectionery',
    description: 'Chocolate, biscuits, candies and sugar confectionery programmes for retail and wholesale trade partners.',
    image: '/Products/confectionery/milk-chocolate.jpg',
  },
  {
    slug: 'beverages',
    name: 'Beverages & Juice Powders',
    navLabel: 'Beverages',
    description: 'Black and green tea, fruit cordials, drink syrups, rose water and related beverage programmes for retail and foodservice distribution.',
    image: brandCat('black_tea_lifestyle.jpg'),
  },
]

/** Same order/labels as navbar Products ? Food (see also navigation foodCategorySlugs). */
export const foodCategorySlugs = [
  'pasta',
  'sauces',
  'oils',
  'condiments',
  'canned-food',
  'grocery',
  'frozen',
  'commodities',
  'confectionery',
  'beverages',
] as const

/** Pack-shot overrides for cream home cards (prefer transparent / catalogue PNGs). */
const homeCategoryImages: Partial<Record<(typeof foodCategorySlugs)[number], string>> = {
  pasta: img('penne_pasta_450gm_Packet_Zarella.png'),
  sauces: img('Tomato_Ketchup_340gm_bottle_American_Hat.png'),
  oils: img('Olive_Oil_500ml_bottle_Legacy_Valley.png'),
  condiments: img('Dijon_Mustard_1Kg_American_Hat.png'),
  'canned-food': '/Products/american-hat/baked-beans-in-tomato-sauce-400g.jpeg',
  grocery: cat('american_hat_honey_1kg.png'),
  frozen: '/Products/frozen/chicken-breast.png',
  commodities: '/Products/commodities/basmati-rice.jpg',
  confectionery: '/Products/confectionery/milk-chocolate.jpg',
  beverages: cat('american_hat_black_tea_100bags.png'),
}

export const homeCategories = foodCategorySlugs.map((slug) => {
  const category = productCategories.find((item) => item.slug === slug)!
  return {
    slug: category.slug,
    name: category.navLabel,
    href: `/products/${category.slug}`,
    image: homeCategoryImages[slug] ?? category.image,
  }
})

export const products: Product[] = [
  {
    slug: 'penne-pastx450g',
    name: 'Penne Pasta',
    categorySlug: 'pasta',
    brandSlug: 'zarella',
    packSize: '450g packet',
    image: img('penne_pasta_450gm_Packet_Zarella.png'),
  },
  {
    slug: 'rigatoni-pastx400g',
    name: 'Rigatoni Pasta',
    categorySlug: 'pasta',
    brandSlug: 'zarella',
    packSize: '400g',
    image: img('Rigatoni_Pasta_400gm_zarella.png'),
  },
  {
    slug: 'macaroni-pastx400g',
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
    slug: 'tomato-ketchup-5kg',
    name: 'Tomato Ketchup',
    categorySlug: 'sauces',
    brandSlug: 'tash',
    packSize: '5kg',
    image: img('Tomato_Ketchup_5KG_Tash_Brand.png'),
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
    name: 'Premium Palm Olein',
    categorySlug: 'oils',
    brandSlug: 'zaitha',
    packSize: '17.5L tin',
    image: '/Products/zaitha/palm-olein-17-5l.png',
  },

  {
    slug: 'zaitha-coconut-oil-2l',
    name: 'Pure Coconut Oil',
    categorySlug: 'oils',
    brandSlug: 'zaitha',
    packSize: '2L',
    image: '/Products/zaitha/coconut-oil-2l.png',
  },
  {
    slug: 'zaitha-coconut-oil-1l',
    name: 'Pure Coconut Oil',
    categorySlug: 'oils',
    brandSlug: 'zaitha',
    packSize: '1L',
    image: '/Products/zaitha/coconut-oil-1l.png',
    gallery: [
      '/Products/zaitha/coconut-oil-1l-b.png',
      '/Products/zaitha/coconut-oil-1l-c.png',
    ],
  },
  {
    slug: 'zaitha-sunflower-oil-5l',
    name: 'Sunflower Oil',
    categorySlug: 'oils',
    brandSlug: 'zaitha',
    packSize: '5L',
    image: '/Products/zaitha/sunflower-oil-5l.png',
  },

  {
    slug: 'tahinx10kg',
    name: 'Tahina Sesame Paste',
    categorySlug: 'condiments',
    brandSlug: 'zaitha',
    packSize: '10kg tin',
    image: '/Products/zaitha/tahina-10kg.png',
  },
  {
    slug: 'cream-honey',
    name: 'Cream — Honey Flavour',
    categorySlug: 'canned-food',
    brandSlug: 'tash',
    image: img('Cream_Honey_Flavour_Tash.png'),
  },
  {
    slug: 'cream-banana',
    name: 'Cream — Banana Flavour',
    categorySlug: 'canned-food',
    brandSlug: 'tash',
    image: img('Cream_Banana_Flavour_Tash.png'),
  },
  {
    slug: 'cream-strawberry',
    name: 'Cream — Strawberry Flavour',
    categorySlug: 'canned-food',
    brandSlug: 'tash',
    image: img('Cream_Strawberry_Flavour_Tash.png'),
  },
  {
    slug: 'rose-water',
    name: 'Rose Water',
    categorySlug: 'beverages',
    brandSlug: 'tash',
    packSize: 'Bottle',
    image: img('Rose_Water_Tash.png'),
  },
  {
    slug: 'whole-chicken',
    name: 'Whole Chicken',
    categorySlug: 'frozen',
    frozenGroup: 'chicken',
    brandSlug: 'tash',
    image: '/Products/frozen/chicken-whole.png',
    packSize: 'Frozen',
  },
  {
    slug: 'chicken-leg-quarters',
    name: 'Chicken Leg Quarters',
    categorySlug: 'frozen',
    frozenGroup: 'chicken',
    brandSlug: 'tash',
    image: '/Products/frozen/chicken-legs.png',
    packSize: 'Frozen',
  },
  {
    slug: 'chicken-breast',
    name: 'Chicken Breast',
    categorySlug: 'frozen',
    frozenGroup: 'chicken',
    brandSlug: 'tash',
    image: '/Products/frozen/chicken-breast.png',
    packSize: 'Frozen',
  },
  {
    slug: 'chicken-wings',
    name: 'Chicken Wings',
    categorySlug: 'frozen',
    frozenGroup: 'chicken',
    brandSlug: 'tash',
    image: '/Products/frozen/chicken-wings.png',
    packSize: 'Frozen',
  },
  {
    slug: 'chicken-drumsticks',
    name: 'Chicken Drumsticks',
    categorySlug: 'frozen',
    frozenGroup: 'chicken',
    brandSlug: 'tash',
    image: '/Products/frozen/chicken-legs.png',
    packSize: 'Frozen',
  },
  {
    slug: 'indian-beef-cuts',
    name: 'Indian Beef Cuts',
    categorySlug: 'frozen',
    frozenGroup: 'meat',
    brandSlug: 'tash',
    image: '/Products/frozen/beef-cuts.png',
    packSize: 'Frozen',
  },
  {
    slug: 'mutton-cuts',
    name: 'Mutton / Lamb Cuts',
    categorySlug: 'frozen',
    frozenGroup: 'meat',
    brandSlug: 'tash',
    image: '/Products/frozen/mutton.png',
    packSize: 'Frozen',
  },
  {
    slug: 'beef-burger-patties',
    name: 'Beef Burger Patties',
    categorySlug: 'frozen',
    frozenGroup: 'meat',
    brandSlug: 'tash',
    image: '/Products/frozen/burger-patties.png',
    packSize: 'Frozen',
  },
  {
    slug: 'chicken-nuggets',
    name: 'Chicken Nuggets',
    categorySlug: 'frozen',
    frozenGroup: 'breaded',
    brandSlug: 'tash',
    image: '/Products/frozen/chicken-nuggets.png',
    packSize: 'Frozen',
  },
  {
    slug: 'sausages',
    name: 'Sausages',
    categorySlug: 'frozen',
    frozenGroup: 'meat',
    brandSlug: 'tash',
    image: '/Products/frozen/sausages.png',
    packSize: 'Frozen',
  },
  {
    slug: 'frozen-mixed-vegetables',
    name: 'Frozen Mixed Vegetables',
    categorySlug: 'frozen',
    frozenGroup: 'breaded',
    brandSlug: 'tash',
    image: '/Products/frozen/mixed-vegetables.png',
    packSize: 'Frozen',
  },
  {
    slug: 'french-fries',
    name: 'French Fries',
    categorySlug: 'frozen',
    frozenGroup: 'breaded',
    brandSlug: 'tash',
    image: '/Products/frozen/frozen-fries.png',
    packSize: 'Frozen',
  },
  {
    slug: 'fish-fillets',
    name: 'Fish Fillets',
    categorySlug: 'frozen',
    frozenGroup: 'seafood',
    brandSlug: 'tash',
    image: '/Products/frozen/fish-fillet.png',
    packSize: 'Frozen',
  },
  {
    slug: 'minced-meat',
    name: 'Minced Beef / Chicken',
    categorySlug: 'frozen',
    frozenGroup: 'meat',
    brandSlug: 'tash',
    image: '/Products/frozen/beef-cuts.png',
    packSize: 'Frozen',
  },
  {
    slug: 'glory-wrap',
    name: 'Glory Wrap',
    categorySlug: 'non-food',
    brandSlug: 'glorious-pack',
    image: '/Products/non-food/Glory_Wrap_45cm_300m.png',
    packSize: '45cm × 300m',
  },
  {
    slug: 'disposable-plates',
    name: 'Disposable Plates',
    categorySlug: 'non-food',
    brandSlug: 'glorious-pack',
    image: '/Products/non-food/disposable-plates.png',
    packSize: 'Foodservice packs',
  },
  {
    slug: 'disposable-cups',
    name: 'Disposable Cups',
    categorySlug: 'non-food',
    brandSlug: 'glorious-pack',
    image: '/Products/non-food/disposable-cups.png',
    packSize: 'Foodservice packs',
  },
  {
    slug: 'disposable-glasses',
    name: 'Disposable Glasses',
    categorySlug: 'non-food',
    brandSlug: 'glorious-pack',
    image: '/Products/non-food/disposable-glasses.png',
    packSize: 'Foodservice packs',
  },
  {
    slug: 'disposable-cutlery',
    name: 'Disposable Cutlery',
    categorySlug: 'non-food',
    brandSlug: 'glorious-pack',
    image: '/Products/non-food/disposable-cutlery.png',
    packSize: 'Foodservice packs',
  },
  {
    slug: 'disposable-bowls',
    name: 'Disposable Bowls',
    categorySlug: 'non-food',
    brandSlug: 'glorious-pack',
    image: '/Products/non-food/disposable-bowls.png',
    packSize: 'Foodservice packs',
  },
  {
    slug: 'dachi-chick-peas-400g',
    name: 'Chick Peas',
    categorySlug: 'canned-food',
    brandSlug: 'dachi',
    packSize: '400g',
    image: cat('dachi_chick_peas_400g.png'),
  },
  {
    slug: 'dachi-red-kidney-beans-400g',
    name: 'Red Kidney Beans',
    categorySlug: 'canned-food',
    brandSlug: 'dachi',
    packSize: '400g',
    image: cat('dachi_red_kidney_beans_400g.png'),
  },
  {
    slug: 'dachi-baked-beans-400g',
    name: 'Baked Beans',
    categorySlug: 'canned-food',
    brandSlug: 'dachi',
    packSize: '400g',
    image: cat('dachi_baked_beans_400g.png'),
  },
  {
    slug: 'dachi-fava-beans-400g',
    name: 'Fava Beans',
    categorySlug: 'canned-food',
    brandSlug: 'dachi',
    packSize: '400g',
    image: cat('dachi_fava_beans_400g.png'),
  },
  {
    slug: 'zarella-fusilli-400g',
    name: 'Fusilli Pasta',
    categorySlug: 'pasta',
    brandSlug: 'zarella',
    packSize: '400g',
    origin: 'Italy',
    image: cat('zarella_fusilli_400g.png'),
  },
  {
    slug: 'zarella-conchiglie-400g',
    name: 'Conchiglie Pasta',
    categorySlug: 'pasta',
    brandSlug: 'zarella',
    packSize: '400g',
    origin: 'Italy',
    image: cat('zarella_conchiglie_400g.png'),
  },
  {
    slug: 'delicia-elbow-400g',
    name: 'Elbow Pasta',
    categorySlug: 'pasta',
    brandSlug: 'delicia',
    packSize: '400g (packing 400Grm x 20bag)',
    image: '/Products/delicia/elbow-400g.png',
  },
  {
    slug: 'delicia-penne-400g',
    name: 'Penne Pasta',
    categorySlug: 'pasta',
    brandSlug: 'delicia',
    packSize: '400g (packing 400Grm x 20bag)',
    image: '/Products/delicia/penne-400g.png',
  },
  {
    slug: 'delicia-vermicelli-400g',
    name: 'Vermicelli',
    categorySlug: 'pasta',
    brandSlug: 'delicia',
    packSize: '400g (packing 400Grm x 20bag)',
    image: '/Products/delicia/vermicelli-400g.png',
  },
  {
    slug: 'delicia-spaghetti-400g',
    name: 'Spaghetti',
    categorySlug: 'pasta',
    brandSlug: 'delicia',
    packSize: '400g (packing 400Grm x 20bag)',
    image: '/Products/delicia/spaghetti-400g.png',
  },
  {
    slug: 'zaitha-olive-oil-5l',
    name: 'Extra Virgin Olive Oil',
    categorySlug: 'oils',
    brandSlug: 'zaitha',
    packSize: '5L',
    origin: 'Spain',
    image: cat('zaitha_olive_oil_5l.png'),
  },
  {
    slug: 'zaitha-olive-oil-1l',
    name: 'Extra Virgin Olive Oil',
    categorySlug: 'oils',
    brandSlug: 'zaitha',
    packSize: '1L',
    origin: 'Spain',
    image: cat('zaitha_olive_oil_1l.png'),
  },
  {
    slug: 'zaitha-olive-oil-500ml',
    name: 'Extra Virgin Olive Oil',
    categorySlug: 'oils',
    brandSlug: 'zaitha',
    packSize: '500ml',
    origin: 'Spain',
    image: cat('zaitha_olive_oil_500ml.png'),
  },
  {
    slug: 'zaitha-olive-oil-250ml',
    name: 'Extra Virgin Olive Oil',
    categorySlug: 'oils',
    brandSlug: 'zaitha',
    packSize: '250ml',
    origin: 'Spain',
    image: cat('zaitha_olive_oil_250ml.png'),
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
    slug: 'iodized-salt-1kg',
    name: 'Fine Table Salt',
    categorySlug: 'grocery',
    brandSlug: 'american-hat',
    packSize: '1kg',
    origin: 'UAE',
    image: '/Products/american-hat/fine-table-salt-1kg.jpeg',
  },
  {
    slug: 'milk-chocolate-bars',
    name: 'Milk Chocolate Bars',
    categorySlug: 'confectionery',
    packSize: 'Retail bars / multipacks',
    image: '/Products/confectionery/milk-chocolate.jpg',
  },
  {
    slug: 'dark-chocolate',
    name: 'Dark Chocolate',
    categorySlug: 'confectionery',
    packSize: 'Retail bars / bulk',
    image: '/Products/confectionery/dark-chocolate.jpg',
  },
  {
    slug: 'assorted-biscuits',
    name: 'Assorted Biscuits',
    categorySlug: 'confectionery',
    packSize: 'Family packs / foodservice',
    image: '/Products/confectionery/assorted-biscuits.jpg',
  },
  {
    slug: 'wafer-biscuits',
    name: 'Wafer Biscuits',
    categorySlug: 'confectionery',
    packSize: 'Retail packs',
    image: '/Products/confectionery/wafer-biscuits.jpg',
  },
  {
    slug: 'chocolate-cookies',
    name: 'Chocolate Cookies',
    categorySlug: 'confectionery',
    packSize: 'Retail packs',
    image: '/Products/confectionery/chocolate-cookies.jpg',
  },
  {
    slug: 'hard-candy',
    name: 'Hard Candy',
    categorySlug: 'confectionery',
    packSize: 'Jars / pouches',
    image: '/Products/confectionery/hard-candy.jpg',
  },
  {
    slug: 'toffee-caramel',
    name: 'Toffee & Caramel',
    categorySlug: 'confectionery',
    packSize: 'Retail packs / bulk',
    image: '/Products/confectionery/toffee-caramel.jpg',
  },
  {
    slug: 'chewing-gum',
    name: 'Chewing Gum',
    categorySlug: 'confectionery',
    packSize: 'Blister packs / bottles',
    image: '/Products/confectionery/chewing-gum.jpg',
  },
  {
    slug: 'basmati-rice',
    name: 'Basmati Rice',
    categorySlug: 'commodities',
    packSize: '25kg / 50kg / container',
    origin: 'India / Pakistan',
    image: '/Products/commodities/basmati-rice.jpg',
  },
  {
    slug: 'wheat-flour',
    name: 'Wheat Flour',
    categorySlug: 'commodities',
    packSize: '25kg / 50kg bags',
    image: '/Products/commodities/wheat-flour.jpg',
  },
  {
    slug: 'red-lentils',
    name: 'Red Lentils',
    categorySlug: 'commodities',
    packSize: '25kg / 50kg / bulk',
    image: '/Products/commodities/red-lentils.jpg',
  },
  {
    slug: 'chickpeas-commodity',
    name: 'Chickpeas',
    categorySlug: 'commodities',
    packSize: '25kg / 50kg / bulk',
    image: '/Products/commodities/chickpeas.jpg',
  },
  {
    slug: 'yellow-split-peas',
    name: 'Yellow Split Peas',
    categorySlug: 'commodities',
    packSize: '25kg / 50kg bags',
    image: '/Products/commodities/yellow-split-peas.jpg',
  },
  {
    slug: 'green-mung-beans',
    name: 'Green Mung Beans',
    categorySlug: 'commodities',
    packSize: '25kg / 50kg bags',
    image: '/Products/commodities/green-mung.jpg',
  },
  {
    slug: 'maize-corn',
    name: 'Maize / Corn',
    categorySlug: 'commodities',
    packSize: 'Bulk / container',
    image: '/Products/commodities/maize.jpg',
  },
  {
    slug: 'refined-sugar',
    name: 'Refined Sugar',
    categorySlug: 'commodities',
    packSize: '50kg bags / bulk',
    image: '/Products/commodities/sugar.jpg',
  },
  {
    slug: 'sriracha-chili-sauce-220g',
    name: 'Sriracha Chili Sauce',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    packSize: '220g',
    image: '/Products/american-hat/sriracha-chili-sauce-220g.jpeg',
  },
  {
    slug: 'sriracha-chili-sauce-475g',
    name: 'Sriracha Chili Sauce',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    packSize: '475g',
    image: '/Products/american-hat/sriracha-chili-sauce-475g.jpeg',
  },
  {
    slug: 'chilli-ketchup-340g',
    name: 'Chilli Ketchup',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    packSize: '340g',
    image: '/Products/american-hat/chilli-ketchup-340g.jpeg',
  },
  {
    slug: 'tomato-ketchup-850g',
    name: 'Tomato Ketchup',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    packSize: '850g',
    image: '/Products/american-hat/tomato-ketchup-850g.jpeg',
  },
  {
    slug: 'tomato-ketchup-500g',
    name: 'Tomato Ketchup',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    packSize: '500g',
    image: '/Products/american-hat/tomato-ketchup-500g.jpeg',
  },
  {
    slug: 'tomato-ketchup-9g-sachets',
    name: 'Tomato Ketchup Sachets',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    packSize: '9g × 1000 sachets',
    image: '/Products/american-hat/tomato-ketchup-9g-sachets.jpeg',
  },
  {
    slug: 'original-hot-sauce-88ml',
    name: 'Original Hot Sauce',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    packSize: '88ml',
    image: '/Products/american-hat/original-hot-sauce-88ml.jpeg',
  },
  {
    slug: 'soy-sauce-1l',
    name: 'Soy Sauce',
    categorySlug: 'sauces',
    brandSlug: 'american-hat',
    packSize: '1L',
    image: '/Products/american-hat/soy-sauce-1l.jpeg',
  },
  {
    slug: 'mayonnaise-9g-sachets',
    name: 'Mayonnaise Sachets',
    categorySlug: 'condiments',
    brandSlug: 'american-hat',
    packSize: '9g × 1000 sachets',
    image: '/Products/american-hat/mayonnaise-9g-sachets.jpeg',
  },
  {
    slug: 'classic-mayonnaise-1-gallon',
    name: 'Classic Mayonnaise',
    categorySlug: 'condiments',
    brandSlug: 'american-hat',
    packSize: '1 gallon / 3.78L',
    image: '/Products/american-hat/classic-mayonnaise-1-gallon.jpeg',
  },
  {
    slug: 'ranch-dressing-1-gallon',
    name: 'Ranch Dressing',
    categorySlug: 'condiments',
    brandSlug: 'american-hat',
    packSize: '1 gallon / 3.78L',
    image: '/Products/american-hat/ranch-dressing-1-gallon.jpeg',
  },
  {
    slug: 'cheese-triangles-120g',
    name: 'Cheese Triangles',
    categorySlug: 'grocery',
    brandSlug: 'american-hat',
    packSize: '120g / 8 triangles',
    image: '/Products/american-hat/cheese-triangles-120g.jpeg',
  },
  {
    slug: 'hazelnut-spread-with-cocoa-340g',
    name: 'Hazelnut Spread with Cocoa',
    categorySlug: 'grocery',
    brandSlug: 'american-hat',
    packSize: '340g',
    image: '/Products/american-hat/hazelnut-spread-with-cocoa-340g.jpeg',
  },
  {
    slug: 'hazelnut-spread-with-cocoa-750g',
    name: 'Hazelnut Spread with Cocoa',
    categorySlug: 'grocery',
    brandSlug: 'american-hat',
    packSize: '750g',
    image: '/Products/american-hat/hazelnut-spread-with-cocoa-750g.jpeg',
  },
  {
    slug: 'creamy-peanut-butter-340g',
    name: 'Creamy Peanut Butter',
    categorySlug: 'grocery',
    brandSlug: 'american-hat',
    packSize: '340g / 12oz',
    image: '/Products/american-hat/creamy-peanut-butter-340g.jpeg',
  },
  {
    slug: 'honey-3kg',
    name: 'Natural Honey',
    categorySlug: 'grocery',
    brandSlug: 'american-hat',
    packSize: '3kg',
    origin: 'UAE',
    image: '/Products/american-hat/honey-3kg.jpeg',
  },
  {
    slug: 'popcorn-yellow-hybrid',
    name: 'Popcorn — Yellow Hybrid',
    categorySlug: 'grocery',
    brandSlug: 'american-hat',
    packSize: 'Tin',
    image: '/Products/american-hat/popcorn-yellow-hybrid.jpeg',
  },
  {
    slug: 'vimo-fruit-cordial',
    name: 'Vimo Fruit Cordial',
    categorySlug: 'beverages',
    brandSlug: 'american-hat',
    packSize: 'Bottle',
    image: '/Products/american-hat/fruit-syrups-lifestyle.jpeg',
  },
  {
    slug: 'chocolate-syrup-500g',
    name: 'Chocolate Syrup',
    categorySlug: 'beverages',
    brandSlug: 'american-hat',
    packSize: '500g',
    image: '/Products/american-hat/fruit-syrups-lifestyle.jpeg',
  },
  {
    slug: 'pancake-syrup-500g',
    name: 'Pancake Syrup',
    categorySlug: 'grocery',
    brandSlug: 'american-hat',
    packSize: '500g',
    image: '/Products/american-hat/fruit-syrups-lifestyle.jpeg',
  },
  {
    slug: 'strawberry-syrup-500g',
    name: 'Strawberry Syrup',
    categorySlug: 'beverages',
    brandSlug: 'american-hat',
    packSize: '500g',
    image: '/Products/american-hat/fruit-syrups-lifestyle.jpeg',
  },
  {
    slug: 'hot-sardines-in-tomato-sauce-155g',
    name: 'Hot Sardines in Tomato Sauce',
    categorySlug: 'canned-food',
    brandSlug: 'american-hat',
    packSize: '155g',
    image: '/Products/american-hat/hot-sardines-in-tomato-sauce-155g.jpeg',
  },
  {
    slug: 'tuna-chunks-in-vegetable-oil-1850g',
    name: 'Tuna Chunks in Vegetable Oil',
    categorySlug: 'canned-food',
    brandSlug: 'american-hat',
    packSize: '1850g',
    image: '/Products/american-hat/tuna-chunks-in-vegetable-oil-1850g.jpeg',
  },
  {
    slug: 'tuna-chunks-in-brine-1850g',
    name: 'Tuna Chunks in Brine',
    categorySlug: 'canned-food',
    brandSlug: 'american-hat',
    packSize: '1850g',
    image: '/Products/american-hat/tuna-chunks-in-brine-1850g.jpeg',
  },
  {
    slug: 'red-kidney-beans-400g',
    name: 'Red Kidney Beans',
    categorySlug: 'canned-food',
    brandSlug: 'american-hat',
    packSize: '400g',
    origin: 'UAE',
    image: '/Products/american-hat/red-kidney-beans-400g.jpeg',
  },
  {
    slug: 'processed-peas-400g',
    name: 'Processed Peas',
    categorySlug: 'canned-food',
    brandSlug: 'american-hat',
    packSize: '400g',
    origin: 'UAE',
    image: '/Products/american-hat/processed-peas-400g.jpeg',
  },
  {
    slug: 'baked-beans-in-tomato-sauce-400g',
    name: 'Baked Beans in Tomato Sauce',
    categorySlug: 'canned-food',
    brandSlug: 'american-hat',
    packSize: '400g',
    origin: 'UAE',
    image: '/Products/american-hat/baked-beans-in-tomato-sauce-400g.jpeg',
  },
  {
    slug: 'foul-medammes-400g',
    name: 'Foul Medammes',
    categorySlug: 'canned-food',
    brandSlug: 'american-hat',
    packSize: '400g',
    origin: 'UAE',
    image: '/Products/american-hat/foul-medammes-400g.jpeg',
  },
  {
    slug: 'mushroom-whole-champignon-400g',
    name: 'Mushroom Whole Champignon',
    categorySlug: 'canned-food',
    brandSlug: 'american-hat',
    packSize: '400g',
    image: '/Products/american-hat/mushroom-whole-champignon-400g.jpeg',
  },
  {
    slug: 'mixed-vegetables-400g',
    name: 'Mixed Vegetables',
    categorySlug: 'canned-food',
    brandSlug: 'american-hat',
    packSize: '400g',
    image: '/Products/american-hat/mixed-vegetables-400g.jpeg',
  },

  // --- Beverages: tea ---
  {
    slug: 'black-tea-100bags',
    name: 'Black Tea',
    categorySlug: 'beverages',
    brandSlug: 'american-hat',
    packSize: '100 tea bags',
    origin: 'India',
    image: cat('american_hat_black_tea_100bags.png'),
  },
  {
    slug: 'black-tea-500g',
    name: 'Black Tea',
    categorySlug: 'beverages',
    brandSlug: 'american-hat',
    packSize: '500g',
    origin: 'India',
    image: cat('american_hat_black_tea_500g.png'),
  },
  {
    slug: 'black-tea-1kg',
    name: 'Black Tea',
    categorySlug: 'beverages',
    brandSlug: 'american-hat',
    packSize: '1kg',
    origin: 'India',
    image: cat('american_hat_black_tea_1kg.png'),
  },
  {
    slug: 'green-tea-100bags',
    name: 'Green Tea',
    categorySlug: 'beverages',
    brandSlug: 'american-hat',
    packSize: '100 tea bags',
    origin: 'India',
    image: cat('american_hat_green_tea_100bags.png'),
  },
  {
    slug: 'lemon-green-tea-100bags',
    name: 'Lemon Green Tea',
    categorySlug: 'beverages',
    brandSlug: 'american-hat',
    packSize: '100 tea bags',
    origin: 'India',
    image: cat('american_hat_lemon_green_tea_100bags.png'),
  },
  {
    slug: 'mint-green-tea-100bags',
    name: 'Mint Green Tea',
    categorySlug: 'beverages',
    brandSlug: 'american-hat',
    packSize: '100 tea bags',
    origin: 'India',
    image: cat('american_hat_mint_green_tea_100bags.png'),
  },

]


export const frozenSections = [
  {
    id: 'chicken' as const,
    title: 'Chicken',
    eyebrow: 'Poultry',
    copy: 'Whole birds and cut chicken for retail, foodservice and export — frozen for consistent quality and dependable lead times under the Tash programme.',
    image: '/Products/frozen/chicken-whole.png',
  },
  {
    id: 'meat' as const,
    title: 'Meat',
    eyebrow: 'Red meat & processed',
    copy: 'Beef, lamb and processed meat lines including cuts, mince, burger patties and sausages for wholesale and foodservice partners.',
    image: '/Products/frozen/beef-cuts.png',
  },
  {
    id: 'seafood' as const,
    title: 'Seafood',
    eyebrow: 'Fish',
    copy: 'Frozen fish fillets for trade partners who need reliable seafood alongside poultry and meat in one cold-chain conversation.',
    image: '/Products/frozen/fish-fillet.png',
  },
  {
    id: 'breaded' as const,
    title: 'Breaded items',
    eyebrow: 'Coated & prepared',
    copy: 'Breaded proteins and prepared frozen sides — chicken nuggets, french fries and mixed vegetables for kitchens that need speed and consistency.',
    image: '/Products/frozen/chicken-nuggets.png',
  },
]

export function getFrozenProductsByGroup(group: FrozenGroup) {
  return products.filter((product) => product.categorySlug === 'frozen' && product.frozenGroup === group)
}

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


export function getBrandPortfolioProducts(brandSlug: string) {
  return products.filter(
    (item) => item.brandSlug === brandSlug && item.categorySlug !== 'frozen',
  )
}

/** Score how well a product image/path represents a brand (for brand-page heroes). */
function brandHeroScore(product: Product, brandSlug: string) {
  const img = product.image.toLowerCase()
  const slug = brandSlug.toLowerCase()
  const compact = slug.replace(/-/g, '')
  const loose = slug.replace(/-/g, '[-_]?')
  let score = 0
  if (img.includes(`/products/${slug}/`)) score += 100
  if (new RegExp(loose, 'i').test(product.image)) score += 50
  if (product.slug.toLowerCase().includes(slug) || product.slug.toLowerCase().includes(compact)) score += 20
  return score
}

/**
 * Opening product for a brand detail page.
 * Prefer explicit heroProductSlug (when it belongs to the brand), else the
 * product whose image path best matches the brand, else first linked product.
 */
export function pickBrandHeroProduct(
  brandSlug: string,
  linked: Product[],
  heroProductSlug?: string,
) {
  if (!linked.length) return undefined
  if (heroProductSlug) {
    const named = linked.find((item) => item.slug === heroProductSlug && item.brandSlug === brandSlug)
    if (named) return named
  }
  let best = linked[0]
  let bestScore = brandHeroScore(best, brandSlug)
  for (const item of linked.slice(1)) {
    const score = brandHeroScore(item, brandSlug)
    if (score > bestScore) {
      best = item
      bestScore = score
    }
  }
  return best
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

