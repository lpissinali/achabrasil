import { ImageResponse } from "next/og";

export const alt = "AchaBrasil - Passagens aéreas baratas pelo Brasil";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0e9b8e 0%, #0a6f66 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, opacity: 0.9 }}>achabrasil.com.br</div>
        <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, marginTop: 18, letterSpacing: -2 }}>
          Passagens baratas,
        </div>
        <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, color: "#ffd27a", letterSpacing: -2 }}>
          sem complicação.
        </div>
        <div style={{ fontSize: 34, marginTop: 26, opacity: 0.92 }}>
          Compare GOL, LATAM, Azul e +20 companhias.
        </div>
      </div>
    ),
    size,
  );
}
