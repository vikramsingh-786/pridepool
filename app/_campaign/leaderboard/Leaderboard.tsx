import { onLanded } from '../components/landed';
import { artUrl, useLeaderboardArt } from './artStore';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Odometer from '../components/Odometer';
import Flag from './Flag';
import { POOL } from '../content';
import type { Leaderboard as BoardData } from '../../_lib/trading-api';
import {
  BRONZE_MEDAL,
  BRONZE_PODIUM,
  DETAILS,
  GOLD_MEDAL,
  GOLD_PODIUM,
  GROUPS,
  SILVER_ABOVE,
  SILVER_BELOW,
  SILVER_FLAG_BOX,
  SILVER_MEDAL,
  SILVER_MEDAL_BOX,
  type Box,
  type Layer,
} from './layers';

/**
 * Leaderboard — built from the Figma design (file CCpQIcDySK63UMO0KJkkda, node 2:94).
 * Podium: every layer at its Figma position (layers.ts), scaled as one image.
 * Motion: podiums rise one by one (bronze → silver → gold), medals drop in spinning,
 * scores roll up, rows slide in; on hover a podium lifts and its medal flips like a coin.
 *
 * Every name and number here comes from the signed backend feed (_lib/trading-api, fetched in
 * page.tsx); the table pages through it with /api/leaderboard. Nothing is invented: if the feed
 * is down the section says so, and a place nobody holds yet reads "Up for grabs".
 */
type Leader = { rank: number; name: string; score: string; pct?: string };

/** Ranks per table page. Matches the backend's own page size (_lib/trading-api PAGE_SIZE). */
const PAGE_SIZE = 10;
/** Ranks 1-3 live on the podium, not in the table. */
const PODIUM = 3;

/** Amounts to the paisa, the same way the feed reports them. */
const rupees = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** One API row → one table row. The feed's `brokerage_saved` is the ranked number; `best` is rank 1's, for the "% of #1" line. */
const toLeader = (e: { rank: number; participant: string; score: number }, best: number): Leader => ({
  rank: e.rank,
  name: e.participant,
  score: rupees.format(e.score),
  pct: best > 0 ? `${Math.round((e.score / best) * 100)}%` : undefined,
});

/**
 * Backend feed → what the design draws. null when the feed is unavailable, so the section can say so
 * instead of standing up an empty podium. The feed carries no country and this is an India campaign,
 * so row flags are India; the three podium flags are fixed Figma art (gold/bronze only exist as USA).
 */
function fromBoard(board: BoardData | null | undefined) {
  if (!board || board.status === 'unavailable') return null;
  const best = board.entries[0]?.score ?? 0;
  // A place nobody holds yet: the crystal still stands, the spot is simply open.
  const open = (rank: number): Leader => ({ rank, name: 'Up for grabs', score: '—' });
  const at = (i: number) => (board.entries[i] ? toLeader(board.entries[i], best) : open(i + 1));
  return {
    best,
    updatedAt: board.updatedAt,
    top: { gold: at(0), silver: at(1), bronze: at(2) },
    // the first call already carries page 1 of the table (ranks 4 onward); later pages are fetched
    firstPage: board.entries.slice(PODIUM).map((e) => toLeader(e, best)),
    pages: Math.ceil(Math.max(0, board.total - PODIUM) / PAGE_SIZE),
  };
}

