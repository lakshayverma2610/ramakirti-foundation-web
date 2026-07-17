import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Education Initiative | Ramakirti Foundation',
  description: 'Education is a right to everyone. We have setup non-formal education centres in Gurgaon to teach the underprivileged.',
};

export default function EducationInitiativePage() {
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
            src="/img/Education is right to everyone.webp" 
            alt="Education Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 text-center">
            <div className="flex items-center justify-center gap-2 text-sm mb-5" style={{ color: 'rgba(255,255,255,.55)' }}>
              <Link href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,.55)' }}>Home</Link>
              <span>›</span>
              <span className="text-white">Initiatives</span>
              <span>›</span>
              <span className="text-white">Education</span>
            </div>
            <span className="font-bold text-sm uppercase tracking-[.15em] mb-4 block" style={{ color: '#E5C96A', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
              Our Core Pillar
            </span>
            <h1 className="text-white font-extrabold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
              Education is a Right to Everyone
            </h1>
            <p style={{ color: 'rgba(255,255,255,.9)', fontSize: '18px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
              We have set up a Non-Formal education centre in Gurgaon. Our dedicated teachers teach them a good level of education so that they can achieve everything in their life.
            </p>
          </div>
        </section>

        <section className="relative py-24 border-t border-gray-100 overflow-hidden">
          {/* Background image on the right */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img/Initiatives/Amity University/Amity University.jpg')" }}
          />
          {/* Gradient overlay: solid white on left fading to transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10 md:to-transparent" />

          <div className="relative z-10 max-w-[1280px] mx-auto px-5">
            <div className="max-w-[700px]">
              <h2 className="font-extrabold mb-6" style={{ color: '#6E1110', fontSize: 'clamp(28px,4vw,40px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
                Empowering Through Knowledge
              </h2>
              <div className="space-y-5 text-gray-800 font-medium text-[16.5px] leading-[1.85]">
                <p>
                  Education is the part and parcel of lives as well as society; life without education is simply beyond imagination. We believe in providing all the resources to a child to support and direct their childhood in a leading way.
                </p>
                <p>
                  Our program is based on the belief <strong>“TO PROVIDE EVERY CHILD A TOOL TO WRITE HIS OWN DESTINY”</strong>.
                </p>
                <p>
                  We operate non-formal education centres in Gurgaon's underserved sectors, providing quality learning to children who have never set foot in a formal school. Our volunteer teachers use play-based, activity-driven methods to make learning engaging and effective.
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-[#6E1110] font-bold">
                  <li><span className="text-gray-800 font-medium">Daily interactive classes focusing on literacy and numeracy.</span></li>
                  <li><span className="text-gray-800 font-medium">Distribution of free stationery, notebooks, and learning materials.</span></li>
                  <li><span className="text-gray-800 font-medium">Holistic development through arts, crafts, and sports activities.</span></li>
                </ul>
              </div>
              <div className="mt-10">
                <Link
                  href="/donate"
                  className="hero-btn-primary inline-flex items-center gap-2 font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] text-white px-8 py-4 rounded-lg shadow-md no-underline"
                >
                  ❤️ Support a Child's Education
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
