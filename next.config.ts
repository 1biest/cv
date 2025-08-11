import type { NextConfig } from 'next';

// Environment toggle to disable Next.js Image Optimization globally.
// Set DISABLE_IMAGE_OPTIMIZATION=true in your environment (e.g., on Vercel)
// to immediately stop all image transformations and serve source images directly.
const disableImageOptimization = process.env.DISABLE_IMAGE_OPTIMIZATION === 'true';

const nextConfig: NextConfig = {
  images: {
    // When true, next/image behaves like a regular <img>, bypassing Vercel Image Optimization.
    unoptimized: disableImageOptimization,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.csv$/i,
      use: 'raw-loader',
    });
    return config;
  },
};

export default nextConfig;