/* ── helpers ── */
const pos = ([l, t, w, h]: Box): CSSProperties => ({ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%` });
/** Design px inside the podium scene → scales with the scene (see .lb-scene in globals.css). */
const u = (n: number) => `calc(${n} * var(--lb-u))`;

function Img({ src, box, className = '' }: { src: string; box: Box; className?: string }) {
  return <img src={artUrl(src)} alt="" aria-hidden="true" draggable={false} className={`pointer-events-none absolute block max-w-none select-none ${className}`} style={pos(box)} />;
}
const Layers = ({ layers }: { layers: Layer[] }) => <>{layers.map((l, i) => <Img key={`${l.src}-${i}`} src={l.src} box={l.box} />)}</>;

/** Crown, name and score on the front of a podium (sizes in Figma px). */
function Details({
  at,
  crown,
  crownSize,
  crownShading,
  gaps,
  nameSize,
  scoreSize,
  scoreColor,
  shadow,
  leader,
  rolling,
}: {
  at: readonly [number, number];
  crown: string;
  crownSize: [number, number];
  crownShading?: boolean;
  gaps: [number, number];
  nameSize: number;
  scoreSize: number;
  scoreColor: string;
  shadow: [number, number];
  leader: Leader;
  rolling: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute flex -translate-x-1/2 flex-col items-center whitespace-nowrap"
      style={{ left: `${at[0]}%`, top: `${at[1]}%`, gap: u(gaps[1]), filter: `drop-shadow(0 ${u(shadow[0])} ${u(shadow[1])} rgba(0,0,0,0.8))` }}
    >
      <div className="relative flex flex-col items-center" style={{ gap: u(gaps[0]) }}>
        <img src={artUrl(crown)} alt="" aria-hidden="true" className="block max-w-none" style={{ width: u(crownSize[0]), height: u(crownSize[1]) }} />
        <p className="font-medium leading-[normal] text-white" style={{ fontSize: u(nameSize), fontFamily: '"Inter", "Inter Variable", var(--font-sans)' }}>
          {leader.name}
        </p>
        {crownShading && (
          <img src={artUrl('gold-crown-shading')} alt="" aria-hidden="true" className="absolute left-1/2 block max-w-none -translate-x-1/2" style={{ top: u(61.857), width: u(87.978), height: u(11.505) }} />
        )}
      </div>
      <p className="font-semibold leading-[normal]" style={{ fontSize: u(scoreSize), color: scoreColor }}>
        {rolling ? <Odometer text={leader.score} label={leader.score} /> : leader.score}
      </p>
    </div>
  );
}

/** Podium group: rises in (delay --d), lifts on hover. */
function Podium({ box, delay, label, children }: { box: Box; delay: string; label: string; children: ReactNode }) {
  return (
    <div data-podium className="absolute" style={{ ...pos(box), '--d': delay }}>
      <div className="lb-lift relative h-full w-full" role="group" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

/** The medal artwork is scaled in towards its flag's centre (the flag stays its Figma size), so the ring around each flag is about half as thick: ring ≈ 15% of the flag's width on all three. (Figma: the flag fills 62% of the silver/bronze disc, 68% of the gold one.) */
const MEDAL_RING_SCALE = { silver: 0.806, bronze: 0.806, gold: 0.884 };

/** Medal coin: drops in after its podium. No flip afterwards; `float` = keeps gently hovering (India's medal). */
function Coin({ box, origin, delay, float = false, children }: { box: Box; origin: string; delay: string; float?: boolean; children: ReactNode }) {
  return (
    <div data-coin className="absolute" style={{ ...pos(box), '--d': delay, transformOrigin: origin }}>
      <div className={`relative h-full w-full ${float ? 'lb-float' : ''}`} style={{ transformOrigin: origin }}>
        {children}
      </div>
    </div>
  );
}

function PodiumScene({ rolling, art, TOP }: { rolling: boolean; art: boolean; TOP: Record<'gold' | 'silver' | 'bronze', Leader> }) {
  return (
    <div className="lb-scene relative -mx-[15%] w-[130%] lg:mx-0 lg:w-full" style={{ aspectRatio: '2033 / 813.0808715820312', containerType: 'inline-size' }}>
      {/* the scene keeps its size; its layers render once the leaderboard art has loaded (artStore.ts) */}
      {art && (
      <>
      {/* Paint order as in Figma: silver, bronze, gold on top */}
      <Podium box={GROUPS.silver} delay="0.2s" label={`2nd place, ${TOP.silver.name}, ${TOP.silver.score} brokerage saved`}>
        <div className="lb-body absolute inset-0">
          <Layers layers={SILVER_BELOW} />
        </div>
        <Details at={DETAILS.silver} crown="silver-crown" crownSize={[82.455, 53.479]} gaps={[16.815, 20]} nameSize={36} scoreSize={44} scoreColor="#ffffff" shadow={[4.139, 12.418]} leader={TOP.silver} rolling={rolling} />
        <div className="lb-body absolute inset-0">
          <Layers layers={SILVER_ABOVE} />
        </div>
        <Coin box={SILVER_MEDAL_BOX} origin="50% 50%" delay="0.2s" float>
          {/* medal artwork pulled in towards the flag: thinner ring, same flag size */}
          <div className="absolute inset-0" style={{ transform: `scale(${MEDAL_RING_SCALE.silver})`, transformOrigin: '49.7% 49.91%' }}>
            <Layers layers={SILVER_MEDAL} />
          </div>
          {/* the India flag flips over to Anish now and then (animation: .lb-flip in globals.css) */}
          <div className="lb-flip absolute" style={pos(SILVER_FLAG_BOX)}>
            <div className="lb-flip-card">
              <span className="lb-flip-face">
                <Flag country="india" variant="podium-india" className="size-full" />
              </span>
              <span className="lb-flip-face lb-flip-back">
                <img src="/anish-face.webp" alt="" width="192" height="192" decoding="async" draggable={false} className="block size-full" />
              </span>
            </div>
          </div>
        </Coin>
      </Podium>

      <Podium box={GROUPS.bronze} delay="0s" label={`3rd place, ${TOP.bronze.name}, ${TOP.bronze.score} brokerage saved`}>
        <div className="lb-body absolute overflow-hidden" style={pos(BRONZE_PODIUM.frame)}>
          <Img src="bronze-crystal" box={BRONZE_PODIUM.crystal} />
        </div>
        <Coin box={BRONZE_MEDAL.frame} origin="50% 18.79%" delay="0s">
          <div className="absolute inset-0 overflow-hidden" style={{ transform: `scale(${MEDAL_RING_SCALE.bronze})`, transformOrigin: '50.21% 18.83%' }}>
            <Img src="bronze-medal" box={BRONZE_MEDAL.medal} />
          </div>
          <Flag country="usa" variant="podium-usa-bronze" className="absolute" style={pos(BRONZE_MEDAL.flag)} />
        </Coin>
        <Details at={DETAILS.bronze} crown="bronze-crown" crownSize={[67.405, 43.718]} gaps={[13.746, 22]} nameSize={36.656} scoreSize={45.82} scoreColor="#ffc79a" shadow={[3.384, 10.151]} leader={TOP.bronze} rolling={rolling} />
      </Podium>

      <Podium box={GROUPS.gold} delay="0.45s" label={`1st place, ${TOP.gold.name}, ${TOP.gold.score} brokerage saved`}>
        <div className="lb-body absolute overflow-hidden" style={pos(GOLD_PODIUM.frame)}>
          <Img src="gold-crystal" box={GOLD_PODIUM.crystal} />
          {/* Light sweeping across the gold crystal (masked to its shape) */}
          <span
            aria-hidden="true"
            className="lb-sheen absolute"
            style={{ ...pos(GOLD_PODIUM.crystal), maskImage: `url("${artUrl('gold-crystal')}")`, WebkitMaskImage: `url("${artUrl('gold-crystal')}")`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
          >
            <span />
          </span>
        </div>
        <Coin box={GOLD_MEDAL.frame} origin="50% 18.83%" delay="0.45s">
          <div className="absolute inset-0 overflow-hidden" style={{ transform: `scale(${MEDAL_RING_SCALE.gold})`, transformOrigin: '50.12% 18.86%' }}>
            <Img src="gold-medal" box={GOLD_MEDAL.medal} />
          </div>
          <Flag country="usa" variant="podium-usa-gold" className="absolute" style={pos(GOLD_MEDAL.flag)} />
        </Coin>
        <Details at={DETAILS.gold} crown="gold-crown" crownSize={[105.303, 67.912]} crownShading gaps={[13.746, 22]} nameSize={36.656} scoreSize={45.82} scoreColor="#ffd873" shadow={[3.384, 10.151]} leader={TOP.gold} rolling={rolling} />
      </Podium>
      </>
      )}
    </div>
  );
}

/** Prev / Next pill, same 3D key as the rest of the page. */
function PagerButton({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn-key-light flex h-9 min-w-[5.25rem] items-center justify-center gap-1.5 px-4 text-[0.75rem] font-extrabold disabled:pointer-events-none disabled:opacity-30 lg:h-10 lg:text-[0.8125rem]"
    >
      {children}
    </button>
  );
}

/** Table footer: page N of M, with Prev / Next. Hidden when everything fits on one page. */
function Pager({ page, pages, loading, onChange }: { page: number; pages: number; loading: boolean; onChange: (p: number) => void }) {
  if (pages <= 1) return null;
  const from = PODIUM + (page - 1) * PAGE_SIZE + 1;
  return (
    <nav aria-label="Leaderboard pages" className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-[0.875rem] py-[0.75rem] lg:px-[1.546rem] lg:py-[1rem]">
      <PagerButton onClick={() => onChange(page - 1)} disabled={page <= 1 || loading}>
        <span aria-hidden="true">←</span> Prev
      </PagerButton>
      <p aria-live="polite" className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-fg-muted lg:text-[0.75rem]">
        {loading ? 'Loading…' : `Page ${page} of ${pages} · from #${from}`}
      </p>
      <PagerButton onClick={() => onChange(page + 1)} disabled={page >= pages || loading}>
        Next <span aria-hidden="true">→</span>
      </PagerButton>
    </nav>
  );
}

