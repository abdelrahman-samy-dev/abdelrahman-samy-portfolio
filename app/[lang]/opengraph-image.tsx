import { ImageResponse } from "next/og";

export const alt = "Abdelrahman Samy Ali — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0a0a",
          color: "#f3f1ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#a8a49c", letterSpacing: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#E9A23B" }} />
          SOFTWARE ENGINEER · FULL-STACK · MOBILE
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>ABDELRAHMAN</div>
          <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>SAMY ALI</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a8a49c" }}>
          <span>TypeScript · React · Node.js · PostgreSQL · Flutter</span>
          <span style={{ color: "#E9A23B" }}>GlooFloo · Rawaylo</span>
        </div>
      </div>
    ),
    size
  );
}
