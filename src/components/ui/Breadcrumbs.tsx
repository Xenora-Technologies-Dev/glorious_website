import { cn } from '@/lib/cn'
import { Link } from 'react-router-dom'

type Crumb = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: Crumb[]
  className?: string
  tone?: 'dark' | 'light'
}

export function Breadcrumbs({ items, className, tone = 'light' }: BreadcrumbsProps) {
  const current = tone === 'dark' ? 'text-ivory' : 'text-navy'
  const link = tone === 'dark' ? 'text-ivory/60 hover:text-gold' : 'hover:text-gold'

  return (
    <nav aria-label="Breadcrumb" className={cn('text-[12px] tracking-[0.16em] uppercase', className)}>
      <ol className="flex flex-wrap items-center gap-2 text-muted">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href && index < items.length - 1 ? (
              <Link to={item.href} className={link}>
                {item.label}
              </Link>
            ) : (
              <span className={current}>{item.label}</span>
            )}
            {index < items.length - 1 ? <span className="text-gold/70">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
