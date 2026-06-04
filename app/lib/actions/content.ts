"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";
import {
  deleteBlogPost as repoDeleteBlog,
  deleteCareerPosting as repoDeleteCareer,
  upsertBlogPost,
  upsertCareerPosting,
} from "../data";
import type { BlogPostRow, CareerPostingRow } from "../types";

export type Result =
  | { ok: true; slug?: string }
  | { ok: false; error: string };

function id(_prefix: string) {
  // The Supabase tables use uuid PKs; we generate UUIDs here so a new row
  // upserts cleanly whether Supabase is configured or running in demo mode.
  return crypto.randomUUID();
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/* --------------------------- Blog --------------------------- */

export async function saveBlogPost(formData: FormData): Promise<Result> {
  const user = await getCurrentUser();
  if (!user?.isAdmin) return { ok: false, error: "Admins only." };

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { ok: false, error: "Title is required." };

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput ? slugify(slugInput) : slugify(title);

  const post: BlogPostRow = {
    id: String(formData.get("id") ?? "") || id("p"),
    slug,
    title,
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    category: String(formData.get("category") ?? "Engineering").trim(),
    read_time: String(formData.get("read_time") ?? "5 min read").trim(),
    author: String(formData.get("author") ?? user.fullName ?? user.email).trim(),
    author_role: String(formData.get("author_role") ?? "").trim() || null,
    hue: String(formData.get("hue") ?? "rgba(63,201,180,0.22)"),
    cover_image: String(formData.get("cover_image") ?? "").trim() || null,
    is_published: formData.get("is_published") === "on",
    published_at: formData.get("is_published") === "on" ? new Date().toISOString() : null,
    created_at: String(formData.get("created_at") ?? new Date().toISOString()),
    updated_at: new Date().toISOString(),
  };

  const saved = await upsertBlogPost(post);
  if (!saved) return { ok: false, error: "Save failed." };
  revalidatePath("/blog");
  revalidatePath(`/blog/${saved.slug}`);
  revalidatePath("/admin/blog");
  return { ok: true, slug: saved.slug };
}

export async function deleteBlog(id: string): Promise<Result> {
  const user = await getCurrentUser();
  if (!user?.isAdmin) return { ok: false, error: "Admins only." };
  await repoDeleteBlog(id);
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { ok: true };
}

/* --------------------------- Careers --------------------------- */

export async function saveCareerPosting(formData: FormData): Promise<Result> {
  const user = await getCurrentUser();
  if (!user?.isAdmin) return { ok: false, error: "Admins only." };

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { ok: false, error: "Title is required." };

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput ? slugify(slugInput) : slugify(title);

  const requirements = String(formData.get("requirements") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const perks = String(formData.get("perks") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const c: CareerPostingRow = {
    id: String(formData.get("id") ?? "") || id("c"),
    slug,
    title,
    level: String(formData.get("level") ?? "Senior").trim(),
    team: String(formData.get("team") ?? "Engineering").trim(),
    location: String(formData.get("location") ?? "Remote · Global").trim(),
    employment_type: String(formData.get("employment_type") ?? "Full-time").trim(),
    description: String(formData.get("description") ?? "").trim(),
    requirements,
    perks,
    is_open: formData.get("is_open") === "on",
    posted_at: String(formData.get("posted_at") ?? new Date().toISOString()),
    created_at: String(formData.get("created_at") ?? new Date().toISOString()),
    updated_at: new Date().toISOString(),
  };

  const saved = await upsertCareerPosting(c);
  if (!saved) return { ok: false, error: "Save failed." };
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
  return { ok: true, slug: saved.slug };
}

export async function deleteCareer(id: string): Promise<Result> {
  const user = await getCurrentUser();
  if (!user?.isAdmin) return { ok: false, error: "Admins only." };
  await repoDeleteCareer(id);
  revalidatePath("/careers");
  revalidatePath("/admin/careers");
  return { ok: true };
}
