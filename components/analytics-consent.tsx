"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const CONSENT_KEY = "ascent-analytics-consent";
const GA_ID = "G-L4RELDCS9R";

type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function enableAnalytics() {
  if (document.querySelector(`script[data-ascent-analytics="${GA_ID}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.dataset.ascentAnalytics = GA_ID;
  document.head.appendChild(script);
}

export function AnalyticsConsent() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY) as ConsentChoice | null;
    if (saved === "granted") enableAnalytics();
    const initialPrompt = !saved ? window.setTimeout(() => setIsOpen(true), 0) : null;

    const reopen = () => setIsOpen(true);
    window.addEventListener("ascent:analytics-choices", reopen);
    return () => {
      if (initialPrompt !== null) window.clearTimeout(initialPrompt);
      window.removeEventListener("ascent:analytics-choices", reopen);
    };
  }, []);

  const choose = useCallback((choice: ConsentChoice) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    if (choice === "granted") enableAnalytics();
    setIsOpen(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
      <h2 className="text-lg font-semibold text-slate-900">Optional analytics</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        We use optional Google Analytics to understand which public pages are useful. It stays off unless you allow it.
        We do not use analytics for advertising. Read our <Link href="/privacy" className="text-blue-600 underline underline-offset-2">privacy policy</Link>.
      </p>
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={() => choose("denied")}>Reject optional analytics</Button>
        <Button onClick={() => choose("granted")}>Allow analytics</Button>
      </div>
    </div>
  );
}

export function AnalyticsChoicesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("ascent:analytics-choices"))}
      className="transition-colors hover:text-slate-900"
    >
      Analytics choices
    </button>
  );
}
