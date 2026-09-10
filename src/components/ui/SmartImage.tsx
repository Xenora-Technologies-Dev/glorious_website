import { cn } from '@/lib/cn'
import { useState } from 'react'

type SmartImageProps = {
  src: string
  fallback?: string
  alt: string
  className?: string
  imgClassName?: string
  eager?: boolean
}

export function SmartImage({
  src,
  fallback,
  alt,
  className,
  imgClassName,
  eager = false,
}: SmartImageProps) {
  const [current, setCurrent] = useState(src)
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-transparent', className)}>
      {failed && !fallback ? (
        <div className="flex h-full min-h-[220px] items-end p-6">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
            Image pending
          </p>
        </div>
      ) : (
        <img
          src={current}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : undefined}
          className={cn('h-full w-full object-cover', imgClassName)}
          onError={() => {
            if (fallback && current !== fallback) {
              setCurrent(fallback)
              return
            }
            setFailed(true)
          }}
        />
      )}
    </div>
  )
}