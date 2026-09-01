import { company, siteUrl } from '@/content/company'
import { productCategories } from '@/content/products'

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.legalName,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo.png`,
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Office 1504, Latifa Tower, Sheikh Zayed Road',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: '118a Church Road, Hanwell',
      addressLocality: 'London',
      postalCode: 'W7 3BE',
      addressCountry: 'GB',
    },
  ],
  telephone: company.offices.uae.phone,
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
}

export function productJsonLd(name: string, path: string, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    brand: company.shortName,
    image,
    url: `${siteUrl}${path}`,
    category: productCategories.find((item) => path.includes(item.slug))?.name,
  }
}
