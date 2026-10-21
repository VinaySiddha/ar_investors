import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { contact, buildWhatsAppUrl, buildMailtoUrl } from '@/config/site.config';

/** Change this to your Formspree / Web3Forms endpoint */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT ?? '';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot field — must stay empty */
  _honey: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px 0px' });
  const [formState, setFormState] = useState<FormState>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = async (data: FormValues) => {
    // Honeypot check (bot filled it in)
    if (data._honey) return;

    setFormState('submitting');

    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
          }),
        });
        if (res.ok) {
          setFormState('success');
          reset();
        } else {
          setFormState('error');
        }
      } catch {
        setFormState('error');
      }
    } else {
      // Fallback: open mailto
      const subject = `Enquiry from ${data.name}`;
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\n${data.message}`;
      window.open(buildMailtoUrl(subject, body));
      setFormState('success');
      reset();
    }
  };

  const inputClasses = [
    'w-full bg-bg border border-border-gold/30 rounded-sm px-4 py-3 text-text text-sm',
    'placeholder:text-muted/60',
    'focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40',
    'transition-colors duration-200',
  ].join(' ');

  const errorClasses = 'text-xs text-red-400 mt-1';

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 lg:py-28 bg-bg-elevated"
    >
      <Container>
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              id="contact-heading"
              eyebrow="Get In Touch"
              title="Start a Conversation"
              subtitle="Ready to explore opportunities? Reach out through any channel below."
            />

            <address className="mt-10 not-italic space-y-6">
              <ContactDetail
                icon={<EmailIcon />}
                label="Email"
                value={contact.email}
                href={buildMailtoUrl()}
              />
              <ContactDetail
                icon={<WhatsAppIcon />}
                label="WhatsApp"
                value="+974 7530038055"
                href={buildWhatsAppUrl()}
                external
              />
              <ContactDetail
                icon={<LocationIcon />}
                label="Address"
                value={`${contact.address}, ${contact.city}, ${contact.country}`}
                href={contact.mapUrl}
                external
              />
              <ContactDetail
                icon={<GlobeIcon />}
                label="Website"
                value={contact.website.replace('https://', '')}
                href={contact.website}
                external
              />
            </address>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-bg border border-border-gold/30 rounded-sm p-6 sm:p-8">
              {formState === 'success' ? (
                <div className="text-center py-10">
                  <div className="text-gold text-5xl mb-4" aria-hidden="true">✓</div>
                  <h3 className="font-serif text-2xl font-bold text-gold-light mb-2">
                    Message Received
                  </h3>
                  <p className="text-muted text-sm">
                    Thank you for reaching out. Our team will be in touch shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-6"
                    onClick={() => setFormState('idle')}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  aria-label="Contact form"
                >
                  {/* Honeypot — hidden from real users */}
                  <div aria-hidden="true" className="absolute opacity-0 pointer-events-none" style={{ top: '-9999px' }}>
                    <label htmlFor="honey">Leave this empty</label>
                    <input
                      id="honey"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('_honey')}
                    />
                  </div>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-serif font-bold uppercase tracking-widest text-muted mb-2">
                        Full Name <span className="text-gold" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="John Smith"
                        className={inputClasses}
                        aria-required="true"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        {...register('name', { required: 'Please enter your name' })}
                      />
                      {errors.name && (
                        <p id="name-error" className={errorClasses} role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-serif font-bold uppercase tracking-widest text-muted mb-2">
                        Email Address <span className="text-gold" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="john@example.com"
                        className={inputClasses}
                        aria-required="true"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        {...register('email', {
                          required: 'Please enter your email',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email address',
                          },
                        })}
                      />
                      {errors.email && (
                        <p id="email-error" className={errorClasses} role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-serif font-bold uppercase tracking-widest text-muted mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+974 7530038055"
                        className={inputClasses}
                        {...register('phone')}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-serif font-bold uppercase tracking-widest text-muted mb-2">
                        Message <span className="text-gold" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us about your project or enquiry..."
                        className={`${inputClasses} resize-none`}
                        aria-required="true"
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        {...register('message', { required: 'Please enter your message' })}
                      />
                      {errors.message && (
                        <p id="message-error" className={errorClasses} role="alert">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {formState === 'error' && (
                      <p className="text-red-400 text-sm" role="alert">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={formState === 'submitting'}
                    >
                      {formState === 'submitting' ? 'Sending…' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

interface ContactDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

function ContactDetail({ icon, label, value, href, external }: ContactDetailProps) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="mt-0.5 w-10 h-10 rounded-sm border border-border-gold/30 flex items-center justify-center text-gold flex-shrink-0 group-hover:border-gold/60 group-hover:shadow-gold-glow transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-xs font-serif font-bold uppercase tracking-widest text-muted">{label}</p>
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="text-gold-light font-serif font-bold text-sm hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
        >
          {value}
        </a>
      </div>
    </div>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,14 22,4" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
