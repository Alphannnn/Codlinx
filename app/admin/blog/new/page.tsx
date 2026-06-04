import BlogPostForm from "../BlogPostForm";

export const metadata = {
  title: "Admin · New post",
  robots: { index: false, follow: false },
};

export default function NewBlogPostPage() {
  return <BlogPostForm mode="new" />;
}
