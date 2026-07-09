import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MarketView from "./MarketView";
import AlertEngine from "./components/AlertEngine";

// Plugin root for the Market Companion — provides the React Query client the ported components rely
// on (the Companion used TanStack Query throughout) and mounts the alert engine, which polls your
// enabled price alerts and fires host toasts + the chime. Styling is native nolvusfilter (poe-*).
const qc = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false, retry: 1 } },
});

export function MarketRoot() {
  return (
    <QueryClientProvider client={qc}>
      <MarketView />
      <AlertEngine />
    </QueryClientProvider>
  );
}
