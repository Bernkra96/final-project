/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },

  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dlr9keice/image/upload/',
  },
};

module.exports = nextConfig;
