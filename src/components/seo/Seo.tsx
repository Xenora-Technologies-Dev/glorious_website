import { siteUrl } from '@/content/company'
import { useLocation } from 'react-router-dom'

type SeoProps = {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'product'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function Seo({
  title,
  description,
  image = '/brand/logo.png',
  type = 'website',
  jsonLd,
}: SeoProps) {
  const location = useLocation()
  const canonical = `${siteUrl}${location.pathname === '/' ? '' : location.pathname}`
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`
  const payload = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {payload.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </>
  )
}
