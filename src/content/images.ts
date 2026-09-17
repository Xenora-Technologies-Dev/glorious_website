export const images = {
  whoWeAre: '/brand/who-we-are-capabilities.png',
  hero: '/brand/hero-global-map.png',
  oliveGrove: '/brand/catalogue/zaitha_olive_grove.jpg',
  oliveOil: '/brand/catalogue/zaitha_olive_oil_lifestyle.jpg',
  pasta: '/brand/catalogue/zarella_pasta_lifestyle.jpg',
  legumes: '/brand/catalogue/dachi_beans_lifestyle.jpg',
  sauces: '/brand/catalogue/american_hat_sauces_lifestyle.jpg',
  ketchup: '/brand/catalogue/tomato_ketchup_lifestyle.jpg',
  cookingOil: '/brand/catalogue/cooking_oil_lifestyle.jpg',
  honey: '/brand/catalogue/honey_lifestyle.jpg',
  mayonnaise: '/brand/catalogue/mayonnaise_lifestyle.jpg',
  mustard: '/brand/catalogue/custard_mustard_lifestyle.jpg',
  vinegar: '/brand/catalogue/vinegar_lifestyle.jpg',
  tea: '/brand/catalogue/black_tea_lifestyle.jpg',
  greenTea: '/brand/catalogue/green_tea_lifestyle.jpg',
  sugar: '/brand/catalogue/sugar_salt_lifestyle.jpg',
  salt: '/brand/catalogue/sugar_salt_lifestyle.jpg',
  custard: '/brand/catalogue/custard_mustard_lifestyle.jpg',
  spices:
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1800&q=80',
  warehouse:
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80',
  packaging: '/brand/catalogue/private_label_lifestyle.jpg',
  manufacturing:
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=80',
  logistics:
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80',
  factory:
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2000&q=80',
  confectionery:
    'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1600&q=80',
  beverages: '/brand/catalogue/black_tea_lifestyle.jpg',
  shelf:
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=80',
} as const

export type ImageKey = keyof typeof images
