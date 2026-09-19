import { headers } from "next/headers";
import { getProperties } from "@/services/properties-service";

/**
 * Extract the hostname from request headers.
 *
 * @param {Headers} headers request headers
 *
 * @returns {string} the hostname
 */
function getHost(headers) {
  return (
    headers.get("x-forwarded-host") || headers.get("host") || "localhost:3000"
  );
}

/**
 * Determine the connection protocol (http or https).
 *
 * @param {Headers} headers request headers
 * @param {string} host hostname
 *
 * @returns {"http" | "https"} the detected protocol
 */
function getProtocol(headers, host) {
  const protocol = headers.get("x-forwarded-proto");

  if (protocol) {
    return protocol.split(",")[0].trim();
  }

  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    return "http";
  }

  return "https";
}

/**
 * Resolve the base application URL.
 *
 * Uses the SITE_URL environment by default if available.
 *
 * @returns {Promise<string>} the base URL
 */
async function getBaseUrl() {
  const headersList = await headers();
  const host = getHost(headersList);
  const protocol = getProtocol(headersList, host);

  return process.env.SITE_URL || `${protocol}://${host}`;
}

/**
 * Next.js route to generate the dynamic sitemap XML.
 *
 * @returns {Promise<import("next").MetadataRoute.Sitemap>} array of sitemap entry objects
 */
export default async function sitemap() {
  const baseUrl = await getBaseUrl();
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const properties = await getProperties();
  const propertyRoutes = Array.isArray(properties)
    ? properties.map((property) => ({
        url: `${baseUrl}/logement/${property.id}/${property.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    : [];

  return [...staticRoutes, ...propertyRoutes];
}
