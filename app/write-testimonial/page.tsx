import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import TestimonialForm from '@/app/components/TestimonialForm';
import Link from 'next/link';

export const metadata = {
  title: 'Write a Testimonial | Ramakirti Foundation',
  description: 'Share your experience volunteering, donating, or partnering with Ramakirti Foundation.',
};

export default function WriteTestimonialPage() {
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
              <span className="text-white">Write a Testimonial</span>
            </nav>
            <span
              className="inline-block font-bold text-sm uppercase tracking-[.15em] mb-4"
              style={{ color: '#E5C96A', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
            >
              Share Your Story
            </span>
            <h1
              className="text-white font-extrabold mb-4"
              style={{ fontSize: 'clamp(30px, 5vw, 52px)', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
            >
              Write a Testimonial
            </h1>
            <p className="mx-auto" style={{ color: 'rgba(255,255,255,.78)', fontSize: '18px', maxWidth: '600px' }}>
              Your words inspire others to join our mission. Tell us about your experience with Ramakirti Foundation.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20" style={{ background: '#F5F0EF' }}>
          <div className="max-w-[1280px] mx-auto px-5">
            <TestimonialForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
