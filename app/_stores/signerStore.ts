import { create } from "zustand";

interface SignerState {
  signerA: any;
  signerB: any;
  setSignerA: (s: any) => void;
  setSignerB: (s: any) => void;
}

const useSignerStore = create<SignerState>()((set) => ({
  signerA: null,
  signerB: null,
  setSignerA: (s: any) => set({ signerA: s }),
  setSignerB: (s: any) => set({ signerB: s }),
}));

export default useSignerStore;
