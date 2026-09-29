/** Measure the fixed site header so hash/scroll offsets stay in sync with real height. */
export function getNavOffset(extra = 12): number {
  if (typeof document === 'undefined') return 112
  const header = document.querySelector('header')
  const height = header instanceof HTMLElement ? header.getBoundingClientRect().height : 96
  return Math.round(height + extra)
}

/** Tailwind-friendly scroll-margin classes matching header + safe-area + breathing room. */
export const scrollMtClass =
  'scroll-mt-[calc(5.25rem+env(safe-area-inset-top)+0.75rem)] sm:scroll-mt-[calc(6rem+env(safe-area-inset-top)+0.75rem)]'
