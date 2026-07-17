import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Current Needs',
  description: 'Ramakirti Foundation current urgent needs — see what resources we need right now to serve more families in Gurgaon.',
};

interface Need {
  id: string;
  urgency: 'Urgent' | 'High' | 'Medium';
  title: string;
  desc: string;
  target: number;
  raised: number;
  category: string;
}

const CURRENT_NEEDS: Need[] = [
  {
    id: 'need-1',
    urgency: 'Urgent',
    title: 'Monsoon Ration Drive — 200 Families',
    desc: 'Flooding in Sector 45 has displaced 200 migrant families. We need to supply emergency ration kits to them this week.',
    target: 150000,
    raised: 67000,
    category: 'food',
  },
  {
    id: 'need-2',
    urgency: 'Urgent',
    title: 'New Classroom Furniture (Sector 33 Centre)',
    desc: 'Our Sector 33 centre is overflowing — 40 children sit on the floor. We need desks, chairs, and whiteboards for 40 students.',
    target: 85000,
    raised: 21000,
    category: 'education',
  },
  {
    id: 'need-3',
    urgency: 'High',
    title: "15 Sewing Machines for Women's Programme",
    desc: 'The tailoring programme has a 3-month waitlist due to machine shortage. 15 new industrial machines = 15 more women trained per batch.',
    target: 112500,
    raised: 45000,
    category: 'women',
  },
  {
    id: 'need-4',
    urgency: 'High',
    title: 'Volunteer Teachers — Sector 57 Morning Batch',
    desc: 'We need 4 volunteer teachers for the 7–9 AM batch at the Sector 57 centre. Commitment: 3 hours per week minimum.',
    target: 0,
    raised: 0,
    category: 'volunteer',
  },
  {
    id: 'need-5',
    urgency: 'Medium',
    title: 'Educational Books & Stationery — Q3 2025',
    desc: 'Back-to-learning stock for 400 children: notebooks, pens, geometry boxes, and textbooks for the next quarter.',
    target: 60000,
    raised: 18000,
    category: 'education',
  },
];

const URGENCY_COLORS: Record<string, string> = {
  Urgent: 'bg-red-100 text-red-700 border-red-200',
  High: 'bg-[rgba(201,168,76,.15)] text-[#8B6914] border-[rgba(201,168,76,.3)]',
  Medium: 'bg-[rgba(101,26,22,.08)] text-[#651A16] border-[rgba(101,26,22,.2)]',
};

function ProgressBar({ target, raised }: { target: number; raised: number }) {
  if (target === 0) return null;
  const pct = Math.min(Math.round((raised / target) * 100), 100);
  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
        <span className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[#651A16]">
          ₹{raised.toLocaleString('en-IN')} raised
        </span>
        <span>Goal: ₹{target.toLocaleString('en-IN')}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#651A16] to-[#C9A84C] rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-[11px] text-gray-400 mt-1 text-right">{pct}% funded</div>
    </div>
  );
}

export default function CurrentNeedsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#3A0D0B] via-[#651A16] to-[#8B2520] py-24 px-6">
          <div className="max-w-[800px] mx-auto text-center">
            <span className="text-[#E5C96A] font-[family-name:var(--font-plus-jakarta)] font-bold text-sm uppercase tracking-[.15em]">Right Now</span>
            <h1 className="text-[clamp(28px,4vw,48px)] font-[family-name:var(--font-plus-jakarta)] font-extrabold text-white mt-2 mb-4">
              Current Urgent Needs
            </h1>
            <p className="text-white/78 text-[18px] leading-relaxed">
              These are our real, live needs on the ground today. Your donation can directly fund a specific initiative and we&apos;ll show you exactly where it went.
            </p>
          </div>
        </section>

        {/* Needs list */}
        <section className="py-16 px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="flex gap-3 mb-10 justify-center flex-wrap">
              {['All', 'Education', 'Food', 'Women', 'Volunteer'].map((cat) => (
                <button key={cat} className="font-[family-name:var(--font-plus-jakarta)] font-semibold text-sm px-4 py-2 rounded-full border-2 border-gray-200 text-gray-700 hover:border-[#651A16] hover:text-[#651A16] transition-all cursor-pointer">
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {CURRENT_NEEDS.map(({ id, urgency, title, desc, target, raised, category }) => (
                <div key={id} className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(101,26,22,.08)] border border-gray-100 hover:shadow-[0_8px_32px_rgba(101,26,22,.12)] transition-all">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className={`text-[11px] font-[family-name:var(--font-plus-jakarta)] font-bold uppercase tracking-[.08em] px-3 py-1 rounded-full border ${URGENCY_COLORS[urgency]}`}>
                          {urgency === 'Urgent' ? '🔴' : urgency === 'High' ? '🟡' : '🟠'} {urgency}
                        </span>
                        <span className="text-[11px] bg-gray-100 text-gray-500 font-[family-name:var(--font-plus-jakarta)] font-semibold uppercase px-3 py-1 rounded-full">
                          {category}
                        </span>
                      </div>
                      <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mb-2">{title}</h2>
                      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                      {target > 0 && <ProgressBar target={target} raised={raised} />}
                    </div>
                    <div className="flex flex-col gap-2">
                      {category === 'volunteer' ? (
                        <Link href="/volunteer" className="bg-[#651A16] text-white font-[family-name:var(--font-plus-jakarta)] font-bold text-sm px-5 py-3 rounded-xl hover:bg-[#8B2520] transition-colors no-underline whitespace-nowrap">
                          Volunteer →
                        </Link>
                      ) : (
                        <Link href={`/donate?initiative=${category}&need=${id}`} className="bg-[#651A16] text-white font-[family-name:var(--font-plus-jakarta)] font-bold text-sm px-5 py-3 rounded-xl hover:bg-[#8B2520] transition-colors no-underline whitespace-nowrap">
                          Fund This →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#FDF8F7] text-center px-6">
          <div className="max-w-[600px] mx-auto">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[28px] text-[#651A16] mb-3">Can&apos;t decide where to give?</h2>
            <p className="text-gray-500 mb-8">Donate to our general fund and we&apos;ll direct it to the most urgent need on the ground that week.</p>
            <Link href="/donate" className="inline-block bg-[#651A16] text-white font-[family-name:var(--font-plus-jakarta)] font-bold text-[18px] px-10 py-5 rounded-xl hover:bg-[#8B2520] transition-all no-underline">
              Donate to General Fund →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
