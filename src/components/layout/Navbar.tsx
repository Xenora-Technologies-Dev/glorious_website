import { company } from '@/content/company'
import {
  brandMega,
  companyMega,
  navCta,
  productMega,
  solutionsMega,
} from '@/content/navigation'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

type NavbarProps = {
  overlay?: boolean
}

type MenuKey = 'products' | 'brands' | 'solutions' | 'company' | null

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
          'fixed top-0 right-0 left-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
          solid
            ? 'border-b border-line bg-ivory/90 shadow-nav backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
        onMouseLeave={scheduleMegaClose}
        onMouseEnter={() => window.clearTimeout(closeTimer.current)}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12 xl:px-16">
          <Link to="/" className="flex items-center gap-3" aria-label={company.shortName} onClick={closeMenu}>
            <img
              src="/brand/logo.png"
              alt=""
              width={48}
              height={48}
              className="size-11 rounded-full object-cover sm:size-12"
            />
            <span
              className={cn(
                'hidden font-sans text-[11px] font-semibold tracking-[0.18em] uppercase sm:block',
                light ? 'text-ivory' : 'text-navy',
              )}
            >
              Glorious Ascent
            </span>
          </Link>

          <nav className="hidden items-center gap-8 xl:flex" aria-label="Primary">
            <MegaTrigger
              label="Products"
              href="/products"
              active={mega === 'products'}
              light={light}
              onEnter={() => openMega('products')}
            />
            <MegaTrigger
              label="Brands"
              href="/brands"
              active={mega === 'brands'}
              light={light}
              onEnter={() => openMega('brands')}
            />
            <MegaTrigger
              label="Solutions"
              active={mega === 'solutions'}
              light={light}
              onEnter={() => openMega('solutions')}
            />
            <MegaTrigger
              label="Company"
              href="/about"
              active={mega === 'company'}
              light={light}
              onEnter={() => openMega('company')}
            />
            <NavLink
              to="/insights"
              onMouseEnter={() => openMega(null)}
              className={({ isActive }) => navClass(light, isActive)}
            >
              Insights
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button href={navCta.href} variant={light ? 'outline' : 'navy'} size="md">
                {navCta.label}
              </Button>
            </div>
            <button
              type="button"
              className={cn(
                'inline-flex size-11 items-center justify-center xl:hidden',
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
          <div className="hidden border-t border-line bg-ivory xl:block">
            <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 px-12 py-10 xl:px-16">
              {mega === 'products' ? (
                <>
                  <MegaCol title="Categories" className="col-span-5">
                    {productMega.categories.map((item) => (
                      <MegaLink key={item.href} href={item.href}>
                        {item.label}
                      </MegaLink>
                    ))}
                  </MegaCol>
                  <MegaCol title="Featured brands" className="col-span-4">
                    {productMega.featured.map((item) => (
                      <MegaLink key={item.href} href={item.href}>
                        {item.label}
                      </MegaLink>
                    ))}
                  </MegaCol>
                  <MegaCol title="Programmes" className="col-span-3">
                    <MegaLink href={productMega.extra.href}>{productMega.extra.label}</MegaLink>
                    <MegaLink href="/products">All products</MegaLink>
                  </MegaCol>
                </>
              ) : null}
              {mega === 'brands' ? (
                <MegaCol title="Portfolio" className="col-span-12">
                  <div className="grid grid-cols-4 gap-x-8 gap-y-3">
                    {brandMega.map((item) => (
                      <MegaLink key={item.href} href={item.href}>
                        {item.label}
                      </MegaLink>
                    ))}
                  </div>
                </MegaCol>
              ) : null}
              {mega === 'solutions' ? (
                <div className="col-span-12 grid grid-cols-3 gap-8">
                  {solutionsMega.map((item) => (
                    <Link key={item.href} to={item.href} className="group border-t border-line pt-5">
                      <p className="font-display text-3xl text-navy group-hover:text-gold">{item.label}</p>
                      <p className="mt-2 text-sm text-muted">{item.copy}</p>
                    </Link>
                  ))}
                </div>
              ) : null}
              {mega === 'company' ? (
                <MegaCol title="Company" className="col-span-6">
                  {companyMega.map((item) => (
                    <MegaLink key={item.href} href={item.href}>
                      {item.label}
                    </MegaLink>
                  ))}
                </MegaCol>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>

      {open ? (
        <div
          id={menuId}
          ref={menuRef}
          className="fixed inset-0 z-40 overflow-y-auto bg-navy-deep pt-28 pr-6 pb-10 pl-6 xl:hidden"
        >
          <div className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-[1440px] flex-col justify-between">
            <nav className="flex flex-col gap-8">
              <MobileGroup title="Products">
                <Link to="/products" data-menu-item onClick={closeMenu} className={mobileLink}>
                  All products
                </Link>
                {productMega.categories.map((item) => (
                  <Link key={item.href} to={item.href} data-menu-item onClick={closeMenu} className={mobileSub}>
                    {item.label}
                  </Link>
                ))}
              </MobileGroup>
              <MobileGroup title="Brands">
                {brandMega.map((item) => (
                  <Link key={item.href} to={item.href} data-menu-item onClick={closeMenu} className={mobileSub}>
                    {item.label}
                  </Link>
                ))}
              </MobileGroup>
              <MobileGroup title="Solutions">
                {solutionsMega.map((item) => (
                  <Link key={item.href} to={item.href} data-menu-item onClick={closeMenu} className={mobileSub}>
                    {item.label}
                  </Link>
                ))}
              </MobileGroup>
              <MobileGroup title="Company">
                <Link to="/about" data-menu-item onClick={closeMenu} className={mobileSub}>
                  About
                </Link>
                <Link to="/contact" data-menu-item onClick={closeMenu} className={mobileSub}>
                  Contact
                </Link>
              </MobileGroup>
              <Link to="/insights" data-menu-item onClick={closeMenu} className={mobileLink}>
                Insights
              </Link>
            </nav>
            <div data-menu-item className="mt-10 flex flex-col gap-4">
              <Button href={navCta.href} variant="gold" size="lg" onClick={closeMenu}>
                {navCta.label}
              </Button>
              <p className="text-sm text-ivory/60">{company.location} · International FMCG trading</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function navClass(light: boolean, isActive: boolean) {
  return cn(
    'nav-link relative py-2 text-[12px] font-medium tracking-[0.16em] uppercase',
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
      <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-muted">{title}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

function MegaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link to={href} className="text-lg text-navy transition-colors hover:text-gold">
      {children}
    </Link>
  )
}

function MobileGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p data-menu-item className="mb-3 font-display text-4xl text-ivory sm:text-5xl">
        {title}
      </p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

const mobileLink = 'font-display text-4xl text-ivory hover:text-gold sm:text-5xl'
const mobileSub = 'text-lg text-ivory/70 hover:text-gold'
