import { IbcClient } from "@confio/relayer";
import { GasPrice } from "@cosmjs/stargate";
import type { chainInfo } from "../_stores/chainStore";

export async function createClient(
  chain: chainInfo,
  signer: any
): Promise<IbcClient> {
  const [account] = await signer.getAccounts();
  let rpcIdx = 0;

  while (true) {
    try {
      window.dispatchEvent(
        new CustomEvent("linkprogress", {
          detail: `[${chain.name}] Trying RPC endpoint: ${chain.rpcs[rpcIdx]}`,
        })
      );

      const client = await IbcClient.connectWithSigner(
        chain.rpcs[rpcIdx],
        signer,
        account.address,
        {
          gasPrice: GasPrice.fromString(chain.fee.gasPrice + chain.fee.denom),
          estimatedBlockTime: 3,
          estimatedIndexerTime: 5,
        }
      );

      window.dispatchEvent(
        new CustomEvent("linkprogress", {
          detail: `[${chain.name}] Successfully connected to ${chain.rpcs[rpcIdx]}`,
        })
      );

      console.log(`${chain.name} client:`, client);
      return client;
    } catch (err) {
      console.error(err);
      rpcIdx = (rpcIdx + 1) % chain.rpcs.length;
    }
  }
}
