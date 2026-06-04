/**
 * Unified data access. Reads/writes to Supabase when configured, falls back
 * to the in-memory demo store otherwise. Server-side only.
 */

import { SUPABASE_CONFIGURED } from "./supabase/config";
import { getServerClient } from "./supabase/server";
import { getDemoStore } from "./demo-store";
import type {
  AvailabilityWindow,
  BlockedSlot,
  BlogPostRow,
  CareerPostingRow,
  Meeting,
  MeetingStatus,
} from "./types";

/* --------------------------- Meetings --------------------------- */

export async function listMeetingsForUser(userId: string): Promise<Meeting[]> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("meetings")
      .select("*, profiles!inner(email, full_name)")
      .eq("user_id", userId)
      .order("slot_start", { ascending: false });
    if (error || !data) return [];
    return data.map(mapMeeting);
  }
  return getDemoStore().meetings.filter(
    (m) => m.user_id === userId || userId === "u_demo"
  );
}

export async function listAllMeetings(): Promise<Meeting[]> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("meetings")
      .select("*, profiles!inner(email, full_name)")
      .order("slot_start", { ascending: false });
    if (error || !data) return [];
    return data.map(mapMeeting);
  }
  return [...getDemoStore().meetings].sort((a, b) =>
    a.slot_start < b.slot_start ? 1 : -1
  );
}

export async function getMeeting(id: string): Promise<Meeting | null> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("meetings")
      .select("*, profiles!inner(email, full_name)")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return null;
    return mapMeeting(data);
  }
  return getDemoStore().meetings.find((m) => m.id === id) ?? null;
}

export async function createMeeting(input: {
  user: { id: string; email: string; fullName: string | null };
  slot_start: string;
  slot_end: string;
  topic?: string | null;
  brief?: Meeting["brief"];
}): Promise<Meeting | null> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("meetings")
      .insert({
        user_id: input.user.id,
        slot_start: input.slot_start,
        slot_end: input.slot_end,
        topic: input.topic ?? null,
        brief: input.brief ?? {},
      })
      .select("*, profiles!inner(email, full_name)")
      .single();
    if (error || !data) return null;
    return mapMeeting(data);
  }
  const store = getDemoStore();
  const meeting: Meeting = {
    id: `m_${Math.random().toString(36).slice(2, 10)}`,
    user_id: input.user.id,
    user_email: input.user.email,
    user_name: input.user.fullName,
    slot_start: input.slot_start,
    slot_end: input.slot_end,
    status: "pending",
    topic: input.topic ?? null,
    brief: input.brief ?? {},
    admin_notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.meetings.unshift(meeting);
  return meeting;
}

export async function updateMeetingStatus(
  id: string,
  status: MeetingStatus,
  admin_notes?: string | null
): Promise<Meeting | null> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return null;
    const patch: Record<string, unknown> = { status };
    if (admin_notes !== undefined) patch.admin_notes = admin_notes;
    const { data, error } = await supabase
      .from("meetings")
      .update(patch)
      .eq("id", id)
      .select("*, profiles!inner(email, full_name)")
      .single();
    if (error || !data) return null;
    return mapMeeting(data);
  }
  const store = getDemoStore();
  const m = store.meetings.find((x) => x.id === id);
  if (!m) return null;
  m.status = status;
  if (admin_notes !== undefined) m.admin_notes = admin_notes;
  m.updated_at = new Date().toISOString();
  return m;
}

export async function deleteMeeting(id: string): Promise<boolean> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return false;
    const { error } = await supabase.from("meetings").delete().eq("id", id);
    return !error;
  }
  const store = getDemoStore();
  const before = store.meetings.length;
  store.meetings = store.meetings.filter((x) => x.id !== id);
  return store.meetings.length < before;
}

type MeetingRow = {
  id: string;
  user_id: string;
  slot_start: string;
  slot_end: string;
  status: MeetingStatus;
  topic: string | null;
  brief: Meeting["brief"] | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  profiles?: { email: string; full_name: string | null } | null;
};

function mapMeeting(row: MeetingRow): Meeting {
  return {
    id: row.id,
    user_id: row.user_id,
    user_email: row.profiles?.email ?? "",
    user_name: row.profiles?.full_name ?? null,
    slot_start: row.slot_start,
    slot_end: row.slot_end,
    status: row.status,
    topic: row.topic,
    brief: row.brief ?? {},
    admin_notes: row.admin_notes,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/* --------------------------- Availability --------------------------- */

export async function listAvailability(): Promise<AvailabilityWindow[]> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return [];
    const { data } = await supabase
      .from("availability")
      .select("*")
      .eq("is_active", true);
    return data ?? [];
  }
  return getDemoStore().availability.filter((a) => a.is_active);
}

export async function listBlockedSlots(): Promise<BlockedSlot[]> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return [];
    const { data } = await supabase
      .from("blocked_slots")
      .select("*");
    return data ?? [];
  }
  return getDemoStore().blockedSlots;
}

export async function upsertAvailability(input: AvailabilityWindow): Promise<void> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return;
    await supabase.from("availability").upsert(input);
    return;
  }
  const store = getDemoStore();
  const idx = store.availability.findIndex((a) => a.id === input.id);
  if (idx >= 0) store.availability[idx] = input;
  else store.availability.push(input);
}

export async function deleteAvailability(id: string): Promise<void> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return;
    await supabase.from("availability").delete().eq("id", id);
    return;
  }
  const store = getDemoStore();
  store.availability = store.availability.filter((a) => a.id !== id);
}

/* --------------------------- Blog --------------------------- */

