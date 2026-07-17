import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import VolunteerForm from '@/app/components/VolunteerForm';

export const metadata: Metadata = {
  title: 'Volunteers | Ramakirti Foundation',
  description: 'Join Ramakirti Foundation as a volunteer. Our volunteers are great souls working together to create awareness and achieve our mission.',
};

const VOLUNTEERS = [
  {
    name: 'SALONI',
    role: 'Head of Volunteers',
    image: '/img/Volunteers/Saloni - Head of Volunteers.png'
  },
  {
    name: 'SONALI',
    role: 'Head of Volunteers',
    image: '/img/Volunteers/Sonali - Head of Volunteers.png'
  },
  {
    name: 'NANCY',
    role: 'Volunteer',
    image: '/img/Volunteers/Nancy - Volunteer.png'
  },
  {
    name: 'VINEETHA',
    role: 'Volunteer',
    image: '/img/Volunteers/Vineetha - Volunteer.png'
  }
];

export default function VolunteerPage() {
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
              <span className="text-white">Volunteers</span>
            </div>
            <h1 className="text-white font-extrabold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
              Our Volunteers
            </h1>
            <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '18px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
              A few great souls working for the success of our mission. Helping us to achieve the aim we have seen.
            </p>
          </div>
        </section>

        {/* Volunteers Grid */}
        <section className="py-24 bg-[#FDF8F7]">
          <div className="max-w-[1280px] mx-auto px-5">
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] font-[family-name:var(--font-plus-jakarta)] font-bold text-sm uppercase tracking-[.15em]">Meet the Team</span>
              <h2 className="text-[clamp(26px,4vw,40px)] font-[family-name:var(--font-plus-jakarta)] font-bold text-[#6E1110] mt-2 mb-4">
                Working Together to Create Awareness
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {VOLUNTEERS.map((vol) => (
                <div key={vol.name} className="volunteer-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <div className="w-full pt-[100%] relative bg-[#f3eeed]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={vol.image} 
                      alt={vol.name}
                      className="absolute inset-0 w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6 text-center bg-white relative z-10 border-t-4 border-[#C9A84C]">
                    <h3 className="font-extrabold text-[20px] text-[#6E1110] font-[family-name:var(--font-plus-jakarta)] mb-1">
                      {vol.name}
                    </h3>
                    <p className="text-[#C9A84C] font-bold text-sm uppercase tracking-[.05em]">
                      {vol.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <VolunteerForm />
            </div>

          </div>
        </section>

      </main>
      <Footer />
      

    </>
  );
}
