import { exportMarkets, type ExportMarket } from '@/content/company'
import { worldCountryPaths } from '@/data/worldCountryPaths'
import { mapViewBox, project } from '@/lib/geo'
import { cn } from '@/lib/cn'
import { useState } from 'react'

export function ExportWorldMap() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = exportMarkets.find((item) => item.id === activeId) ?? null

  return (
    <svg
      viewBox={mapViewBox}
      className="h-full w-full"
      role="img"
      aria-label="World map of Glorious Ascent export markets"
      onClick={() => setActiveId(null)}
    >
      <rect width="1000" height="500" fill="#07111f" />
      <g fill="#16345a" stroke="#c6a56a" strokeWidth="0.35" strokeLinejoin="round">
        {worldCountryPaths.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </g>
      {exportMarkets.map((market) => (
        <MarketPin
          key={market.id}
          market={market}
          active={activeId === market.id}
          onSelect={setActiveId}
        />
      ))}
      {active ? <MarketLabel market={active} /> : null}
    </svg>
  )
}

function MarketPin({
  market,
  active,
  onSelect,
}: {
  market: ExportMarket
  active: boolean
  onSelect: (id: string | null) => void
}) {
  const { x, y } = project(market.lat, market.lon)

  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        data-pin
        className={cn('cursor-pointer', active && 'opacity-100')}
        onMouseEnter={() => onSelect(market.id)}
        onMouseLeave={() => onSelect(null)}
        onFocus={() => onSelect(market.id)}
        onBlur={() => onSelect(null)}
        onClick={(event) => {
          event.stopPropagation()
          onSelect(market.id)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onSelect(market.id)
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={market.name}
        aria-pressed={active}
      >
        <circle r="9" fill="#c6a56a" opacity={active ? 0.28 : 0.14} />
        <path
          d="M0 7C0 7-5.2 1.1-5.2-2.7A5.2 5.2 0 0 1 0-8a5.2 5.2 0 0 1 5.2 5.3C5.2 1.1 0 7 0 7z"
          fill={active ? '#d8be8a' : '#c6a56a'}
          stroke="#07111f"
          strokeWidth="0.6"
        />
        <circle cy="-2.6" r="1.3" fill="#07111f" />
      </g>
    </g>
  )
}

function MarketLabel({ market }: { market: ExportMarket }) {
  const { x, y } = project(market.lat, market.lon)
  const width = Math.max(72, market.name.length * 7.1)
  const left = Math.min(1000 - width - 8, Math.max(8, x - width / 2))

  return (
    <g pointerEvents="none">
      <rect x={left} y={y - 30} width={width} height="16" rx="1.5" fill="#07111f" opacity="0.94" />
      <text
        x={left + width / 2}
        y={y - 18.5}
        textAnchor="middle"
        fill="#f4efe4"
        fontSize="9"
        fontFamily="Manrope, sans-serif"
        fontWeight="600"
      >
        {market.name}
      </text>
    </g>
  )
}
