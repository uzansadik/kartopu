import type { NextConfig } from 'next';
import { browser } from 'process';
import { tr } from 'zod/v4/locales';

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.kartopu.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      fs: {
        browser: './empty-module.js',
      },
    },
  },
  reactCompiler: true,
  cacheComponents: true,

  /* config options here */
};

export default nextConfig;
