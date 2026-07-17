/**
 * FILE: next.config.js
 * DESCRIPTION: Next.js configuration with image optimization, compression,
 *              and performance settings
 */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Image optimization
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
    ],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Performance
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/donate-now',
        destination: '/donate',
        permanent: true,
      },
      {
        source: '/become-volunteer',
        destination: '/volunteer',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
