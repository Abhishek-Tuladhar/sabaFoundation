import { apiFetch } from "./client";

function mapTestimonial(item) {
  return {
    id: item.id,
    name: item.name,
    quote: item.description,
    image: item.image,
  };
}

export async function getTestimonials() {
  const data = await apiFetch("/testinomial");

  console.log("Testimonials API response:", data);

  return (data?.testinomials ?? []).map(mapTestimonial);
}
