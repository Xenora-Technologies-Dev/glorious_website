import { company } from '@/content/company'
import {
  brandMega,
  navCta,
  primaryNav,
  productMega,
  solutionsMega,
  type MegaKey,
} from '@/content/navigation'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

type NavbarProps = {
  overlay?: boolean
}

type MenuKey = MegaKey | null

export function Navbar({ overlay = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState<MenuKey>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof window.setTimeout> | undefined>(undefined)
  const location = useLocation()
  const menuId = useId()

  const closeMenu = () => setOpen(false)

  const [path, setPath] = useState(location.pathname)
  if (location.pathname !== path) {
    setPath(location.pathname)
    setOpen(false)
    setMega(null)
  }

  const openMega = (key: MenuKey) => {
    window.clearTimeout(closeTimer.current)
    setMega(key)
  }

  const scheduleMegaClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMega(null), 160)
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMega(null)
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    return () => window.clearTimeout(closeTimer.current)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useGSAP(
    () => {
      if (!open || !menuRef.current) return
      gsap.fromTo(
        menuRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, ease: 'power4.out' },
      )
      gsap.fromTo(
        menuRef.current.querySelectorAll('[data-menu-item]'),
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.05, delay: 0.08, ease: 'power4.out' },
      )
    },
    { dependencies: [open], scope: menuRef },
  )

  const solid = (!overlay || scrolled || Boolean(mega)) && !open
  const light = (overlay && !scrolled && !mega) || open

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-500',
          solid
            ? 'border-b border-line bg-ivory/90 shadow-nav backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
        onMouseLeave={scheduleMegaClose}
        onMouseEnter={() => window.clearTimeout(closeTimer.current)}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-8 lg:px-10 xl:px-16">
          <Link
            to="/"
            className="flex min-w-0 shrink-0 items-center gap-3"
            aria-label={company.shortName}
            onClick={closeMenu}
          >
            <img
              src="/brand/logo.png"
              alt=""
              width={48}
              height={48}
              className="size-10 rounded-full object-cover sm:size-12"
            />
            <span
              className={cn(
                'hidden truncate font-sans text-[11px] font-semibold tracking-[0.18em] uppercase sm:block lg:hidden 2xl:block',
                light ? 'text-ivory' : 'text-navy',
              )}
            >
              Glorious Ascent
            </span>
          </Link>

          <nav
            className="hidden min-w-0 items-center justify-end gap-3 lg:flex xl:gap-5 2xl:gap-7"
            aria-label="Primary"
          >
            {primaryNav.map((item) =>
              item.mega ? (
                <MegaTrigger
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  active={mega === item.mega}
                  light={light}
                  onEnter={() => openMega(item.mega ?? null)}
                />
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href!}
                  end={item.href === '/'}
                  onMouseEnter={() => openMega(null)}
                  className={({ isActive }) => navClass(light, isActive)}
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden xl:block">
              <Button href={navCta.href} variant={light ? 'outline' : 'navy'} size="md">
                {navCta.label}
              </Button>
            </div>
            <button
              type="button"
              className={cn(
                'inline-flex size-11 items-center justify-center lg:hidden',
                light ? 'text-ivory' : 'text-navy',
              )}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {mega ? (
          <div className="hidden border-t border-line bg-ivory lg:block">
            <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-8 py-8 xl:gap-10 xl:px-16 xl:py-10">
              {mega === 'products' ? (
                <>
                  <MegaCol title="Categories" className="col-span-12 md:col-span-5">
                    {productMega.categories.map((item) => (
                      <MegaLink key={item.href} href={item.href}>
                        {item.label}
                      </MegaLink>
                    ))}
                  </MegaCol>
                  <MegaCol title="Featured brands" className="col-span-12 md:col-span-4">
                    {productMega.featured.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3 py-1"
                      >
                        <BrandLogo
                          brand={{
                            name: item.label,
                            logo: item.logo,
                            logoAspect: item.logoAspect,
                          }}
                          size="sm"
                        />
                        <span className="text-base text-navy transition-colors group-hover:text-gold xl:text-lg">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </MegaCol>
                  <MegaCol title="Programmes" className="col-span-12 md:col-span-3">
                    <MegaLink href={productMega.extra.href}>{productMega.extra.label}</MegaLink>
                    <MegaLink href="/products">All products</MegaLink>
                  </MegaCol>
                </>
              ) : null}
              {mega === 'brands' ? (
                <MegaCol title="Portfolio" className="col-span-12">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {brandMega.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3 border border-line px-3 py-3 transition-colors hover:border-gold"
                      >
                        <BrandLogo
                          brand={{
                            name: item.label,
                            logo: item.logo,
                            logoAspect: item.logoAspect,
                          }}
                          size="sm"
                        />
                        <span className="text-sm text-navy transition-colors group-hover:text-gold xl:text-base">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </MegaCol>
              ) : null}
              {mega === 'solutions' ? (
                <div className="col-span-12 grid gap-8 md:grid-cols-3">
                  {solutionsMega.map((item) => (
                    <Link key={item.href} to={item.href} className="group border-t border-line pt-5">
                      <p className="font-display text-2xl text-navy group-hover:text-gold xl:text-3xl">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm text-muted">{item.copy}</p>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>

      {open ? (
        <div
          id={menuId}
          ref={menuRef}
          className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-navy-deep pt-[calc(5.5rem+env(safe-area-inset-top))] pr-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pl-5 sm:px-8 lg:hidden"
        >
          <div className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-[1440px] flex-col justify-between">
            <nav className="flex flex-col gap-7">
              {primaryNav.map((item) => {
                if (item.mega === 'products') {
                  return (
                    <MobileGroup key={item.label} title="Products">
                      <Link to="/products" data-menu-item onClick={closeMenu} className={mobileLink}>
                        All products
                      </Link>
                      {productMega.categories.map((entry) => (
                        <Link
                          key={entry.href}
                          to={entry.href}
                          data-menu-item
                          onClick={closeMenu}
                          className={mobileSub}
                        >
                          {entry.label}
                        </Link>
                      ))}
                    </MobileGroup>
                  )
                }
                if (item.mega === 'brands') {
                  return (
                    <MobileGroup key={item.label} title="Brands">
                      {brandMega.map((entry) => (
                        <Link
                          key={entry.href}
                          to={entry.href}
                          data-menu-item
                          onClick={closeMenu}
                          className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3 py-1"
                        >
                          <BrandLogo
                            brand={{
                              name: entry.label,
                              logo: entry.logo,
                              logoAspect: entry.logoAspect,
                            }}
                            size="sm"
                            plate
                          />
                          <span className={mobileSub}>{entry.label}</span>
                        </Link>
                      ))}
                    </MobileGroup>
                  )
                }
                if (item.mega === 'solutions') {
                  return (
                    <MobileGroup key={item.label} title="Solutions">
                      {solutionsMega.map((entry) => (
                        <Link
                          key={entry.href}
                          to={entry.href}
                          data-menu-item
                          onClick={closeMenu}
                          className={mobileSub}
                        >
                          {entry.label}
                        </Link>
                      ))}
                    </MobileGroup>
                  )
                }
                return (
                  <Link
                    key={item.href}
                    to={item.href!}
                    data-menu-item
                    onClick={closeMenu}
                    className={mobileLink}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div data-menu-item className="mt-10 flex flex-col gap-4">
              <Button href={navCta.href} variant="gold" size="lg" onClick={closeMenu}>
                {navCta.label}
              </Button>
              <p className="text-sm text-ivory/60">
                {company.location} · International FMCG trading
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function navClass(light: boolean, isActive: boolean) {
  return cn(
    'nav-link relative shrink-0 py-2 text-[11px] font-medium tracking-[0.12em] uppercase whitespace-nowrap xl:text-[12px] xl:tracking-[0.16em]',
    light ? 'text-ivory/80 hover:text-gold' : 'text-navy/70 hover:text-navy',
    isActive && (light ? 'text-gold' : 'text-navy'),
  )
}

function MegaTrigger({
  label,
  href,
  active,
  light,
  onEnter,
}: {
  label: string
  href?: string
  active: boolean
  light: boolean
  onEnter: () => void
}) {
  const className = cn(navClass(light, active), active && 'text-gold')
  if (href) {
    return (
      <NavLink
        to={href}
        className={className}
        onMouseEnter={onEnter}
        onFocus={onEnter}
        aria-expanded={active}
        aria-haspopup="true"
      >
        {label}
      </NavLink>
    )
  }
  return (
    <button
      type="button"
      className={className}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      aria-expanded={active}
      aria-haspopup="true"
    >
      {label}
    </button>
  )
}

function MegaCol({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-muted">
        {title}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

function MegaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link to={href} className="text-base text-navy transition-colors hover:text-gold xl:text-lg">
      {children}
    </Link>
  )
}

function MobileGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p data-menu-item className="mb-3 font-display text-[2rem] text-ivory sm:text-5xl">
        {title}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

const mobileLink =
  'font-display text-[2rem] leading-tight text-ivory hover:text-gold sm:text-5xl'
const mobileSub = 'text-base text-ivory/70 hover:text-gold sm:text-lg'
