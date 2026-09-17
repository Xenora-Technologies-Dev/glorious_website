import { exportMarkets, type ExportMarket } from '@/content/company'
import { worldCountryPaths } from '@/data/worldCountryPaths'
import { mapViewBox, project } from '@/lib/geo'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

type Placed = {
  market: ExportMarket
  x: number
  y: number
  labelX: number
  labelY: number
  width: number
}

function placeMarkers(markets: ExportMarket[]): Placed[] {
  const placed: Placed[] = markets.map((market) => {
    const { x, y } = project(market.lat, market.lon)
    const width = Math.max(
      34,
      market.short.length * 5.6 + (market.kind === 'office' ? 18 : 8),
    )
    return {
      market,
      x,
      y,
      labelX: x,
      labelY: y - (market.kind === 'office' ? 20 : 18),
      width,
    }
  })

  // Sort left-to-right then resolve vertical overlaps
  placed.sort((a, b) => a.x - b.x || a.y - b.y)

  for (let i = 0; i < placed.length; i++) {
    const a = placed[i]
    a.labelX = Math.min(1000 - a.width / 2 - 4, Math.max(a.width / 2 + 4, a.labelX))
    a.labelY = Math.max(14, Math.min(486, a.labelY))

    for (let j = 0; j < i; j++) {
      const b = placed[j]
      const dx = Math.abs(a.labelX - b.labelX)
      const dy = Math.abs(a.labelY - b.labelY)
      const minDx = (a.width + b.width) / 2 + 4
      const minDy = 15
      if (dx < minDx && dy < minDy) {
        // Push later label up or down away from pin cluster
        const preferUp = a.y <= b.y
        a.labelY = preferUp ? b.labelY - minDy : b.labelY + minDy
        a.labelY = Math.max(14, Math.min(486, a.labelY))
      }
    }
  }

  return placed
}

export function ExportWorldMap() {
  const markers = placeMarkers(exportMarkets)
  const exports = markers.filter((item) => item.market.kind === 'export')
  const offices = markers.filter((item) => item.market.kind === 'office')

  return (
    <svg
      viewBox={mapViewBox}
      className="h-full w-full"
      role="img"
      aria-label="World map of Glorious Ascent export markets and offices"
    >
      <rect width="1000" height="500" fill="#07111f" />
      <g fill="#16345a" stroke="#c6a56a" strokeWidth="0.35" strokeLinejoin="round">
        {worldCountryPaths.map((d, index) => (
          <path key={index} d={d} />
        ))}
      </g>
      {exports.map((item) => (
        <MarketMarker key={item.market.id} item={item} />
      ))}
      {offices.map((item) => (
        <MarketMarker key={item.market.id} item={item} />
      ))}
    </svg>
  )
}

function MarketMarker({ item }: { item: Placed }) {
  const { market, x, y, labelX, labelY, width } = item
  const needsLeader = Math.abs(labelY - (y - 18)) > 6 || Math.abs(labelX - x) > 10

  return (
    <g data-pin className="pointer-events-none">
      {needsLeader ? (
        <line
          x1={x}
          y1={y - 8}
          x2={labelX}
          y2={labelY + 2}
          stroke="#c6a56a"
          strokeWidth="0.6"
          opacity="0.45"
        />
      ) : null}
      <g transform={`translate(${labelX} ${labelY})`}>
        <rect
          x={-width / 2}
          y={-10}
          width={width}
          height={13}
          rx={2}
          fill="#07111f"
          opacity={0.94}
        />
        <text
          x={0}
          y={-0.5}
          textAnchor="middle"
          fill={market.kind === 'office' ? '#e8d5a8' : '#f4efe4'}
          fontSize="7.5"
          fontFamily="Manrope, sans-serif"
          fontWeight="600"
        >
          {market.short}
        </text>
      </g>
      <g transform={`translate(${x} ${y})`}>
        {market.kind === 'office' ? <OfficeIcon /> : <ExportIcon />}
      </g>
    </g>
  )
}

function ExportIcon() {
  return (
    <g>
      <circle r="7" fill="#c6a56a" opacity={0.14} />
      <path
        d="M0 6C0 6-4.6 0.9-4.6-2.4A4.6 4.6 0 0 1 0-7a4.6 4.6 0 0 1 4.6 4.6C4.6 0.9 0 6 0 6z"
        fill="#c6a56a"
        stroke="#07111f"
        strokeWidth="0.55"
      />
      <circle cy="-2.3" r="1.15" fill="#07111f" />
    </g>
  )
}

function OfficeIcon() {
  return (
    <g>
      {/* Outer glow */}
      <circle r="12" fill="#c6a56a" opacity={0.16} />
      <circle r="9.5" fill="none" stroke="#e8d5a8" strokeWidth="1.4" opacity={0.95} />
      {/* Solid badge */}
      <circle r="7.2" fill="#07111f" stroke="#c6a56a" strokeWidth="1.1" />
      {/* 5-point star — clearly different from export teardrop */}
      <path
        d="M0-4.6 L1.15-1.2 L4.7-1.2 L1.85 0.85 L2.9 4.2 L0 2.2 L-2.9 4.2 L-1.85 0.85 L-4.7-1.2 L-1.15-1.2 Z"
        fill="#e8d5a8"
        stroke="#c6a56a"
        strokeWidth="0.35"
        strokeLinejoin="round"
      />
    </g>
  )
}

export function MapLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line-light bg-navy-deep px-5 py-4 text-[11px] font-semibold tracking-[0.16em] uppercase text-ivory/75 sm:px-8',
        className,
      )}
    >
      <LegendItem label="Export market">
        <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden>
          <path
            d="M7 17C7 17 1.8 11.1 1.8 7.3A5.2 5.2 0 0 1 7 2a5.2 5.2 0 0 1 5.2 5.3C12.2 11.1 7 17 7 17z"
            fill="#c6a56a"
          />
          <circle cx="7" cy="7.2" r="1.4" fill="#07111f" />
        </svg>
      </LegendItem>
      <LegendItem label="Office location">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
          <circle cx="9" cy="9" r="8" fill="none" stroke="#e8d5a8" strokeWidth="1.5" />
          <circle cx="9" cy="9" r="5.8" fill="#07111f" stroke="#c6a56a" strokeWidth="1" />
          <path
            d="M9 4.2 L10.05 7.1 L13.2 7.1 L10.7 8.9 L11.65 11.8 L9 10.1 L6.35 11.8 L7.3 8.9 L4.8 7.1 L7.95 7.1 Z"
            fill="#e8d5a8"
          />
        </svg>
      </LegendItem>
    </div>
  )
}

function LegendItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span className="inline-flex h-5 w-5 items-center justify-center">{children}</span>
      <span>{label}</span>
    </div>
  )
}
