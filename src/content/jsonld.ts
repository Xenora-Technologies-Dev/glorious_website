import { company, distributionPartner, siteUrl } from '@/content/company'
import { productCategories } from '@/content/products'

export const organizationId = `${siteUrl}/#organization`
export const distributionPartnerId = `${siteUrl}/#distribution-partner`

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
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
    '@id': organizationId,
    name: company.legalName,
    url: siteUrl,
  },
  inLanguage: 'en',
}

/** Distribution partner as its own Organization; never merged into Glorious Ascent's addresses. */
export const distributionPartnerJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': distributionPartnerId,
  name: distributionPartner.name,
  description: `Distribution partner of ${company.shortName}`,
  ...(distributionPartner.logo ? { logo: `${siteUrl}${distributionPartner.logo}` } : {}),
  ...(distributionPartner.website ? { url: distributionPartner.website } : {}),
  ...(distributionPartner.phone ? { telephone: distributionPartner.phone } : {}),
  ...(distributionPartner.email ? { email: distributionPartner.email } : {}),
  address: distributionPartner.addresses.map((item) => ({
    '@type': 'PostalAddress',
    name: item.label,
    streetAddress: item.streetAddress,
    addressLocality: item.addressLocality,
    addressCountry: item.addressCountry,
  })),
}

/** Contact page about Glorious Ascent. */
export const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${siteUrl}/contact`,
  name: `Contact ${company.shortName}`,
  about: { '@type': 'Organization', '@id': organizationId, name: company.legalName },
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

export function productJsonLd(
  name: string,
  path: string,
  image: string,
  brandName?: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    // Brand must match the brand displayed on the product page; omit when none is shown.
    ...(brandName ? { brand: { '@type': 'Brand', name: brandName } } : {}),
    image: image.startsWith('http') ? image : `${siteUrl}${image}`,
    url: `${siteUrl}${path}`,
    category: productCategories.find((item) => path.includes(item.slug))?.name,
  }
}
