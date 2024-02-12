declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export default function Logo({ large }: { large: boolean }) {
  return (
    <div
      className={`text-lime-200 text-4xl font-black font-clashDisplay overflow-hidden ${large && "text-9xl absolute -z-10"}`}
    >
      {[..."Relayer"].map((c, i) => (
        <span
          className={`animate-slideY inline-block ${!large && "translate-y-full animate-[slideY_0.8s_ease-out_forwards]"}`}
          style={{
            animationDelay: `${(large ? 1.4 : 1.7) + i * 0.05}s`,
            "--target-y": large ? "-100%" : "0",
          }}
          key={c + i}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
