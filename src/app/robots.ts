import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/investor-access/portal", "/admin", "/api"],
      },
    ],
    sitemap: "https://metabrainlab.com/sitemap.xml",
  };
}
