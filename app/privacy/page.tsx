import type { Metadata } from 'next';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy and data protection practices for Ramakirti Foundation.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-[#FDF8F7] px-6">
        <div className="max-w-[800px] mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-[0_4px_32px_rgba(101,26,22,.08)] border border-gray-100">
          <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[32px] text-[#651A16] mb-6">Privacy Policy</h1>
          <p className="text-gray-400 text-xs mb-8">Last Updated: March 2024</p>
          <div className="space-y-6 text-gray-600 leading-relaxed text-[15px]">
            <p>
              At Ramakirti Foundation, we prioritize the privacy and security of our donors, volunteers, and visitors. This Privacy Policy details how we collect, use, and protect your personal information.
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mt-8 mb-3">1. Information We Collect</h2>
            <p>
              We collect personal details such as your name, email address, phone number, and PAN card number (for Indian tax exemption certificates) when you make a donation, register as a volunteer, or contact us.
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mt-8 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process donations securely and issue 80G tax receipts.</li>
              <li>To send updates about our initiatives, newsletters, and project reports (you may opt-out at any time).</li>
              <li>To coordinate volunteer tasks and onboard volunteer applicants.</li>
            </ul>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mt-8 mb-3">3. Data Protection and Security</h2>
            <p>
              We implement industry-standard 256-bit encryption for data transfers. Payment details are handled entirely by Razorpay, a PCI-DSS compliant secure payment gateway. We never store credit card or net banking credentials on our servers.
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mt-8 mb-3">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:support@ramakirtifoundation.co.in" className="text-[#651A16] font-semibold hover:underline">
                support@ramakirtifoundation.co.in
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
