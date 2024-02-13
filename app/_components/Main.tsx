"use client";

import { useEffect, useRef, useState } from "react";
import Introduction from "./Introduction";
import ChainSelector from "./ChainSelector";
import type { IBCInfo } from "@chain-registry/types";
import PacketsList from "./PacketsList";
import useChainStore from "../_stores/chainStore";

export default function Main() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<number>(0);
  const [connections, setConnections] = useState<IBCInfo[]>([]);

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

  const chainA = useChainStore((state) => state.chainA);
  const chainB = useChainStore((state) => state.chainB);

  useEffect(() => {
    if (chainA && chainB) {
      (async () => {
        const ibc = (await import("chain-registry")).ibc;
        setConnections(
          ibc.filter(
            (i) =>
              (i.chain_1.chain_name === chainA.name &&
                i.chain_2.chain_name === chainB.name) ||
              (i.chain_2.chain_name === chainA.name &&
                i.chain_1.chain_name === chainB.name)
          )
        );
        handleStepChange();
      })();
    }
  }, [chainA, chainB]);

  return (
    <div
      className="flex flex-col items-center text-lime-100 opacity-0 duration-700 font-clashDisplay"
      onTransitionEnd={handleTransitionEnd}
      ref={mainRef}
    >
      {step === 0 && <Introduction handleStepChange={handleStepChange} />}
      {step === 1 && <ChainSelector />}
      {step === 2 && <PacketsList connections={connections} />}
    </div>
  );
}
