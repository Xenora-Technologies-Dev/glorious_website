import { company } from '@/content/company'
import { conversionPaths, footerLinks } from '@/content/navigation'
import { brands } from '@/content/brands'
import { Container } from '@/components/ui/Container'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-navy-deep text-ivory">
      <Container className="pt-16 pb-10 lg:pt-28">
        <div className="grid gap-14 border-b border-line-light pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-8 flex items-center gap-4">
              <img
                src="/brand/logo.png"
                alt="Glorious Ascent"
                className="size-[4.5rem] object-contain"
              />
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
                  Dubai · UAE
                </p>
                <p className="mt-1 font-display text-3xl">{company.shortName}</p>
              </div>
            </div>
            <p className="max-w-md text-base leading-relaxed text-ivory/70">
              {company.positioning}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-4">
            <FooterCol title="Company" links={footerLinks.company} />
            <FooterCol title="Products" links={footerLinks.products} />
            <FooterCol title="Services" links={footerLinks.services} />
            <div>
              <p className="mb-5 text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
                Brands
              </p>
              <ul className="space-y-3 text-sm text-ivory/75">
                {brands.map((brand) => (
                  <li key={brand.slug}>
                    <Link
                      to={brand.href}
                      className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3 hover:text-gold"
                    >
                      <BrandLogo brand={brand} size="sm" plate className="w-full" />
                      <span className="leading-snug">{brand.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

                <div className="grid gap-10 border-b border-line-light py-14 sm:grid-cols-2 xl:grid-cols-4">
          {Object.values(company.offices).map((office) => {
            const detail = office as {
              label: string
              address: string
              operatingName?: string
              role?: string
              hours?: string
              phone?: string
              phoneHref?: string
              phoneSecondary?: string
              phoneSecondaryHref?: string
            }
            return (
              <div key={detail.label}>
                <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
                  {detail.label}
                </p>
                {detail.operatingName ? (
                  <p className="mb-2 text-sm font-semibold text-ivory">{detail.operatingName}</p>
                ) : null}
                <p className="max-w-sm text-sm leading-relaxed text-ivory/75">{detail.address}</p>
                {detail.role ? (
                  <p className="mt-2 text-sm text-ivory/60">{detail.role}</p>
                ) : null}
                {detail.hours ? (
                  <p className="mt-2 text-sm text-ivory/60">{detail.hours}</p>
                ) : null}
                {detail.phone && detail.phoneHref ? (
                  <a href={detail.phoneHref} className="mt-4 inline-block text-sm text-ivory hover:text-gold">
                    {detail.phone}
                  </a>
                ) : null}
                {detail.phoneSecondary && detail.phoneSecondaryHref ? (
                  <a href={detail.phoneSecondaryHref} className="mt-2 inline-block text-sm text-ivory hover:text-gold">
                    {detail.phoneSecondary}
                  </a>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ivory/50">
            Work with us
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {conversionPaths.map((path) => (
              <Link
                key={path.href}
                to={path.href}
                className="text-[12px] font-semibold tracking-[0.14em] uppercase text-gold hover:text-gold-bright"
              >
                {path.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line-light pt-6 text-[12px] text-ivory/45 sm:flex-row sm:justify-between">
          <p>
          <p>© {new Date().getFullYear()} {company.legalName}</p>
          </p>
          <p>International FMCG · Trading · Private label</p>
        </div>
      </Container>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <div>
      <p className="mb-5 text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
        {title}
      </p>
      <ul className="space-y-3 text-sm text-ivory/75">
        {links.map((link) => (
          <li key={link.href}>
            <Link to={link.href} className="hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