export async function listBlogPosts(includeUnpublished = false): Promise<BlogPostRow[]> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return [];
    const q = supabase.from("blog_posts").select("*").order("published_at", {
      ascending: false,
    });
    const { data } = includeUnpublished ? await q : await q.eq("is_published", true);
    return data ?? [];
  }
  const all = getDemoStore().blog;
  return includeUnpublished ? all : all.filter((p) => p.is_published);
}

export async function getBlogPost(slug: string): Promise<BlogPostRow | null> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return null;
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    return data ?? null;
  }
  return getDemoStore().blog.find((p) => p.slug === slug) ?? null;
}

export async function upsertBlogPost(post: BlogPostRow): Promise<BlogPostRow | null> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return null;
    const { data } = await supabase.from("blog_posts").upsert(post).select().single();
    return data ?? null;
  }
  const store = getDemoStore();
  const idx = store.blog.findIndex((p) => p.id === post.id);
  if (idx >= 0) store.blog[idx] = post;
  else store.blog.unshift(post);
  return post;
}

export async function deleteBlogPost(id: string): Promise<void> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    return;
  }
  const store = getDemoStore();
  store.blog = store.blog.filter((p) => p.id !== id);
}

/* --------------------------- Dashboard stats --------------------------- */

export type DashboardSnapshot = {
  meetingsByStatus: Record<MeetingStatus, number>;
  bookingsLast7Days: { label: string; iso: string; value: number }[];
  totalProfiles: number;
  publishedPosts: number;
  draftPosts: number;
  openCareers: number;
  totalCareers: number;
  activity: {
    id: string;
    kind: "meeting" | "blog" | "signup" | "career";
    title: string;
    subtitle: string;
    at: string;
    hue: string;
  }[];
};

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [meetings, blog, careers, profilesCount] = await Promise.all([
    listAllMeetings(),
    listBlogPosts(true),
    listCareerPostings(true),
    countProfiles(),
  ]);

  const meetingsByStatus: Record<MeetingStatus, number> = {
    pending: 0,
    confirmed: 0,
    declined: 0,
    completed: 0,
    cancelled: 0,
  };
  for (const m of meetings) meetingsByStatus[m.status] = (meetingsByStatus[m.status] ?? 0) + 1;

  // 7-day rolling window of bookings, anchored to local-ish UTC midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookingsLast7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const start = d.toISOString();
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    const end = next.toISOString();
    const count = meetings.filter((m) => {
      const created = m.created_at ?? m.slot_start;
      return created >= start && created < end;
    }).length;
    return {
      label: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(d),
      iso: start,
      value: count,
    };
  });

  const publishedPosts = blog.filter((p) => p.is_published).length;
  const draftPosts = blog.length - publishedPosts;
  const openCareers = careers.filter((c) => c.is_open).length;

  // Activity feed — mix the 3 streams, sort by timestamp desc
  type A = DashboardSnapshot["activity"][number];
  const items: A[] = [
    ...meetings.slice(0, 8).map<A>((m) => ({
      id: `m-${m.id}`,
      kind: "meeting",
      title: m.topic ?? "Discovery call booked",
      subtitle: `${m.user_email} · ${m.status}`,
      at: m.created_at,
      hue: "#FBBF24",
    })),
    ...blog.slice(0, 4).map<A>((p) => ({
      id: `b-${p.id}`,
      kind: "blog",
      title: p.title,
      subtitle: `${p.is_published ? "Published" : "Draft"} · ${p.category}`,
      at: p.updated_at ?? p.created_at,
      hue: "#F472B6",
    })),
    ...careers.slice(0, 3).map<A>((c) => ({
      id: `c-${c.id}`,
      kind: "career",
      title: c.title,
      subtitle: `${c.is_open ? "Open" : "Closed"} · ${c.team} · ${c.location}`,
      at: c.updated_at ?? c.created_at,
      hue: "#34D399",
    })),
  ];
  items.sort((a, b) => (a.at > b.at ? -1 : 1));

  return {
    meetingsByStatus,
    bookingsLast7Days,
    totalProfiles: profilesCount,
    publishedPosts,
    draftPosts,
    openCareers,
    totalCareers: careers.length,
    activity: items.slice(0, 8),
  };
}

async function countProfiles(): Promise<number> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return 0;
    const { count } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });
    return count ?? 0;
  }
  // Demo mode: just count distinct user_ids on meetings
  const ids = new Set(getDemoStore().meetings.map((m) => m.user_id));
  return ids.size;
}

/* --------------------------- Careers --------------------------- */

export async function listCareerPostings(includeClosed = false): Promise<CareerPostingRow[]> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return [];
    const q = supabase.from("career_postings").select("*").order("posted_at", {
      ascending: false,
    });
    const { data } = includeClosed ? await q : await q.eq("is_open", true);
    return data ?? [];
  }
  const all = getDemoStore().careers;
  return includeClosed ? all : all.filter((c) => c.is_open);
}

export async function getCareerPosting(slug: string): Promise<CareerPostingRow | null> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return null;
    const { data } = await supabase
      .from("career_postings")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    return data ?? null;
  }
  return getDemoStore().careers.find((c) => c.slug === slug) ?? null;
}

export async function upsertCareerPosting(c: CareerPostingRow): Promise<CareerPostingRow | null> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return null;
    const { data } = await supabase.from("career_postings").upsert(c).select().single();
    return data ?? null;
  }
  const store = getDemoStore();
  const idx = store.careers.findIndex((x) => x.id === c.id);
  if (idx >= 0) store.careers[idx] = c;
  else store.careers.unshift(c);
  return c;
}

export async function deleteCareerPosting(id: string): Promise<void> {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (!supabase) return;
    await supabase.from("career_postings").delete().eq("id", id);
    return;
  }
  const store = getDemoStore();
  store.careers = store.careers.filter((x) => x.id !== id);
}
