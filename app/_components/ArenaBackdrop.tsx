function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CHART_W = 1440;
const CHART_N = 26;
const STEP = CHART_W / CHART_N;
const BODY_W = 30;
const CANDLES = (() => {
  const rand = mulberry32(0xb011);
  const out: { x: number; open: number; close: number; high: number; low: number; vol: number }[] = [];
  let price = 780;
  for (let i = 0; i < CHART_N; i++) {
    const open = price;
    const close = open - 28 + (rand() - 0.42) * 96;
    out.push({
      x: i * STEP + (STEP - BODY_W) / 2,
      open,
      close,
      high: Math.min(open, close) - rand() * 34 - 8,
      low: Math.max(open, close) + rand() * 34 + 8,
      vol: 30 + rand() * 90,
    });
    price = close;
  }
  return out;
})();
const CHART_FADE =
  "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)";
const CHART_HOLE =
  "radial-gradient(ellipse 30% 40% at 66% 54%, rgba(0,0,0,0.15) 55%, #000 100%)";

const MA = CANDLES.map((c, i) => {
  const win = CANDLES.slice(Math.max(0, i - 7), i + 1);
  const avg = win.reduce((sum, k) => sum + k.close, 0) / win.length;
  return `${(c.x + BODY_W / 2).toFixed(1)},${avg.toFixed(1)}`;
}).join(" ");

const MOTES = (() => {
  const rand = mulberry32(0x7a1e);
  const r = (min: number, max: number) => min + rand() * (max - min);
  return Array.from({ length: 90 }, (_, i) => ({
    key: i,
    left: `${r(-2, 102).toFixed(2)}%`,
    top: `${r(2, 100).toFixed(2)}%`,
    size: Number(r(1, 3.6).toFixed(1)),
    duration: `${r(8, 19).toFixed(1)}s`,
    delay: `${r(0, 13).toFixed(1)}s`,
    opacity: r(0.25, 1).toFixed(2),
    gold: rand() > 0.42,
  }));
})();

export default function ArenaBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 22% 42%, rgba(123,31,143,0.55), transparent 62%), radial-gradient(ellipse 60% 55% at 85% 72%, rgba(177,69,201,0.22), transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-violet) 1px, transparent 1px), linear-gradient(90deg, var(--color-violet) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 85% 75% at 30% 45%, #000 5%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 30% 45%, #000 5%, transparent 72%)",
        }}
      />
      <svg
        className="arena-drift absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{
          maskImage: `${CHART_FADE}, ${CHART_HOLE}`,
          WebkitMaskImage: `${CHART_FADE}, ${CHART_HOLE}`,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <defs>
          <filter id="candle-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g opacity={0.22}>
          {CANDLES.map((c) => (
            <rect
              key={`v${c.x}`}
              x={c.x}
              y={880 - c.vol}
              width={BODY_W}
              height={c.vol}
              fill={c.close < c.open ? "#22c55e" : "#f43f5e"}
              rx={2}
            />
          ))}
        </g>
        <g opacity={0.75} filter="url(#candle-glow)">
          {CANDLES.map((c) => {
            const color = c.close < c.open ? "#22c55e" : "#f43f5e";
            return (
              <g key={c.x} fill={color}>
                <rect x={c.x + BODY_W / 2 - 1.5} y={c.high} width={3} height={c.low - c.high} rx={1.5} />
                <rect
                  x={c.x}
                  y={Math.min(c.open, c.close)}
                  width={BODY_W}
                  height={Math.max(4, Math.abs(c.close - c.open))}
                  rx={4}
                />
              </g>
            );
          })}
        </g>
        <polyline points={MA} stroke="var(--color-gold-bright)" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={0.12} />
        <polyline points={MA} stroke="var(--color-gold-bright)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity={0.8} />
      </svg>
      {MOTES.map((m) => (
        <span
          key={m.key}
          className="arena-particle absolute rounded-full"
          style={
            {
              left: m.left,
              top: m.top,
              width: m.size,
              height: m.size,
              background: m.gold ? "var(--color-gold-bright)" : "var(--color-violet)",
              boxShadow: m.gold
                ? "0 0 8px 1.5px rgba(231,182,242,0.7)"
                : "0 0 7px 1.5px rgba(177,69,201,0.6)",
              "--p-duration": m.duration,
              "--p-delay": m.delay,
              "--p-opacity": m.opacity,
            } as React.CSSProperties
          }
        />
      ))}

      <span className="absolute inset-y-0 left-6 hidden w-px bg-gradient-to-b from-transparent via-violet/25 to-transparent lg:block" />
      <span className="absolute inset-y-0 right-6 hidden w-px bg-gradient-to-b from-transparent via-violet/25 to-transparent lg:block" />
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 45%, transparent 35%, rgba(11,11,15,0.75) 85%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[38%]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(11,11,15,0.65) 45%, var(--color-bg) 100%)",
        }}
      />
    </div>
  );
}
