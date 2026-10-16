import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { company } from '@/content/company'
import { breadcrumbJsonLd } from '@/content/jsonld'
import { pageMeta } from '@/content/seo'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const lastUpdated = '16 October 2026'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="font-display text-2xl text-navy sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  )
}

export function PrivacyPolicyPage() {
  const uae = company.offices.uae
  return (
    <>
      <Seo
        title={pageMeta.privacy.title}
        description={pageMeta.privacy.description}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' },
        ])}
      />
      <section className="bg-ivory pt-[calc(7.5rem+env(safe-area-inset-top))] pb-20 sm:pt-32 lg:pt-40 lg:pb-32">
        <Container>
          <p className="mb-5 text-[11px] font-semibold tracking-[0.24em] uppercase text-gold-muted">
            Legal
          </p>
          <h1 className="font-display max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] text-navy">
            Privacy Policy
          </h1>
          <p className="mt-6 text-sm text-muted">Last updated: {lastUpdated}</p>

          <div className="mt-12 max-w-3xl space-y-10">
            <Section title="Who we are">
              <p>
                This website is operated by {company.legalName} ("Glorious Ascent", "we", "us"), a
                food and FMCG trading company headquartered at {uae.address}, United Arab Emirates.
                This policy explains how we handle the business contact information you share with
                us through this website and our WhatsApp channels.
              </p>
            </Section>

            <Section title="Information we collect">
              <p>We only collect the information you choose to give us, which may include:</p>
              <ul>
                <li>Enquiry form: your name, company, email address, phone number and country.</li>
                <li>
                  Enquiry details: enquiry type, product, brand, pack size, quantity, delivery
                  destination and your message.
                </li>
                <li>
                  WhatsApp or phone: your name, phone number and the content of messages you send
                  us.
                </li>
                <li>
                  Basic technical data that our hosting provider records automatically when you
                  visit (such as IP address, browser type and pages requested), used for security
                  and to keep the site running.
                </li>
              </ul>
            </Section>

            <Section title="How we use it">
              <p>We use your information only to:</p>
              <ul>
                <li>respond to your enquiry and prepare quotations, samples or product information;</li>
                <li>discuss and manage orders, private-label projects, supply and delivery;</li>
                <li>keep a record of our business correspondence with you;</li>
                <li>protect the website against spam and misuse.</li>
              </ul>
              <p>
                We do not use your details for unrelated marketing without your agreement, and you
                can ask us to stop contacting you at any time.
              </p>
            </Section>

            <Section title="Sharing">
              <p>
                We do not sell, rent or trade your personal information. We share it only where
                needed to deal with your enquiry: within the Glorious Ascent group (including our
                UK, India and Ethiopia offices), with logistics, inspection or manufacturing partners
                involved in fulfilling your request, with service providers who host our website and
                process form submissions on our behalf, or where required by law.
              </p>
              <p>
                WhatsApp is operated by WhatsApp LLC / Meta; messages you send through it are also
                subject to WhatsApp's own privacy policy.
              </p>
            </Section>

            <Section title="How long we keep it">
              <p>
                We keep enquiry and correspondence records for as long as needed to respond to you
                and maintain our business relationship, and for any period required by UAE commercial,
                tax or other laws. Enquiries that do not lead to business are normally deleted within
                24 months.
              </p>
            </Section>

            <Section title="Security">
              <p>
                This website is served over an encrypted (HTTPS) connection, and access to enquiry
                data is limited to staff who need it to handle your request. No method of
                transmission or storage is completely secure, but we take reasonable steps to
                protect your information.
              </p>
            </Section>

            <Section title="Your choices and rights">
              <p>
                You can ask us to access, correct or delete the personal information we hold about
                you, or to stop contacting you. We handle these requests in line with applicable law,
                including the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021)
                where it applies.
              </p>
            </Section>

            <Section title="Cookies">
              <p>
                This website does not use advertising or tracking cookies. If we introduce analytics
                in the future, we will update this policy.
              </p>
            </Section>

            <Section title="Contact us">
              <p>For any privacy question or request, contact:</p>
              <p className="text-navy">
                {company.legalName}
                <br />
                {uae.address}
                <br />
                Phone:{' '}
                <a href={uae.phoneHref} className="underline underline-offset-4 hover:text-gold">
                  {uae.phone}
                </a>
                <br />
                WhatsApp: {company.whatsapp.map((item) => item.label).join(' / ')}
              </p>
              <p>
                Or send us a message through our{' '}
                <Link to="/contact" className="text-navy underline underline-offset-4 hover:text-gold">
                  contact form
                </Link>
                .
              </p>
            </Section>

            <Section title="Changes to this policy">
              <p>
                We may update this policy from time to time. The latest version will always be
                published on this page with its "last updated" date.
              </p>
            </Section>
          </div>
        </Container>
      </section>
    </>
  )
}
