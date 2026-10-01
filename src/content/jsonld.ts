import { company, siteUrl } from '@/content/company'
import { productCategories } from '@/content/products'

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.legalName,
  alternateName: company.shortName,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo.png`,
  description: company.positioning,
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: company.offices.uae.address,
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: company.offices.uk.address,
      addressLocality: 'London',
      postalCode: 'W7 3BE',
      addressCountry: 'GB',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: company.offices.uae.phone,
      contactType: 'sales',
      areaServed: 'AE',
      availableLanguage: ['en'],
    },
    {
      '@type': 'ContactPoint',
      telephone: company.offices.uk.phone,
      contactType: 'sales',
      areaServed: 'GB',
      availableLanguage: ['en'],
    },
  ],
  telephone: company.offices.uae.phone,
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: company.shortName,
  url: siteUrl,
  description: company.tagline,
  publisher: {
    '@type': 'Organization',
    name: company.legalName,
    url: siteUrl,
  },
  inLanguage: 'en',
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === '/' ? '' : item.path}`,
    })),
  }
}

export function productJsonLd(name: string, path: string, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    brand: company.shortName,
    image: image.startsWith('http') ? image : `${siteUrl}${image}`,
    url: `${siteUrl}${path}`,
    category: productCategories.find((item) => path.includes(item.slug))?.name,
  }
}
