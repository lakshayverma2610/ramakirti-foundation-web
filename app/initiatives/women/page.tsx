import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Women Empowerment | Ramakirti Foundation',
  description: 'It\'s high time that each and every girl, women must realise their value and their positions. Join our women empowerment programs.',
};

export default function WomenEmpowermentPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <section
          className="relative text-white overflow-hidden flex items-center"
          style={{
            paddingTop: 'calc(72px + 48px)',
            paddingBottom: '64px',
            minHeight: '400px',
            background: 'linear-gradient(135deg, #3A0D0B 0%, #6E1110 60%, #8B2520 100%)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/img/Women Empowerment.jpg" 
            alt="Women Empowerment Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 text-center">
            <div className="flex items-center justify-center gap-2 text-sm mb-5" style={{ color: 'rgba(255,255,255,.55)' }}>
              <Link href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,.55)' }}>Home</Link>
              <span>›</span>
              <span className="text-white">Initiatives</span>
              <span>›</span>
              <span className="text-white">Women Empowerment</span>
            </div>
            <span className="font-bold text-sm uppercase tracking-[.15em] mb-4 block" style={{ color: '#E5C96A', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
              Our Core Pillar
            </span>
            <h1 className="text-white font-extrabold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
              Women Empowerment
            </h1>
            <p style={{ color: 'rgba(255,255,255,.9)', fontSize: '18px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
              It’s time that each and every girl and woman must realize their value and their position. They have been building the society and nurturing lives as daughters, sisters, wives, and other roles.
            </p>
          </div>
        </section>

        <section className="relative py-24 border-t border-gray-100 overflow-hidden">
          {/* Background image on the right */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/Initiatives/A Day in Parsona/Gallery/WhatsApp-Image-2025-11-27-at-12.53.11-PM_result.webp')" }}
          />
          {/* Gradient overlay: solid white on left fading to transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10 md:to-transparent" />

          <div className="relative z-10 max-w-[1280px] mx-auto px-5">
            <div className="max-w-[700px]">
              <h2 className="font-extrabold mb-6" style={{ color: '#6E1110', fontSize: 'clamp(28px,4vw,40px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
                Empowering the Architects of Society
              </h2>
              <div className="space-y-5 text-gray-800 font-medium text-[16.5px] leading-[1.85]">
                <p>
                  Women are the backbone of any healthy, progressive community. Yet, many women in marginalized areas lack access to basic education, vocational skills, and health awareness. We are working to change this narrative.
                </p>
                <p>
                  We create pathways to financial independence for women through skill training programs in tailoring, handicrafts, makeup, and digital literacy — turning hesitation into courage, one workshop at a time.
                </p>
                <p>
                  <strong>The Rani Story</strong> is one of our key initiatives that documents and celebrates the journeys of women in our empowerment programs — giving voice to their struggles, triumphs, and aspirations as an inspiration to others.
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-[#6E1110] font-bold">
                  <li><span className="text-gray-800 font-medium">Vocational training centers for tailoring, beauty, and crafts.</span></li>
                  <li><span className="text-gray-800 font-medium">Financial literacy and entrepreneurship workshops.</span></li>
                  <li><span className="text-gray-800 font-medium">Maternal health awareness and counseling sessions.</span></li>
                </ul>
              </div>
              <div className="mt-10">
                <Link
                  href="/volunteer"
                  className="hero-btn-primary inline-flex items-center gap-2 font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] text-white px-8 py-4 rounded-lg shadow-md no-underline"
                >
                  🤝 Volunteer for this Cause
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

    </>
  );
}
