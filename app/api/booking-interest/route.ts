import { NextResponse } from "next/server";

import { sendCustomerConfirmationEmail, sendNotificationEmail } from "@/lib/email";
import { bookingInterestSchema } from "@/lib/schemas";

export const runtime = "nodejs";

function buildDeliveryMessage(
  details: { reason: "missing-config" | "send-failed"; missing?: string[]; error?: string } | null,
) {
  if (!details) {
    return "Request received. Automated routing had an issue, so please also email geoffreywaterson@gmail.com to confirm your booking.";
  }

  if (details.reason === "missing-config") {
    const missingVars = details.missing?.length ? ` Missing: ${details.missing.join(", ")}.` : "";
    return `Request received. Live email routing is not configured in Vercel.${missingVars} Please also email geoffreywaterson@gmail.com to confirm your booking.`;
  }

  const errorText = details.error ? ` Resend error: ${details.error}.` : "";
  return `Request received. Resend could not send the booking email from Live.${errorText} Please also email geoffreywaterson@gmail.com to confirm your booking.`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingInterestSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid request";
      return NextResponse.json({ message: firstError });
    }

    const values = parsed.data;
    const callLabel = values.callType === "free_intro" ? "Free 2-hour intro" : "Existing client paid time";

    const notificationResult = await sendNotificationEmail({
      subject: `${callLabel} booking request from ${values.company}`,
      replyTo: values.email,
      html: `
      <h2>Booking request</h2>
      <p><strong>Type:</strong> ${callLabel}</p>
      <p><strong>Name:</strong> ${values.name}</p>
      <p><strong>Email:</strong> ${values.email}</p>
      <p><strong>Phone:</strong> ${values.phone}</p>
      <p><strong>Company:</strong> ${values.company}</p>
      <p><strong>Details:</strong></p>
      <p>${values.details}</p>
    `,
    });

    const customerResult = await sendCustomerConfirmationEmail(values.email, {
      subject: `Booking request received | ${callLabel}`,
      html: `
      <h2>Thanks for your booking request</h2>
      <p>Hi ${values.name},</p>
      <p>We received your ${callLabel.toLowerCase()} request and will follow up with next steps shortly.</p>
      <p><strong>Company:</strong> ${values.company}</p>
      <p><strong>Phone:</strong> ${values.phone}</p>
      <p><strong>Request details:</strong></p>
      <p>${values.details}</p>
      <br />
      <p>Best,</p>
      <p>Ascent Business Solutions</p>
    `,
    });

    if (!notificationResult.sent) {
      console.error("Booking email delivery failed", {
        notificationResult,
        customerResult,
      });
      return NextResponse.json({
        message: buildDeliveryMessage(notificationResult),
      });
    }

    if (!customerResult.sent) {
      console.warn("Booking confirmation email failed (non-blocking)", {
        customerResult,
        enquiryEmail: values.email,
      });
    }

    return NextResponse.json({ message: "Request received. We will follow up shortly." });
  } catch (error) {
    console.error("Unhandled booking submission error", error);
    return NextResponse.json({
      message: buildDeliveryMessage(null),
    });
  }
}
