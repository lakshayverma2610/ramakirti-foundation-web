'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { 
    label: 'Initiatives ▼', 
    dropdown: [
      { href: '/recent-initiatives', label: 'Recent Events' },
      { href: '/initiatives/education', label: 'Education' },
      { href: '/initiatives/food', label: 'Food for Poor' },
      { href: '/initiatives/women', label: 'Women Empowerment' }
    ]
  },
  { href: '/requirements', label: 'Requirements' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false); }, [pathname]);

  const isLight = transparent && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLight
            ? 'bg-transparent'
            : 'bg-white shadow-[0_2px_20px_rgba(110,17,16,.12)] backdrop-blur-md'
        }`}
        style={{ height: '72px' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/logo.jpg"
              alt="Ramakirti Foundation logo"
              width={44}
              height={44}
              className="rounded-lg object-cover flex-shrink-0"
              style={{ border: '2px solid rgba(110,17,16,.18)' }}
            />
            <div className="flex flex-col leading-tight">
              <span
                className="font-extrabold text-[15px] tracking-tight transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-plus-jakarta, sans-serif)',
                  color: isLight ? '#fff' : '#6E1110',
                }}
              >
                Ramakirti Foundation
              </span>
              <span className="text-[10px] font-semibold tracking-wide" style={{ color: '#C9A84C' }}>
                Educate. Nourish. Empower.
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              if (link.dropdown) {
                return (
                  <div 
                    key="initiatives" 
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13.5px] font-semibold transition-all duration-200 cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-plus-jakarta, sans-serif)',
                        color: isLight ? 'rgba(255,255,255,.9)' : '#374151',
                        background: 'transparent',
                      }}
                    >
                      {link.label}
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 transition-all duration-200 ${dropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}
                    >
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#6E1110] font-medium no-underline"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="no-underline px-3 py-2 rounded-lg text-[13.5px] font-semibold transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-plus-jakarta, sans-serif)',
                    color: pathname === link.href
                      ? '#6E1110'
                      : isLight
                      ? 'rgba(255,255,255,.9)'
                      : '#374151',
                    background: pathname === link.href ? 'rgba(110,17,16,.08)' : 'transparent',
                    fontWeight: pathname === link.href ? '800' : '600',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden xl:flex items-center gap-3 ml-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 font-bold text-[13.5px] text-white no-underline rounded-lg px-5 py-[10px] transition-all duration-300 hover:-translate-y-[2px]"
              style={{
                fontFamily: 'var(--font-plus-jakarta, sans-serif)',
                background: '#6E1110',
                boxShadow: '0 4px 16px rgba(110,17,16,.35)',
              }}
            >
              ❤️ Donate Now
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="xl:hidden flex flex-col gap-[5px] p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-6 h-[2px] rounded-sm transition-all duration-300"
                style={{
                  background: isLight ? '#fff' : '#374151',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                    : i === 1 ? 'scaleX(0)'
                    : 'rotate(-45deg) translate(5px, -5px)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="xl:hidden fixed z-40 left-0 right-0 bg-white shadow-xl border-t-4 transition-all duration-300"
        style={{
          top: '72px',
          borderTopColor: '#6E1110',
          maxHeight: menuOpen ? '100vh' : '0',
          overflow: 'hidden',
        }}
      >
        <div className="p-5">
          {NAV_LINKS.map((link) => {
            if (link.dropdown) {
              return (
                <div key="initiatives-mobile" className="py-2">
                  <div className="font-semibold text-base px-3 text-[#374151] mb-2">{link.label}</div>
                  {link.dropdown.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block font-medium text-[14.5px] py-2.5 px-6 rounded-lg no-underline transition-colors text-gray-600 hover:bg-gray-50 hover:text-[#6E1110]"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                  <div className="border-b border-gray-100 mt-2"></div>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href!}
                className="block font-semibold text-base py-3 px-3 rounded-lg border-b border-gray-100 last:border-0 no-underline transition-colors"
                style={{
                  fontFamily: 'var(--font-plus-jakarta, sans-serif)',
                  color: pathname === link.href ? '#6E1110' : '#374151',
                  background: pathname === link.href ? 'rgba(110,17,16,.05)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-4">
            <Link
              href="/donate"
              className="block w-full text-center font-bold text-white py-4 rounded-lg no-underline hover:opacity-90"
              style={{ background: '#6E1110', fontFamily: 'var(--font-plus-jakarta, sans-serif)' }}
            >
              ❤️ Donate Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
