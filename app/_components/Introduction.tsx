export default function Introduction({
  handleStepChange,
}: {
  handleStepChange: Function;
}) {
  return (
    <>
      <h1 className="text-lime-300 text-4xl font-semibold font-clashDisplay mb-8 text-center">
        Browser-based IBC Relayer
      </h1>
      <p className="max-w-[750px] px-4 text-center mb-12 text-xl font-clashDisplay">
        Have an IBC packet which isn&apos;t being picked up by relayers? Or a
        timed out packet you want to revert immediately? This tool lets you
        select and relay any packet you want between any two chains easily by
        yourself, in a permissionless way and all within your browser!
      </p>
      <button
        onClick={() => handleStepChange()}
        className="bg-lime-300 hover:bg-lime-200 py-4 px-8 rounded-lg font-clashDisplay font-medium text-lime-950"
      >
        START RELAYING
      </button>
    </>
  );
}
