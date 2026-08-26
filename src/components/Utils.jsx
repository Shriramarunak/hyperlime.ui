import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function NoSsr({ children }) {
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
