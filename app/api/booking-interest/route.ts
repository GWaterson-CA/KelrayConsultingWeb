import { NextResponse } from "next/server";

import { sendNotificationEmail } from "@/lib/email";
import { bookingInterestSchema } from "@/lib/schemas";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bookingInterestSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid request";
    return NextResponse.json({ message: firstError }, { status: 400 });
  }

  if (!hasSupabaseEnv) {
    return NextResponse.json(
      { message: "Booking fallback storage is not configured. Please add Supabase env variables." },
      { status: 500 },
    );
  }

  const values = parsed.data;
  const supabase = createSupabasePublicClient();

  const callLabel = values.callType === "free_intro" ? "Free 2-hour intro" : "Existing client paid time";

  const { error } = await supabase.from("contact_submissions").insert({
    name: values.name,
    email: values.email,
    company: values.company,
    role: `Booking request: ${callLabel}`,
    message: values.details,
    budget_range: null,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  await sendNotificationEmail({
    subject: `${callLabel} booking request from ${values.company}`,
    replyTo: values.email,
    html: `
      <h2>Booking request</h2>
      <p><strong>Type:</strong> ${callLabel}</p>
      <p><strong>Name:</strong> ${values.name}</p>
      <p><strong>Email:</strong> ${values.email}</p>
      <p><strong>Company:</strong> ${values.company}</p>
      <p><strong>Details:</strong></p>
      <p>${values.details}</p>
    `,
  });

  return NextResponse.json({ message: "Request received. We will follow up shortly." });
}
