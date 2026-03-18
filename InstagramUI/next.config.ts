const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
    middlewareClientMaxBodySize: '100mb', 
  },
}
module.exports = nextConfig