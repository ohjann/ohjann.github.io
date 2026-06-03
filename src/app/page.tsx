"use client";
import dynamic from "next/dynamic";
import { Overlay } from "./Overlay";

// The WebGL scene (react-three-fiber) can't be server-rendered, so load it
// client-side only. This also avoids running r3f against Next's server React
// runtime during static export.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Home() {
  return (
    <div className="home">
      <Overlay />
      <Scene />
    </div>
  );
}
