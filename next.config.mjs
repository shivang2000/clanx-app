/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[{
      hostname:"images.unsplash.com",
      protocol: 'https',

    },{
      hostname:'openweathermap.org'
    }]
  }
};

export default nextConfig;
