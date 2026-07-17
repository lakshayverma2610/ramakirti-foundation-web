/**
 * FILE: components/lib/Badge.tsx
 * DESCRIPTION: Reusable badge component for labels
 */

import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'info', size = 'md', children, ...props }, ref) => {
    const variants = {
      success: 'bg-[#FBF5E0] text-[#651A16] border border-[#C9A84C]',
      warning: 'bg-[#FEF3C7] text-[#92400E] border border-[#C9A84C]',
      error: 'bg-[#FEE2E2] text-[#991B1B] border border-red-500',
      info: 'bg-[#EFF6FF] text-[#651A16] border border-[#C9A84C]',
      neutral: 'bg-neutral-200 text-neutral-900 border border-neutral-300',
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${className || ''}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };

