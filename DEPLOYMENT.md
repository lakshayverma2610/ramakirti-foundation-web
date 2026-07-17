# Ramakirti Foundation Website — Production Deployment Guide

This Next.js 14 + Tailwind CSS + Prisma + Sanity + Razorpay stack is structured for secure, fast, and automated production deployment.

---

## 🛠️ Step 1: Secure Infrastructure Setup

### 1. Database (Neon Serverless PostgreSQL)
1. Sign up for a free PostgreSQL database at [Neon.tech](https://neon.tech/).
2. Create a new database named `ramakirti`.
3. Copy the connection string (with SSL mode enabled). It looks like this:
   `postgresql://[user]:[password]@[host]/ramakirti?sslmode=require`
4. Set this as your `DATABASE_URL` in your environment variables.

### 2. Payment Gateway (Razorpay)
1. Sign up/Log in to the [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Go to **Settings** -> **API Keys** -> click **Generate Key**.
3. Copy the **Key ID** and **Key Secret**.
4. Set `NEXT_PUBLIC_RAZORPAY_KEY_ID` (Key ID) and `RAZORPAY_KEY_SECRET` (Key Secret) in your environment variables.

### 3. Email Receipt SMTP Service (SMTP)
To send automated PDF tax receipts:
1. Go to your Google Account -> **Security** -> **2-Step Verification** -> scroll to **App Passwords**.
2. Generate an App Password for "Mail" on "Mac/Other".
3. Use your email address as `EMAIL_USER` and the 16-character code as `EMAIL_PASSWORD`.

---

## 🚀 Step 2: Local Verification & Schema Initialization

Once Node.js/NPM is available in your deployment/local environment:

```bash
# 1. Enter the directory
cd next-app

# 2. Copy variables and configure values
cp .env.example .env.local

# 3. Install packages
npm install

# 4. Push Database Schema to PostgreSQL via Prisma
npx prisma db push

# 5. Launch local server
npm run dev
```

---

## 🌐 Step 3: Deploy to Vercel (Production)

Vercel is the recommended hosting platform for Next.js 14 due to native edge-caching, auto-scaling, and free SSL certificates.

1. **Commit and push** the `next-app` directory to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initialize Next.js app"
   git remote add origin [YOUR_GITHUB_REPO_URL]
   git branch -M main
   git push -u origin main
   ```
2. Log in to [Vercel.com](https://vercel.com/) and click **Add New** -> **Project**.
3. Select **Import** next to your repository.
4. Expand **Environment Variables** and paste the keys defined in your `.env.local` file.
5. Click **Deploy**. Vercel will build, secure, compile, and publish your site under a secure SSL URL (`https://...`).
6. Point your custom domain to Vercel in the Vercel Domain Settings by adding a CNAME/A record on your domain registrar (e.g. GoDaddy, Namecheap).
