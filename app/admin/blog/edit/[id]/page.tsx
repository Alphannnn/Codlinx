import { notFound } from "next/navigation";
import BlogPostForm from "../../BlogPostForm";
import { listBlogPosts } from "../../../../lib/data";

export const metadata = {
  title: "Admin · Edit post",
  robots: { index: false, follow: false },
};

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const all = await listBlogPosts(true);
  const post = all.find((p) => p.id === id);
  if (!post) notFound();
  return <BlogPostForm mode="edit" initial={post} />;
}
