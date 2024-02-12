import dynamic from "next/dynamic";

import Logo from "./_components/Logo";

const Main = dynamic(() => import("./_components/Main"), {
  loading: () => <></>,
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col border-solid border-[1px] border-lime-200 border-opacity-15">
      <div className="w-full flex items-center justify-center p-2 border-b-[1px] border-lime-200 border-opacity-15">
        <Logo large={false} />
      </div>
      <div className="flex items-center justify-center h-full">
        <Logo large={true} />
        <Main />
      </div>
    </main>
  );
}
