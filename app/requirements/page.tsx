import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Current Needs | Ramakirti Foundation',
  description: 'See the most urgent requirements of the foundation and support us by donating these items directly.',
};

const NEEDS = [
  {
    category: "Education & Stationery",
    items: [
      "Notebooks (Ruled & Unruled)",
      "Pencils, Pens, Erasers, Sharpeners",
      "Geometry Boxes",
      "Drawing Books & Crayons",
      "School Bags (New or gently used)",
      "Whiteboards & Markers for classrooms"
    ]
  },
  {
    category: "Food & Nutrition",
    items: [
      "Rice & Wheat Flour (Atta)",
      "Pulses (Dal - Arhar, Moong, Masoor)",
      "Cooking Oil",
      "Spices & Salt",
      "Biscuits & Healthy Snacks for children"
    ]
  },
  {
    category: "Women Empowerment Center",
    items: [
      "Sewing Machines",
      "Fabric, Threads, Scissors, Needles",
      "Makeup kits for beauty training",
      "Computers or Laptops for digital literacy"
    ]
  },
  {
    category: "General & Healthcare",
    items: [
      "Sanitary Pads",
      "Basic First Aid Kits",
      "Winter Clothes (During winter season)",
      "Blankets"
    ]
  }
];

export default function RequirementsPage() {
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
          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 text-center">
            <div className="flex items-center justify-center gap-2 text-sm mb-5" style={{ color: 'rgba(255,255,255,.55)' }}>
              <Link href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,.55)' }}>Home</Link>
              <span>›</span>
              <span className="text-white">Requirements</span>
            </div>
            <span className="font-bold text-sm uppercase tracking-[.15em] mb-4 block" style={{ color: '#E5C96A', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
              Support Our Work In-Kind
            </span>
            <h1 className="text-white font-extrabold mb-4" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}>
              Current Requirements
            </h1>
            <p style={{ color: 'rgba(255,255,255,.9)', fontSize: '18px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
              We are constantly in need of specific items to keep our education centres, food drives, and empowerment workshops running.
            </p>
          </div>
        </section>

        <section className="py-24 bg-[#FDF8F7]">
          <div className="max-w-[1280px] mx-auto px-5">
            <div className="text-center mb-16">
              <h2 className="text-[clamp(26px,4vw,40px)] font-[family-name:var(--font-plus-jakarta)] font-bold text-[#6E1110] mb-4">Urgent Needs Checklist</h2>
              <p className="text-gray-600 max-w-[620px] mx-auto text-[18px]">
                You can choose to donate the items below by dropping them at our center or ordering them directly to our address.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {NEEDS.map((group, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[22px] text-[#6E1110] mb-5 border-b border-gray-100 pb-3">
                    {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="text-[#C9A84C] mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-white p-10 rounded-2xl border-2 border-[#6E1110]/10 text-center shadow-md max-w-3xl mx-auto">
              <h3 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[24px] text-[#6E1110] mb-4">How to Deliver?</h3>
              <p className="text-gray-700 mb-6 text-[16px]">
                You can drop off or courier these items to our main centre at:<br /><br />
                <strong>Ramakirti Foundation</strong><br />
                89 FF Housing Board Society,<br />
                Sector 33, Gurgaon — 122022
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] text-white px-8 py-4 rounded-lg bg-[#6E1110] hover:bg-[#8B2520] transition-colors no-underline"
                >
                  Contact Us to Schedule Drop-off
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] text-[#6E1110] px-8 py-4 rounded-lg bg-[#C9A84C] hover:bg-[#E5C96A] transition-colors no-underline"
                >
                  Prefer to Donate Funds Instead?
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
