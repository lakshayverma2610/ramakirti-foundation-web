import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { ContactForm } from '@/app/components/ContactForm'; // I'll assume this exists or I will create it. If it doesn't exist, I'll write it inline.

export const metadata: Metadata = {
  title: 'Contact Us | Ramakirti Foundation',
  description: 'Contact Ramakirti Foundation. 89 ff Housing Board Society Sec 33 Gurgaon, Near Yaduvanshi School, 122022. Near Government School Tigra, Sector-57.',
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* Page Hero */}
        <section
          className="relative text-white overflow-hidden flex items-center"
          style={{
            paddingTop: 'calc(72px + 48px)',
            paddingBottom: '64px',
            minHeight: '340px',
            background: 'linear-gradient(135deg, #3A0D0B 0%, #6E1110 60%, #8B2520 100%)',
          }}
        >
          <div className="absolute top-[-30%] right-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,.2), transparent 58%)' }} />
          
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 text-center">
            <div className="flex items-center justify-center gap-2 text-sm mb-5" style={{ color: 'rgba(255,255,255,.55)' }}>
              <Link href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,.55)' }}>Home</Link>
              <span>›</span>
              <span className="text-white">Contact Us</span>
            </div>
            <h1 className="text-white font-extrabold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
              Get In Touch
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '18px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
              We'd love to hear from you. Reach out to us for volunteering, donations, or any questions about our initiatives.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-24 bg-[#FDF8F7]">
          <div className="max-w-[1280px] mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              
              {/* Contact Info */}
              <div>
                <span className="font-bold text-sm uppercase tracking-[.15em] mb-4 block" style={{ color: '#C9A84C', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
                  Contact Information
                </span>
                <h2 className="font-extrabold mb-8" style={{ color: '#6E1110', fontSize: 'clamp(28px,4vw,36px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
                  We are here to help
                </h2>
                
                <div className="space-y-8">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 text-[#6E1110] text-xl">
                      📞
                    </div>
                    <div>
                      <h3 className="font-bold text-[#6E1110] mb-1">Call Us</h3>
                      <a href="tel:+918851502840" className="text-gray-600 hover:text-[#6E1110] transition-colors block">
                        +91 88515 02840
                      </a>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 text-[#6E1110] text-xl">
                      ✉️
                    </div>
                    <div>
                      <h3 className="font-bold text-[#6E1110] mb-1">Email Us</h3>
                      <a href="mailto:support@ramakirtifoundation.co.in" className="text-gray-600 hover:text-[#6E1110] transition-colors block mb-1">
                        support@ramakirtifoundation.co.in
                      </a>
                      <a href="mailto:info@ramakirtifoundation.co.in" className="text-gray-600 hover:text-[#6E1110] transition-colors block">
                        info@ramakirtifoundation.co.in
                      </a>
                    </div>
                  </div>

                  {/* Address 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 text-[#6E1110] text-xl">
                      📍
                    </div>
                    <div>
                      <h3 className="font-bold text-[#6E1110] mb-1">Head Office</h3>
                      <a href="https://goo.gl/maps/mhnKEN5UaaowGZuJ6" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6E1110] transition-colors block">
                        89 ff Housing Board Society Sec 33 Gurgaon,<br />
                        Near Yaduvanshi School, 122022
                      </a>
                    </div>
                  </div>

                  {/* Address 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 text-[#6E1110] text-xl">
                      📍
                    </div>
                    <div>
                      <h3 className="font-bold text-[#6E1110] mb-1">Education Centre</h3>
                      <a href="https://maps.app.goo.gl/j7Vvy9ZRwFiZ33yUA" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#6E1110] transition-colors block">
                        Near Government School Tigra, Sector-57,<br />
                        Gurgaon
                      </a>
                    </div>
                  </div>

                </div>
                
                {/* Socials */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-[#6E1110] mb-4">Follow Our Work</h3>
                  <div className="flex gap-4">
                    <a href="https://www.facebook.com/ramakirtifoundation.org/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#6E1110] text-white flex items-center justify-center hover:bg-[#C9A84C] transition-colors">f</a>
                    <a href="https://www.instagram.com/ramakirtifoundation/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#6E1110] text-white flex items-center justify-center hover:bg-[#C9A84C] transition-colors">in</a>
                    <a href="https://www.linkedin.com/company/96037665/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#6E1110] text-white flex items-center justify-center hover:bg-[#C9A84C] transition-colors">li</a>
                    <a href="https://www.youtube.com/channel/UCY9gGWwrWTdLH6mxEDo6LFA" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#6E1110] text-white flex items-center justify-center hover:bg-[#C9A84C] transition-colors">yt</a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100">
                <h3 className="font-extrabold text-[24px] text-[#6E1110] font-[family-name:var(--font-plus-jakarta)] mb-6">
                  Send us a Message
                </h3>
                {/* Fallback to simple form if ContactForm isn't defined correctly */}
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110] outline-none transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110] outline-none transition-colors" placeholder="Your email address" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110] outline-none transition-colors" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110] outline-none transition-colors resize-y" placeholder="Your message here..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#6E1110] hover:bg-[#8B2520] text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-md">
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
