import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

/* ─── Collaborator map ─── */
const COLLABORATOR_MAP: Record<string, { name: string; type: string }> = {
  'air india':        { name: 'Air India', type: 'Corporate Partner' },
  'amity university': { name: 'Amity University', type: 'Academic Partner' },
  'bajaj capital':    { name: 'Bajaj Capital', type: 'Corporate CSR Partner' },
  'gartner':          { name: 'Gartner', type: 'Corporate Volunteer Partner' },
  'hsbc':             { name: 'HSBC Bank', type: 'Corporate CSR Partner' },
  'jee one':          { name: 'Jee One Group', type: 'Community Partner' },
  'llm university':   { name: 'LLM University', type: 'Academic Partner' },
  'pallavi arts':     { name: 'Pallavi Arts', type: 'Cultural Partner' },
  'parsona':          { name: 'Pasona Group', type: 'Corporate Volunteer Partner' },
  'roca':             { name: 'Roca Company', type: 'Corporate CSR Partner' },
  'golf':             { name: 'Golf Competition Organisers', type: 'Event Partner' },
};

const DESC_MAP: Record<string, string> = {
  'a day in parsona': 'Corporate volunteers from Pasona Group spent a meaningful day with our children — teaching, playing games, and distributing stationery kits to 80+ students in Sector 57. This initiative showcased the power of corporate volunteering in creating direct, lasting impact.',
  '14th november': "Children's Day is always special at Ramakirti Foundation. We celebrated 300+ students with fun games, creative activities, a special lunch, and gifts — ensuring every child felt valued, loved, and seen on their special day.",
  '77th independence': "On India's 77th Independence Day, we organised a flag hoisting ceremony, patriotic performances, and interactive sessions about our nation's freedom struggle — a day of pride, culture, and community bonding.",
  'air india': 'Air India partnered with us for a remarkable day of giving, bringing corporate employees to interact with our children through educational activities, storytelling, and fun games — bringing warmth and inspiration to our learning centres.',
  'amity university': 'Students from Amity University volunteered their time and skills for a comprehensive outreach day including education sessions, mentorship, and awareness activities — setting a great example for the youth of India.',
  'bajaj capital': "Bajaj Capital's CSR initiative brought resources and smiles to our community. Their team organised interactive finance-literacy sessions for older children and distributed essential supplies, reinforcing their commitment to social responsibility.",
  'children and parent': 'A thoughtful counselling session was organised for children and their parents, addressing challenges in education, mental well-being, and family dynamics. Expert facilitators guided families through practical tools for a healthier home environment.',
  'covid mask': 'During the pandemic, Ramakirti Foundation distributed thousands of reusable masks to underprivileged families and slum communities across Gurgaon to keep them safe and protected.',
  'fun learning in bus': 'Our vibrant mobile classroom bus visited 5 localities, bringing interactive STEM activities, storytelling, and creative workshops to 200+ children — learning made fun, wherever they are.',
  'gartner': 'Gartner employees joined hands with our foundation for an energetic volunteer day filled with teaching sessions, skill-sharing activities, and genuine connections with our students and staff.',
  'golf': 'A charity golf competition was organised to raise funds and awareness for our initiatives, bringing together professionals and community members in a spirit of generosity and sportsmanship.',
  'holi celebration': 'Holi is about colours, community, and joy. We organised a safe, vibrant celebration for our students complete with organic colours, sweets, music, and games — making memories that will last a lifetime.',
  'hsbc': "HSBC's dedicated team of corporate volunteers conducted financial literacy workshops, interactive sessions, and mentorship talks — investing not just money, but their time and expertise into our children's futures.",
  'jee one group': 'Jee One Group partnered with us to support a special community outreach event, bringing resources and goodwill that directly benefited families in our programme.',
  'kanjak': 'On the auspicious occasion of Navratri, we organised a Kanjak celebration distributing food, puries, halwa, and gifts to young girls as a mark of respect, empowerment, and community love.',
  'llm university': 'LLM University students and faculty brought academic energy to our learning centres, conducting workshops on career awareness, communication skills, and creative arts.',
  'makeup class': 'A professional makeup and grooming workshop was held for women in our empowerment programme — building confidence, teaching vocational skills, and opening pathways to employment in the beauty industry.',
  'meal distribution': "Our regular meal distribution programme ensures that hundreds of families in Gurgaon's most underserved communities receive nutritious, hot meals and ration kits to combat food insecurity.",
  "mother's day": "Mothers are the backbone of every family. On Mother's Day, we honoured incredible mothers in our community with a special celebration, thoughtful gifts, and heartfelt recognition of their sacrifices and strength.",
  'movie time': 'Lights, screen, action! We organised a special movie screening day for our children, complete with popcorn and snacks — a simple moment of joy that reminded every child they deserve happiness and fun.',
  'pallavi arts': 'In collaboration with Pallavi Arts, we organised a cultural arts programme introducing students to classical dance, music, and Indian artistic traditions in a fun and engaging way.',
  'rakhi': "On the occasion of Raksha Bandhan, our children and staff celebrated the bond of brotherhood and sisterhood with rakhi-making sessions, sweets, and a programme celebrating the festival's beautiful traditions.",
  'ration kits': 'During the Covid-19 pandemic, we distributed comprehensive ration kits containing essentials — rice, dal, oil, sugar, and other staples — to hundreds of vulnerable families who lost their livelihoods overnight.',
  'roca': "Roca Company joined us for a special CSR day, bringing their employees together for interactive sessions with our children and contributing resources that strengthened our education and hygiene programmes.",
  'special occasion': 'On special occasions and festivals, we serve a wholesome, celebratory meal to our beneficiaries — because every person deserves to mark special days with dignity and joy.',
  'sports day': 'An energetic Sports Day was organised for our students with running races, relay races, tug-of-war, and team games — promoting physical fitness, teamwork, and the spirit of healthy competition.',
  'stationary': 'Equipped with notebooks, pens, pencils, erasers, and art supplies, hundreds of children received stationery kits to support their continued education at our centres and at home.',
  'study time': 'A quiet, focused study session at Ramakirti Education Centre — where children practise reading, writing, and arithmetic in a safe and nurturing environment guided by our volunteer teachers.',
  "teacher's day": "On Teacher's Day, we honoured our incredible volunteer teachers with appreciation ceremonies, cards made by students, and a heartfelt programme recognising their dedication and impact.",
  'rani story': 'The Rani Story documents and celebrates the journeys of women in our empowerment programme — giving voice to their struggles, triumphs, and aspirations as an inspiration to others.',
  'yoga day': 'On International Yoga Day, we organised a yoga and wellness session for children and women in our programmes, promoting mental health, physical well-being, and mindfulness as tools for a better life.',
};

