import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const QUICK_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/initiatives/education', label: 'Education' },
  { href: '/initiatives/food', label: 'Food for Poor' },
  { href: '/initiatives/women', label: 'Women Empowerment' },
  { href: '/requirements', label: 'Requirements' },
];

const GET_INVOLVED = [
  { href: '/donate', label: 'Donate Now' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/contact', label: 'Partner With Us' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A0806] text-white/80 pt-24 pb-8" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 mb-16">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-4 no-underline mb-4">
              <Image src="/img/logo.jpg" alt="Ramakirti Foundation" width={42} height={42} className="rounded-md" />
              <div>
                <div className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[15px] text-white">
                  Ramakirti Foundation
                </div>
                <div className="text-[10px] text-[#C9A84C] font-semibold tracking-wide">
                  Educate. Nourish. Empower.
                </div>
              </div>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mt-2 max-w-xs">
              A grassroots NGO committed to transforming lives in Gurgaon&apos;s most underserved communities through education, food security, and women&apos;s empowerment since 2021.
            </p>
            {/* Socials */}
            <div className="flex gap-2 mt-6" aria-label="Social media links">
              {[
                { href: 'https://www.facebook.com/ramakirtifoundation.org', label: 'Facebook', icon: <FaFacebook size={24} /> },
                { href: 'https://www.instagram.com/ramakirtifoundation/', label: 'Instagram', icon: <FaInstagram size={24} /> },
                { href: 'https://www.linkedin.com/company/96037665/', label: 'LinkedIn', icon: <FaLinkedin size={24} /> },
                { href: 'https://www.youtube.com/channel/UCY9gGWwrWTdLH6mxEDo6LFA', label: 'YouTube', icon: <FaYoutube size={24} /> },
                { href: 'https://wa.me/918851502840', label: 'WhatsApp', icon: <FaWhatsapp size={24} /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  className="w-[38px] h-[38px] rounded-full bg-white/10 flex items-center justify-center text-white hover:text-gray-300 hover:bg-[#8B2520] hover:-translate-y-[3px] transition-all duration-200 no-underline"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="text-white font-[family-name:var(--font-plus-jakarta)] text-[13px] font-bold uppercase tracking-[.1em] mb-6">
              Quick Links
            </h5>
            <div className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-white/55 hover:text-[#E5C96A] transition-colors no-underline flex items-center gap-1.5"
                >
                  → {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Get Involved */}
          <div>
            <h5 className="text-white font-[family-name:var(--font-plus-jakarta)] text-[13px] font-bold uppercase tracking-[.1em] mb-6">
              Get Involved
            </h5>
            <div className="flex flex-col gap-2.5">
              {GET_INVOLVED.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-white/55 hover:text-[#E5C96A] transition-colors no-underline flex items-center gap-1.5"
                >
                  → {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-[family-name:var(--font-plus-jakarta)] text-[13px] font-bold uppercase tracking-[.1em] mb-6">
              Contact
            </h5>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-white/55">
                <span>📍</span>
                <span>89 FF Housing Board Society, Sector 33, Gurgaon — 122022</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/55">
                <span>📞</span>
                <a href="tel:+918851502840" className="text-white/55 hover:text-[#E5C96A] transition-colors no-underline">
                  +91 88515-02840
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/55">
                <span>✉️</span>
                <a href="mailto:support@ramakirtifoundation.co.in" className="text-white/55 hover:text-[#E5C96A] transition-colors no-underline">
                  support@ramakirtifoundation.co.in
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/55">
                <span>🕐</span>
                <span>Mon–Sat, 9 AM – 6 PM</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-white/8 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/35 flex-wrap">
          <span>© {year} Ramakirti Foundation. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/35 hover:text-[#E5C96A] transition-colors no-underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/35 hover:text-[#E5C96A] transition-colors no-underline">
              Terms of Use
            </Link>
            <Link href="/refund" className="text-white/35 hover:text-[#E5C96A] transition-colors no-underline">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
