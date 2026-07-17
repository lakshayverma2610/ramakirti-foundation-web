/**
 * FILE: components/lib/Input.tsx
 * DESCRIPTION: Reusable input component with validation styling
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-bold text-neutral-900 mb-2">
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
            error
              ? 'border-red-600 focus:border-red-600 focus:ring-4 focus:ring-red-600/20'
              : 'border-neutral-200 focus:border-[#C9A84C] focus:ring-4 focus:ring-[#C9A84C]/20'
          } ${className || ''}`}
          required={required}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-600 flex items-center gap-1">⚠️ {error}</p>}
        {helperText && !error && <p className="mt-2 text-sm text-neutral-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

