import Logo from "./_components/Logo";

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col border-solid border-[1px] border-lime-200 border-opacity-15">
      <div className="w-full flex items-center justify-center p-2 border-b-[1px] border-lime-200 border-opacity-15">
        <Logo large={false} />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <Logo large={true} />
      </div>
    </main>
  );
}
