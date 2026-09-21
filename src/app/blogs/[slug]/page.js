import { notFound } from "next/navigation";

import BlogArticle from "@/components/Blogs/BlogArticle";
import { getBlogs } from "@/lib/api/blogs";

const SITE_URL = "https://sabafamilyfoundation.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blogs = await getBlogs();
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;

  return {
    title: blog.title,
    description: blog.excerpt,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.excerpt,
      url: canonicalUrl,
      siteName: "Saba Family Foundation",
      locale: "en_US",

      images: blog.image
        ? [
            {
              url: blog.image,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.image ? [blog.image] : undefined,
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;

  const blogs = await getBlogs();
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;

  /*
   * JSON-LD structured data.
   *
   * We intentionally don't add datePublished/dateModified because
   * the current API does not provide those fields.
   */
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: blog.title,

    description: blog.excerpt,

    url: canonicalUrl,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },

    image: blog.image ? [blog.image] : undefined,

    publisher: {
      "@type": "Organization",
      name: "Saba Family Foundation",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Images/SabaFamilyLogo.png`,
      },
    },

    isPartOf: {
      "@type": "Blog",
      name: "Saba Family Foundation Journal",
      url: `${SITE_URL}/blogs`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <BlogArticle blog={blog} />
    </>
  );
}
