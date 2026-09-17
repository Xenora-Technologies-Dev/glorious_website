export const siteUrl = 'https://gloriousascent.com'

export const company = {
  legalName: 'Glorious Ascent General Trading L.L.C.',
  shortName: 'Glorious Ascent',
  location: 'Dubai, UAE',
  tagline: 'Connecting global FMCG markets.',
  positioning:
    'A global FMCG trading house connecting quality products, trusted manufacturing partners and international markets — across ambient FMCG, frozen, non-food and commodities.',
  story:
    'Glorious Ascent General Trading L.L.C. is an international import, export and cross-trade FMCG company headquartered in Dubai, with operations in the United Kingdom, India and Ethiopia. We source, manufacture under private label, package and distribute own brands, partner brands and commodity programmes for partners who need a reliable route from origin to market.',
  motto: 'We only succeed if our customers succeed.',
  difference: 'Our business committed to make a difference in the world.',
  mission:
    'We only succeed if our customers succeed. Service is a key factor in this trade: we support customers for their growth, no matter how big or small.',
  vision:
    'Our business is committed to make a difference in the world — building transparent, ethical partnerships with brands and markets we sell into.',
  quality:
    'Our products under our own brands are designed to be on par with, if not better quality than market leaders, but with a lesser price. Quality is always our priority.',
  partnerships:
    'We build partnerships for growth with leading brands and the who\'s who of the FMCG industry, based on an understanding of the markets that we\'re selling into. We are completely transparent with regards to sharing markets we work in.',
  service:
    'Service is a key factor in this trade. We look after basic necessity and support our customers for their growth, no matter how big or small.',
  capabilities: [
    'FMCG trading',
    'Import / export',
    'Global sourcing',
    'FMCG distribution',
    'Private-label manufacturing',
    'Product development',
    'Packaging',
    'Labeling',
    'Frozen & protein',
    'Non-food disposables',
    'Commodity trading',
    'Customized product formats',
    'International supply',
  ],
  offices: {
    uae: {
      label: 'United Arab Emirates (Headquarters)',
      address: 'Kamali (B) building - Office M03 - Al Ras Rd - Al Ras - Deira - Dubai',
      phone: '+971 4 359 0199',
      phoneHref: 'tel:+97143590199',
      role: 'Headquarters',
    },
    uk: {
      label: 'United Kingdom',
      address: '118a Church Road, Hanwell, London, England W7 3BE',
      hours: 'Mon - Fri: 9AM - 5PM',
      phone: '+44 7500 204384',
      phoneHref: 'tel:+447500204384',
    },
    india: {
      label: 'India',
      operatingName: 'Sunshine General Trading',
      address: '1st Floor, 66 Geetha Mahal, Iddya NH, Surathkal 575014, Mangaluru, India',
    },
    ethiopia: {
      label: 'Ethiopia',
      operatingName: 'Glories Ascent PLC',
      address: 'Marcato Market, Addis Ababa, Ethiopia',
      phone: '+251 911 684 178',
      phoneHref: 'tel:+251911684178',
      phoneSecondary: '+251 935 410 893',
      phoneSecondaryHref: 'tel:+251935410893',
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

export type ExportRegion = 'americas' | 'europe' | 'gulf' | 'asia' | 'africa'

export type PresenceKind = 'export' | 'office'

export type ExportMarket = {
  id: string
  name: string
  short: string
  region: ExportRegion
  lat: number
  lon: number
  kind: PresenceKind
}

export const exportMarkets: ExportMarket[] = [
  // Americas
  { id: 'usa', name: 'United States', short: 'USA', region: 'americas', lat: 39.8, lon: -98.5, kind: 'export' },
  // Europe — fewer, spaced markets
  { id: 'germany', name: 'Germany', short: 'Germany', region: 'europe', lat: 51.16, lon: 10.45, kind: 'export' },
  { id: 'france', name: 'France', short: 'France', region: 'europe', lat: 46.2, lon: 1.8, kind: 'export' },
  { id: 'italy', name: 'Italy', short: 'Italy', region: 'europe', lat: 42.5, lon: 12.5, kind: 'export' },
  { id: 'spain', name: 'Spain', short: 'Spain', region: 'europe', lat: 40.0, lon: -4.5, kind: 'export' },
  { id: 'poland', name: 'Poland', short: 'Poland', region: 'europe', lat: 52.1, lon: 19.4, kind: 'export' },
  { id: 'sweden', name: 'Sweden', short: 'Sweden', region: 'europe', lat: 62.0, lon: 15.0, kind: 'export' },
  // Gulf
  { id: 'ksa', name: 'Saudi Arabia', short: 'KSA', region: 'gulf', lat: 23.5, lon: 44.5, kind: 'export' },
  { id: 'qatar', name: 'Qatar', short: 'Qatar', region: 'gulf', lat: 25.3, lon: 51.5, kind: 'export' },
  // Asia
  { id: 'japan', name: 'Japan', short: 'Japan', region: 'asia', lat: 36.2, lon: 138.25, kind: 'export' },
  { id: 'korea', name: 'South Korea', short: 'Korea', region: 'asia', lat: 36.5, lon: 127.8, kind: 'export' },
  { id: 'china', name: 'China', short: 'China', region: 'asia', lat: 34.0, lon: 108.0, kind: 'export' },
  { id: 'singapore', name: 'Singapore', short: 'Singapore', region: 'asia', lat: 1.35, lon: 103.82, kind: 'export' },
  { id: 'indonesia', name: 'Indonesia', short: 'Indonesia', region: 'asia', lat: -4.0, lon: 120.0, kind: 'export' },
  // Africa
  { id: 'egypt', name: 'Egypt', short: 'Egypt', region: 'africa', lat: 26.8, lon: 29.5, kind: 'export' },
  { id: 'morocco', name: 'Morocco', short: 'Morocco', region: 'africa', lat: 31.8, lon: -7.1, kind: 'export' },
  { id: 'nigeria', name: 'Nigeria', short: 'Nigeria', region: 'africa', lat: 9.1, lon: 7.5, kind: 'export' },
  { id: 'kenya', name: 'Kenya', short: 'Kenya', region: 'africa', lat: 0.5, lon: 37.9, kind: 'export' },
  { id: 'south-africa', name: 'South Africa', short: 'S. Africa', region: 'africa', lat: -30.6, lon: 24.0, kind: 'export' },
  // Offices — slightly nudged so labels clear nearby exports
  { id: 'uae-office', name: 'United Arab Emirates', short: 'UAE', region: 'gulf', lat: 25.2, lon: 55.6, kind: 'office' },
  { id: 'uk-office', name: 'United Kingdom', short: 'UK', region: 'europe', lat: 53.5, lon: -1.8, kind: 'office' },
  { id: 'india-office', name: 'India', short: 'India', region: 'asia', lat: 20.5, lon: 78.5, kind: 'office' },
  { id: 'ethiopia-office', name: 'Ethiopia', short: 'Ethiopia', region: 'africa', lat: 9.03, lon: 40.5, kind: 'office' },
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
    copy: 'Import, export and cross-trade from Dubai headquarters, with offices in the UK, India and Ethiopia, and sourcing and manufacturing origins including Italy, Spain, India and the UAE.',
  },
  {
    index: '03',
    title: 'Product Diversity',
    copy: 'A diversified FMCG range spanning ambient food, frozen & protein, non-food disposables, confectionery, beverages and commodities — with private-label programmes alongside owned and partner brands.',
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
