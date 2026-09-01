import { imageReveal, parallax } from '@/lib/animations'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/cn'
import { useRef } from 'react'

type ImageRevealProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  parallaxAmount?: number
}

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  parallaxAmount = 60,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useGSAP(
    () => {
      if (!ref.current || !frameRef.current || !imgRef.current) return
      imageReveal(imgRef.current, frameRef.current)
      parallax(imgRef.current, ref.current, parallaxAmount)
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <div ref={frameRef} className="h-full w-full overflow-hidden">
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn('h-full w-full object-cover will-transform', imgClassName)}
        />
      </div>
    </div>
  )
}
