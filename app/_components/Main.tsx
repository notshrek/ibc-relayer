"use client";

import { useEffect, useRef } from "react";
import Introduction from "./Introduction";

export default function Main() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => (mainRef.current!.style.opacity = "1"), 1750);
  }, []);

  return (
    <div
      className="flex flex-col items-center text-lime-100 opacity-0 duration-700"
      ref={mainRef}
    >
      <Introduction />
    </div>
  );
}
