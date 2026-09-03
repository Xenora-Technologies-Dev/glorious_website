const MAP_WIDTH = 1000
const MAP_HEIGHT = 500

export function project(lat: number, lon: number) {
  return {
    x: ((lon + 180) / 360) * MAP_WIDTH,
    y: ((90 - lat) / 180) * MAP_HEIGHT,
  }
}

export const mapViewBox = `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`
