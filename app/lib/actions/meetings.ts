"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";
import {
  createMeeting,
  deleteMeeting,
  updateMeetingStatus,
} from "../data";
import type { Meeting, MeetingStatus } from "../types";

export type BookActionResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function bookMeeting(formData: FormData): Promise<BookActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Please sign in to book a meeting." };

  const slotStart = String(formData.get("slot_start") ?? "");
  const slotEnd = String(formData.get("slot_end") ?? "");
  const topic = (String(formData.get("topic") ?? "").trim() || null) as
    | string
    | null;

  if (!slotStart || !slotEnd) {
    return { ok: false, error: "Pick a slot before confirming." };
  }

  const brief: Meeting["brief"] = {
    services: parseServices(formData),
    budget: String(formData.get("budget") ?? "") || undefined,
    timeline: String(formData.get("timeline") ?? "") || undefined,
    company: String(formData.get("company") ?? "") || undefined,
    role: String(formData.get("role") ?? "") || undefined,
    notes: String(formData.get("notes") ?? "") || undefined,
  };

  const meeting = await createMeeting({
    user: { id: user.id, email: user.email, fullName: user.fullName },
    slot_start: slotStart,
    slot_end: slotEnd,
    topic,
    brief,
  });

  if (!meeting) return { ok: false, error: "Could not save the meeting." };

  revalidatePath("/account");
  revalidatePath("/admin/meetings");
  return { ok: true, id: meeting.id };
}

function parseServices(formData: FormData): string[] {
  const raw = formData.getAll("services");
  return raw.map((v) => String(v));
}

export type UpdateStatusResult =
  | { ok: true }
  | { ok: false; error: string };

export async function setMeetingStatus(
  id: string,
  status: MeetingStatus,
  adminNotes?: string
): Promise<UpdateStatusResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Not signed in." };

  // Users can only cancel their own meeting.
  if (!user.isAdmin && status !== "cancelled") {
    return { ok: false, error: "Only admins can change status." };
  }

  const updated = await updateMeetingStatus(
    id,
    status,
    adminNotes === undefined ? undefined : adminNotes || null
  );
  if (!updated) return { ok: false, error: "Could not update meeting." };

  revalidatePath("/account");
  revalidatePath("/admin/meetings");
  return { ok: true };
}

export async function removeMeeting(id: string): Promise<UpdateStatusResult> {
  const user = await getCurrentUser();
  if (!user?.isAdmin) return { ok: false, error: "Admins only." };
  const ok = await deleteMeeting(id);
  if (!ok) return { ok: false, error: "Could not delete." };
  revalidatePath("/admin/meetings");
  return { ok: true };
}
