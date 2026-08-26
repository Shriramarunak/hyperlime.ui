import { useSyncExternalStore, type ReactNode } from "react";

const emptySubscribe = () => () => {};

export function NoSsr({ children }: { children: ReactNode }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  return mounted ? children : null;
}

export function CssBaseline() {
  return null;
}

export function InitColorSchemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html:
          "document.documentElement.dataset.theme=localStorage.getItem('vb-theme')||'dark'",
      }}
    />
  );
}
