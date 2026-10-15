/** Slot-machine number: each digit rolls up and lands (styles: .odo-strip in globals.css). */
export default function Odometer({ text, label, delayOffset = 0 }: { text: string; label: string; /** digits already rolled before this one (keeps the stagger continuous when a number is split) */ delayOffset?: number }) {
  let digitIndex = delayOffset;
  return (
    <span aria-label={label} role="img" className="inline-flex leading-none tabular-nums">
      {[...text].map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i} aria-hidden="true">{ch}</span>;
        const delay = `${digitIndex++ * 70}ms`;
        return (
          <span key={i} aria-hidden="true" className="inline-block h-[1em] overflow-hidden">
            <span className="odo-strip block" style={{ '--d': Number(ch), animationDelay: delay }}>
              {/* the strip rolls to its (10 + digit)th row; later rows never show, except the one right below, whose glow (text-shadow) still bleeds into the window, so it stays */}
              {Array.from({ length: 12 + Number(ch) }, (_, n) => (
                <span key={n} className="block h-[1em]">{n % 10}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
