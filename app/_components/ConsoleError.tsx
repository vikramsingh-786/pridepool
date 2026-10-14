"use client";

import { useEffect } from "react";

// Logs a server-side failure reason to the browser console once, for debugging.
// Renders nothing. Only ever given safe text (status / error code / message).
export default function ConsoleError({ message }: { message: string }) {
  useEffect(() => {
    console.error(`[leaderboard] ${message}`);
  }, [message]);
  return null;
}
