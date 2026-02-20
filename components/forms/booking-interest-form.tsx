"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookingInterestSchema, type BookingInterestValues } from "@/lib/schemas";

type BookingInterestFormProps = {
  callType: "free_intro" | "existing_client_paid";
  title: string;
  description: string;
};

export function BookingInterestForm({ callType, title, description }: BookingInterestFormProps) {
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInterestValues>({
    resolver: zodResolver(bookingInterestSchema),
    defaultValues: {
      callType,
    },
  });

  async function onSubmit(values: BookingInterestValues) {
    setStatus(null);

    const response = await fetch("/api/booking-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as { message: string };

    if (!response.ok) {
      setStatus({ ok: false, message: payload.message || "Unable to submit. Please try again." });
      return;
    }

    setStatus({ ok: true, message: payload.message || "Request received." });
    reset({ callType });
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <input type="hidden" value={callType} {...register("callType")} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`${callType}-name`}>Name</Label>
            <Input id={`${callType}-name`} {...register("name")} />
            {errors.name ? <p className="text-xs text-rose-300">{errors.name.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${callType}-email`}>Email</Label>
            <Input id={`${callType}-email`} type="email" {...register("email")} />
            {errors.email ? <p className="text-xs text-rose-300">{errors.email.message}</p> : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${callType}-phone`}>Phone</Label>
          <Input id={`${callType}-phone`} type="tel" {...register("phone")} />
          {errors.phone ? <p className="text-xs text-rose-300">{errors.phone.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${callType}-company`}>Company</Label>
          <Input id={`${callType}-company`} {...register("company")} />
          {errors.company ? <p className="text-xs text-rose-300">{errors.company.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${callType}-details`}>Details</Label>
          <Textarea
            id={`${callType}-details`}
            {...register("details")}
            placeholder="Share the outcomes you want, timeline, and preferred call slots."
          />
          {errors.details ? <p className="text-xs text-rose-300">{errors.details.message}</p> : null}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Submit request
        </Button>

        {status ? (
          <p className={status.ok ? "text-sm text-emerald-300" : "text-sm text-rose-300"}>{status.message}</p>
        ) : null}
      </form>
    </div>
  );
}
