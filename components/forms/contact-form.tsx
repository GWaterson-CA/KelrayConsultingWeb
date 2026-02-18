"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";

const budgetRanges = ["Under $5,000", "$5,000 - $15,000", "$15,000 - $40,000", "$40,000+"];

export function ContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus(null);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as { message: string };

    if (!response.ok) {
      setStatus({ ok: false, message: payload.message || "Something went wrong. Please try again." });
      return;
    }

    setStatus({ ok: true, message: payload.message || "Thanks. We will get back to you shortly." });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} placeholder="Jane Smith" />
          {errors.name ? <p className="text-xs text-rose-300">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} placeholder="jane@company.com" />
          {errors.email ? <p className="text-xs text-rose-300">{errors.email.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...register("company")} placeholder="Northline Group" />
          {errors.company ? <p className="text-xs text-rose-300">{errors.company.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" {...register("role")} placeholder="COO" />
          {errors.role ? <p className="text-xs text-rose-300">{errors.role.message}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budgetRange">Budget range (optional)</Label>
        <select
          id="budgetRange"
          {...register("budgetRange")}
          className="h-11 w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <option value="" className="bg-slate-900">
            Select a range
          </option>
          {budgetRanges.map((range) => (
            <option key={range} value={range} className="bg-slate-900">
              {range}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Project context</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Tell us about your team, current workflow bottlenecks, and what outcomes you want from AI."
        />
        {errors.message ? <p className="text-xs text-rose-300">{errors.message.message}</p> : null}
      </div>

      <Button type="submit" disabled={isSubmitting} className="min-w-44">
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send enquiry
      </Button>

      {status ? (
        <p className={status.ok ? "text-sm text-emerald-300" : "text-sm text-rose-300"}>{status.message}</p>
      ) : null}
    </form>
  );
}