/** Places 4 onward (desktop sizes = Figma ÷ 2, in rem; phones get a compact row). */
function RankingsTable({
  rows: ROWS,
  page,
  pages,
  loading,
  error,
  onPage,
}: {
  rows: Leader[];
  page: number;
  pages: number;
  loading: boolean;
  error: string | null;
  onPage: (p: number) => void;
}) {
  return (
    <div
      className="relative z-10 -mt-[1.5%] overflow-hidden rounded-[1rem] border-[0.0625rem] border-white/[0.07] pb-[0.375rem] shadow-[0_-0.773rem_2.319rem_rgba(0,0,0,0.45)] backdrop-blur-[0.773rem] lg:-mt-[5.66%] lg:rounded-[1.159rem] lg:border-[0.0966rem]"
      style={{ background: 'linear-gradient(to bottom, rgba(6,21,15,0.92), rgba(6,21,15,0.97))' }}
    >
      <div className="flex h-[2.75rem] items-center border-b-[0.0625rem] border-white/[0.07] px-[0.875rem] text-[0.75rem] font-medium capitalize tracking-[0.04em] text-[#bdb7ae] lg:h-[3.875rem] lg:border-b-[0.0966rem] lg:pl-[1.739rem] lg:pr-[1.546rem] lg:text-[1rem] lg:tracking-[0.06rem]">
        <span className="w-[2.75rem] shrink-0 lg:w-[4.031rem]">Rank</span>
        <span className="flex-1">Participant</span>
        <span>Brokerage saved</span>
      </div>
      <ol aria-label={`Places ${PODIUM + (page - 1) * PAGE_SIZE + 1} onward`}>
        {ROWS.map((row, i) => (
          <li
            key={row.rank}
            data-row
            // page 1 waits for the podiums to rise; a page you clicked to should answer at once
            style={{ '--d': `${(page === 1 ? 0.9 : 0) + i * 0.07}s` }}
            className="group flex h-[3.75rem] items-center gap-[0.875rem] px-[0.875rem] transition-colors duration-300 hover:bg-[rgba(46,229,157,0.045)] lg:h-[4.625rem] lg:gap-[1.75rem] lg:px-[1.546rem]"
          >
            <span
              className="flex size-[1.875rem] shrink-0 items-center justify-center rounded-full border-[0.0625rem] border-[rgba(46,229,157,0.75)] text-[0.75rem] font-medium text-[#effff7] shadow-[0_0_0.479rem_rgba(46,229,157,0.18)] transition-shadow duration-300 group-hover:shadow-[0_0_0.9rem_rgba(46,229,157,0.45)] lg:size-[2.156rem] lg:border-[0.084rem] lg:text-[0.8525rem]"
              style={{ background: 'linear-gradient(to bottom, #06140f, #000000)' }}
            >
              <span className="sr-only">Rank </span>
              {row.rank}
            </span>
            <div className={`flex h-full min-w-0 flex-1 items-center gap-[0.75rem] lg:gap-[1.449rem] ${i < ROWS.length - 1 ? 'border-b-[0.0625rem] border-white/[0.07] lg:border-b-[0.0966rem]' : ''}`}>
              <p className="min-w-0 flex-1 truncate text-[0.9375rem] font-semibold text-[#ece8e2] transition-colors duration-300 group-hover:text-white lg:text-[1.25rem]">{row.name}</p>
              <Flag country="india" className="size-[1.5rem] shrink-0 transition-transform duration-300 group-hover:scale-110 lg:size-[2.125rem]" />
              <div className="flex shrink-0 flex-col items-end gap-[0.125rem] text-right font-medium leading-[normal] lg:gap-[0.193rem]">
                <p className="text-[1rem] text-white lg:text-[1.375rem]">
                  <span className="sr-only">brokerage saved </span>
                  {row.score}
                </p>
                <p className="text-[0.6875rem] text-white/50 lg:text-[1rem]">{row.pct} of #1</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      {ROWS.length === 0 && !loading && (
        <p className="px-[0.875rem] py-[1.5rem] text-center text-[0.875rem] text-fg-subtle lg:px-[1.546rem]">
          {error ?? 'Places 4 and below open up as more traders join the pool.'}
        </p>
      )}
      <Pager page={page} pages={pages} loading={loading} onChange={onPage} />
    </div>
  );
}

export default function Leaderboard({ board }: { board?: BoardData | null }) {
  const ref = useRef<HTMLElement>(null);
  const standings = fromBoard(board);

  const [page, setPage] = useState(1);
  // page 1 arrives with the page itself; later pages are fetched from /api/leaderboard and kept
  const [fetched, setFetched] = useState<Record<number, Leader[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pages = standings?.pages ?? 0;
  const rows = standings ? (page === 1 ? standings.firstPage : (fetched[page] ?? [])) : [];

  // Paging is a click, not an effect: fetch the page we're moving to unless we already hold it.
  const onPage = async (next: number) => {
    if (!standings || next < 1 || next > pages) return;
    setPage(next);
    setError(null);
    if (next === 1 || fetched[next]) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?page=${next}`);
      if (!res.ok) throw new Error(String(res.status));
      const data: { rows: { rank: number; participant: string; score: number }[] } = await res.json();
      setFetched((f) => ({ ...f, [next]: data.rows.map((r) => toLeader(r, standings.best)) }));
    } catch {
      setError('Couldn’t load that page. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  };
  const [landed, setLanded] = useState(false);
  // the podium artwork arrives as one chunk after page load (or when this section is near)
  const art = useLeaderboardArt(ref);
  // the entrance (podiums rise, medals drop, scores roll) plays once landed AND the artwork is in
  const inView = landed && art;

  // Play the entrance once, when the leaderboard scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onLanded(el, () => setLanded(true));
  }, []);

  return (
    <section ref={ref} id="leaderboard" aria-labelledby="leaderboard-heading" className={`lb fold snap-start arena-container relative overflow-x-clip py-10 lg:py-12 ${inView ? 'lb-in' : ''}`}>
      <div data-reveal="true" className="relative text-center">
        <p className="inline-flex items-center gap-2 rounded-full neu-inset px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent">
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-accent" />
          Tournament standings
        </p>
        <h2 id="leaderboard-heading" className="mt-4 text-[clamp(1.875rem,6vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-fg [text-shadow:0_0_50px_rgb(var(--glow)/0.45)]">
          The Leaderboard
        </h2>
        <p className="mx-auto mt-3 max-w-[44ch] text-pretty text-[0.9375rem] font-medium leading-relaxed text-fg-muted lg:text-lg">
          Ranked by brokerage saved from the {POOL.amount} pool.
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-fg-subtle">
          {standings ? (
            <>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
              Live · updated {standings.updatedAt}
            </>
          ) : (
            'Standings unavailable'
          )}
        </p>
      </div>

      {standings ? (
        <div data-sticky-avoid className="relative mx-auto mt-8 w-full max-w-[63.53rem] lg:mt-12">
          <PodiumScene rolling={inView} art={art} TOP={standings.top} />
          <RankingsTable rows={rows} page={page} pages={pages} loading={loading} error={error} onPage={onPage} />
        </div>
      ) : (
        <p className="mx-auto mt-8 max-w-[44ch] rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-8 text-center text-[0.9375rem] text-fg-muted lg:mt-12">
          Standings are temporarily unavailable. Check back shortly.
        </p>
      )}
    </section>
  );
}
