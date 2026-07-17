'use client';

import { useState } from 'react';
import { submitVolunteerAction } from '@/app/actions/submitVolunteer';

export default function VolunteerForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  return (
    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md border border-[#e5e7eb] max-w-3xl mx-auto text-left">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🤝</div>
        <h3 className="font-extrabold text-[28px] text-[#6E1110] font-[family-name:var(--font-plus-jakarta)] mb-2">
          Become a Volunteer
        </h3>
        <p className="text-gray-600 text-[16px] leading-relaxed">
          Dedicate your time, resources, and skills to reach out to those in need. Join our team today!
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center border border-green-200">
          <div className="text-3xl mb-2">✓</div>
          <h4 className="font-bold text-lg mb-1">Application Received!</h4>
          <p className="text-sm">Thank you for joining our mission. We will contact you shortly.</p>
        </div>
      ) : (
        <form 
          action={async (formData) => {
            setStatus('loading');
            try {
              await submitVolunteerAction(formData);
              setStatus('success');
            } catch (e) {
              setStatus('error');
            }
          }} 
          className="space-y-5"
        >
          {status === 'error' && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-bold">
              Something went wrong. Please try again.
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
              <input type="text" name="name" required className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#6E1110] outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
              <input type="email" name="email" required className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#6E1110] outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
              <input type="tel" name="phone" required className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#6E1110] outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">City *</label>
              <input type="text" name="city" required className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#6E1110] outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Availability *</label>
            <select name="availability" required className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[#6E1110] outline-none transition-colors bg-white">
              <option value="Weekly">Weekly (A few hours every week)</option>
              <option value="Bi-Weekly">Bi-Weekly (Every other week)</option>
              <option value="Monthly">Monthly (Once a month)</option>
              <option value="Flexible">Flexible (On-call for events)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Skills (Select all that apply)</label>
            <div className="grid grid-cols-2 gap-2">
              {['Teaching', 'Social Media', 'Content Writing', 'Event Management', 'Photography', 'Graphic Design'].map(skill => (
                <label key={skill} className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input type="checkbox" name="skills" value={skill} className="w-4 h-4 text-[#6E1110]" />
                  <span className="text-sm font-semibold text-gray-700">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Interests</label>
            <div className="grid grid-cols-2 gap-2">
              {['Education', 'Healthcare', 'Women Empowerment', 'Food Distribution'].map(interest => (
                <label key={interest} className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <input type="checkbox" name="interests" value={interest} className="w-4 h-4 text-[#6E1110]" />
                  <span className="text-sm font-semibold text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-[#6E1110] text-white font-bold py-4 rounded-xl hover:bg-[#8B2520] transition-colors disabled:opacity-70 mt-4"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      )}
    </div>
  );
}
