"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

// PostHog analytics (EU Cloud). Public/write-only key — safe to ship in the
// browser. Ported from the original static site's analytics snippet.
const POSTHOG_KEY = "phc_nNWbwJp7w3t6dmw5qyQhjwDv9UbyWVLjjDmiZEF9vDay";

let initialized = false;

// Isolated in <Suspense> because useSearchParams() would otherwise opt the
// entire route out of static rendering (defeating the SEO goal).
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!initialized) return;
    let url = window.location.origin + pathname;
    const qs = searchParams?.toString();
    if (qs) url += `?${qs}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }) {
  useEffect(() => {
    if (initialized) return;
    posthog.init(POSTHOG_KEY, {
      api_host: "https://eu.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false, // captured manually on route change
      capture_pageleave: true,
      defaults: "2025-05-24",
    });
    initialized = true;
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </>
  );
}
