"use server";

import { Resend } from "resend";

/**
 * Contact form delivery. Sends the submitted project brief to the studio inbox
 * via Resend. Configuration is env-driven (mirrors the Supabase pattern):
 *
 *   RESEND_API_KEY   — required; from https://resend.com/api-keys
 *   CONTACT_TO       — recipient inbox (default: info@codlinx.com)
 *   CONTACT_FROM     — verified sender, e.g. "Codlinx <noreply@codlinx.com>"
 *                      (the domain must be verified in Resend → Domains)
 *
 * Without RESEND_API_KEY the action returns a friendly error so the UI can tell
 * the operator email isn't wired up yet, rather than silently dropping leads.
 */

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  role?: string;
  brief: string;
  services: string[];
  budget?: string;
  timeline?: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

const TO = process.env.CONTACT_TO ?? "info@codlinx.com";
const FROM = process.env.CONTACT_FROM ?? "Codlinx Website <noreply@codlinx.com>";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactBrief(
  payload: ContactPayload
): Promise<ContactResult> {
  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const brief = (payload.brief ?? "").trim();

  // Server-side validation — never trust the client.
  if (!name) return { ok: false, error: "Please add your name." };
  if (!isEmail(email)) return { ok: false, error: "Please add a valid email." };
  if (brief.length < 10)
    return { ok: false, error: "Please tell us a little more about the project." };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fail loudly in logs so the lead isn't lost, and tell the user plainly.
    console.error("[contact] RESEND_API_KEY is not set — cannot send brief from", email);
    return {
      ok: false,
      error: "Email isn't configured yet. Please write to info@codlinx.com directly.",
    };
  }

  const company = (payload.company ?? "").trim();
  const role = (payload.role ?? "").trim();
  const services = (payload.services ?? []).filter(Boolean);
  const budget = (payload.budget ?? "").trim();
  const timeline = (payload.timeline ?? "").trim();

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Role", role || "—"],
    ["Services", services.length ? services.join(", ") : "—"],
    ["Budget", budget || "—"],
    ["Timeline", timeline || "—"],
  ];

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;color:#18181b">
      <h2 style="font-size:18px;margin:0 0 4px">New project brief</h2>
      <p style="color:#71717a;margin:0 0 20px;font-size:13px">Submitted from the codlinx.com contact form</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                <td style="padding:8px 12px;background:#f4f4f5;font-weight:600;width:120px;border:1px solid #e4e4e7;vertical-align:top">${esc(
                  k
                )}</td>
                <td style="padding:8px 12px;border:1px solid #e4e4e7">${esc(v)}</td>
              </tr>`
          )
          .join("")}
      </table>
      <h3 style="font-size:14px;margin:22px 0 8px">The brief</h3>
      <div style="white-space:pre-wrap;line-height:1.6;font-size:14px;border-left:3px solid #3FC9B4;padding:4px 0 4px 14px">${esc(
        brief
      )}</div>
    </div>`;

  const text =
    `New project brief (codlinx.com)\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nThe brief:\n${brief}\n`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email, // replying goes straight to the lead
      subject: `New project brief — ${name}${company ? ` (${company})` : ""}`,
      html,
      text,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return { ok: false, error: "Couldn't send right now. Please try again or email info@codlinx.com." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] send threw:", err);
    return { ok: false, error: "Couldn't send right now. Please try again or email info@codlinx.com." };
  }
}
