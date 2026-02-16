import { NextResponse } from "next/server";

import { sendNotificationEmail } from "@/lib/email";
import { contactFormSchema } from "@/lib/schemas";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid request";
    return NextResponse.json({ message: firstError }, { status: 400 });
  }

  if (!hasSupabaseEnv) {
    return NextResponse.json(
      { message: "Form storage is not configured yet. Please set Supabase env variables." },
      { status: 500 },
    );
  }

  const supabase = createSupabasePublicClient();
  const values = parsed.data;

  const { error } = await supabase.from("contact_submissions").insert({
    name: values.name,
    email: values.email,
    company: values.company,
    role: values.role,
    message: values.message,
    budget_range: values.budgetRange || null,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  await sendNotificationEmail({
    subject: `New contact enquiry from ${values.company}`,
    replyTo: values.email,
    html: `
      <h2>New contact submission</h2>
      <p><strong>Name:</strong> ${values.name}</p>
      <p><strong>Email:</strong> ${values.email}</p>
      <p><strong>Company:</strong> ${values.company}</p>
      <p><strong>Role:</strong> ${values.role}</p>
      <p><strong>Budget:</strong> ${values.budgetRange || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${values.message}</p>
    `,
  });

  return NextResponse.json({ message: "Thanks for reaching out. We will reply shortly." });
}
