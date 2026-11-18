"use client";

import { useState, type FormEvent } from "react";

export function BookingInterestForm() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setSending(true);
    setMessage("");
    try {
      const response = await fetch("/api/booking-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(fields),
          callType: "free_intro",
        }),
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) form.reset();
    } catch {
      setMessage(
        "We couldn’t send your request. Please try again or email hello@ascentbusinesssolutions.ca.",
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <form onSubmit={submit} className="request-form">
      <label>
        Name
        <input name="name" required minLength={2} autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" required type="email" autoComplete="email" />
      </label>
      <label>
        What’s slowing your team down?
        <textarea name="details" rows={4} required minLength={10} />
      </label>
      <button className="primary" disabled={sending}>
        {sending ? "Sending…" : "Request a call"}
      </button>
      <p role="status">{message}</p>
    </form>
  );
}
