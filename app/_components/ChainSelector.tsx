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
      <ChainBox name="Source" />
      <ChainBox name="Destination" />
    </>
  );
}

function ChainBox({ name }: { name: String }) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white bg-opacity-5 rounded-lg mt-4">
      <span className="font-medium">{name} Chain</span>
      <input type="text" className="rounded-lg p-2" />
      <button className="bg-lime-300 hover:bg-lime-200 py-2 px-36 rounded-lg text-lime-950 font-medium">
        Connect wallet
      </button>
    </div>
  );
}
