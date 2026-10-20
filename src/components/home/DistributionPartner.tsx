import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { distributionPartner, mapsSearchUrl, type PartnerAddress } from '@/content/company'
import { fadeUp } from '@/lib/animations'
import { useGSAP } from '@/lib/gsap'
import { scrollMtFlushClass } from '@/lib/nav'
import { ArrowUpRight, Building2, Globe, Mail, Phone, Warehouse } from 'lucide-react'
import { useRef } from 'react'

/** Anchor id used by the footer, About page, llms.txt and JSON-LD (`/#distribution-partner`). */
export const DISTRIBUTION_PARTNER_ID = 'distribution-partner'

const addressIcons: Record<PartnerAddress['id'], typeof Building2> = {
  office: Building2,
  warehouse: Warehouse,
}

function initials(name: string) {
  return name
    .replace(/\b(FZ|FZE|FZCO|LLC|L\.L\.C\.?)\b/gi, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('')
}

/** Partner logo when supplied; otherwise a restrained text mark in the site palette. */
function PartnerMark() {
  const partner = distributionPartner
  if (partner.logo) {
    return (
      <img
        src={partner.logo}
        alt={partner.logoAlt ?? partner.name}
        className="h-14 w-auto max-w-[10rem] shrink-0 object-contain sm:h-16 lg:h-20"
        loading="lazy"
        decoding="async"
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-14 shrink-0 items-center justify-center border border-gold/60 bg-navy font-display text-2xl leading-none tracking-wide text-gold-bright sm:size-16 sm:text-[1.7rem] lg:size-20 lg:text-[2.1rem]"
    >
      {initials(partner.name)}
    </span>
  )
}

function partnerContacts() {
  const partner = distributionPartner
  return [
    partner.phone && partner.phoneHref
      ? { key: 'phone', icon: Phone, label: partner.phone, href: partner.phoneHref, external: false }
      : null,
    partner.whatsapp && partner.whatsappHref
      ? {
          key: 'whatsapp',
          icon: Phone,
          label: `WhatsApp ${partner.whatsapp}`,
          href: partner.whatsappHref,
          external: true,
        }
      : null,
    partner.email
      ? { key: 'email', icon: Mail, label: partner.email, href: `mailto:${partner.email}`, external: false }
      : null,
    partner.website
      ? {
          key: 'website',
          icon: Globe,
          label: partner.website.replace(/^https?:\/\//, '').replace(/\/$/, ''),
          href: partner.website,
          external: true,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null)
}

/** Homepage section: Glorious Ascent's distribution partner, between "Where we export" and the CTA. */
export function DistributionPartner() {
  const partner = distributionPartner
  const contacts = partnerContacts()
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!listRef.current) return
      fadeUp(listRef.current.querySelectorAll('[data-reveal]'), {
        stagger: 0.1,
        y: 32,
        trigger: listRef.current,
      })
    },
    { scope: listRef },
  )

  return (
    <section
      id={DISTRIBUTION_PARTNER_ID}
      aria-labelledby="distribution-partner-heading"
      className={`${scrollMtFlushClass} bg-cream py-20 sm:py-24 lg:py-32`}
    >
      <Container>
        <SectionHeader
          index="08"
          eyebrow="Distribution partner"
          titleId="distribution-partner-heading"
          title={
            <span className="flex items-center gap-4 sm:gap-6">
              <PartnerMark />
              <span className="min-w-0">{partner.name}</span>
            </span>
          }
        />

        {contacts.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {contacts.map(({ key, icon: Icon, label, href, external }) => (
              <li key={key}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex min-h-11 items-center gap-2.5 text-sm text-navy hover:text-gold-muted"
                >
                  <Icon aria-hidden="true" className="size-4 shrink-0 text-gold-muted" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <div
          ref={listRef}
          className="mt-12 grid gap-px border border-line border-t-2 border-t-gold bg-line sm:mt-14 md:grid-cols-2 lg:mt-16"
        >
          {partner.addresses.map((item) => {
            const Icon = addressIcons[item.id]
            return (
              <div
                key={item.id}
                data-reveal
                className="flex flex-col bg-ivory px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
              >
                <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
                  <Icon aria-hidden="true" className="size-4" />
                  {item.label}
                </p>
                <address className="mt-5 max-w-md font-display text-[clamp(1.25rem,1.1vw+0.95rem,1.75rem)] leading-[1.3] text-navy not-italic">
                  {item.address}
                </address>
                <a
                  href={mapsSearchUrl(item.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${partner.name} ${item.label.toLowerCase()} on Google Maps (opens in a new tab)`}
                  className="mt-6 inline-flex min-h-11 items-center gap-1.5 self-start text-[12px] font-semibold tracking-[0.14em] uppercase text-navy hover:text-gold-muted md:mt-auto md:pt-8"
                >
                  View on Google Maps
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
