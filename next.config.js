/** @type {import('next').NextConfig} */
const nextConfig = {
//   serverActions: {
//     allowedOrigins: ['localhost:3000'],
//   },
//   async headers() {
//     return [
//         {
//             source: "/api/:path*",
//             headers: [
//                 { key: "Access-Control-Allow-Credentials", value: "true" },
//                 { key: "Access-Control-Allow-Origin", value: "http://localhost:3001" }, // replace this your actual origin
//                 { key: "Access-Control-Allow-Methods", value: "DELETE,POST" },
//                 { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//            ]
//         }
//     ]
// },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**/*',
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/components/img/**/*",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/file/d/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/uc**",
      },

    ],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
