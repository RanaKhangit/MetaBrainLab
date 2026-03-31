"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      <header>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "h-[64px] bg-sovereign-navy/80 backdrop-blur-md"
            : "h-[80px] bg-transparent"
        )}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center px-4 sm:px-6">
          {/* Desktop: Left nav links */}
          <div className="hidden flex-1 items-center gap-6 lg:flex">
            {navLinks.slice(0, 4).map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200",
                    pathname === link.href
                      ? "text-cognitive-teal"
                      : "text-soft-grey hover:text-pure-light"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-cognitive-teal" />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Spacer for centering logo */}
          <div className="flex-1 lg:hidden" />

          {/* Center Logo */}
          <Link
            href="/"
            className="mx-4 flex shrink-0 items-center lg:mx-8"
            aria-label="MetaBrain Lab Home"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="transition-all duration-500 origin-center"
            >
              <Image
                src="/logos/logo-white.svg"
                alt="MetaBrain Lab"
                width={180}
                height={40}
                className={cn(
                  "transition-all duration-500",
                  scrolled ? "h-10 w-auto" : "h-14 w-auto"
                )}
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop: Right nav links */}
          <div className="hidden flex-1 items-center justify-end gap-6 lg:flex">
            {navLinks.slice(4).map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200",
                    pathname === link.href
                      ? "text-cognitive-teal"
                      : "text-soft-grey hover:text-pure-light"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-cognitive-teal" />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Menu Button */}
          <div className="flex flex-1 justify-end lg:hidden">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-pure-light transition-colors hover:bg-white/5"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
      </header>

      {/* Mobile Sidebar - Slides from Right */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-full w-[300px] max-w-[85vw] border-l border-white/5 bg-deep-cognition lg:hidden"
            >
              {/* Sidebar Header */}
              <div className="flex h-[72px] items-center justify-between border-b border-white/5 px-6">
                <span className="font-serif text-lg text-pure-light">Menu</span>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-soft-grey transition-colors hover:text-pure-light hover:bg-white/5"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Sidebar Links */}
              <div className="flex flex-col px-4 py-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        pathname === link.href
                          ? "bg-cognitive-teal/10 text-cognitive-teal"
                          : "text-soft-grey hover:bg-white/5 hover:text-pure-light"
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cognitive-teal" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Investor Access (Mobile) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                  className="mt-2 border-t border-white/5 pt-2"
                >
                  <Link
                    href="/investor-access"
                    className={cn(
                      "flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors",
                      pathname === "/investor-access"
                        ? "bg-cognitive-teal/10 text-cognitive-teal"
                        : "text-soft-grey hover:bg-white/5 hover:text-pure-light"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Investor Access
                    {pathname === "/investor-access" && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cognitive-teal" />
                    )}
                  </Link>
                </motion.div>
              </div>

              {/* Sidebar Footer */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 px-6 py-6">
                <p className="text-xs text-text-muted">
                  MetaBrain Lab
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Engineering the Future of Human Intelligence
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
