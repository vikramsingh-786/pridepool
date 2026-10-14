"use client";

import Image from "next/image";
import { useState } from "react";

// Click-to-load: a poster + play key until pressed, then the real YouTube player.
// Keeps ~800 KB of player JS off the page until someone wants the clip.
export default function ShortPlayer({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full cursor-pointer"
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/oardefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 22rem, 80vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <span
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/10"
      />
      <span
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition-colors duration-200 group-hover:bg-white/25"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" className="ml-0.5">
          <path d="M7 4.5v15a1 1 0 0 0 1.5.87l12-7.5a1 1 0 0 0 0-1.74l-12-7.5A1 1 0 0 0 7 4.5Z" fill="currentColor" />
        </svg>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-5 text-left">
        <span className="block text-[0.625rem] font-bold uppercase tracking-[0.18em] text-accent">
          YouTube Short
        </span>
        <span className="mt-1 block text-base font-bold text-fg">Watch the moment</span>
      </span>
    </button>
  );
}
