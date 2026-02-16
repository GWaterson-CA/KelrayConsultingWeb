import { Resend } from "resend";

type EmailPayload = {
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendNotificationEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.CONTACT_NOTIFY_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return { sent: false as const, reason: "missing-config" as const };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });

    return { sent: true as const };
  } catch {
    return { sent: false as const, reason: "send-failed" as const };
  }
}
