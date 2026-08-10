/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Preserve inbound links to the old static .html URLs.
    const map = {
      "/index.html": "/",
      "/about.html": "/about",
      "/services.html": "/services",
      "/work.html": "/work",
      "/contact.html": "/contact",
      "/terms.html": "/terms",
      "/privacy.html": "/privacy",
      "/legal.html": "/legal",
    };
    return Object.entries(map).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
