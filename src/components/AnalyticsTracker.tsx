"use client";

import { useEffect } from "react";

export function AnalyticsTracker() {
  useEffect(() => {
    // Only track once per session
    if (!sessionStorage.getItem("has_tracked_visitor")) {
      fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "visitor" }),
      })
        .then((res) => {
          if (res.ok) {
            sessionStorage.setItem("has_tracked_visitor", "true");
          }
        })
        .catch((err) => console.error("Failed to track visitor:", err));
    }
  }, []);

  return null; // Invisible component
}
