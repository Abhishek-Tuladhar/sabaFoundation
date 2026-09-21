import { apiFetch } from "./client";

export async function getScholarshipData() {
  const data = await apiFetch("/scholarship");

  return {
    pastScholars: data?.past_scholars ?? [],
  };
}