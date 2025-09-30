/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGithubPages ? (process.env.BASE_PATH || '') : ''

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Generate a fully static site for GitHub Pages
  output: 'export',
  trailingSlash: true,
  // Configure base path and asset prefix when deploying to GitHub Pages project sites
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath + '/',
      }
    : {}),
}

export default nextConfig
