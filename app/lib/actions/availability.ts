"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";
import {
  deleteAvailability as repoDelete,
  upsertAvailability as repoUpsert,
} from "../data";
import type { AvailabilityWindow } from "../types";

export type Result = { ok: true } | { ok: false; error: string };

function uuid() {
  return (
    "a_" +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10)
  );
}

export async function saveAvailability(formData: FormData): Promise<Result> {
  const user = await getCurrentUser();
  if (!user?.isAdmin) return { ok: false, error: "Admins only." };

  const id = String(formData.get("id") ?? "") || uuid();
  const day_of_week = Number(formData.get("day_of_week"));
  const start_minute = Number(formData.get("start_minute"));
  const end_minute = Number(formData.get("end_minute"));
  const slot_length_min = Number(formData.get("slot_length_min") ?? 30);

  if (Number.isNaN(day_of_week) || day_of_week < 0 || day_of_week > 6) {
    return { ok: false, error: "Day must be 0–6 (Sun=0)." };
  }
  if (start_minute >= end_minute) {
    return { ok: false, error: "End time must be after start time." };
  }

  const row: AvailabilityWindow = {
    id,
    day_of_week,
    start_minute,
    end_minute,
    slot_length_min,
    is_active: true,
  };

  await repoUpsert(row);
  revalidatePath("/admin/availability");
  revalidatePath("/account/book");
  return { ok: true };
}

export async function deleteAvailabilityRow(id: string): Promise<Result> {
  const user = await getCurrentUser();
  if (!user?.isAdmin) return { ok: false, error: "Admins only." };
  await repoDelete(id);
  revalidatePath("/admin/availability");
  revalidatePath("/account/book");
  return { ok: true };
}
