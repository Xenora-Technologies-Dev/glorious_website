import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Magnetic } from '@/components/ui/Magnetic'
import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'

type Variant = 'gold' | 'outline' | 'ghost' | 'ivory' | 'navy'
type Size = 'md' | 'lg'

type ButtonProps = {
  children: ReactNode
  className?: string
  variant?: Variant
  size?: Size
  magnetic?: boolean
  href?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'>

const styles: Record<Variant, string> = {
  gold: 'bg-gold text-navy-deep hover:bg-gold-bright',
  outline:
    'border border-gold/70 text-gold bg-transparent hover:bg-gold hover:text-navy-deep',
  ghost: 'text-current bg-transparent hover:text-gold',
  ivory: 'bg-ivory text-navy-deep hover:bg-white',
  navy: 'bg-navy text-ivory hover:bg-navy-mid',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 py-3 text-[11px] sm:h-11 sm:px-6 sm:py-0 sm:text-[12px] md:text-[13px]',
  lg: 'min-h-12 px-5 py-3 text-[11px] sm:h-12 sm:px-7 sm:py-0 sm:text-[12px] md:text-[13px]',
}

export function Button({
  children,
  className,
  variant = 'gold',
  size = 'md',
  magnetic = true,
  href,
  type = 'button',
  onClick,
  ...rest
}: ButtonProps) {
  const surface = (
    <span
      className={cn(
        'group inline-flex w-full max-w-full items-center justify-center gap-2 rounded-sm text-center font-sans font-semibold tracking-[0.12em] uppercase transition-colors duration-300 sm:tracking-[0.16em]',
        styles[variant],
        sizes[size],
      )}
    >
      {children}
      {href || type === 'submit' ? (
        <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : null}
    </span>
  )

  const wrapped = magnetic ? <Magnetic className="w-full">{surface}</Magnetic> : surface

  if (href) {
    const external = href.startsWith('http') || href.startsWith('tel:')
    if (external) {
      return (
        <a href={href} className={cn('inline-flex max-w-full', className)} onClick={onClick}>
          {wrapped}
        </a>
      )
    }

    return (
      <Link to={href} className={cn('inline-flex max-w-full', className)} onClick={onClick}>
        {wrapped}
      </Link>
    )
  }

  return (
    <button type={type} className={cn('inline-flex max-w-full', className)} onClick={onClick} {...rest}>
      {wrapped}
    </button>
  )
}
