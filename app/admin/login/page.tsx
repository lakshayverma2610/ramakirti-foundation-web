'use client';

import { useState } from 'react';
import { loginAction } from '../actions';

export default function AdminLogin() {
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
        
        <form 
          action={async (formData) => {
            try {
              await loginAction(formData);
            } catch (err: any) {
              setError(err.message);
            }
          }} 
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E1110] focus:border-transparent outline-none"
              placeholder="Enter admin password"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button 
            type="submit" 
            className="w-full bg-[#6E1110] text-white py-2.5 rounded-lg font-semibold hover:bg-[#8B2520] transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
