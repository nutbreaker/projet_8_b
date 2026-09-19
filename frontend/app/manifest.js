/**
 * Next.js route to generate the web app manifest.
 *
 * @returns {import("next").MetadataRoute.Manifest}
 */
export default function manifest() {
  return {
    name: "Kasa - Location d'appartements entre particuliers",
    short_name: "Kasa",
    description:
      "Trouvez votre hébergement idéal parmi nos dernières offres de locations.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FF6060",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
