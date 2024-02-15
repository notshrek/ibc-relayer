import { useEffect, useState } from "react";

export default function useLinkProgress() {
  const [linkProgress, setLinkProgress] = useState<
    { msg: string; id: string }[]
  >([]);

  useEffect(() => {
    const handleLinkProgress = (e: CustomEvent) => {
      setLinkProgress((progress) => [
        { msg: e.detail, id: Math.random().toString() + e.timeStamp },
        ...progress,
      ]);
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
