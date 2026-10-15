/** Decorative candlestick chart: an uptrend whose price axis climbs to ₹1 Cr — the pool. One left→right pass: candles grow one by one while the trend line draws along them, the last candle lands and pulses "live", then the price lines + labels appear (top to bottom). Trading colours (green up / red down) stay fixed, whatever the theme. */
import { UP, DOWN } from './trading';

// Hand-tuned uptrend (y grows downward in SVG): [open, close, high, low]
const CANDLES: [number, number, number, number][] = [
  [140, 132, 128, 146], [132, 136, 127, 140], [136, 124, 120, 139], [124, 118, 112, 128],
  [118, 122, 114, 127], [122, 108, 104, 125], [108, 100, 95, 112], [100, 104, 96, 110],
  [104, 90, 86, 107], [90, 82, 76, 94], [82, 86, 78, 92], [86, 72, 66, 89],
  [72, 64, 58, 76], [64, 68, 60, 73], [68, 52, 46, 71], [52, 44, 38, 56],
  [44, 48, 40, 53], [48, 34, 28, 51],
];

const GRID = [
  { y: 34, label: '₹1 Cr' },
  { y: 69, label: '₹75 L' },
  { y: 104, label: '₹50 L' },
  { y: 139, label: '₹25 L' },
];

const CANDLE_STAGGER_MS = 85;
const CANDLE_GROW_MS = 500;
/** When the last candle has fully grown: the chart pass is done */
const CHART_END_MS = (CANDLES.length - 1) * CANDLE_STAGGER_MS + CANDLE_GROW_MS;
const LABEL_STAGGER_MS = 120;

export default function CandleBackdrop({ className = '' }: { className?: string }) {
  const step = 17;
  const width = 9;
  const closes = CANDLES.map(([, c], i) => `${i === 0 ? 'M' : 'L'}${i * step + 8 + width / 2} ${c}`).join(' ');

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 340 160"
      preserveAspectRatio="xMidYMax meet"
      className={`pointer-events-none ${className}`}
    >
      {GRID.map((g, i) => (
        <g key={g.y} className="grid-reveal" style={{ animationDelay: `${CHART_END_MS + i * LABEL_STAGGER_MS}ms` }}>
          <line x1="0" x2="314" y1={g.y} y2={g.y} stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 4" />
          <text x="338" y={g.y + 2.5} textAnchor="end" fontSize="7" fontFamily="ui-monospace, monospace" fill="currentColor" fillOpacity="0.45">
            {g.label}
          </text>
        </g>
      ))}

      {CANDLES.map(([o, c, h, l], i) => {
        const x = i * step + 8;
        const up = c < o;
        const color = up ? UP : DOWN;
        const last = i === CANDLES.length - 1;
        return (
          <g
            key={i}
            className="candle-grow"
            style={
              last
                ? // grow in like the others, then pulse "live" (one shorthand so neither animation overrides the other)
                  { animation: `candle-grow ${CANDLE_GROW_MS}ms cubic-bezier(0.2, 0.8, 0.3, 1) ${i * CANDLE_STAGGER_MS}ms both, candle-live 1.6s ease-in-out ${CHART_END_MS + 400}ms infinite alternate` }
                : { animationDelay: `${i * CANDLE_STAGGER_MS}ms` }
            }
          >
            <line x1={x + width / 2} x2={x + width / 2} y1={h} y2={l} stroke={color} strokeWidth="1" />
            <rect x={x} y={Math.min(o, c)} width={width} height={Math.max(2, Math.abs(o - c))} rx="1" fill={color} fillOpacity={up ? 0.9 : 0.75} />
          </g>
        );
      })}

      <path d={closes} pathLength={1} className="chart-draw" style={{ animationDelay: '0ms', animationDuration: `${CHART_END_MS}ms`, animationTimingFunction: 'linear' }} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
