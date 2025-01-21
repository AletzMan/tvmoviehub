/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org', 'raw.githubusercontent.com', 'i3.ytimg.com'],
        unoptimized: true,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false
    }
}

export default nextConfig
