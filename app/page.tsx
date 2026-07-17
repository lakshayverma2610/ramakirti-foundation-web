import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { AnimatedCounter } from '@/app/components/AnimatedCounter';

export const metadata: Metadata = {
  title: 'Ramakirti Foundation | Best NGO in Gurgaon',
  description: 'A Non-profit organization working for the education to poor and women empowerment, organizing different events for them. Join our mission today.',
  openGraph: {
    title: 'Ramakirti Foundation | Best NGO in Gurgaon',
    description: 'Transforming lives through education, nutrition, and courage in Gurgaon, Haryana.',
    url: 'https://ramakirtifoundation.co.in/',
    type: 'website',
  },
};

const TESTIMONIALS = [
  {
    stars: 5,
    quote: '"My daughter used to sell vegetables by the road. After 8 months at Ramakirti Foundation\'s education centre, she can read, write, and dream of becoming a nurse."',
    name: 'Puja Devi',
    role: 'Parent, Sector 57',
    initials: 'PD',
  },
  {
    stars: 5,
    quote: '"I volunteered for a food distribution event and was moved by the gratitude of the families. The foundation is incredibly transparent — I trust them completely."',
    name: 'Amit Kapoor',
    role: 'Corporate Donor, Cyber City',
    initials: 'AK',
  },
  {
    stars: 5,
    quote: '"The tailoring programme changed my life. I now earn ₹9,000 a month from home and support my children\'s education."',
    name: 'Sunita Maurya',
    role: 'Women Empowerment Graduate',
    initials: 'SM',
  },
];

