import { cn } from '@/lib/cn'
import type { Brand, BrandLogoAspect } from '@/content/brands'

type BrandLogoProps = {
  brand: Pick<Brand, 'name' | 'logo' | 'logoAspect'>
  size?: 'sm' | 'md' | 'lg' | 'xl'
  plate?: boolean
  eager?: boolean
  className?: string
}

/** Fixed plate/slot per size so landscape, square, and portrait logos align. */
const slots: Record<NonNullable<BrandLogoProps['size']>, string> = {
  sm: 'h-10 w-[5.5rem]',
  md: 'h-16 w-36',
  lg: 'h-24 w-44 sm:h-28 sm:w-52',
  xl: 'h-32 w-52 sm:h-40 sm:w-64',
}

const platePad: Record<NonNullable<BrandLogoProps['size']>, string> = {
  sm: 'px-1.5 py-1',
  md: 'px-2.5 py-2',
  lg: 'px-3 py-2.5 sm:px-4 sm:py-3',
  xl: 'px-4 py-3 sm:px-5 sm:py-4',
}

/** Nudge fill so square/portrait marks don't look tiny in a wide slot. */
const imgFit: Record<BrandLogoAspect, string> = {
  landscape: 'max-h-[88%] max-w-[94%]',
  square: 'max-h-[92%] max-w-[72%]',
  portrait: 'max-h-[94%] max-w-[58%]',
}

export function BrandLogo({
  brand,
  size = 'md',
  plate = false,
  eager = false,
  className,
}: BrandLogoProps) {
  const aspect = brand.logoAspect ?? 'landscape'

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden',
        slots[size],
        plate && cn('rounded-sm bg-ivory', platePad[size]),
        className,
      )}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className={cn('object-contain', imgFit[aspect])}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </span>
  )
}
