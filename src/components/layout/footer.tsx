import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-deep-cognition py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="font-serif text-xl text-pure-light">
              MetaBrain Labs
            </span>
            <p className="mt-3 text-sm text-soft-grey leading-relaxed">
              Engineering the Future of Human Intelligence
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-medium text-pure-light mb-3">Navigation</p>
            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-soft-grey transition-colors hover:text-pure-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-medium text-pure-light mb-3">Contact</p>
            <a
              href={`mailto:${siteConfig.emails.general}`}
              className="text-sm text-soft-grey transition-colors hover:text-cognitive-teal"
            >
              {siteConfig.emails.general}
            </a>
            <div className="mt-6">
              <p className="text-sm text-soft-grey">United Kingdom (Headquarters)</p>
              <p className="text-sm text-soft-grey">Pakistan (R&D Centre)</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} MetaBrain Labs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-text-muted hover:text-soft-grey transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-text-muted hover:text-soft-grey transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
