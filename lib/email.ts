import { Resend } from "resend";

type EmailPayload = {
  subject: string;
  html: string;
  replyTo?: string;
};

type EmailResult =
  | { sent: true }
  | {
      sent: false;
      reason: "missing-config" | "send-failed";
      missing?: string[];
      error?: string;
    };

type EmailConfigResult = {
  apiKey?: string;
  fromEmail?: string;
  missing: string[];
};

const DEFAULT_FROM_EMAIL = "Ascent Business Solutions <hello@ascentbusinesssolutions.ca>";
const DEFAULT_NOTIFY_EMAIL = "geoffreywaterson@gmail.com";

function getEmailConfig(): EmailConfigResult {
  const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM || DEFAULT_FROM_EMAIL;

  const missing: string[] = [];
  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!fromEmail) missing.push("RESEND_FROM_EMAIL");

  if (missing.length > 0) {
    return { missing };
  }

  return { apiKey, fromEmail, missing: [] };
}

function extractAddress(fromEmail: string): string | null {
  const match = fromEmail.match(/<([^>]+)>/);
  if (match?.[1]) return match[1].trim();
  if (fromEmail.includes("@")) return fromEmail.trim();
  return null;
}

export async function sendEmail(to: string, payload: EmailPayload): Promise<EmailResult> {
  const config = getEmailConfig();

  if (config.missing.length > 0) {
    return { sent: false, reason: "missing-config", missing: config.missing };
  }
  if (!config.apiKey || !config.fromEmail) {
    return { sent: false, reason: "missing-config", missing: ["RESEND_API_KEY", "RESEND_FROM_EMAIL"] };
  }

  try {
    const resend = new Resend(config.apiKey);
    const response = await resend.emails.send({
      from: config.fromEmail,
      to: [to],
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });

    if (response.error) {
      return {
        sent: false,
        reason: "send-failed",
        error: response.error.message ?? "Unknown Resend API error",
      };
    }

    return { sent: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email send error";
    return { sent: false, reason: "send-failed", error: message };
  }
}

export async function sendNotificationEmail(payload: EmailPayload) {
  const configuredNotifyEmail = process.env.CONTACT_NOTIFY_EMAIL;
  const fromEmailFallback = process.env.RESEND_FROM_EMAIL ? extractAddress(process.env.RESEND_FROM_EMAIL) : null;
  const toEmail = configuredNotifyEmail || process.env.NOTIFY_EMAIL || fromEmailFallback || DEFAULT_NOTIFY_EMAIL;

  return sendEmail(toEmail, payload);
}

export async function sendCustomerConfirmationEmail(toEmail: string, payload: EmailPayload) {
  return sendEmail(toEmail, payload);
}
