const BASE = "https://fikadesign.studio";

export default function sitemap() {
  const routes = [
    { path: "/", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/legal", priority: 0.3 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    priority,
  }));
}
