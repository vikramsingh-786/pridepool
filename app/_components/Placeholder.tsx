import type { ReactNode } from "react";

export default function Placeholder({ children }: { children: ReactNode }) {
  return <span data-placeholder>{children}</span>;
}
