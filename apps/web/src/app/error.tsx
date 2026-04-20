"use client";

import React from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
      <button onClick={() => reset()} style={{ marginTop: "1rem" }}>
        Try again
      </button>
    </div>
  );
}
