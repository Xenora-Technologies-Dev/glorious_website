import type { SVGProps } from 'react'

export function WorldMap({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 56" className={className} aria-hidden="true" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="0.18" strokeLinejoin="round">
        <ellipse cx="50" cy="28" rx="46" ry="24" opacity="0.28" />
        <ellipse cx="50" cy="28" rx="30" ry="24" opacity="0.18" />
        <line x1="4" y1="28" x2="96" y2="28" opacity="0.2" data-meridian />
        <line x1="50" y1="4" x2="50" y2="52" opacity="0.2" data-meridian />
        <path d="M14 18c3-4 8-6 13-5 4 1 7 4 8 8 1 5-1 9-5 12-4 3-9 3-13 1-4-3-6-9-3-16z" opacity="0.55" />
        <path d="M22 34c2 2 4 6 3 10-1 3-4 5-7 5-3 0-5-3-5-6 0-4 4-8 9-9z" opacity="0.5" />
        <path d="M46 16c5-2 10-1 13 2 3 4 3 8 1 11-3 4-8 5-13 4-4-1-6-5-5-9 1-3 2-6 4-8z" opacity="0.55" />
        <path d="M50 30c4-1 7 2 8 6 2 5 1 10-2 13-4 3-8 3-11 0-3-3-3-8-1-12 1-3 3-6 6-7z" opacity="0.5" />
        <path d="M60 18c8-3 16-2 22 3 5 4 7 10 6 15-1 6-6 10-13 11-7 1-14-2-18-8-3-5-2-12 3-16 3-3 7-5 10-5z" opacity="0.5" />
        <path d="M80 42c3 0 6 2 7 5 1 3-1 6-4 7-3 1-6 0-7-2-2-3 0-8 4-10z" opacity="0.45" />
      </g>
    </svg>
  )
}
