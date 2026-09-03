import { cn } from '@/lib/cn'
import type { Brand, BrandLogoAspect } from '@/content/brands'

type BrandLogoProps = {
  brand: Pick<Brand, 'name' | 'logo' | 'logoAspect'>
  size?: 'sm' | 'md' | 'lg' | 'xl'
  plate?: boolean
  eager?: boolean
  className?: string
}

const slots: Record<
  NonNullable<BrandLogoProps['size']>,
  Record<BrandLogoAspect, string>
> = {
  sm: {
    landscape: 'h-10 w-[5.25rem]',
    square: 'h-11 w-11',
    portrait: 'h-12 w-10',
  },
  md: {
    landscape: 'h-16 w-[8.75rem]',
    square: 'h-[4.5rem] w-[4.5rem]',
    portrait: 'h-20 w-14',
  },
  lg: {
    landscape: 'h-24 w-[13rem] sm:h-28 sm:w-[15rem]',
    square: 'h-28 w-28 sm:h-32 sm:w-32',
    portrait: 'h-32 w-[7.5rem] sm:h-36 sm:w-[9rem]',
  },
  xl: {
    landscape: 'h-32 w-[16rem] sm:h-40 sm:w-[18rem]',
    square: 'h-36 w-36 sm:h-44 sm:w-44',
    portrait: 'h-40 w-[9rem] sm:h-48 sm:w-[11rem]',
  },
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
        'inline-flex shrink-0 items-center justify-center',
        plate && 'rounded-sm bg-ivory px-1.5 py-1',
        slots[size][aspect],
        className,
      )}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="max-h-full max-w-full object-contain"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </span>
  )
}
