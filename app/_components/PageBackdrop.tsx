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

const MOTES = (() => {
  const rand = mulberry32(0x9e11);
  const r = (min: number, max: number) => min + rand() * (max - min);
  return Array.from({ length: 40 }, (_, i) => ({
    key: i,
    left: `${r(2, 98).toFixed(2)}%`,

    top: `${r(28, 99).toFixed(2)}%`,
    size: Number(r(1, 2.8).toFixed(1)),
    duration: `${r(10, 21).toFixed(1)}s`,
    delay: `${r(0, 14).toFixed(1)}s`,
    opacity: r(0.18, 0.55).toFixed(2),
    gold: rand() > 0.6,
  }));
})();

const VOLUMES = [
  { top: "25%", left: "12%", size: "52rem", color: "123,31,143", opacity: 0.25 },

  { top: "33%", left: "88%", size: "38rem", color: "177,69,201", opacity: 0.12 },

  { top: "48%", left: "72%", size: "42rem", color: "123,31,143", opacity: 0.23 },

  { top: "66%", left: "16%", size: "44rem", color: "123,31,143", opacity: 0.23 },

  { top: "78%", left: "82%", size: "32rem", color: "177,69,201", opacity: 0.11 },

  { top: "90%", left: "40%", size: "46rem", color: "123,31,143", opacity: 0.2 },
];

const BAND_W = 1440;
const BAND_N = 20;
const BAND_STEP = BAND_W / BAND_N;
const BAND_BODY = 32;

function bandSeries(seed: number) {
  const rand = mulberry32(seed);
  let price = 470;
  return Array.from({ length: BAND_N }, (_, i) => {
    const open = price;
    const close = open - 20 + (rand() - 0.42) * 84;
    price = close;
    return {
      x: i * BAND_STEP + (BAND_STEP - BAND_BODY) / 2,
      open,
      close,
      high: Math.min(open, close) - rand() * 28 - 8,
      low: Math.max(open, close) + rand() * 28 + 8,
    };
  });
}

const BAND_MASK = [
  "linear-gradient(90deg, #000 0%, #000 18%, transparent 36%, transparent 64%, #000 82%, #000 100%)",
  "linear-gradient(180deg, transparent 0%, #000 22%, #000 78%, transparent 100%)",
].join(", ");

function ChartBand({ seed, className }: { seed: number; className: string }) {
  const candles = bandSeries(seed);
  const ma = candles
    .map((c, i) => {
      const win = candles.slice(Math.max(0, i - 4), i + 1);
      const avg = win.reduce((sum, k) => sum + k.close, 0) / win.length;
      return `${(c.x + BAND_BODY / 2).toFixed(1)},${avg.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className={className}
      style={{
        maskImage: BAND_MASK,
        WebkitMaskImage: BAND_MASK,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <g stroke="var(--color-violet)" strokeOpacity="0.12" strokeDasharray="4 8">
        {[110, 220, 330, 440].map((y) => (
          <line key={y} x1="0" y1={y} x2="1440" y2={y} />
        ))}
      </g>
      <g opacity={0.22}>
        {candles.map((c) => {
          const color = c.close < c.open ? "#22c55e" : "#f43f5e";
          return (
            <g key={c.x} fill={color}>
              <rect x={c.x + BAND_BODY / 2 - 1.5} y={c.high} width={3} height={c.low - c.high} rx={1.5} />
              <rect
                x={c.x}
                y={Math.min(c.open, c.close)}
                width={BAND_BODY}
                height={Math.max(5, Math.abs(c.close - c.open))}
                rx={4}
              />
            </g>
          );
        })}
      </g>
      <polyline
        points={ma}
        stroke="var(--color-gold-bright)"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function PageBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0b0b0f 0%, #0e0e15 30%, #0d0d13 62%, #0b0b0f 100%)",
        }}
      />
      {VOLUMES.map((v, i) => (
        <div
          key={i}
          className="arena-drift absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            top: v.top,
            left: v.left,
            width: v.size,
            height: v.size,
            maxWidth: "150vw",
            animationDelay: `${-i * 6}s`,
            background: `radial-gradient(closest-side, rgba(${v.color},${v.opacity}), rgba(${v.color},0) 70%)`,
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-violet) 1px, transparent 1px), linear-gradient(90deg, var(--color-violet) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 16%, #000 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 16%, #000 86%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-violet) 1px, transparent 1px), linear-gradient(90deg, var(--color-violet) 1px, transparent 1px)",
          backgroundSize: "256px 256px",
          maskImage:
            "radial-gradient(ellipse 120% 60% at 50% 45%, #000 10%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 60% at 50% 45%, #000 10%, transparent 80%)",
        }}
      />
      <ChartBand
        seed={0x100d}
        className="arena-drift absolute inset-x-0 top-[24%] h-[34rem] w-full"
      />
      <ChartBand
        seed={0x101b}
        className="arena-drift absolute inset-x-0 top-[60%] h-[30rem] w-full"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[24%] overflow-hidden"
        style={{ perspective: "280px", perspectiveOrigin: "50% 0%" }}
      >
        <div
          className="absolute inset-0 opacity-[0.075]"
          style={{
            transform: "rotateX(72deg)",
            transformOrigin: "50% 0%",
            backgroundImage:
              "linear-gradient(var(--color-violet) 1px, transparent 1px), linear-gradient(90deg, var(--color-violet) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 40%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 40%, transparent 92%)",
          }}
        />
      </div>
      <span
        className="absolute inset-x-0 bottom-[24%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(177,69,201,0.16) 35%, rgba(177,69,201,0.12) 65%, transparent)",
        }}
      />
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
              background: m.gold
                ? "var(--color-gold-bright)"
                : "var(--color-violet)",
              boxShadow: m.gold
                ? "0 0 6px 1px rgba(231,182,242,0.45)"
                : "0 0 6px 1px rgba(177,69,201,0.4)",
              "--p-duration": m.duration,
              "--p-delay": m.delay,
              "--p-opacity": m.opacity,
            } as React.CSSProperties
          }
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: GRAIN, backgroundSize: "180px 180px" }}
      />
    </div>
  );
}
