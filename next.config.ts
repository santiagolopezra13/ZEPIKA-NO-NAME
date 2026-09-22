import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholders de maqueta. Reemplazar por el CDN propio o la fotografía real.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // La copia sembrada de SQLite se lee en tiempo de ejecución (ver src/lib/db.ts),
  // así que hay que incluirla explícitamente en el bundle serverless.
  outputFileTracingIncludes: {
    "/api/**/*": ["./prisma/seed.db"],
    "/mesa/[slug]": ["./prisma/seed.db"],
    "/panel/[slug]": ["./prisma/seed.db"],
  },
};

export default nextConfig;
