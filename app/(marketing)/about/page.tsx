import type { Metadata } from "next";
import { MeetGeoffrey } from "@/components/meet-geoffrey";

export const metadata: Metadata = {
  title: "Meet Geoffrey Waterson",
  description:
    "Meet Geoffrey Waterson and learn how Ascent helps small and mid-sized businesses make practical use of AI, custom tools, and websites.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <div className="ascent">
      <MeetGeoffrey standalone />
    </div>
  );
}