export default function HomePage() {
  return (
    <>
      <Navigation transparent />
      <main id="main-content">
        {/* Skip link */}
        <a
          href="#main-content"
          className="absolute -top-full left-4 bg-[#6E1110] text-white px-5 py-2 rounded-lg font-bold z-[10000] focus:top-4 transition-all"
        >
          Skip to main content
        </a>

        {/* ─── HERO ─── */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-label="Hero">
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/img/Education is right to everyone.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(110,17,16,.82)] via-[rgba(110,17,16,.55)] to-[rgba(201,168,76,.18)]" />
          <div className="relative z-10 text-center text-white px-6 max-w-[940px] mx-auto py-24 w-full mt-12">
            <h1 className="text-[clamp(34px,5vw,56px)] font-[family-name:var(--font-plus-jakarta)] font-extrabold leading-[1.13] mb-6 text-white text-shadow-lg drop-shadow-xl uppercase">
              Ramakirti Foundation
            </h1>
            <p className="text-[20px] text-white/90 mb-10 max-w-[640px] mx-auto leading-[1.65] drop-shadow-md">
              We transform lives through quality education, nutritious meals, and women&apos;s empowerment — one family at a time in Haryana&apos;s most underserved communities.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/donate"
                className="hero-btn-primary inline-flex items-center gap-2 font-[family-name:var(--font-plus-jakarta)] font-bold text-[18px] text-white px-9 py-[18px] rounded-lg shadow-xl no-underline"
              >
                ❤️ Donate Now
              </Link>
              <Link
                href="/volunteer"
                className="hero-btn-secondary inline-flex items-center gap-2 font-[family-name:var(--font-plus-jakarta)] font-bold text-[18px] text-white px-9 py-[18px] rounded-lg no-underline"
              >
                🤝 Volunteer With Us
              </Link>
            </div>

            {/* Hero stats */}
            <div className="flex gap-8 justify-center mt-16 flex-wrap">
              {[
                { target: 1240, suffix: '+', label: 'Children Educated' },
                { target: 5800, suffix: '+', label: 'Meals Monthly' },
                { target: 320, suffix: '+', label: 'Women Trained' },
              ].map(({ target, suffix, label }, i) => (
                <div key={label} className={`text-center ${i > 0 ? 'border-l border-white/25 pl-8' : ''}`}>
                  <span className="block font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[28px] text-white drop-shadow">
                    <AnimatedCounter target={target} suffix={suffix} />
                  </span>
                  <span className="text-sm text-white/80">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── STATS STRIP ─── */}
        <div className="bg-[#FBF5E0] py-4 border-y-2 border-[#E5C96A]/30">
          <div className="max-w-[1280px] mx-auto px-5 flex gap-8 md:gap-12 justify-center items-center flex-wrap">
            {[
              { icon: '🗓', text: 'Founded 2021' },
              { icon: '📍', text: 'Gurgaon, Haryana' },
              { icon: '🏛️', text: '80G Tax Exempt' },
              { icon: '⭐', text: '4.9 Rating (24 Reviews)' },
              { icon: '🤝', text: '50+ Active Volunteers' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 font-[family-name:var(--font-plus-jakarta)] font-bold text-[14px] md:text-[15px] text-[#6E1110]">
                <span className="text-[20px] md:text-[22px]">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* ─── PILLARS ─── */}
        <section className="relative py-24 bg-white overflow-hidden" id="pillars" aria-label="Our initiatives">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/Initiatives/Covid Mask Distribution/covid-mask-1_result-e1655897386651.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/80" />
          
          <div className="relative z-10 max-w-[1280px] mx-auto px-5">
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-[family-name:var(--font-plus-jakarta)] font-bold text-sm uppercase tracking-[.15em]">What We Do</span>
              <h2 className="text-[clamp(26px,4vw,40px)] font-[family-name:var(--font-plus-jakarta)] font-bold text-[#6E1110] mt-2 mb-4">Three Pillars of Change</h2>
              <p className="text-gray-700 font-medium max-w-[620px] mx-auto text-[18px]">Every initiative is designed around a single belief: every person deserves a life of dignity, learning, and opportunity.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1: Education */}
              <Link href="/initiatives/education" className="pillar-card group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col items-start text-left no-underline cursor-pointer transition-all hover:bg-white">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6E1110] to-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="w-[64px] h-[64px] rounded-xl flex items-center justify-center text-[28px] mb-5 bg-[#6E1110]/5 text-[#6E1110]">
                  📚
                </div>
                <h3 className="text-[22px] font-[family-name:var(--font-plus-jakarta)] font-bold text-[#6E1110] mb-3">Education</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-6 flex-grow">
                  We operate non-formal education centres in Gurgaon&apos;s underserved sectors, providing quality learning to children who have never set foot in a formal school. Our volunteer teachers use play-based, activity-driven methods.
                </p>
                <div className="pillar-link inline-flex items-center gap-1.5 font-[family-name:var(--font-plus-jakarta)] font-bold text-sm text-[#6E1110] uppercase tracking-[.05em] no-underline">
                  Learn More →
                </div>
              </Link>

              {/* Pillar 2: Food */}
              <Link href="/initiatives/food" className="pillar-card group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col items-start text-left no-underline cursor-pointer transition-all hover:bg-white" style={{ transitionDelay: '100ms' }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6E1110] to-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="w-[64px] h-[64px] rounded-xl flex items-center justify-center text-[28px] mb-5 bg-[#C9A84C]/10 text-[#6E1110]">
                  🍽️
                </div>
                <h3 className="text-[22px] font-[family-name:var(--font-plus-jakarta)] font-bold text-[#6E1110] mb-3">Food for Poor</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-6 flex-grow">
                  We distribute free nutritious meals, ration kits, and essential items to families living in Gurgaon&apos;s slum communities — ensuring no child sleeps hungry and every family has what they need to survive.
                </p>
                <div className="pillar-link inline-flex items-center gap-1.5 font-[family-name:var(--font-plus-jakarta)] font-bold text-sm text-[#6E1110] uppercase tracking-[.05em] no-underline">
                  Learn More →
                </div>
              </Link>

              {/* Pillar 3: Women */}
              <Link href="/initiatives/women" className="pillar-card group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col items-start text-left no-underline cursor-pointer transition-all hover:bg-white" style={{ transitionDelay: '200ms' }}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6E1110] to-[#C9A84C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="w-[64px] h-[64px] rounded-xl flex items-center justify-center text-[28px] mb-5 bg-[#C9A84C]/10 text-[#6E1110]">
                  💪
                </div>
                <h3 className="text-[22px] font-[family-name:var(--font-plus-jakarta)] font-bold text-[#6E1110] mb-3">Women Empowerment</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-6 flex-grow">
                  We create pathways to financial independence for women through skill training programmes in tailoring, handicrafts, and digital literacy — turning hesitation into courage, one workshop at a time.
                </p>
                <div className="pillar-link inline-flex items-center gap-1.5 font-[family-name:var(--font-plus-jakarta)] font-bold text-sm text-[#6E1110] uppercase tracking-[.05em] no-underline">
                  Learn More →
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="py-24 bg-[#FDF8F7]" aria-label="Testimonials">
          <div className="max-w-[1280px] mx-auto px-5">
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-[family-name:var(--font-plus-jakarta)] font-bold text-sm uppercase tracking-[.15em]">Voices From the Field</span>
              <h2 className="text-[clamp(26px,4vw,40px)] font-[family-name:var(--font-plus-jakarta)] font-bold text-[#6E1110] mt-2 mb-4">What People Say</h2>
              <p className="text-gray-500 max-w-[620px] mx-auto text-[18px]">Stories from the volunteers, donors, and families who make our work possible.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map(({ stars, quote, name, role, initials }) => (
                <div
                  key={name}
                  className="testimonial-card p-8 rounded-[24px] bg-gradient-to-br from-white to-[#fdf4f4] border border-[#6E1110]/10 relative"
                >
                  <div className="text-[100px] font-serif text-[#6E1110] opacity-[0.08] absolute top-[-24px] left-4 leading-none pointer-events-none">
                    &ldquo;
                  </div>
                  <div className="flex gap-1 mb-5 text-[20px]">{'⭐'.repeat(stars)}</div>
                  <blockquote className="text-[16.5px] text-gray-800 leading-[1.8] italic mb-6 relative z-10">{quote}</blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-[48px] h-[48px] rounded-full bg-gradient-to-br from-[#6E1110] to-[#8B2520] flex items-center justify-center text-white font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[18px] flex-shrink-0">
                      {initials}
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[15px] text-[#6E1110] mb-0.5">{name}</div>
                      <div className="text-[13px] text-gray-500 font-medium">
                        {role} <span className="ml-1 inline-flex items-center bg-[#FBF5E0] text-[#6E1110] px-2 py-0.5 rounded-full text-[10px] font-bold">✓ Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TRUST SECTION ─── */}
        <section className="py-24 bg-white" aria-label="Trust and transparency">
          <div className="max-w-[1280px] mx-auto px-5">
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-[family-name:var(--font-plus-jakarta)] font-bold text-sm uppercase tracking-[.15em]">Transparency & Trust</span>
              <h2 className="text-[clamp(26px,4vw,40px)] font-[family-name:var(--font-plus-jakarta)] font-bold text-[#6E1110] mt-2 mb-4">Why Donors Trust Us</h2>
              <p className="text-gray-500 max-w-[620px] mx-auto text-[18px]">We hold ourselves to the highest standards of accountability so you can give with complete confidence.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="trust-card bg-white p-10 rounded-2xl border-t-[4px] border-[#6E1110] text-center shadow-sm border border-[#e5e7eb] border-t-[#6E1110]">
                <div className="text-[48px] mb-5">🏛️</div>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#6E1110] mb-3">80G Tax Exempt</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">All donations are eligible for income tax deduction under Section 80G(5)(vi). We provide digitally signed receipts instantly.</p>
              </div>
              
              <div className="trust-card bg-white p-10 rounded-2xl border-t-[4px] border-[#C9A84C] text-center shadow-sm border border-[#e5e7eb] border-t-[#C9A84C]">
                <div className="text-[48px] mb-5">🤝</div>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#6E1110] mb-3">On-Ground Impact</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">We are a grassroots NGO. 100% of your contributions go directly into funding programs, not expensive overheads.</p>
              </div>
              
              <div className="trust-card bg-white p-10 rounded-2xl border-t-[4px] border-[#C9A84C] text-center shadow-sm border border-[#e5e7eb] border-t-[#C9A84C]">
                <div className="text-[48px] mb-5">🔒</div>
                <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#6E1110] mb-3">Secure Payments</h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">Donations are processed securely with bank-grade encryption via UPI and direct bank transfers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ─── */}
        <section className="py-28 bg-[#6E1110] text-center relative overflow-hidden" aria-label="Call to action">
          <div className="absolute top-[-30%] left-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,.15),transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,.12),transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-[1280px] mx-auto px-5">
            <span className="text-[#E5C96A] font-[family-name:var(--font-plus-jakarta)] font-bold text-sm uppercase tracking-[.15em] drop-shadow">Take Action Today</span>
            <h2 className="text-[clamp(28px,4vw,44px)] font-[family-name:var(--font-plus-jakarta)] font-bold text-white mt-4 mb-5 drop-shadow-md">Ready to Make a Difference?</h2>
            <p className="text-white/85 text-[19px] mb-12 max-w-[580px] mx-auto leading-relaxed">
              Whether you donate, volunteer, or simply share our story — every single action ripples outward and changes a life.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/donate"
                className="hero-btn-emerald inline-flex items-center gap-2 font-[family-name:var(--font-plus-jakarta)] font-bold text-[18px] text-[#6E1110] px-10 py-[18px] rounded-lg shadow-xl no-underline bg-[#C9A84C]"
              >
                ❤️ Donate Now
              </Link>
              <Link
                href="/volunteer"
                className="hero-btn-secondary inline-flex items-center gap-2 font-[family-name:var(--font-plus-jakarta)] font-bold text-[18px] text-white px-10 py-[18px] rounded-lg no-underline"
              >
                🤝 Volunteer
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      

    </>
  );
}
