import { NextResponse } from "next/server";
import { BRAND } from "@/lib/brand";
import {
  sendCustomerConfirmationEmail,
  sendNotificationEmail,
} from "@/lib/email";
import { bookingInterestSchema } from "@/lib/schemas";

export const runtime = "nodejs";

function html(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function POST(request: Request) {
  const parsed = bookingInterestSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success)
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message || "Invalid request" },
      { status: 400 },
    );
  const values = parsed.data;
  const callLabel =
    values.callType === "free_intro"
      ? "20-minute call"
      : "Existing client paid time";
  const fallback = {
    message:
      "We couldn’t deliver your request. Please email " +
      BRAND.email +
      " to arrange your call.",
  };
  try {
    const delivery = await sendNotificationEmail({
      subject: callLabel + " request from " + (values.company || values.name),
      replyTo: values.email,
      html: `<h2>${callLabel}</h2><p>${html(values.name)} · ${html(values.email)}</p><p>${html(values.company || "")} ${html(values.phone || "")}</p><p>${html(values.details)}</p>`,
    });
    if (!delivery.sent) return NextResponse.json(fallback, { status: 503 });
  } catch {
    return NextResponse.json(fallback, { status: 503 });
  }
  try {
    await sendCustomerConfirmationEmail(values.email, {
      subject: "Request received | " + BRAND.name,
      html: `<p>Hi ${html(values.name)},</p><p>We received your ${callLabel.toLowerCase()} request and will follow up by email.</p><p>Ascent Business Solutions</p>`,
    });
  } catch {
    console.warn("Unable to send booking confirmation");
  }
  return NextResponse.json({
    message: "Thanks. We’ve received your request and will follow up by email.",
  });
}
