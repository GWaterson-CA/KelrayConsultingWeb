import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <div className="ascent">
      <header className="site-header wrap">
        <Link
          className="brand"
          href="/"
          aria-label="Ascent Business Solutions home"
        >
          <Image src="/brand/logo.svg" width={38} height={38} alt="" />
          <span className="wordmark">
            Ascent<small>Business Solutions</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href === "/contact" ? "/book" : link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
}
