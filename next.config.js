/** @type {import('next').NextConfig} */
exports.nextConfig = {
  reactStrictMode: true,
};
exports.baseUrl = {
  basePath: "http://localhost:4545/api/v1",
};

module.exports = {
  images: {
    domains: ['localhost'],
  },
}
