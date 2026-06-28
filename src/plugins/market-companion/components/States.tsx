// Native (nolvusfilter-themed) empty / error states for the market plugin.
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid h-full place-items-center p-8 text-center text-[12.5px] text-poe-text/60">{message}</div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="grid h-full place-items-center p-8 text-center text-[12.5px] text-red-400">{message}</div>
  );
}
