import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Supportiva — Enterprise IT Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0E1720 0%, #131E2C 55%, #1a2d4a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, #1C4E8A, #2A7E9E, #3A7CC0)",
          }}
        />

        {/* Eyebrow label */}
        <div
          style={{
            color: "#3A7CC0",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 28,
            display: "flex",
          }}
        >
          Enterprise IT Services
        </div>

        {/* Company name */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: -2,
            marginBottom: 32,
            display: "flex",
          }}
        >
          Supportiva
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#8090A8",
            fontSize: 26,
            fontWeight: 400,
            lineHeight: 1.4,
            maxWidth: 700,
            display: "flex",
          }}
        >
          IT Consulting · Staff Augmentation · Datacenter Infrastructure · Cloud
        </div>

        {/* Bottom domain badge */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 90,
            color: "#3A7CC0",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          supportiva.com
        </div>

        {/* Decorative dot grid — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 90,
            display: "flex",
            gap: 10,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: `rgba(28,78,138,${0.6 - i * 0.1})`,
                display: "flex",
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
