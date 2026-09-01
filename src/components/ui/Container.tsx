import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer'
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16', className)}>
      {children}
    </Tag>
  )
}
