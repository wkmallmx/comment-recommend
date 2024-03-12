/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // 永久重定向
      },
    ];
  },
};