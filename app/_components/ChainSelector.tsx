import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { chains } from "chain-registry";
import { ChevronUpDownIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import useSignerStore from "../_stores/signerStore";

declare global {
  interface Window {
    leap: any;
    keplr: any;
  }
}

export default function ChainSelector() {
  return (
    <>
      <h2 className="text-lime-300 text-3xl font-semibold mb-4">
        Chain Selection
      </h2>
      <p className="text-lg mb-8">
        Select the source and destination chains that the packet is meant to be
        relayed between.
      </p>
      <ChainBox side="Source" />
      <ChainBox side="Destination" />
    </>
  );
}

function ChainBox({ side }: { side: String }) {
  const [selectedChain, setSelectedChain] = useState<[string, string]>([
    side === "Source" ? "celestia" : "archway-1",
    side === "Source" ? "celestia" : "archway",
  ]);
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const chainInfo = chains.filter((chain) => {
    return (
      chain.chain_id === selectedChain[0] &&
      chain.chain_name.toLowerCase() === selectedChain[1]
    );
  })[0];

  const filteredChains =
    query === ""
      ? chains
      : chains.filter((chain) => {
          return chain.chain_name.toLowerCase().includes(query.toLowerCase());
        });

  const signer = useSignerStore((state) =>
    side === "Source" ? state.signerA : state.signerB
  );
  const setSigner = useSignerStore((state) =>
    side === "Source" ? state.setSignerA : state.setSignerB
  );

  const handleConnect = () => {
    // use keplr if it's found, otherwise use leap wallet
    window[window.keplr ? "keplr" : "leap"]
      .enable(chainInfo.chain_id)
      .then(() => {
        setSigner(
          window[window.keplr ? "keplr" : "leap"].getOfflineSigner(
            chainInfo.chain_id
          )
        );
      });
  };

  useEffect(() => {
    setSigner(null);
  }, [selectedChain[0], selectedChain[1]]);

  return (
    <div className="flex flex-col p-4 bg-white bg-opacity-5 rounded-lg mt-2 w-full max-w-[500px]">
      <h3 className="font-medium text-xl opacity-50 mb-4">{side} Chain</h3>

      <Combobox
        value={chainInfo.chain_name}
        onChange={(e) => setSelectedChain([e[0], e[1]])}
      >
        {({ open }) => (
          <>
            <div className="relative flex items-center">
              <img
                src={chainInfo.logo_URIs?.png}
                alt=""
                className="absolute p-1 h-full aspect-square"
              />
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                className={`w-full bg-lime-100 py-2 px-12 text-lime-950 ${open || showList ? "rounded-t-lg" : "rounded-lg"}`}
                onFocus={() => setShowList(true)}
                onBlur={() => {
                  setTimeout(() => setShowList(false), 100);
                }}
              />
              <ChevronUpDownIcon
                className="absolute right-2 h-6 cursor-pointer w-auto text-lime-950"
                onClick={() => setShowList(!showList)}
              />
            </div>
            {(open || showList) && (
              <div className="relative">
                <Combobox.Options
                  className="w-full grid grid-cols-2 gap-1 h-28 bg-lime-100 overflow-scroll rounded-b-lg text-lime-950 absolute z-10"
                  static
                >
                  {filteredChains.map((chain) => (
                    <Combobox.Option
                      key={chain.chain_id + chain.chain_name}
                      value={[chain.chain_id, chain.chain_name]}
                      className="py-2 px-4 h-14 cursor-pointer flex items-center gap-3 font-[450] bg-lime-200 rounded-lg hover:bg-lime-300"
                    >
                      <img
                        src={chain.logo_URIs?.png}
                        alt=""
                        className="h-8 w-auto"
                      />
                      <div className="overflow-hidden w-full overflow-ellipsis">
                        {chain.chain_name}
                      </div>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            )}
          </>
        )}
      </Combobox>

      <button
        onClick={handleConnect}
        className="bg-lime-300 hover:bg-lime-200 p-2 rounded-lg text-lime-950 font-medium mt-1"
      >
        {signer ? (
          <CheckCircleIcon className="h-6 w-6 text-lime-600 mx-auto" />
        ) : (
          `Connect wallet for ${chainInfo.chain_name}`
        )}
      </button>
    </div>
  );
}
