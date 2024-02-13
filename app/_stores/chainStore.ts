import { create } from "zustand";

type chainInfo = {
  name: string;
  rpcs: string[];
  fee: { denom: string; gasPrice: number };
};

interface ChainState {
  chainA: chainInfo | null;
  chainB: chainInfo | null;
  setChainA: (s: chainInfo | null) => void;
  setChainB: (s: chainInfo | null) => void;
}

const useChainStore = create<ChainState>()((set) => ({
  chainA: null,
  chainB: null,
  setChainA: (s: chainInfo | null) => set({ chainA: s }),
  setChainB: (s: chainInfo | null) => set({ chainB: s }),
}));

export default useChainStore;
