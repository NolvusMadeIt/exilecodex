import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MarketView from "./MarketView";

// Plugin root for the Market Companion — provides the React Query client the ported components rely
// on (the Companion used TanStack Query throughout). Styling is native nolvusfilter (poe-* tokens).
const qc = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false, retry: 1 } },
});

export function MarketRoot() {
  return (
    <QueryClientProvider client={qc}>
      <MarketView />
    </QueryClientProvider>
  );
}
