import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const site = 'https://gloriousascent.com'
const today = new Date().toISOString().slice(0, 10)

const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8')
const unique = (items) => [...new Set(items)]

const staticPaths = [
  '/',
  '/about',
  '/products',
  '/brands',
  '/private-label',
  '/global-sourcing',
  '/packaging',
  '/factories',
  '/insights',
  '/contact',
]

const productsTs = read('src/content/products.ts')
const catStart = productsTs.indexOf('export const productCategories')
const catEnd = productsTs.indexOf('export const foodCategorySlugs')
const catBlock = productsTs.slice(catStart, catEnd > 0 ? catEnd : catStart + 4000)
const categories = unique([...catBlock.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]))

const productPaths = [
  ...productsTs.matchAll(/slug:\s*'([^']+)',\s*\r?\n\s*name:\s*'[^']*',\s*\r?\n\s*categorySlug:\s*'([^']+)'/g),
].map((m) => `/products/${m[2]}/${m[1]}`)

const brandsTs = read('src/content/brands.ts')
const brandsStart = brandsTs.indexOf('export const brands')
const partnersStart = brandsTs.indexOf('export const partnerLogos')
const brandsBlock = brandsTs.slice(brandsStart, partnersStart > 0 ? partnersStart : brandsStart + 5000)
const brandPaths = unique(
  [...brandsBlock.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]),
).map((s) => `/brands/${s}`)

const insightsTs = read('src/content/insights.ts')
const insightPaths = unique(
  [...insightsTs.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]),
)
  .filter((s) => s.length > 3)
  .map((s) => `/insights/${s}`)

const categoryPaths = categories.map((s) => `/products/${s}`)

const urls = unique([
  ...staticPaths,
  ...categoryPaths,
  ...brandPaths,
  ...insightPaths,
  ...productPaths,
]).filter((u) => !u.startsWith('/portal'))

function priority(pathname) {
  if (pathname === '/') return '1.0'
  if (['/products', '/brands', '/private-label', '/contact'].includes(pathname)) return '0.9'
  if (pathname.startsWith('/products/') || pathname.startsWith('/brands/')) return '0.8'
  if (pathname.startsWith('/insights')) return '0.7'
  return '0.75'
}

const body = urls
  .map((pathname) => {
    const loc = pathname === '/' ? `${site}/` : `${site}${pathname}`
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority(pathname)}</priority>
  </url>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml, 'utf8')
console.log(`sitemap.xml: ${urls.length} URLs (categories=${categories.length}, brands=${brandPaths.length}, insights=${insightPaths.length}, products=${productPaths.length})`)
