'use client';

import { useState } from 'react';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

type Step = 1 | 2 | 3 | 4;

interface DonorData {
  amount: number;
  initiative: string;
  is_recurring: boolean;
  name: string;
  email: string;
  phone: string;
  pan: string;
  transaction_id: string;
}

const INITIATIVES = [
  { id: 'education', label: '📚 Education', desc: '₹500 funds a child\'s materials for a month' },
  { id: 'food', label: '🍚 Food Program', desc: '₹300 provides 10 hot meals' },
  { id: 'women', label: '💪 Women Empowerment', desc: '₹1000 trains 1 woman for 2 weeks' },
  { id: 'general', label: '❤️ General Fund', desc: 'Foundation decides best use' },
];

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

const IMPACT_MAP: Record<string, (amount: number) => string> = {
  education: (a) => `Your ₹${a.toLocaleString('en-IN')} will fund ${Math.floor(a / 250)} children's monthly stationery & books`,
  food: (a) => `Your ₹${a.toLocaleString('en-IN')} will provide ${Math.floor(a / 30)} nutritious hot meals`,
  women: (a) => `Your ₹${a.toLocaleString('en-IN')} will support ${Math.floor(a / 1000)} women in vocational training`,
  general: (a) => `Your ₹${a.toLocaleString('en-IN')} will go towards the most urgent need at the Foundation`,
};

declare const Razorpay: new (options: Record<string, unknown>) => { open: () => void };

