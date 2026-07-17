import type { Metadata } from 'next';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions of using the Ramakirti Foundation platform.',
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-[#FDF8F7] px-6">
        <div className="max-w-[800px] mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-[0_4px_32px_rgba(101,26,22,.08)] border border-gray-100">
          <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[32px] text-[#651A16] mb-6">Terms of Use</h1>
          <p className="text-gray-400 text-xs mb-8">Last Updated: March 2024</p>
          <div className="space-y-6 text-gray-600 leading-relaxed text-[15px]">
            <p>
              Welcome to the website of Ramakirti Foundation. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mt-8 mb-3">1. Intended Use</h2>
            <p>
              This website is meant to provide information about our social welfare initiatives, enable secure online donations, and facilitate volunteer registration. Any unauthorized use of the content or layout is strictly prohibited.
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mt-8 mb-3">2. Donation Declarations</h2>
            <p>
              By donating, you declare that the funds are yours and not derived from any illegal activities. Donations to Ramakirti Foundation are eligible for Section 80G tax benefits as permitted by Indian law.
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mt-8 mb-3">3. Intellectual Property</h2>
            <p>
              The logo, images, text, and source code are the intellectual property of Ramakirti Foundation and may not be reproduced, copied, or redistributed without written consent from the trustees.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
