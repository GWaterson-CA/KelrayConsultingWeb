import { Resend } from "resend";

type EmailPayload = {
  subject: string;
  html: string;
  replyTo?: string;
};

type EmailResult =
  | { sent: true }
  | { sent: false; reason: "missing-config" | "send-failed" };

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return null;
  }

  return { apiKey, fromEmail };
}

export async function sendEmail(to: string, payload: EmailPayload): Promise<EmailResult> {
  const config = getEmailConfig();

  if (!config) {
    return { sent: false, reason: "missing-config" };
  }

  try {
    const resend = new Resend(config.apiKey);
    await resend.emails.send({
      from: config.fromEmail,
      to: [to],
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });

    return { sent: true };
  } catch {
    return { sent: false, reason: "send-failed" };
  }
}

export async function sendNotificationEmail(payload: EmailPayload) {
  const toEmail = process.env.CONTACT_NOTIFY_EMAIL;

  if (!toEmail) {
    return { sent: false as const, reason: "missing-config" as const };
  }

  return sendEmail(toEmail, payload);
}

export async function sendCustomerConfirmationEmail(toEmail: string, payload: EmailPayload) {
  return sendEmail(toEmail, payload);
}
