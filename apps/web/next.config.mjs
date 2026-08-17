const isPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = isPages ? '/ChessApex' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: { unoptimized: true }
};

export default nextConfig;
