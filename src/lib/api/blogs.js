import { apiFetch } from "./client";

function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(description = "") {
  const match = description.match(/<p>(.*?)<\/p>/i);

  if (!match) {
    return stripHtml(description).slice(0, 180);
  }

  return stripHtml(match[1]).slice(0, 220);
}

function mapBlog(blog) {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    image: blog.image,
    description: blog.description,
    excerpt: getExcerpt(blog.description),
  };
}

export async function getBlogs() {
  const data = await apiFetch("/blogs");

  return (data?.blogs ?? []).map(mapBlog);
}

export async function getBlog(slug) {
  const data = await apiFetch(`/blog/${slug}`);

  return data?.blog ?? null;
}
