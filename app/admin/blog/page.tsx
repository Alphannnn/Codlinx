import { listBlogPosts } from "../../lib/data";
import BlogListClient from "./BlogListClient";

export const metadata = {
  title: "Admin · Blog",
  robots: { index: false, follow: false },
};

export default async function AdminBlogPage() {
  const posts = await listBlogPosts(true);
  return <BlogListClient initial={posts} />;
}
