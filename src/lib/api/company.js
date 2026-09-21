import { apiFetch } from "./client";

export async function getCompanyPartners() {
  const data = await apiFetch("/company");

  return (data?.companys ?? []).map((company) => ({
    id: company.id,
    name: company.name,
    url: company.url,
    tagline: company.tagline,
    image: company.image,
  }));
}