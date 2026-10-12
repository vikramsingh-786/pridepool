// One-shot party-popper burst on load: two poppers in the hero's bottom corners.
// Pure CSS (keyframes in globals.css), seeded so server and client markup match.

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

const COLORS = ["#ffc978", "#f2a33c", "#a78bfa", "#22c55e", "#f43f5e", "#f4f4f7"];

const PIECES = (() => {
  const rand = mulberry32(0xc0ffee);
  const r = (min: number, max: number) => min + rand() * (max - min);
  return Array.from({ length: 72 }, (_, i) => {
    const left = i % 2 === 0; // alternate poppers
    const spread = r(8, 46); // vw travelled inward
    return {
      key: i,
      side: left ? "left-[4%]" : "right-[4%]",
      dx: `${left ? spread : -spread}vw`,
      dy: `${-r(45, 85)}vh`,
      rot: `${r(-720, 720).toFixed(0)}deg`,
      delay: `${r(0, 0.35).toFixed(2)}s`,
      dur: `${r(2.6, 3.6).toFixed(2)}s`,
      w: r(6, 11).toFixed(0),
      h: r(10, 18).toFixed(0),
      round: rand() > 0.75,
      color: COLORS[Math.floor(rand() * COLORS.length)],
    };
  });
})();

export default function HeroConfetti() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[12] overflow-hidden">
      {PIECES.map((p) => (
        <span
          key={p.key}
          className={`hero-confetti absolute bottom-[8%] ${p.side}`}
          style={
            {
              width: `${p.w}px`,
              height: p.round ? `${p.w}px` : `${p.h}px`,
              borderRadius: p.round ? "9999px" : "2px",
              background: p.color,
              "--dx": p.dx,
              "--dy": p.dy,
              "--rot": p.rot,
              "--delay": p.delay,
              "--dur": p.dur,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
