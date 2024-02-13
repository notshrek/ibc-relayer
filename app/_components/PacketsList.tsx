import type { IBCInfo } from "@chain-registry/types";
import useSignerStore from "../_stores/signerStore";
import { IbcClient, Link } from "@confio/relayer";
import { GasPrice } from "@cosmjs/stargate";
import { useEffect, useState } from "react";
import useChainStore from "../_stores/chainStore";

export default function PacketsList({
  connections,
}: {
  connections: IBCInfo[];
}) {
  const signerA = useSignerStore((state) => state.signerA);
  const signerB = useSignerStore((state) => state.signerB);
  const chainA = useChainStore((state) => state.chainA);
  const chainB = useChainStore((state) => state.chainB);

  const [link, setLink] = useState<Link | null>(null);

  useEffect(() => {
    (async () => {
      const [accountA] = await signerA.getAccounts();
      const [accountB] = await signerB.getAccounts();
      let clients: [IbcClient | null, IbcClient | null] = [null, null];
      let rpcIdx: number;

      for (let i = 0; i < 2; ++i) {
        rpcIdx = 0;
        while (true) {
          try {
            clients[i] = await IbcClient.connectWithSigner(
              i === 0 ? chainA!.rpcs[rpcIdx] : chainB!.rpcs[rpcIdx],
              i === 0 ? signerA : signerB,
              i === 0 ? accountA.address : accountB.address,
              {
                gasPrice: GasPrice.fromString(
                  i === 0
                    ? chainA!.fee.gasPrice + chainA!.fee.denom
                    : chainB!.fee.gasPrice + chainB!.fee.denom
                ),
                estimatedBlockTime: 3,
                estimatedIndexerTime: 5,
              }
            );

            console.log(`client ${i === 0 ? "A" : "B"}:`, clients[i]);
            break;
          } catch (err) {
            console.error(err);
          }
          rpcIdx =
            (rpcIdx + 1) % (i === 0 ? chainA!.rpcs : chainB!.rpcs).length;
        }
      }

      const isCorrectOrder = connections[0].chain_1.chain_name === chainA?.name;

      setLink(
        await Link.createWithExistingConnections(
          clients[0]!,
          clients[1]!,
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
