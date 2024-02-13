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
      let clientA: IbcClient, clientB: IbcClient;
      let rpcIdx = 0;

      while (true) {
        try {
          clientA = await IbcClient.connectWithSigner(
            chainA!.rpcs[rpcIdx],
            signerA,
            accountA.address,
            {
              gasPrice: GasPrice.fromString(
                chainA!.fee.gasPrice + chainA!.fee.denom
              ),
              estimatedBlockTime: 3,
              estimatedIndexerTime: 5,
            }
          );

          console.log("clientA:", clientA);
          break;
        } catch (err) {
          console.error(err);
        }
        ++rpcIdx;
      }

      rpcIdx = 0;
      while (true) {
        try {
          clientB = await IbcClient.connectWithSigner(
            chainB!.rpcs[rpcIdx],
            signerB,
            accountB.address,
            {
              gasPrice: GasPrice.fromString(
                chainB!.fee.gasPrice + chainB!.fee.denom
              ),
              estimatedBlockTime: 3,
              estimatedIndexerTime: 5,
            }
          );

          console.log("clientB:", clientB);
          break;
        } catch (err) {
          console.error(err);
        }
        ++rpcIdx;
      }

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
      {link ? (
        <p>connected</p>
      ) : (
        <h3>Trying available RPCs to establish a link. Please wait...</h3>
      )}
    </>
  );
}
