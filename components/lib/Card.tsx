/**
 * FILE: components/lib/Card.tsx
 * DESCRIPTION: Reusable card component
 */

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  href?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', href, children, ...props }, ref) => {
    const baseStyles = 'rounded-lg p-6 transition-all duration-300';
    
    const variants = {
      default: 'bg-white shadow-md hover:shadow-lg',
      elevated: 'bg-white shadow-lg hover:shadow-xl scale-100 hover:scale-105',
      outlined: 'bg-transparent border-2 border-neutral-200 hover:border-[#C9A84C]',
    };

    const content = (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );

    if (href) {
      return (
        <a href={href} className="no-underline">
          {content}
        </a>
      );
    }

    return content;
  }
);

Card.displayName = 'Card';

export { Card };

