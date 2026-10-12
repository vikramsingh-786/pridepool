import Image from "next/image";
import ArenaBackdrop from "./ArenaBackdrop";
import Placeholder from "./Placeholder";
import HeroConfetti from "./HeroConfetti";
import { JOIN_HREF } from "../_lib/links";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      <ArenaBackdrop />
      <HeroConfetti />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[11] hidden xl:block">
        <div className="arena-container relative xl:max-w-[100rem]">
          <div className="hero-figure absolute bottom-0 left-[clamp(1.25rem,4vw,3rem)]">
            <div
              aria-hidden
              className="hero-figure-rim pointer-events-none absolute -inset-x-[24%] -top-[8%] bottom-[6%] -z-10"
            />
            <Image
              src="/anish.webp"
              alt="Anish Singh Thakur"
              width={629}
              height={904}
              priority
              sizes="min(40vw, 629px)"
              className="arena-enter select-none"
              style={{ "--e-delay": "0.34s" } as React.CSSProperties}
            />
            <div
              aria-hidden
              className="hero-figure-base pointer-events-none absolute inset-x-[-10%] bottom-0 h-24"
            />
          </div>
        </div>
      </div>
      <div className="relative z-10 border-b border-white/5 backdrop-blur-sm">
        <div className="arena-container grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3.5">
          <div className="col-start-2 flex items-center gap-4 sm:gap-6">
            <Image src="/lemonn-white.svg" alt="Lemonn" width={193} height={52} priority className="h-6 w-auto sm:h-7 lg:h-8" />
            <span aria-hidden className="text-2xl font-light leading-none text-fg-muted sm:text-3xl">×</span>
            <span className="flex h-10 w-32 items-center justify-center rounded-xl bg-white px-2 sm:h-11 sm:w-36 lg:h-12 lg:w-40">
              <Image
                src="/bomming-bulls-icon.webp"
                alt="Booming Bulls Academy"
                width={2170}
                height={725}
                priority
                sizes="160px"
                className="h-full w-full object-contain"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex flex-1 items-center xl:mt-auto xl:min-h-[calc(var(--hero-pw)*1.2131)] xl:flex-none">
        <div className="arena-container py-14 md:py-16 lg:py-20 xl:max-w-[100rem] xl:py-0">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[var(--hero-pw)_minmax(0,1fr)] xl:gap-16">
            <div className="relative text-center lg:col-start-2 lg:row-start-1 lg:text-left">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-16 -inset-y-20 -z-10 lg:-left-4"
                style={{
                  background:
                    "radial-gradient(ellipse 62% 58% at 42% 50%, rgba(11,11,15,0.92) 0%, rgba(11,11,15,0.78) 45%, transparent 82%)",
                }}
              />
              <div
                className="arena-enter flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start"
                style={{ "--e-delay": "0.05s" } as React.CSSProperties}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-accent xl:text-xs">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-accent" />
                  The Pride Pool
                </span>
                <span className="text-sm font-extrabold tracking-tight text-violet sm:text-base xl:text-lg">
                  World Trading Championship · Celebration
                </span>
              </div>
              <h1
                id="hero-heading"
                className="arena-enter mt-5 font-extrabold leading-[0.88] tracking-[-0.045em] text-fg"
                style={{ "--e-delay": "0.14s" } as React.CSSProperties}
              >
                <span
                  className="arena-reveal block text-[clamp(3.5rem,13.5vw,8rem)] lg:text-[clamp(4rem,8vw,6rem)] xl:text-[clamp(5.5rem,8.5vw,9rem)] text-gold-bright [text-shadow:0_0_90px_rgba(255,201,120,0.45)]"
                  style={{ "--r-delay": "0.18s" } as React.CSSProperties}
                >
                  ₹1 Crore
                </span>
                <span
                  className="arena-reveal mt-1.5 block text-[clamp(1.375rem,4.4vw,2.625rem)] leading-[1.05] xl:text-[clamp(2.5rem,3.8vw,3.5rem)]"
                  style={{ "--r-delay": "0.42s" } as React.CSSProperties}
                >
                  Brokerage Credits Pool
                </span>
              </h1>
              <p
                className="arena-enter mt-3 text-[clamp(1.0625rem,2.2vw,1.375rem)] font-semibold text-fg xl:text-[1.75rem]"
                style={{ "--e-delay": "0.2s" } as React.CSSProperties}
              >
                for India&rsquo;s trading community
              </p>
              <p
                className="arena-enter mt-4 flex justify-center lg:justify-start"
                style={{ "--e-delay": "0.22s" } as React.CSSProperties}
              >
                <a
                  href="#giveaway"
                  className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-3.5 py-1.5 text-[0.8125rem] font-bold text-accent transition-colors duration-200 hover:bg-accent/20"
                >
                  <span aria-hidden>💻</span>
                  <Placeholder>+ 20 laptops to be won</Placeholder>
                </a>
              </p>
              <p
                className="arena-enter mx-auto mt-5 max-w-[42ch] text-pretty text-base font-medium leading-relaxed text-fg/90 lg:mx-0 md:text-[1.0625rem] xl:text-xl"
                style={{ "--e-delay": "0.24s" } as React.CSSProperties}
              >
                Celebrating Anish Singh Thakur&rsquo;s achievement at the World
                Trading Championship.
              </p>
              <div
                className="arena-enter mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
                style={{ "--e-delay": "0.32s" } as React.CSSProperties}
              >
                <a
                  href={JOIN_HREF}
                  className="arena-cta inline-flex h-[3.25rem] items-center justify-center gap-2 btn-key px-7 text-[0.9375rem] xl:h-16 xl:px-10 xl:text-lg font-extrabold tracking-[-0.01em]"
                >
                  Join the ₹1 Crore Pool
                  <span aria-hidden>→</span>
                </a>
                <p className="flex items-center gap-2 text-sm font-semibold text-fg/85 xl:text-base">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
                  Existing Lemonn users are already in
                </p>
              </div>
            </div>
            <div className="relative order-first -mb-14 w-full max-w-[16rem] justify-self-center sm:-mb-16 sm:max-w-[20rem] lg:order-none lg:mb-0 lg:max-w-[25rem] xl:hidden">
              <div
                aria-hidden
                className="hero-figure-rim pointer-events-none absolute -inset-x-[24%] -top-[8%] bottom-[6%] -z-10"
              />
              <Image
                src="/anish.webp"
                alt="Anish Singh Thakur"
                width={629}
                height={904}
                priority
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 256px"
                className="arena-enter h-auto w-full select-none"
                style={
                  {
                    "--e-delay": "0.34s",
                    // Fade the photo itself rather than overlaying a dark band,
                    // which showed as a black block on the violet background.
                    maskImage: "linear-gradient(to bottom, #000 62%, transparent 84%)",
                    WebkitMaskImage: "linear-gradient(to bottom, #000 62%, transparent 84%)",
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
