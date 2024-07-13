/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: 'xvmvitbhulbtaikejszo.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
