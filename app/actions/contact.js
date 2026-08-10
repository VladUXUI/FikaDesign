"use server";

import nodemailer from "nodemailer";

// Server Action for the contact form. Sends the enquiry to the studio inbox
// via Gmail SMTP. Requires two env vars (set them locally in .env.local and in
// Vercel → Project → Settings → Environment Variables):
//   GMAIL_USER          — the Gmail address that sends the mail
//   GMAIL_APP_PASSWORD  — a Google App Password (needs 2-Step Verification on)
// Where enquiries are delivered. Kept distinct from GMAIL_USER (the sender) so
// the message doesn't loop back to the sending mailbox and get de-duplicated.
const TO = "vlad@skouta.app";

const isEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export async function sendContact(_prevState, formData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Please add your name, email, and a short message." };
  }
  if (!isEmail(email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD not set — contact message not delivered.");
    return {
      ok: false,
      error: "The form isn't connected yet. Please email team@fikadesign.studio directly.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `Fika Website <${user}>`,
      to: TO,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` · ${company}` : ""}`,
      text:
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Company: ${company || "—"}\n\n` +
        `${message}\n`,
    });
    return { ok: true };
  } catch (err) {
    console.error("Contact send failed:", err);
    return { ok: false, error: "Something went wrong sending your message. Please email us directly." };
  }
}