function getDescription(name: string) {
  const lower = name.toLowerCase();
  for (const [key, desc] of Object.entries(DESC_MAP)) {
    if (lower.includes(key)) return desc;
  }
  return `This initiative by Ramakirti Foundation brought our team, volunteers, and community together for a meaningful day of service, connection, and impact in Gurgaon's underserved communities.`;
}

function getCollaborator(name: string) {
  const lower = name.toLowerCase();
  for (const [key, collab] of Object.entries(COLLABORATOR_MAP)) {
    if (lower.includes(key)) return collab;
  }
  return null;
}

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  const initiativesDir = path.join(process.cwd(), 'public', 'img', 'Initiatives');
  try {
    if (!fs.existsSync(initiativesDir)) return [];
    return fs
      .readdirSync(initiativesDir)
      .filter((item) => fs.statSync(path.join(initiativesDir, item)).isDirectory())
      .map((item) => ({ slug: item }));
  } catch { return []; }
}

export async function generateMetadata({ params }: PageProps) {
  const slug = params.slug;
  const name = slug;
  let displayName = name;
  let description = getDescription(name).slice(0, 120);

  if (slug.startsWith('custom-')) {
    const id = slug.replace('custom-', '');
    const { db } = await import('@/lib/db');
    const initiative = await db.initiative.findUnique({ where: { id } });
    if (initiative) {
      displayName = initiative.title;
      description = initiative.description.slice(0, 120);
    }
  }

  return {
    title: `${displayName} | Ramakirti Foundation`,
    description: `Photos and story from ${displayName} — a Ramakirti Foundation community initiative in Gurgaon. ${description}`,
    openGraph: {
      title: `${displayName} | Ramakirti Foundation`,
      type: 'website',
      url: `https://ramakirtifoundation.co.in/recent-initiatives/${params.slug}`,
    },
  };
}

import { db } from '@/lib/db';

