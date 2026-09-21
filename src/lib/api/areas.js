import { apiFetch } from "./client";

export async function getAreas() {
  const data = await apiFetch("/areas");

  return data?.areas ?? [];
}

export async function getAreaBySlug(slug) {
  const data = await apiFetch(`/area/${slug}`);

  return data?.area ?? null;
}