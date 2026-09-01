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
    copy: 'Import, export and cross-trade from Dubai, with a London office and catalogue-supported sourcing and manufacturing origins including Italy, Spain, India and the UAE.',
  },
  {
    index: '03',
    title: 'Product Diversity',
    copy: 'A food range spanning pasta, legumes, sauces, oils, honey, condiments, tea and grocery staples — with private-label programmes alongside owned brands.',
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
