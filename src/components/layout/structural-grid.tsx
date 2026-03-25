"use client";

export function StructuralGrid() {
  return (
    <div
      className="structural-grid pointer-events-none fixed inset-0 z-0"
      style={{ top: "100vh" }}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid-cols"
            width="8.333%"
            height="100%"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="rgba(45,212,191,0.03)"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="grid-rows"
            width="100%"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="8"
              x2="100%"
              y2="8"
              stroke="rgba(248,250,252,0.02)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-cols)" />
        <rect width="100%" height="100%" fill="url(#grid-rows)" />
        <line
          x1="4%"
          y1="0"
          x2="4%"
          y2="100%"
          stroke="rgba(45,212,191,0.04)"
          strokeWidth="1"
          strokeDasharray="4 12"
        />
        <line
          x1="96%"
          y1="0"
          x2="96%"
          y2="100%"
          stroke="rgba(45,212,191,0.04)"
          strokeWidth="1"
          strokeDasharray="4 12"
        />
      </svg>
    </div>
  );
}
