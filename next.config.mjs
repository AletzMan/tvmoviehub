/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['image.tmdb.org', 'raw.githubusercontent.com', 'i3.ytimg.com'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false
    }
}

export default nextConfig
