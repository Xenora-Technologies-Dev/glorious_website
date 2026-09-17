import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { Seo } from '@/components/seo/Seo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { company } from '@/content/company'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { conversionPaths } from '@/content/navigation'
import { pageMeta } from '@/content/seo'

export function ContactPage() {
  return (
    <>
      <Seo
        title={pageMeta.contact.title}
        description={pageMeta.contact.description}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <section className="bg-ivory pt-[calc(7.5rem+env(safe-area-inset-top))] pb-20 sm:pt-32 lg:pt-40 lg:pb-32">
        <Container>
          <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] uppercase text-gold-muted">
            Contact
          </p>
          <h1 className="font-display max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] text-navy">
            Let’s Talk Business.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Product information, quotations, private-label programmes and partnerships. Use the
            form or call our Dubai or London office.
          </p>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
            <aside className="lg:col-span-5">
              <div className="space-y-8">
                {(
                  [
                    company.offices.uae,
                    company.offices.uk,
                    company.offices.india,
                    company.offices.ethiopia,
                  ] as Array<{
                    label: string
                    address: string
                    operatingName?: string
                    role?: string
                    phone?: string
                    phoneHref?: string
                    phoneSecondary?: string
                    phoneSecondaryHref?: string
                  }>
                ).map((office) => (
                  <div key={office.label}>
                    <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                      {office.label}
                    </p>
                    {office.operatingName ? (
                      <p className="mt-2 text-sm font-semibold text-navy">{office.operatingName}</p>
                    ) : null}
                    <p className="mt-3 text-sm leading-relaxed text-muted">{office.address}</p>
                    {office.role ? (
                      <p className="mt-2 text-sm text-muted">{office.role}</p>
                    ) : null}
                    {office.phone && office.phoneHref ? (
                      <a href={office.phoneHref} className="mt-3 inline-block text-navy">
                        {office.phone}
                      </a>
                    ) : null}
                    {office.phoneSecondary && office.phoneSecondaryHref ? (
                      <a href={office.phoneSecondaryHref} className="mt-2 inline-block text-navy">
                        {office.phoneSecondary}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Button href={company.offices.uae.phoneHref} variant="navy">
                  Contact sales
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-3 [&>a]:w-full sm:[&>a]:w-auto">
                {conversionPaths.map((path) => (
                  <Button key={path.href} href={path.href} variant="ghost" magnetic={false}>
                    {path.label}
                  </Button>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
