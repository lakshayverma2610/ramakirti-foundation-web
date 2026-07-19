import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Recent Initiatives | Ramakirti Foundation – NGO Gurgaon',
  description:
    "Explore Ramakirti Foundation's recent events, corporate partnerships, and community initiatives in Gurgaon — from education drives to food distribution and women empowerment.",
  openGraph: {
    title: 'Recent Initiatives | Ramakirti Foundation',
    description: 'See our on-ground impact through photos and event stories.',
    url: 'https://ramakirtifoundation.co.in/recent-initiatives',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default async function RecentInitiativesPage() {
  const allInitiativesDB = await db.initiative.findMany({
    orderBy: { created_at: 'desc' }
  });

  const allInitiatives = allInitiativesDB.map(i => ({
    name: i.title,
    slug: i.id, // We use the ID as the slug directly
    coverImage: i.image_url,
    galleryCount: i.gallery_urls.length,
    description: i.description
  }));

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* Page Hero */}
        <section
          className="relative text-white overflow-hidden flex items-center"
          style={{
            paddingTop: 'calc(72px + 56px)',
            paddingBottom: '72px',
            minHeight: '360px',
            background: 'linear-gradient(135deg, #3A0D0B 0%, #6E1110 60%, #8B2520 100%)',
          }}
        >
          <div
            className="absolute top-[-30%] right-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,.2), transparent 58%)' }}
          />
          <div
            className="absolute bottom-[-20%] left-[5%] w-[350px] h-[350px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,.12), transparent 60%)' }}
          />
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center">
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 mb-5 text-sm" style={{ color: 'rgba(255,255,255,.55)' }}>
              <Link href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,.55)' }}>Home</Link>
              <span aria-hidden>›</span>
              <span className="text-white">Recent Initiatives</span>
            </nav>
            <span
              className="inline-block font-bold text-sm uppercase tracking-[.15em] mb-4"
              style={{ color: '#E5C96A', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
            >
              Latest Activities
            </span>
            <h1
              className="text-white font-extrabold mb-4"
              style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
            >
              Recent Initiatives & Events
            </h1>
            <p className="mx-auto" style={{ color: 'rgba(255,255,255,.78)', fontSize: '18px', maxWidth: '600px' }}>
              A glimpse into our on-ground work — from corporate volunteer drives to festivals, food distribution, and education events across Gurgaon.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-20" style={{ background: '#F5F0EF' }}>
          <div className="max-w-[1280px] mx-auto px-5">
            <div className="text-center mb-12">
              <p className="text-gray-500 text-lg">
                {allInitiatives.length} initiatives documented · Click any card to explore photos and stories
              </p>
            </div>
            {allInitiatives.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p>No initiatives found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {allInitiatives.map((initiative) => (
                  <Link
                    key={initiative.slug}
                    href={`/recent-initiatives/${encodeURIComponent(initiative.slug)}`}
                    className="initiative-card group bg-white rounded-2xl overflow-hidden border border-gray-100 no-underline block"
                    style={{ boxShadow: '0 2px 12px rgba(110,17,16,.06)' }}
                  >
                    {/* Cover */}
                    <div className="relative overflow-hidden" style={{ height: '200px', background: '#f3eeed' }}>
                      {initiative.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={initiative.coverImage}
                          alt={initiative.name}
                          className="w-full h-full object-cover initiative-cover-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">📸</div>
                      )}
                      {initiative.galleryCount > 0 && (
                        <div
                          className="absolute top-2.5 right-2.5 text-white text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{
                            background: 'rgba(110,17,16,.85)',
                            backdropFilter: 'blur(4px)',
                            fontFamily: 'var(--font-plus-jakarta, sans-serif)',
                          }}
                        >
                          📷 {initiative.galleryCount}
                        </div>
                      )}
                    </div>
                    {/* Body */}
                    <div className="p-5">
                      <div
                        className="text-[11px] font-bold uppercase tracking-[.1em] mb-1.5"
                        style={{ color: '#6E1110', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
                      >
                        Initiative
                      </div>
                      <h2
                        className="font-bold text-base leading-snug mb-3"
                        style={{ color: '#1F2937', fontFamily: 'var(--font-plus-jakarta, sans-serif)', fontSize: '15px' }}
                      >
                        {initiative.name}
                      </h2>
                      {initiative.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{initiative.description}</p>
                      )}
                      <span
                        className="inline-flex items-center gap-1 font-bold text-xs uppercase tracking-[.08em]"
                        style={{ color: '#6E1110', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
                      >
                        View Gallery →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#3A0D0B 0%,#6E1110 60%,#8B2520 100%)' }}
        >
          <div
            className="absolute top-[-40%] left-[30%] w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(201,168,76,.18),transparent 55%)' }}
          />
          <div className="relative z-10 max-w-[1200px] mx-auto px-6">
            <span
              className="font-bold text-sm uppercase tracking-[.15em]"
              style={{ color: '#E5C96A', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
            >
              Be Part of It
            </span>
            <h2
              className="text-white font-extrabold mt-2 mb-3"
              style={{ fontSize: 'clamp(24px,4vw,40px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
            >
              Want to Create an Impact Like This?
            </h2>
            <p className="mb-10 mx-auto" style={{ color: 'rgba(255,255,255,.78)', fontSize: '18px', maxWidth: '520px' }}>
              Your donation or volunteering effort directly shows up in photos like these. Join our mission today.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 font-bold text-lg text-white no-underline rounded-lg"
                style={{ background: '#C9A84C', padding: '18px 36px', fontFamily: 'var(--font-plus-jakarta, sans-serif)', boxShadow: '0 4px 16px rgba(201,168,76,.3)' }}
              >
                Donate Now
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 font-bold text-lg text-white no-underline rounded-lg"
                style={{ background: 'rgba(255,255,255,.14)', border: '2px solid rgba(255,255,255,.5)', padding: '18px 36px', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
              >
                Volunteer With Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />


    </>
  );
}
