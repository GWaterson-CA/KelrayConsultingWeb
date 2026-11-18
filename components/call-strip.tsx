import Link from "next/link";

export function CallStrip() {
  return (
    <aside className="call-strip wrap">
      <h2>What’s slowing your team down?</h2>
      <Link className="primary" href="/book">
        Request a 20-minute call →
      </Link>
    </aside>
  );
}
