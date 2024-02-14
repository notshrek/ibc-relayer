import type { IBCInfo } from "@chain-registry/types";
import type { Link } from "@confio/relayer";
import { useEffect, useState } from "react";
import useSignerStore from "../_stores/signerStore";
import useChainStore from "../_stores/chainStore";

export default function PacketsList({
  connections,
}: {
  connections: IBCInfo[];
}) {
  const [link, setLink] = useState<Link | null>(null);
  const signerA = useSignerStore((state) => state.signerA);
  const signerB = useSignerStore((state) => state.signerB);
  const chainA = useChainStore((state) => state.chainA);
  const chainB = useChainStore((state) => state.chainB);

  useEffect(() => {
    (async () => {
      const { createClient } = await import("../_utils/createClient");

      const [clientA, clientB] = await Promise.all([
        createClient(chainA!, signerA),
        createClient(chainB!, signerB),
      ]);

      const { Link } = await import("@confio/relayer");
      const isCorrectOrder = connections[0].chain_1.chain_name === chainA?.name;

      setLink(
        await Link.createWithExistingConnections(
          clientA,
          clientB,
          connections[0][isCorrectOrder ? "chain_1" : "chain_2"].connection_id,
          connections[0][isCorrectOrder ? "chain_2" : "chain_1"].connection_id
        )
      );
    })();
  }, []);

  return (
    <>
      <h2 className="text-lime-300 text-3xl font-semibold mb-4">IBC Packets</h2>
      {link ? (
        <p className="text-lg mb-8">
          Use the list and filters below to find the packet you would like to
          relay.
        </p>
      ) : (
        <>
          <p className="text-lg mb-8">
            Trying various RPCs to establish a link. Please wait.
          </p>
          <span className="relative flex items-center justify-center h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-lime-300"></span>
          </span>
        </>
      )}
    </>
  );
}
