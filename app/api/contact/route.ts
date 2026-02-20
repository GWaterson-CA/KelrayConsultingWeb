import { NextResponse } from "next/server";

import { sendCustomerConfirmationEmail, sendNotificationEmail } from "@/lib/email";
import { contactFormSchema } from "@/lib/schemas";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid request";
    return NextResponse.json({ message: firstError }, { status: 400 });
  }

  const values = parsed.data;

  const notificationResult = await sendNotificationEmail({
    subject: `New contact enquiry from ${values.company}`,
    replyTo: values.email,
    html: `
      <h2>New contact submission</h2>
      <p><strong>Name:</strong> ${values.name}</p>
      <p><strong>Email:</strong> ${values.email}</p>
      <p><strong>Phone:</strong> ${values.phone}</p>
      <p><strong>Company:</strong> ${values.company}</p>
      <p><strong>Role:</strong> ${values.role}</p>
      <p><strong>Budget:</strong> ${values.budgetRange || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${values.message}</p>
    `,
  });

  const customerResult = await sendCustomerConfirmationEmail(values.email, {
    subject: "We received your enquiry | Ascent Business Solutions",
    html: `
      <h2>Thanks for contacting Ascent Business Solutions</h2>
      <p>Hi ${values.name},</p>
      <p>We received your enquiry and will follow up shortly.</p>
      <p><strong>What you sent us:</strong></p>
      <p><strong>Company:</strong> ${values.company}</p>
      <p><strong>Role:</strong> ${values.role}</p>
      <p><strong>Phone:</strong> ${values.phone}</p>
      <p><strong>Budget:</strong> ${values.budgetRange || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${values.message}</p>
      <br />
      <p>Best,</p>
      <p>Ascent Business Solutions</p>
    `,
  });

  if (!notificationResult.sent) {
    console.error("Contact email delivery failed", {
      notificationResult,
      customerResult,
    });
    return NextResponse.json({
      message:
        "Thanks for reaching out. We received your submission, but automated routing had an issue. Please also email geoffreywaterson@gmail.com so nothing is missed.",
    });
  }

  if (!customerResult.sent) {
    console.warn("Contact confirmation email failed (non-blocking)", {
      customerResult,
      enquiryEmail: values.email,
    });
  }

  return NextResponse.json({ message: "Thanks for reaching out. We will reply shortly." });
}
