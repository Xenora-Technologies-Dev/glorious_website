import { company, siteUrl } from '@/content/company'
import { useLocation } from 'react-router-dom'

type SeoProps = {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'product'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  /** When true, ask crawlers not to index (404 and similar). */
  noindex?: boolean
}

export function Seo({
  title,
  description,
  image = '/brand/logo-on-white.png',
  type = 'website',
  jsonLd,
  noindex = false,
}: SeoProps) {
  const location = useLocation()
  const path = location.pathname.replace(/\/+$/, '') || '/'
  const canonicalPath = path === '/' ? '' : path
  const canonical = `${siteUrl}${canonicalPath}`
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`
  const payload = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
      <meta property="og:site_name" content={company.shortName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {payload.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </>
  )
}
