import BlogsClient from "./BlogsClient";

export const metadata = {
  title: "Blogs",
  description:
    "Explore news, stories, updates, and insights from Saba Family Foundation and its initiatives.",
  alternates: {
    canonical: "/blogs",
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}