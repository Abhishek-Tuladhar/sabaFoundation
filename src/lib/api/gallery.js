import { apiFetch } from "./client";

function getYouTubeId(link) {
  if (!link) return null;

  try {
    const url = new URL(link);

    if (url.hostname.includes("youtube.com")) {
      return url.pathname.split("/").pop();
    }

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "");
    }
  } catch {
    return null;
  }

  return null;
}

export async function getGalleryImages() {
  const data = await apiFetch("/gallery");

  return (data?.gallery ?? []).map((src, index) => ({
    id: index + 1,
    src,
    alt: `Saba Family Foundation gallery image ${String(index + 1).padStart(
      2,
      "0"
    )}`,
  }));
}

export async function getGalleryVideos() {
  const data = await apiFetch("/video");

  return (data?.videos ?? []).map((video, index) => ({
    id: index + 1,
    title: video.title,
    link: video.link,
    youtubeId: getYouTubeId(video.link),
  }));
}