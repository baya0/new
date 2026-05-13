"use client";

import dynamic from "next/dynamic";

/**
 * Sanity Studio + the @sanity/document-internationalization plugin both
 * touch browser-only globals (window, IndexedDB, drag-and-drop) at module
 * load. "use client" by itself doesn't fully skip SSR — Next still
 * evaluates client modules on the server during the initial render —
 * so we load the studio component dynamically with ssr:false, which
 * prevents any server-side evaluation of the studio import graph.
 */
const StudioInner = dynamic(() => import("./StudioInner"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0e1722",
        color: "#8896a8",
        fontSize: 14,
      }}
    >
      Loading studio…
    </div>
  ),
});

export default function Studio() {
  return <StudioInner />;
}
