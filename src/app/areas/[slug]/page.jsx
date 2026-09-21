import { notFound } from "next/navigation";

import AreaDetail from "@/components/Areas/AreaDetail";
import { getAreaBySlug } from "@/lib/api/areas";

const SITE_URL = "https://sabafamilyfoundation.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const area = await getAreaBySlug(slug);

  if (!area) {
    return {
      title: "Area Not Found | Saba Family Foundation",
      description: "The requested area of work could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = area.title || "Area of Work";
  const description = area.excerpt || area.subtitle || "";
  const canonicalUrl = `${SITE_URL}/areas/${area.slug}`;

  return {
    title: `${title} | Saba Family Foundation`,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      title: `${title} | Saba Family Foundation`,
      description,
      url: canonicalUrl,
      siteName: "Saba Family Foundation",
      locale: "en_US",

      ...(area.image
        ? {
            images: [
              {
                url: area.image,
                width: 1200,
                height: 630,
                alt: title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | Saba Family Foundation`,
      description,

      ...(area.image
        ? {
            images: [area.image],
          }
        : {}),
    },
  };
}

export default async function AreaPage({ params }) {
  const { slug } = await params;

  const area = await getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const title = area.title || "Area of Work";
  const description = area.excerpt || area.subtitle || "";
  const canonicalUrl = `${SITE_URL}/areas/${area.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name: title,
    description,
    url: canonicalUrl,

    isPartOf: {
      "@type": "WebSite",
      name: "Saba Family Foundation",
      url: SITE_URL,
    },

    about: {
      "@type": "Thing",
      name: title,
    },

    publisher: {
      "@type": "Organization",
      name: "Saba Family Foundation",
      url: SITE_URL,

      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Images/SabaFamilyLogo.png`,
      },
    },

    ...(area.image
      ? {
          image: {
            "@type": "ImageObject",
            url: area.image,
            caption: title,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <AreaDetail area={area} />
    </>
  );
}