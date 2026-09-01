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
  sample: true
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
    sample: true,
  },
  {
    slug: 'reading-a-food-catalogue-as-a-buyer',
    title: 'Reading a food catalogue as a buyer',
    category: 'Market Insights',
    excerpt:
      'What buyers usually look for in pack formats, origins and documentation when comparing FMCG ranges.',
    sample: true,
  },
  {
    slug: 'why-labeling-language-matters',
    title: 'Labeling that travels with the product',
    category: 'Packaging',
    excerpt:
      'Date coding and ink jetting in market language is part of getting a finished product ready for export.',
    sample: true,
  },
  {
    slug: 'sourcing-as-a-network-not-a-single-origin',
    title: 'Sourcing as a network, not a single origin',
    category: 'Sourcing',
    excerpt:
      'Food programmes often draw on more than one origin. Catalogue-supported origins for Glorious Ascent include Italy, Spain, India and the UAE.',
    sample: true,
  },
  {
    slug: 'pasta-oils-and-the-grocery-aisle',
    title: 'Staples that hold a grocery aisle together',
    category: 'Food Industry',
    excerpt:
      'Pasta, oils, condiments, tea and grocery staples remain the commercial core of many international food ranges.',
    sample: true,
  },
  {
    slug: 'sample-space-for-company-updates',
    title: 'Company updates will appear here',
    category: 'Company Updates',
    excerpt:
      'This is a reserved space for verified Glorious Ascent news. No company announcement is published in this sample.',
    sample: true,
  },
]

export function getInsight(slug: string) {
  return insights.find((item) => item.slug === slug)
}
