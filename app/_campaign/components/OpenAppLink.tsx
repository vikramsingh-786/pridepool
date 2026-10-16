'use client';

import { useSyncExternalStore, type ReactNode } from 'react';
import { OPEN_APP_URL, openAppUrl } from '../content';

const noop = () => () => {};

/** "Open Lemonn App" link for server-rendered pages (e.g. 404): the server sends the plain Adjust link, the browser then swaps in the Mac link where needed (see openAppUrl). */
export default function OpenAppLink({ className, children, ...rest }: { className?: string; children: ReactNode } & Record<`data-${string}`, string>) {
  const href = useSyncExternalStore(noop, openAppUrl, () => OPEN_APP_URL);
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}
