'use client';

import { useState } from 'react';
import { submitTestimonialAction } from '@/app/actions/submitTestimonial';

export default function TestimonialForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#6E1110] font-[family-name:var(--font-plus-jakarta)]">Share Your Experience</h3>
        <p className="text-gray-500 mt-2 text-sm">Have you volunteered, donated, or partnered with us? We'd love to hear your story.</p>
      </div>

      {status === 'success' ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center font-bold">
          Thank you! Your testimonial has been submitted for review.
        </div>
      ) : (
        <form 
          action={async (formData) => {
            setStatus('loading');
            try {
              await submitTestimonialAction(formData);
              setStatus('success');
            } catch (e) {
              setStatus('error');
            }
          }}
          className="space-y-4"
        >
          {status === 'error' && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
              Failed to submit. Please try again.
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Name</label>
              <input type="text" name="name" required className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Role / Association</label>
              <input type="text" name="role" required placeholder="e.g. Volunteer, Donor" className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Story</label>
            <textarea name="message" required rows={4} className="w-full border rounded-lg p-3 outline-none focus:border-[#6E1110] focus:ring-1 focus:ring-[#6E1110]"></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-[#6E1110] text-white font-bold py-3 rounded-lg hover:bg-[#8B2520] transition-colors disabled:opacity-70"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Testimonial'}
          </button>
        </form>
      )}
    </div>
  );
}
