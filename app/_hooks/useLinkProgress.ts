import { useEffect, useState } from "react";

export default function useLinkProgress() {
  const [linkProgress, setLinkProgress] = useState<string[]>([]);

  useEffect(() => {
    const handleLinkProgress = (e: CustomEvent) => {
      setLinkProgress((progress) => [...progress, e.detail]);
    };

    window.addEventListener(
      "linkprogress",
      handleLinkProgress as EventListener
    );

    return () =>
      window.removeEventListener(
        "linkprogress",
        handleLinkProgress as EventListener
      );
  }, []);

  return linkProgress;
}
