export type MeetingStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "completed"
  | "cancelled";

export type Meeting = {
  id: string;
  user_id: string;
  user_email: string;
  user_name: string | null;
  slot_start: string; // ISO
  slot_end: string;
  status: MeetingStatus;
  topic: string | null;
  brief: {
    services?: string[];
    budget?: string;
    timeline?: string;
    company?: string;
    role?: string;
    notes?: string;
  };
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type AvailabilityWindow = {
  id: string;
  day_of_week: number; // 0-6 (Sun-Sat)
  start_minute: number;
  end_minute: number;
  slot_length_min: number;
  is_active: boolean;
};

export type BlockedSlot = {
  id: string;
  starts_at: string;
  ends_at: string;
  reason: string | null;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  read_time: string;
  author: string;
  author_role: string | null;
  hue: string;
  cover_image: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CareerPostingRow = {
  id: string;
  slug: string;
  title: string;
  level: string;
  team: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
  perks: string[];
  is_open: boolean;
  posted_at: string;
  created_at: string;
  updated_at: string;
};

/**
 * Stored LinkedIn OAuth connection. A single row (admin-owned). Tokens are
 * refreshed in place; `org_urn` is the Company Page we post as.
 */
export type LinkedInConnection = {
  id: string;
  access_token: string;
  refresh_token: string | null;
  // ISO timestamps for when each token stops being valid.
  expires_at: string;
  refresh_expires_at: string | null;
  org_urn: string | null; // e.g. "urn:li:organization:1234567"
  org_name: string | null;
  member_name: string | null; // who connected, for display
  created_at: string;
  updated_at: string;
};

/**
 * A record of a piece of content having been shared to LinkedIn. Lets the admin
 * UI show "Shared ✓" with a link, and avoids silent double-posts.
 */
export type LinkedInShare = {
  id: string;
  entity_type: "blog" | "career";
  entity_id: string;
  post_urn: string; // "urn:li:share:..." — links to the live post
  permalink: string | null;
  shared_at: string;
};
