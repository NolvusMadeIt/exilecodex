import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MarketTicker from "./components/MarketTicker";

// The popped-out ticker window (#/ticker) — just the scrolling banner, full-bleed, draggable so it
// can float over the game. It reads the same league/base from the shared settings store, so it
// mirrors the main window. Its own QueryClient (it renders outside MarketRoot's provider).
const qc = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false, retry: 1 } },
});

export default function TickerStandalone() {
  return (
    <QueryClientProvider client={qc}>
      <div
        className="fixed inset-0 flex items-center bg-poe-bg"
        style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      >
        <MarketTicker standalone />
      </div>
    </QueryClientProvider>
  );
}
