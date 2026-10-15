import type { Box } from './layers';
import { artUrl } from './artStore';

/** Circular country flag, built like the Figma "Flag/…" components: flag artwork clipped by a circle mask → base ring → gloss → outline. Assets: ./svg/flag-*.svg, bundled into art.ts */
export type Country = 'india' | 'usa' | 'uk' | 'singapore';
type Variant = 'row' | 'podium-india' | 'podium-usa-gold' | 'podium-usa-bronze';

const ART_BOX: Record<Country, Box> = {
  india: [0, 0, 100, 100],
  usa: [0, 0, 100, 100.1],
  uk: [-7.07, -7.07, 114.14, 114.15],
  singapore: [0, 0, 100, 100],
};

const NAMES: Record<Country, string> = { india: 'India', usa: 'United States', uk: 'United Kingdom', singapore: 'Singapore' };

function files(variant: Variant, country: Country) {
  if (variant === 'row') {
    return { mask: 'flag-row-mask', art: `flag-row-art-${country}`, base: 'flag-row-base', gloss: 'flag-row-gloss', outline: 'flag-row-outline', outlineBox: [0, 0, 100, 100] as Box };
  }
  const set = variant === 'podium-india' ? 'india-podium' : variant === 'podium-usa-gold' ? 'usa-gold' : 'usa-bronze';
  // India artwork fits any podium medal (every set is a full-box circle); the medal keeps its own ring and gloss
  const art = country === 'india' ? 'india-podium' : set;
  return { mask: `flag-${art}-mask`, art: `flag-${art}-art`, base: `flag-${set}-base`, gloss: `flag-${set}-gloss`, outline: `flag-${set}-outline`, outlineBox: [-0.857, -0.857, 101.714, 101.714] as Box };
}

const pos = ([l, t, w, h]: Box) => ({ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%` });
const url = artUrl;

export default function Flag({ country, variant = 'row', className = '', style }: { country: Country; variant?: Variant; className?: string; style?: React.CSSProperties }) {
  const f = files(variant, country);
  // keeps its box but draws nothing until the leaderboard art has loaded (artStore.ts)
  if (!url(f.base)) return <span role="img" aria-label={NAMES[country]} className={`relative block overflow-hidden ${className}`} style={style} />;
  const mask = `url("${url(f.mask)}")`;
  return (
    <span role="img" aria-label={NAMES[country]} className={`relative block overflow-hidden ${className}`} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ maskImage: mask, WebkitMaskImage: mask, maskSize: '100% 100%', WebkitMaskSize: '100% 100%', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat' }}
      >
        <img src={url(f.art)} alt="" draggable={false} className="absolute block max-w-none" style={pos(ART_BOX[country])} />
      </span>
      <img src={url(f.base)} alt="" aria-hidden="true" draggable={false} className="absolute inset-0 block size-full max-w-none" />
      <img src={url(f.gloss)} alt="" aria-hidden="true" draggable={false} className="absolute block max-w-none" style={pos([7.5, 7.5, 70, 45])} />
      <img src={url(f.outline)} alt="" aria-hidden="true" draggable={false} className="absolute block max-w-none" style={pos(f.outlineBox)} />
    </span>
  );
}
