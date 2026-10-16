import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { company } from '@/content/company'

const enquiryTypes = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'product', label: 'Product Enquiry' },
  { value: 'quote', label: 'Request a Quote' },
  { value: 'private-label', label: 'Private Label' },
  { value: 'partner', label: 'Partnership' },
  { value: 'distribution', label: 'Distribution' },
  { value: 'sales', label: 'Contact Sales' },
] as const

type FieldErrors = Partial<Record<'name' | 'email' | 'message' | 'enquiryType', string>>

const intentMap: Record<string, string> = {
  product: 'product',
  quote: 'quote',
  'private-label': 'private-label',
  partner: 'partner',
  sales: 'sales',
}

export function EnquiryForm() {
  const [params] = useSearchParams()
  const defaultType = intentMap[params.get('intent') ?? ''] ?? 'general'
  const prefill = {
    product: (params.get('product') ?? '').slice(0, 120),
    brand: (params.get('brand') ?? '').slice(0, 80),
    packSize: (params.get('packSize') ?? '').slice(0, 80),
  }
  return (
    <EnquiryFields
      key={`${defaultType}|${prefill.product}|${prefill.brand}|${prefill.packSize}`}
      defaultType={defaultType}
      prefill={prefill}
    />
  )
}

const FORM_NAME = 'enquiry'

function encode(data: Record<string, string>) {
  return new URLSearchParams(data).toString()
}

