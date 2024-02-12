"use client";

import { useEffect, useRef, useState } from "react";
import Introduction from "./Introduction";

export default function Main() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => (mainRef.current!.style.opacity = "1"), 1750);
  }, []);

  const handleStepChange = () => {
    mainRef.current!.style.transitionDuration = "0.3s";
    mainRef.current!.style.opacity = "0";
  };

  // automatically go to the next step once the content has faded out
  const handleTransitionEnd = () => {
    if (mainRef.current!.style.opacity === "0") {
      mainRef.current!.style.transitionDuration = "0.6s";
      mainRef.current!.style.opacity = "1";
      setStep(step + 1);
    }
  };

  return (
    <div
      className="flex flex-col items-center text-lime-100 opacity-0 duration-700"
      onTransitionEnd={handleTransitionEnd}
      ref={mainRef}
    >
      {step === 0 && <Introduction handleStepChange={handleStepChange} />}
    </div>
  );
}
