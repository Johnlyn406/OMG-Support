import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OMG! Support",
    short_name: "OMG! Support",
    description:
      "A gentle mobile-friendly web app for choosing nurturing support and logging the outcome.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0ee",
    theme_color: "#001E4B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
