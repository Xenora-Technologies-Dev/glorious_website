export type InsightCategory =
  | 'Market Insights'
  | 'Food Industry'
  | 'Sourcing'
  | 'Packaging'
  | 'FMCG'
  | 'Company Updates'

export type Insight = {
  slug: string
  title: string
  category: InsightCategory
  excerpt: string
  body: string
}

export const insightCategories: InsightCategory[] = [
  'Market Insights',
  'Food Industry',
  'Sourcing',
  'Packaging',
  'FMCG',
  'Company Updates',
]

export const insights: Insight[] = [
  {
    slug: 'private-label-from-brief-to-shelf',
    title: 'Private label, from brief to shelf',
    category: 'FMCG',
    excerpt:
      'How manufacturing, grammage, packaging and labeling typically come together in a private-label food programme.',
    body: 'A private-label programme is more than a finished pack. It starts with the product itself — format, grammage and quality — then moves through packaging, labeling and documentation so the goods can travel and sit on a shelf under the buyer’s brand. Glorious Ascent works that path with manufacturing partners, so the conversation is about a complete supply, not a factory quotation alone.',
  },
  {
    slug: 'what-buyers-look-for-in-a-food-range',
    title: 'What buyers look for in a food range',
    category: 'Market Insights',
    excerpt:
      'What buyers usually look for in pack formats, origins and documentation when comparing FMCG ranges.',
    body: 'Buyers comparing an international food range typically start with the product, then ask how it is packed, where it is made and what documents travel with it. Pack formats, origin and export paperwork are part of the commercial conversation, alongside price and lead time. A clear range makes that discussion faster — and more likely to become an order.',
  },
  {
    slug: 'why-labeling-language-matters',
    title: 'Labeling that travels with the product',
    category: 'Packaging',
    excerpt:
      'Date coding and ink jetting in market language is part of getting a finished product ready for export.',
    body: 'Export-ready food is labeled for the market it is going to, not only the factory it left. Date coding, ink jetting and language on pack are part of how Glorious Ascent prepares a finished product for international supply — so the goods arrive ready for distribution, not waiting for a second labeling step.',
  },
  {
    slug: 'sourcing-as-a-network-not-a-single-origin',
    title: 'Sourcing as a network, not a single origin',
    category: 'Sourcing',
    excerpt:
      'Food programmes often draw on more than one origin. Glorious Ascent sources and manufactures in Italy, Spain, India and the UAE.',
    body: 'A reliable food supply is rarely a single factory and a single origin. Glorious Ascent sources and manufactures through a network that includes Italy, Spain, India and the UAE, then moves product through packaging, labeling and international distribution. The value is in that chain working as one conversation for the buyer.',
  },
  {
    slug: 'pasta-oils-and-the-grocery-aisle',
    title: 'Staples that hold a grocery aisle together',
    category: 'Food Industry',
    excerpt:
      'Pasta, oils, condiments, dairy and grocery staples remain the commercial core of many international food ranges.',
    body: 'Pasta, oils, condiments, dairy and grocery staples are the products that keep a food range commercially useful. They are ordered often, travel well and sit at the centre of retail and foodservice programmes. Glorious Ascent builds its offer around those staples, with private-label options for partners who want the same quality under their own brand.',
  },
  {
    slug: 'building-partnerships-for-growth',
    title: 'Building partnerships for growth',
    category: 'Company Updates',
    excerpt:
      'Glorious Ascent works with brands and distributors who need a reliable route from manufacturing to market.',
    body: 'We only succeed if our customers succeed. That idea shapes how Glorious Ascent works with brands, distributors and private-label partners — with clear communication on product, origin, packaging and the markets we serve. If you are building a food supply, we would rather start a direct conversation than leave the detail on a page.',
  },
]

export function getInsight(slug: string) {
  return insights.find((item) => item.slug === slug)
}
