import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the root. Without this, a stray package.json or lockfile in a parent
  // folder can make Next infer the wrong project root, which breaks the
  // "@/..." path alias.
  outputFileTracingRoot: here,
  turbopack: { root: here },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  transpilePackages: ['three'],
};

export default nextConfig;