export default async function InitiativeDetailPage({ params }: PageProps) {
  const slug = params.slug;
  const name = slug;
  
  let coverImage = null;
  let galleryImages: string[] = [];
  let description = '';
  let collaborator = null;
  let displayName = name;

  if (slug.startsWith('custom-')) {
    const id = slug.replace('custom-', '');
    const initiative = await db.initiative.findUnique({ where: { id } });
    if (!initiative) notFound();
    
    displayName = initiative.title;
    coverImage = initiative.image_url;
    description = initiative.description;
  } else {
    const initiativesDir = path.join(process.cwd(), 'public', 'img', 'Initiatives');
    const itemPath = path.join(initiativesDir, name);
    if (!fs.existsSync(itemPath)) notFound();

    const directFiles = fs
      .readdirSync(itemPath)
      .filter(
        (f) =>
          f.match(/\.(jpg|jpeg|png|webp|gif)$/i) &&
          !fs.statSync(path.join(itemPath, f)).isDirectory()
      );
    coverImage =
      directFiles.length > 0
        ? `/img/Initiatives/${encodeURIComponent(slug)}/${encodeURIComponent(directFiles[0])}`
        : null;

    const galleryPath = path.join(itemPath, 'Gallery');
    if (fs.existsSync(galleryPath)) {
      fs.readdirSync(galleryPath)
        .filter((f) => f.match(/\.(jpg|jpeg|png|webp|gif)$/i))
        .forEach((f) =>
          galleryImages.push(`/img/Initiatives/${encodeURIComponent(slug)}/Gallery/${encodeURIComponent(f)}`)
        );
    }
    
    description = getDescription(name);
    collaborator = getCollaborator(name);
  }
  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* Hero with cover image */}
        <section
          className="relative overflow-hidden flex items-end"
          style={{ minHeight: '540px', paddingTop: '72px' }}
        >
          {coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverImage}
              alt={displayName}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#3A0D0B,#6E1110)' }} />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(58,13,11,.95) 0%, rgba(110,17,16,.6) 50%, transparent 100%)',
            }}
          />
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-14">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 text-sm flex-wrap" style={{ color: 'rgba(255,255,255,.6)' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,.6)' }} className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <Link href="/recent-initiatives" style={{ color: 'rgba(255,255,255,.6)' }} className="hover:text-white transition-colors">Initiatives</Link>
              <span>›</span>
              <span className="text-white">{displayName}</span>
            </nav>
            <h1
              className="font-extrabold text-white mb-4"
              style={{ fontSize: 'clamp(26px,4vw,52px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
            >
              {displayName}
            </h1>
            <div className="flex flex-wrap gap-3">
              {galleryImages.length > 0 && (
                <span
                  className="text-sm font-bold px-4 py-1.5 rounded-full"
                  style={{ background: 'rgba(201,168,76,.25)', color: '#E5C96A', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
                >
                  📷 {galleryImages.length} gallery photos
                </span>
              )}
              {collaborator && (
                <span
                  className="text-sm font-bold px-4 py-1.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,.18)', color: '#fff', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
                >
                  🤝 {collaborator.name}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Description + Collaborator */}
        <section className="py-16" style={{ background: '#FDF8F7' }}>
          <div className="max-w-[1200px] mx-auto px-6">
            <div className={`grid gap-12 items-start ${collaborator ? 'grid-cols-1 lg:grid-cols-[1fr_360px]' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
              <div>
                <span
                  className="font-bold text-sm uppercase tracking-[.15em] mb-3 block"
                  style={{ color: '#C9A84C', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
                >
                  About This Initiative
                </span>
                <p style={{ fontSize: '17px', color: '#374151', lineHeight: '1.9' }}>{description}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-2 font-bold text-base text-white no-underline rounded-lg"
                    style={{ background: '#6E1110', padding: '14px 28px', fontFamily: 'var(--font-plus-jakarta, sans-serif)', boxShadow: '0 4px 16px rgba(110,17,16,.3)' }}
                  >
                    ❤️ Support Our Work
                  </Link>
                  <Link
                    href="/recent-initiatives"
                    className="inline-flex items-center gap-2 font-bold text-base no-underline rounded-lg"
                    style={{ background: '#fff', color: '#6E1110', border: '2px solid #6E1110', padding: '14px 28px', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
                  >
                    ← All Initiatives
                  </Link>
                </div>
              </div>

              {collaborator && (
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{ background: '#fff', borderTop: '4px solid #C9A84C', boxShadow: '0 4px 24px rgba(110,17,16,.1)' }}
                >
                  <div className="text-5xl mb-4">🤝</div>
                  <span
                    className="font-bold text-xs uppercase tracking-[.12em] mb-2 block"
                    style={{ color: '#C9A84C', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
                  >
                    {collaborator.type}
                  </span>
                  <h2
                    className="font-extrabold mb-3"
                    style={{ color: '#6E1110', fontSize: '22px', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
                  >
                    {collaborator.name}
                  </h2>
                  <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.7' }}>
                    A heartfelt thank you to <strong>{collaborator.name}</strong> for their generous support, time, and resources that made this initiative possible. Your partnership helps us transform more lives every day.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <section className="py-16" style={{ background: '#fff' }}>
            <div className="max-w-[1280px] mx-auto px-5">
              <div className="text-center mb-12">
                <span
                  className="font-bold text-sm uppercase tracking-[.15em] mb-3 block"
                  style={{ color: '#C9A84C', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
                >
                  Photo Gallery
                </span>
                <h2
                  className="font-extrabold"
                  style={{ color: '#6E1110', fontSize: 'clamp(24px,4vw,40px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
                >
                  Moments From the Event
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {galleryImages.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="gallery-thumb relative overflow-hidden rounded-xl bg-gray-100"
                    style={{ aspectRatio: '1/1' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgSrc}
                      alt={`${displayName} — photo ${idx + 1}`}
                      className="gallery-img w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="gallery-overlay absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(110,17,16,.5)' }}>
                      <span className="text-white text-3xl">🔍</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
