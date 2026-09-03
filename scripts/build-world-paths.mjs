import { readFileSync, writeFileSync } from 'node:fs'
import { feature } from 'topojson-client'

const WIDTH = 1000
const HEIGHT = 500

const project = (lat, lon) => ({
  x: ((lon + 180) / 360) * WIDTH,
  y: ((90 - lat) / 180) * HEIGHT,
})

const ringToPath = (ring) =>
  ring
    .map(([lon, lat], i) => {
      const { x, y } = project(lat, lon)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join('') + 'Z'

const geomToPath = (geom) => {
  if (!geom) return ''
  if (geom.type === 'Polygon') return geom.coordinates.map(ringToPath).join('')
  if (geom.type === 'MultiPolygon') {
    return geom.coordinates.map((poly) => poly.map(ringToPath).join('')).join('')
  }
  return ''
}

const topo = JSON.parse(readFileSync('src/data/countries-110m.json', 'utf8'))
const geo = feature(topo, topo.objects.countries)
const paths = geo.features.map((f) => geomToPath(f.geometry)).filter(Boolean)

writeFileSync(
  'src/data/worldCountryPaths.ts',
  `export const worldCountryPaths = ${JSON.stringify(paths)} as const\n`,
)

console.log('paths', paths.length, 'sample', paths[1]?.slice(0, 80))