export default function DonatePage() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [donationId, setDonationId] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const [donor, setDonor] = useState<DonorData>({
    amount: 1000,
    initiative: 'education',
    is_recurring: false,
    name: '',
    email: '',
    phone: '',
    pan: '',
    transaction_id: '',
  });

  const effectiveAmount = customAmount ? parseInt(customAmount) || 0 : donor.amount;

  const updateDonor = (fields: Partial<DonorData>) => setDonor((prev) => ({ ...prev, ...fields }));

  function selectAmount(a: number) {
    setCustomAmount('');
    updateDonor({ amount: a });
  }

  function validateStep2() {
    if (!donor.name.trim()) return 'Please enter your full name.';
    if (!donor.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donor.email)) return 'Please enter a valid email address.';
    if (!donor.phone.trim() || !/^[6-9]\d{9}$/.test(donor.phone.replace(/\s+/g, ''))) return 'Please enter a valid 10-digit Indian mobile number.';
    if (donor.pan.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(donor.pan.trim().toUpperCase())) return 'PAN format invalid (e.g. ABCDE1234F).';
    return '';
  }

  async function handlePayment() {
    if (!donor.transaction_id.trim()) {
      setError('Please enter your UPI transaction ID so we can verify your payment.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/donations/submit-manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          initiative: donor.initiative,
          donor_name: donor.name,
          donor_email: donor.email,
          donor_phone: donor.phone,
          pan_number: donor.pan,
          transaction_id: donor.transaction_id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit donation');
      
      setDonationId(data.donation_id || `RF-${Date.now()}`);
      setSuccess(true);
      setStep(4);
    } catch (err) {
      setError((err as Error).message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (step === 4 && success) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-br from-[#FDF8F7] to-white pt-24 pb-16 px-4">
          <div className="max-w-[540px] mx-auto text-center">
            <div className="text-[80px] mb-4 animate-[bounceIn_.6s_ease]">🎉</div>
            <div className="bg-white rounded-3xl p-10 shadow-[0_8px_48px_rgba(101,26,22,.15)] border border-[rgba(101,26,22,.1)]">
              <h1 className="font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[32px] text-[#651A16] mb-3">
                Thank You, {donor.name.split(' ')[0]}!
              </h1>
              <p className="text-gray-500 text-lg mb-6">
                Your donation of <strong className="text-[#651A16]">₹{effectiveAmount.toLocaleString('en-IN')}</strong> to{' '}
                <strong>{INITIATIVES.find((i) => i.id === donor.initiative)?.label}</strong> has been received.
              </p>
              <div className="bg-[#FBF5E0] border border-[rgba(201,168,76,.3)] rounded-2xl p-5 mb-6 text-sm">
                <p className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[#651A16] mb-1">80G Receipt</p>
                <p className="text-gray-600">A digitally signed 80G tax receipt will be emailed to <strong>{donor.email}</strong> within 24 hours.</p>
                {donationId && <p className="text-[12px] text-gray-400 mt-2">Donation ID: {donationId}</p>}
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href={`https://wa.me/?text=I%20just%20donated%20%E2%82%B9${effectiveAmount.toLocaleString('en-IN')}%20to%20Ramakirti%20Foundation%20for%20${donor.initiative}%20%F0%9F%A4%9D%20Support%20them%20at%20https://ramakirtifoundation.co.in/donate`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-[family-name:var(--font-plus-jakarta)] font-bold px-5 py-3 rounded-xl hover:bg-[#1FAF53] transition-colors no-underline text-sm"
                >
                  💬 Share on WhatsApp
                </a>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#651A16] text-white font-[family-name:var(--font-plus-jakarta)] font-bold px-5 py-3 rounded-xl hover:bg-[#8B2520] transition-colors no-underline text-sm"
                >
                  ← Back to Home
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-[#FDF8F7] to-white pt-24 pb-16 px-4">
        <div className="max-w-[700px] mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-[#C9A84C] font-[family-name:var(--font-plus-jakarta)] font-bold text-sm uppercase tracking-[.15em]">Secure Donation</span>
            <h1 className="text-[clamp(26px,4vw,40px)] font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[#651A16] mt-2">
              Make a Difference Today
            </h1>
            <p className="text-gray-500 mt-2">100% of your donation goes to the field. 80G tax exempt.</p>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-0 mb-10">
            {[
              { n: 1, label: 'Amount' },
              { n: 2, label: 'Your Info' },
              { n: 3, label: 'Confirm' },
            ].map(({ n, label }, idx) => (
              <div key={n} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-[family-name:var(--font-plus-jakarta)] font-bold transition-all duration-300 ${step >= n ? 'bg-[#651A16] text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {step > n ? '✓' : n}
                  </div>
                  <span className={`text-[11px] font-[family-name:var(--font-plus-jakarta)] font-semibold ${step >= n ? 'text-[#651A16]' : 'text-gray-400'}`}>{label}</span>
                </div>
                {idx < 2 && <div className={`flex-1 h-[2px] -mt-4 mx-1 transition-all duration-300 ${step > n ? 'bg-[#651A16]' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-[0_4px_32px_rgba(101,26,22,.12)] border border-[rgba(101,26,22,.08)] overflow-hidden">
            {/* STEP 1: AMOUNT */}
            {step === 1 && (
              <div className="p-8 md:p-10">
                <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mb-6">Choose Initiative</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {INITIATIVES.map(({ id, label, desc }) => (
                    <button
                      key={id}
                      onClick={() => updateDonor({ initiative: id })}
                      className={`text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${donor.initiative === id ? 'border-[#651A16] bg-[rgba(101,26,22,.05)]' : 'border-gray-200 hover:border-[#651A16] hover:bg-[rgba(101,26,22,.03)]'}`}
                    >
                      <span className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[15px] text-gray-800 block">{label}</span>
                      <span className="text-[12px] text-gray-500">{desc}</span>
                    </button>
                  ))}
                </div>

                <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mb-4">Choose Amount</h2>
                <div className="flex gap-2 flex-wrap mb-4">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => selectAmount(a)}
                      className={`font-[family-name:var(--font-plus-jakarta)] font-bold py-2.5 px-5 rounded-xl border-2 text-[15px] transition-all duration-200 cursor-pointer ${!customAmount && donor.amount === a ? 'bg-[#651A16] text-white border-[#651A16]' : 'border-gray-200 text-gray-700 hover:border-[#651A16] hover:text-[#651A16]'}`}
                    >
                      ₹{a.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount (₹)"
                  value={customAmount}
                  min={100}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16] mb-6"
                />


                {/* Impact preview */}
                {effectiveAmount >= 100 && (
                  <div className="bg-[#FBF5E0] border border-[rgba(201,168,76,.3)] rounded-xl p-4 mb-6 text-sm text-gray-700">
                    💡 {IMPACT_MAP[donor.initiative](effectiveAmount)}
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  disabled={effectiveAmount < 100}
                  className="w-full bg-[#651A16] text-white font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] py-4 rounded-xl hover:bg-[#8B2520] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 2: DONOR INFO */}
            {step === 2 && (
              <div className="p-8 md:p-10">
                <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mb-6">Your Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={donor.name}
                    onChange={(e) => updateDonor({ name: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16]"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={donor.email}
                    onChange={(e) => updateDonor({ email: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16]"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number (10-digit) *"
                    value={donor.phone}
                    onChange={(e) => updateDonor({ phone: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="PAN Number (optional, for 80G receipt)"
                    value={donor.pan}
                    onChange={(e) => updateDonor({ pan: e.target.value.toUpperCase() })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16]"
                    maxLength={10}
                  />
                </div>
                <div className="text-[12px] text-gray-500 mt-3 mb-6">
                  🔒 Your information is encrypted and will only be used to send your donation receipt.
                </div>
                {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 mb-4">{error}</div>}
                <div className="flex gap-3">
                  <button
                    onClick={() => { setError(''); setStep(1); }}
                    className="flex-1 border-2 border-gray-200 text-gray-700 font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] py-4 rounded-xl hover:border-[#651A16] hover:text-[#651A16] transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => {
                      const err = validateStep2();
                      if (err) { setError(err); return; }
                      setError('');
                      setStep(3);
                    }}
                    className="flex-2 flex-grow bg-[#651A16] text-white font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] py-4 rounded-xl hover:bg-[#8B2520] transition-all"
                  >
                    Review →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONFIRM */}
            {step === 3 && (
              <div className="p-8 md:p-10">
                <h2 className="font-[family-name:var(--font-plus-jakarta)] font-bold text-[20px] text-[#651A16] mb-6">Confirm & Pay</h2>
                <div className="bg-[#FBF5E0] border border-[rgba(201,168,76,.3)] rounded-2xl p-6 mb-6 space-y-2">
                  {[
                    { label: 'Donation Amount', value: `₹${effectiveAmount.toLocaleString('en-IN')}` },
                    { label: 'Initiative', value: INITIATIVES.find((i) => i.id === donor.initiative)?.label },
                    { label: 'Donor Name', value: donor.name },
                    { label: 'Email', value: donor.email },
                    { label: 'Phone', value: donor.phone },
                    ...(donor.pan ? [{ label: 'PAN Number', value: donor.pan }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start text-sm">
                      <span className="text-gray-500 font-[family-name:var(--font-plus-jakarta)]">{label}</span>
                      <span className="font-[family-name:var(--font-plus-jakarta)] font-bold text-gray-800 text-right ml-4 max-w-[60%]">{value}</span>
                    </div>
                  ))}
                </div>
                
                {/* QR Code Section */}
                <div className="text-center mb-6">
                  <p className="text-gray-700 font-[family-name:var(--font-plus-jakarta)] mb-3">Scan the QR code below with any UPI app to pay</p>
                  <img src="/img/qr-code.jpeg" alt="NGO QR Code" className="w-48 h-48 mx-auto border-4 border-white shadow-lg rounded-xl mb-4 object-cover" />
                  <p className="text-[#651A16] font-bold text-lg mb-4">Please pay exactly ₹{effectiveAmount.toLocaleString('en-IN')}</p>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left max-w-sm mx-auto mb-4 text-sm">
                    <p className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-2">Bank Transfer Details</p>
                    <p className="text-gray-600"><span className="font-semibold">Account Name:</span> Ramakirti Foundation</p>
                    <p className="text-gray-600"><span className="font-semibold">Account No:</span> XXXXXX12345</p>
                    <p className="text-gray-600"><span className="font-semibold">IFSC Code:</span> HDFC0001234</p>
                  </div>
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Enter UPI Transaction ID *"
                    value={donor.transaction_id}
                    onChange={(e) => updateDonor({ transaction_id: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-[16px] font-[family-name:var(--font-plus-jakarta)] focus:outline-none focus:border-[#651A16]"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">After successful payment, enter your 12-digit UPI transaction ID here. Our team will verify it and issue your 80G receipt.</p>
                </div>

                <div className="flex items-center gap-2 text-[12px] text-gray-400 mb-6">
                  <span>🔒</span> Your information is secure
                </div>
                {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 mb-4">{error}</div>}
                <div className="flex gap-3">
                  <button
                    onClick={() => { setError(''); setStep(2); }}
                    className="flex-1 border-2 border-gray-200 text-gray-700 font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] py-4 rounded-xl hover:border-[#651A16] hover:text-[#651A16] transition-all"
                  >
                    ← Edit
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={loading || !donor.transaction_id.trim()}
                    className="flex-2 flex-grow bg-[#651A16] text-white font-[family-name:var(--font-plus-jakarta)] font-bold text-[16px] py-4 rounded-xl hover:bg-[#8B2520] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit Donation Details</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Trust footer */}
          <div className="mt-6 flex gap-6 justify-center flex-wrap">
            {['🏛️ 80G Tax Exempt', '🔒 SSL Secured', '📧 Verified Receipts'].map((t) => (
              <span key={t} className="text-[13px] text-gray-500 font-[family-name:var(--font-plus-jakarta)]">{t}</span>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
