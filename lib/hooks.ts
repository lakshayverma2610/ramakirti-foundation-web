/**
 * FILE: lib/hooks.ts
 * DESCRIPTION: Custom React hooks for common patterns
 */

import { useEffect, useState } from 'react';

/**
 * Hook to detect if element is in viewport
 */
export const useInView = (ref: React.RefObject<HTMLElement>) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return isInView;
};

/**
 * Hook for animated counters
 */
export const useCounter = (end: number, duration: number = 3000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = (duration / 16) * (end / duration);
    let current = 0;

    const timer = setInterval(() => {
      current += steps;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

/**
 * Hook for media queries
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

/**
 * Hook for local storage
 */
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

/* ---

# QUICK-START GUIDE FOR DEVELOPERS

## Project Setup (First Time)

```bash
# 1. Clone repository
git clone https://github.com/ramakirti/foundation-web.git
cd foundation-web

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# Add these to .env.local:
# NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXX
# RAZORPAY_KEY_SECRET=xxxxxxxxxxxx
# DATABASE_URL=postgresql://user:pass@localhost:5432/ramakirti
# EMAIL_USER=support@ramakirtifoundation.co.in
# EMAIL_PASSWORD=your_app_password


# 4. Setup database
npx prisma db push
npx prisma db seed  # Populate dummy data

# 5. Start dev server
npm run dev

# Navigate to http://localhost:3000
```

## Component Usage Examples

### Button Component
```jsx
import { Button } from '@/components/lib/Button';

<Button variant="primary" size="lg" fullWidth>
  Donate Now
</Button>

<Button variant="outline" isLoading>
  Processing...
</Button>
```

### Card Component
```jsx
import { Card } from '@/components/lib/Card';

<Card variant="elevated">
  <h3>Initiative Title</h3>
  <p>Description goes here...</p>
</Card>
```

### Input Component
```jsx
import { Input } from '@/components/lib/Input';

<Input
  label="Email Address"
  type="email"
  placeholder="your@email.com"
  error={errors.email?.message}
  required
/>
```

### Modal Component
```jsx
import { Modal } from '@/components/lib/Modal';
import { useState } from 'react';

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Donation Confirmation"
      >
        <p>Thank you for your donation!</p>
      </Modal>
    </>
  );
}
```

### Carousel Component
```jsx
import { Carousel } from '@/components/lib/Carousel';

const testimonials = [
  <TestimonialCard key={1} />,
  <TestimonialCard key={2} />,
];

<Carousel items={testimonials} autoRotate autoRotateInterval={5000} />
```

### Custom Hooks
```jsx
import { useCounter, useInView } from '@/lib/hooks';
import { useRef } from 'react';

export function ImpactMetric() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const count = useCounter(isInView ? 1240 : 0, 3000);

  return (
    <div ref={ref}>
      <p>{count}</p>
      <p>Children Educated</p>
    </div>
  );
}
```

## Fetching Data from Sanity

```javascript
// lib/queries.ts
import { client } from '@/lib/sanity';

export async function getInitiatives() {
  const query = `
    *[_type == "initiative"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      image,
      metrics
    }
  `;
  return await client.fetch(query);
}

export async function getInitiativeBySlug(slug: string) {
  const query = `
    *[_type == "initiative" && slug.current == $slug][0] {
      _id,
      title,
      description,
      image,
      content,
      testimonials[]->
    }
  `;
  return await client.fetch(query, { slug });
}
```

## Using Queries in Components

```jsx
// app/initiatives/[slug]/page.tsx
import { getInitiativeBySlug } from '@/lib/queries';
import Image from 'next/image';

export default async function InitiativePage({ params }) {
  const initiative = await getInitiativeBySlug(params.slug);

  return (
    <main>
      <Image
        src={initiative.image}
        alt={initiative.title}
        width={1200}
        height={400}
        priority
      />
      <h1>{initiative.title}</h1>
      <p>{initiative.description}</p>
    </main>
  );
}
```

## Making API Calls from Frontend

```jsx
import axios from 'axios';
import { useState } from 'react';

export function DonationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDonate = async (formData) => {
    try {
      setIsLoading(true);
      setError('');

      // Call backend API
      const response = await axios.post('/api/donations/create', {
        amount: formData.amount,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        initiative: formData.initiative,
      });

      // Open Razorpay checkout
      const razorpay = new window.Razorpay({
        key: response.data.key_id,
        order_id: response.data.order_id,
        // ... other config
      });
      razorpay.open();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create donation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Form JSX
  );
}
```

## Database Queries with Prisma

```javascript
// Fetch donations
const donations = await db.donation.findMany({
  where: { status: 'success' },
  orderBy: { createdAt: 'desc' },
  take: 100,
});

// Create donation
const newDonation = await db.donation.create({
  data: {
    razorpay_payment_id: paymentId,
    amount: 5000,
    donor_email: 'donor@example.com',
    status: 'success',
  },
});

// Update donation
await db.donation.update({
  where: { id: donationId },
  data: { receipt_sent: true },
});
```

## Deployment

```bash
# Deploy to Vercel (auto-connected)
git push origin main  # Vercel auto-deploys

# Or deploy manually:
vercel deploy --prod

# Check deployment status
vercel --list
```

## Common Issues & Solutions

### Issue: Razorpay script not loading
**Solution**: Ensure Razorpay script is loaded in layout.tsx:
```jsx
<script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
```

### Issue: Images not optimizing
**Solution**: Use Next.js Image component:
```jsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority={true}  // For hero images
/>
```

### Issue: Form not validating
**Solution**: Ensure Zod schema matches form fields:
```jsx
const schema = z.object({
  email: z.string().email('Invalid email'),
  amount: z.number().min(100, 'Minimum ₹100'),
});

// Make sure form fields have same names as schema keys
```

### Issue: Styling not applying
**Solution**: 
1. Clear .next folder: `rm -rf .next`
2. Restart dev server: `npm run dev`
3. Check if class names are in `tailwind.config.ts` content array

## Performance Debugging

```bash
# Generate build analysis
ANALYZE=true npm run build

# Run Lighthouse audit
npm run lighthouse

# Check Core Web Vitals (Vercel Analytics)
# Navigate to: https://vercel.com/dashboard
```

## Getting Help

- **Documentation**: https://nextjs.org/docs
- **Component Library**: Check `components/lib/` folder
- **Tailwind Classes**: https://tailwindcss.com/docs
- **Sanity Docs**: https://www.sanity.io/docs
- **Razorpay API**: https://razorpay.com/docs/api

---

*Last Updated: March 2024 | Version 1.0*
*/
