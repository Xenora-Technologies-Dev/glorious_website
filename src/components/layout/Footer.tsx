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
                className="size-16 rounded-full object-cover"
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
              <ul className="space-y-4 text-sm text-ivory/75">
                {brands.map((brand) => (
                  <li key={brand.slug}>
                    <Link to={brand.href} className="flex items-center gap-3 hover:text-gold">
                      <BrandLogo brand={brand} size="sm" plate />
                      <span>{brand.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-10 border-b border-line-light py-14 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
              {company.offices.uae.label}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/75">
              {company.offices.uae.address}
            </p>
            <p className="mt-2 text-sm text-ivory/60">{company.offices.uae.poBox}</p>
            <a
              href={company.offices.uae.phoneHref}
              className="mt-4 inline-block text-sm text-ivory hover:text-gold"
            >
              {company.offices.uae.phone}
            </a>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
              {company.offices.uk.label}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/75">
              {company.offices.uk.address}
            </p>
            <p className="mt-2 text-sm text-ivory/60">{company.offices.uk.hours}</p>
            <a
              href={company.offices.uk.phoneHref}
              className="mt-4 inline-block text-sm text-ivory hover:text-gold"
            >
              {company.offices.uk.phone}
            </a>
          </div>
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
            © {new Date().getFullYear()} {company.legalName}
          </p>
          <p>International FMCG · Food trading · Private label</p>
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
