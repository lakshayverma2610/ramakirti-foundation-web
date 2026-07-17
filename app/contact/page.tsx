'use client';

import { useState } from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k: keyof ContactForm, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Send failed');
      setStatus('success');
    } catch {
      setErrorMsg('Could not send message. Please email us directly or WhatsApp.');
      setStatus('error');
    }
  }

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#3A0D0B] via-[#651A16] to-[#8B2520] py-24 px-6 text-center">
          <div className="max-w-[700px] mx-auto">
            <span className="text-[#E5C96A] font-[family-name:var(--font-plus-jakarta)] font-bold text-sm uppercase tracking-[.15em]">Reach Out</span>
            <h1 className="text-[clamp(28px,4vw,44px)] font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white mt-2 mb-4">
              Contact Us
            </h1>
            <p className="text-white/78 text-[18px]">Whether you want to donate, partner, or simply know more — we&apos;re here.</p>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
            {/* Contact info */}
            <div>
              <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[28px] text-[#651A16] mb-8">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: '📍', title: 'Address', content: '89 FF Housing Board Society, Sector 33, Gurgaon — 122022, Haryana' },
                  { icon: '📞', title: 'Phone / WhatsApp', content: '+91 88515-02840', href: 'tel:+918851502840' },
                  { icon: '✉️', title: 'Email', content: 'support@ramakirtifoundation.co.in', href: 'mailto:support@ramakirtifoundation.co.in' },
                  { icon: '🕐', title: 'Office Hours', content: 'Monday to Saturday, 9 AM – 6 PM IST' },
                ].map(({ icon, title, content, href }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(101,26,22,.1)] flex items-center justify-center text-[22px] flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[15px] text-gray-800 mb-0.5">{title}</div>
                      {href ? (
                        <a href={href} className="text-[#651A16] font-semibold hover:underline no-underline">{content}</a>
                      ) : (
                        <p className="text-gray-600 text-sm">{content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-10 p-6 bg-[#F0FCF4] border border-[rgba(37,211,102,.2)] rounded-2xl">
                <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[18px] text-gray-800 mb-2">💬 Instant Support</h3>
                <p className="text-gray-600 text-sm mb-4">For quick queries, WhatsApp us directly. We typically reply within 2 hours.</p>
                <a
                  href="https://wa.me/918851502840?text=Hi%20Ramakirti%20Foundation%2C%20I%20would%20like%20to%20know%20more"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-[family-name:var(--font-plus-jakarta)] font-bold px-6 py-3 rounded-xl hover:bg-[#1FAF53] transition-colors no-underline"
                >
                  WhatsApp Now →
                </a>
              </div>

              {/* Corporate CSR */}
              <div className="mt-6 p-6 bg-[#F9FAFB] border border-gray-200 rounded-2xl shadow-sm">
                <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[18px] text-[#651A16] mb-2">🏢 Corporate CSR / Partnerships</h3>
                <p className="text-gray-600 text-sm">
                  Looking to fulfill your CSR mandate or partner with a transparent NGO? We offer employee volunteering, brand placement, and impact reporting. Email us at{' '}
                  <a href="mailto:csr@ramakirtifoundation.co.in" className="text-[#651A16] font-bold hover:underline no-underline">
                    csr@ramakirtifoundation.co.in
                  </a>
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              {status === 'success' ? (
                <div className="bg-white rounded-3xl p-10 shadow-[0_4px_32px_rgba(101,26,22,.1)] border border-[rgba(101,26,22,.08)] text-center">
                  <div className="text-[64px] mb-4">✅</div>
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[24px] text-[#651A16] mb-3">Message Sent!</h3>
                  <p className="text-gray-500">Thank you, {form.name.split(' ')[0]}. We&apos;ll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_32px_rgba(101,26,22,.1)] border border-[rgba(101,26,22,.08)]">
                  <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[22px] text-[#651A16] mb-6">Send a Message</h2>
                  <div className="space-y-4">
                    <input type="text" placeholder="Your Name *" value={form.name} onChange={(e) => update('name', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16]" required />
                    <input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => update('email', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16]" required />
                    <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => update('phone', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16]" />
                    <select value={form.subject} onChange={(e) => update('subject', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16] bg-white">
                      <option value="">Subject</option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Donation">Donation / Payment Help</option>
                      <option value="Volunteer">Volunteering</option>
                      <option value="Corporate CSR">Corporate CSR</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Media">Media / Press</option>
                    </select>
                    <textarea placeholder="Your Message *" value={form.message} onChange={(e) => update('message', e.target.value)}
                      rows={5} required
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16] resize-none" />
                  </div>
                  {errorMsg && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 mt-4 mb-2">{errorMsg}</div>}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full mt-5 bg-[#651A16] text-white font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] py-4 rounded-xl hover:bg-[#8B2520] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <><span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                    ) : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
