import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Assist The Poor | Ramakirti Foundation',
  description: 'We provide free food and other essential items and help the underprivileged. We give food during their classes time as well as distribute food in slum areas.',
};

export default function FoodInitiativePage() {
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
            src="/img/Food For Poor.jpg" 
            alt="Food Distribution Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 text-center">
            <div className="flex items-center justify-center gap-2 text-sm mb-5" style={{ color: 'rgba(255,255,255,.55)' }}>
              <Link href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,.55)' }}>Home</Link>
              <span>›</span>
              <span className="text-white">Initiatives</span>
              <span>›</span>
              <span className="text-white">Assist The Poor</span>
            </div>
            <span className="font-bold text-sm uppercase tracking-[.15em] mb-4 block" style={{ color: '#E5C96A', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
              Our Core Pillar
            </span>
            <h1 className="text-white font-extrabold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
              Food For Poor
            </h1>
            <p style={{ color: 'rgba(255,255,255,.9)', fontSize: '18px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
              We provide free food and other essential items and help the underprivileged. We give food during their classes time as well as distribute food in slum areas for their parents and family too.
            </p>
          </div>
        </section>

        <section className="relative py-24 border-t border-gray-100 overflow-hidden">
          {/* Background image on the left */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/Food For Poor.jpg')" }}
          />
          {/* Gradient overlay: solid white on right fading to transparent on left */}
          <div className="absolute inset-0 bg-gradient-to-l from-white via-white/95 to-white/10 md:to-transparent" />

          <div className="relative z-10 max-w-[1280px] mx-auto px-5 flex justify-end">
            <div className="max-w-[700px]">
              <h2 className="font-extrabold mb-6" style={{ color: '#6E1110', fontSize: 'clamp(28px,4vw,40px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
                Eradicating Hunger, One Meal at a Time
              </h2>
              <div className="space-y-5 text-gray-800 font-medium text-[16.5px] leading-[1.85]">
                <p>
                  Low birth weight and poor growth due to malnutrition mean many children do not live to see their fifth birthday. Our meal programs aim to tackle this head-on.
                </p>
                <p>
                  We distribute free nutritious meals, ration kits, and essential items to families living in Gurgaon's slum communities. We ensure that the children studying at our centres receive a healthy meal, which often acts as a major incentive for parents to send them to study.
                </p>
                <p>
                  Beyond daily meals, we organize massive food distribution drives during festivals and special occasions, bringing joy and a sense of community to those who need it most. During crises, such as the pandemic, we scale our operations to provide comprehensive ration kits and essential supplies like masks to vulnerable families.
                </p>
                
                <div className="mt-8 p-6 bg-[#FDF8F7] border border-[#6E1110]/10 rounded-xl">
                  <h3 className="font-bold text-[#6E1110] mb-2 font-[family-name:var(--font-plus-jakarta)] text-[18px]">Our Impact</h3>
                  <p className="text-gray-600 text-[15px]">
                    Over <strong>5,800+ meals</strong> are distributed monthly, ensuring families don't have to choose between feeding their children and educating them.
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center font-[family-name:var(--font-plus-jakarta)] font-bold text-[18px] text-white px-9 py-[18px] rounded-2xl min-w-[250px] no-underline bg-[#651A16] hover:bg-[#8B2520] transition-colors"
                >
                  Donate a Meal Today
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