function EnquiryFields({
  defaultType,
  prefill,
}: {
  defaultType: string
  prefill: { product: string; brand: string; packSize: string }
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const formId = useId()
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    enquiryType: defaultType,
    product: prefill.product,
    brand: prefill.brand,
    packSize: prefill.packSize,
    quantity: '',
    deliveryDestination: '',
    message: '',
    website: '',
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    if (form.website) {
      setStatus('sent')
      return
    }

    const next: FieldErrors = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'A valid email is required.'
    }
    if (!form.enquiryType) next.enquiryType = 'Select an enquiry type.'
    if (!form.message.trim()) next.message = 'Message is required.'

    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('sending')
    try {
      // Netlify Forms: POST url-encoded data with the registered form-name.
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, ...form }),
      })
      if (!response.ok) throw new Error(`Form submit failed: ${response.status}`)
      setStatus('sent')
      window.scrollTo({ top: 0 })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" aria-live="polite" className="border border-line bg-cream p-8">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-muted">
          Enquiry sent
        </p>
        <h2 className="mt-3 font-display text-3xl text-navy">Thank you, {form.name.split(' ')[0]}.</h2>
        <p className="mt-4 text-muted">
          We have received your {form.enquiryType === 'quote' ? 'quote request' : 'enquiry'}
          {form.product ? ` for ${form.product}` : ''}. Our team will reply to{' '}
          <span className="text-navy">{form.email}</span>, usually within one business day.
        </p>
        <p className="mt-4 text-sm text-muted">
          For anything urgent, call {company.offices.uae.phone} or message us on WhatsApp.
        </p>
      </div>
    )
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="website"
      className="relative grid gap-6 sm:grid-cols-2"
      onSubmit={onSubmit}
      noValidate
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input
        tabIndex={-1}
        autoComplete="off"
        name="website"
        value={form.website}
        onChange={(event) => setForm({ ...form, website: event.target.value })}
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      />
      <Field id={`${formId}-name`} label="Name" error={errors.name}>
        <input
          id={`${formId}-name`}
          name="name"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className={inputClass(errors.name)}
        />
      </Field>
      <Field id={`${formId}-company`} label="Company">
        <input
          id={`${formId}-company`}
          name="company"
          autoComplete="organization"
          value={form.company}
          onChange={(event) => setForm({ ...form, company: event.target.value })}
          className={inputClass()}
        />
      </Field>
      <Field id={`${formId}-email`} label="Email" error={errors.email}>
        <input
          id={`${formId}-email`}
          type="email"
          name="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className={inputClass(errors.email)}
        />
      </Field>
      <Field id={`${formId}-phone`} label="Phone">
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          className={inputClass()}
        />
      </Field>
      <Field id={`${formId}-country`} label="Country">
        <input
          id={`${formId}-country`}
          name="country"
          autoComplete="country-name"
          value={form.country}
          onChange={(event) => setForm({ ...form, country: event.target.value })}
          className={inputClass()}
        />
      </Field>
      <Field id={`${formId}-type`} label="Enquiry Type" error={errors.enquiryType}>
        <select
          id={`${formId}-type`}
          name="enquiryType"
          required
          aria-invalid={Boolean(errors.enquiryType)}
          value={form.enquiryType}
          onChange={(event) => setForm({ ...form, enquiryType: event.target.value })}
          className={inputClass(errors.enquiryType)}
        >
          {enquiryTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field id={`${formId}-product`} label="Product / Service">
          <input
            id={`${formId}-product`}
            name="product"
            value={form.product}
            onChange={(event) => setForm({ ...form, product: event.target.value })}
            className={inputClass()}
          />
        </Field>
      </div>
      <Field id={`${formId}-brand`} label="Brand">
          <input
            id={`${formId}-brand`}
            name="brand"
            value={form.brand}
            onChange={(event) => setForm({ ...form, brand: event.target.value })}
            className={inputClass()}
          />
        </Field>
      <Field id={`${formId}-packSize`} label="Pack size">
          <input
            id={`${formId}-packSize`}
            name="packSize"
            value={form.packSize}
            onChange={(event) => setForm({ ...form, packSize: event.target.value })}
            className={inputClass()}
          />
        </Field>
      <Field id={`${formId}-quantity`} label="Quantity">
          <input
            id={`${formId}-quantity`}
            name="quantity"
            placeholder="e.g. 500 cartons / 1 x 20ft container"
            value={form.quantity}
            onChange={(event) => setForm({ ...form, quantity: event.target.value })}
            className={inputClass()}
          />
        </Field>
      <Field id={`${formId}-deliveryDestination`} label="Delivery destination">
          <input
            id={`${formId}-deliveryDestination`}
            name="deliveryDestination"
            autoComplete="off"
            placeholder="City, country or port"
            value={form.deliveryDestination}
            onChange={(event) => setForm({ ...form, deliveryDestination: event.target.value })}
            className={inputClass()}
          />
        </Field>
      <div className="sm:col-span-2">
        <Field id={`${formId}-message`} label="Message" error={errors.message}>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className={cn(inputClass(errors.message), 'h-auto min-h-[8rem] py-3')}
        />
      </Field>
      </div>
      <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center [&>button]:w-full sm:[&>button]:w-auto">
        <Button type="submit" variant="navy" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Start a Conversation'}
        </Button>
        <p className="text-xs leading-relaxed text-muted">
          By submitting, you agree that we may use your details to respond to your enquiry, as set
          out in our{' '}
          <Link to="/privacy-policy" className="text-navy underline underline-offset-4 hover:text-gold">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      {status === 'error' ? (
        <p role="alert" className="text-sm font-medium text-red sm:col-span-2">
          Sorry, your enquiry could not be sent. Please try again, call{' '}
          {company.offices.uae.phone} or message us on WhatsApp.
        </p>
      ) : null}
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted">
        {label}
      </label>
      {children}
      {error ? (
        <span id={`${id}-error`} className="text-sm font-medium tracking-normal text-red">
          {error}
        </span>
      ) : null}
    </div>
  )
}

function inputClass(error?: string) {
  return cn(
    'h-12 w-full border-0 border-b bg-transparent px-0 text-base font-normal tracking-normal text-navy outline-none transition-colors duration-300 focus:border-gold',
    error ? 'border-red' : 'border-line',
  )
}
