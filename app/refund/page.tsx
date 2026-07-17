import type { Metadata } from 'next';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Refund and cancellation policy for donations made to Ramakirti Foundation.',
};

export default function RefundPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-[#FDF8F7] px-6">
        <div className="max-w-[800px] mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-[0_4px_32px_rgba(101,26,22,.08)] border border-gray-100">
          <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[32px] text-[#651A16] mb-6">Refund & Cancellation Policy</h1>
          <p className="text-gray-400 text-xs mb-8">Last Updated: March 2024</p>
          <div className="space-y-6 text-gray-600 leading-relaxed text-[15px]">
            <p>
              Ramakirti Foundation values every contribution. Since online donations are processed immediately and deployed directly to educational, nutritional, and vocational training initiatives, refunds are generally not permitted.
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mt-8 mb-3">1. Exceptional Circumstances</h2>
            <p>
              If a donation was made in error (e.g. duplicate transaction or wrong amount typed), please notify us within 7 days of the payment. We will work with you and our payment gateway partner, Razorpay, to review and process a refund after validating transaction logs.
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mt-8 mb-3">2. Processing Time</h2>
            <p>
              Approved refunds will be processed back to the original source payment method (card, bank account, or UPI handle) within 7–10 working days, depending on bank clearance speeds.
            </p>
            <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mt-8 mb-3">3. Contact for Refunds</h2>
            <p>
              For refund requests, please email us at{' '}
              <a href="mailto:refunds@ramakirtifoundation.co.in" className="text-[#651A16] font-semibold hover:underline">
                refunds@ramakirtifoundation.co.in
              </a>{' '}
              attaching your transaction screenshot and transaction ID.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
