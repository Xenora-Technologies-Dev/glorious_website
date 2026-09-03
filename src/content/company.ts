export const siteUrl = 'https://gloriousascent.com'

export const company = {
  legalName: 'Glorious Ascent General Trading L.L.C.',
  shortName: 'Glorious Ascent',
  location: 'Dubai, UAE',
  tagline: 'Connecting global food markets.',
  positioning:
    'A global FMCG and food trading partner connecting quality products, trusted manufacturing partners and international markets.',
  story:
    'Glorious Ascent General Trading L.L.C. is an international import, export and cross-trade FMCG company. From Dubai, we source, manufacture under private label, package and distribute food products for partners who need a reliable route from origin to shelf.',
  motto: 'We only succeed if our customers succeed.',
  difference: 'Our business committed to make a difference in the world.',
  mission:
    'We only succeed if our customers succeed. Service is a key factor in this trade: we support customers for their growth, no matter how big or small.',
  vision:
    'Our business is committed to make a difference in the world — building transparent, ethical partnerships with brands and markets we sell into.',
  quality:
    'Our products under our own brands are designed to be on par with, if not better quality than market leaders, but with a lesser price. Quality is always our priority.',
  partnerships:
    'We build partnerships for growth with leading brands and the who’s who of the FMCG industry, based on an understanding of the markets that we’re selling into. We are completely transparent with regards to sharing markets we work in.',
  service:
    'Service is a key factor in this trade. We look after basic necessity and support our customers for their growth, no matter how big or small.',
  capabilities: [
    'Food trading',
    'Import / export',
    'Global sourcing',
    'FMCG distribution',
    'Private-label manufacturing',
    'Product development',
    'Packaging',
    'Labeling',
    'Customized product formats',
    'International supply',
  ],
  offices: {
    uae: {
      label: 'United Arab Emirates',
      address: 'Office 1504, Latifa Tower, Dubai Central 1, Sheikh Zayed Road, Dubai, UAE',
      poBox: 'P.O. Box 91032',
      phone: '+971 4 353 3006',
      phoneHref: 'tel:+97143533006',
    },
    uk: {
      label: 'United Kingdom',
      address: '118a Church Road, Hanwell, London, England W7 3BE',
      hours: 'Mon – Fri: 9AM – 5PM',
      phone: '+44 7500 204384',
      phoneHref: 'tel:+447500204384',
    },
  },
  forwarding: [
    'Export documentation — Health Certificate, Certificate of Origin, and Certificate of Free Sale',
    'Consolidations',
    'Inspection arrangements',
    'Labelling — date coding and ink jetting in any language',
  ],
  privateLabel: [
    'Private-label manufacturing',
    'Customized shapes and formats',
    'Customized grammage',
    'Value-added products',
    'Packaging',
    'Labeling',
    'Packaging and label design',
  ],
} as const

export const sourcingOrigins = [
  { id: 'italy', name: 'Italy', x: 51.5, y: 38 },
  { id: 'spain', name: 'Spain', x: 46.5, y: 40 },
  { id: 'india', name: 'India', x: 68, y: 48 },
  { id: 'uae', name: 'UAE', x: 62.5, y: 44, hub: true },
] as const

export type ExportRegion = 'americas' | 'europe' | 'gulf' | 'asia'

export type ExportMarket = {
  id: string
  name: string
  short: string
  region: ExportRegion
  lat: number
  lon: number
  hub?: boolean
}

export const exportMarkets: ExportMarket[] = [
  { id: 'usa', name: 'United States', short: 'USA', region: 'americas', lat: 39.8, lon: -98.5 },
  { id: 'uk', name: 'United Kingdom', short: 'UK', region: 'europe', lat: 51.5, lon: -0.12 },
  { id: 'germany', name: 'Germany', short: 'Germany', region: 'europe', lat: 51.16, lon: 10.45 },
  { id: 'france', name: 'France', short: 'France', region: 'europe', lat: 46.6, lon: 2.45 },
  { id: 'netherlands', name: 'Netherlands', short: 'Netherlands', region: 'europe', lat: 52.13, lon: 5.29 },
  { id: 'italy', name: 'Italy', short: 'Italy', region: 'europe', lat: 42.5, lon: 12.5 },
  { id: 'spain', name: 'Spain', short: 'Spain', region: 'europe', lat: 40.4, lon: -3.7 },
  { id: 'ksa', name: 'Saudi Arabia', short: 'KSA', region: 'gulf', lat: 24.0, lon: 45.1 },
  { id: 'qatar', name: 'Qatar', short: 'Qatar', region: 'gulf', lat: 25.3, lon: 51.2 },
  { id: 'kuwait', name: 'Kuwait', short: 'Kuwait', region: 'gulf', lat: 29.3, lon: 47.5 },
  { id: 'japan', name: 'Japan', short: 'Japan', region: 'asia', lat: 36.2, lon: 138.25 },
  { id: 'korea', name: 'South Korea', short: 'Korea', region: 'asia', lat: 36.5, lon: 127.8 },
  { id: 'china', name: 'China', short: 'China', region: 'asia', lat: 31.2, lon: 121.5 },
  { id: 'singapore', name: 'Singapore', short: 'Singapore', region: 'asia', lat: 1.35, lon: 103.82 },
  { id: 'malaysia', name: 'Malaysia', short: 'Malaysia', region: 'asia', lat: 4.21, lon: 101.98 },
  { id: 'indonesia', name: 'Indonesia', short: 'Indonesia', region: 'asia', lat: -6.2, lon: 106.85 },
  { id: 'philippines', name: 'Philippines', short: 'Philippines', region: 'asia', lat: 12.88, lon: 121.77 },
]

export const packagingSteps = [
  {
    step: '01',
    title: 'Packaging & Labeling',
    copy: 'Packaging and labeling planned together so the finished product is ready for its destination market.',
  },
  {
    step: '02',
    title: 'Choosing Packaging Materials',
    copy: 'Materials selected to suit the product, format and how it will travel and be presented on shelf.',
  },
  {
    step: '03',
    title: 'Securing Products',
    copy: 'Packaging used to protect the product through handling, storage and international supply.',
  },
  {
    step: '04',
    title: 'Proper Labeling & Documentation',
    copy: 'Labeling, date coding and ink jetting in any language, together with export documentation such as Health Certificate, Certificate of Origin and Certificate of Free Sale.',
  },
  {
    step: '05',
    title: 'Handling / Environmental Considerations',
    copy: 'Handling and environmental considerations taken into account as products move from production to market.',
  },
] as const

export const whyStatements = [
  {
    index: '01',
    title: 'Quality',
    copy: 'Own-brand products are designed to stand with market leaders, offered at a more competitive price. Quality is treated as a priority, not a slogan.',
  },
  {
    index: '02',
    title: 'Global Network',
    copy: 'Import, export and cross-trade from Dubai, with a London office and sourcing and manufacturing origins including Italy, Spain, India and the UAE.',
  },
  {
    index: '03',
    title: 'Product Diversity',
    copy: 'A food range spanning pasta, sauces, oils, condiments, dairy and grocery — with private-label programmes alongside owned brands.',
  },
  {
    index: '04',
    title: 'Customer Focus',
    copy: 'We only succeed if our customers succeed. Service supports partners of every size, with transparency about the markets we work in.',
  },
  {
    index: '05',
    title: 'Flexible Solutions',
    copy: 'Private-label manufacturing can support customized shapes, grammage and value-added products, alongside packaging, labeling and design.',
  },
] as const
