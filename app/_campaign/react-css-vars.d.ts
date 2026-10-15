// Lets inline styles use CSS custom properties, e.g. style={{ '--reveal-delay': '0.1s' }}
import 'react';
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
