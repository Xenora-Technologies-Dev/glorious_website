import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'

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
  return <EnquiryFields key={defaultType} defaultType={defaultType} />
}

function EnquiryFields({ defaultType }: { defaultType: string }) {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const formId = useId()
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    enquiryType: defaultType,
    product: '',
    message: '',
    website: '',
  })

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.website) return

    const next: FieldErrors = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'A valid email is required.'
    }
    if (!form.enquiryType) next.enquiryType = 'Select an enquiry type.'
    if (!form.message.trim()) next.message = 'Message is required.'

    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="border border-line bg-cream p-8">
        <h2 className="font-display text-3xl text-navy">Received.</h2>
        <p className="mt-4 text-muted">
          Thank you. Our team will review your enquiry and respond shortly.
        </p>
      </div>
    )
  }

  return (
    <form className="relative grid gap-6 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
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
      <div className="pt-2 sm:col-span-2 [&>button]:w-full sm:[&>button]:w-auto">
        <Button type="submit" variant="navy" size="lg">
          Start a Conversation
        </Button>
      </div>
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
