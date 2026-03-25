"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "mbl_cookie_notice";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  function handleDismiss() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-deep-cognition/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:px-6">
        <p className="flex-1 text-sm text-soft-grey">
          This site uses strictly necessary cookies for authentication and site
          functionality. No tracking or analytics cookies are used.{" "}
          <Link
            href="/privacy"
            className="text-cognitive-teal hover:text-accent-hover transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
        <button
          onClick={handleDismiss}
          className="shrink-0 rounded-lg bg-cognitive-teal px-5 py-2 text-sm font-medium text-sovereign-navy transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cognitive-teal/25"
        >
          Understood
        </button>
      </div>
    </div>
  );
}
