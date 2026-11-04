function LoadingRows() {
  return (
    <div className="mt-6 space-y-3">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
          <div className="h-10 w-10 animate-pulse rounded-full bg-ink/10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 animate-pulse rounded bg-ink/10" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-ink/5" />
          </div>
          <div className="h-7 w-20 animate-pulse rounded-full bg-ink/5" />
        </div>
      ))}
    </div>
  );
}

export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-7xl" role="status" aria-live="polite">
      <div className="h-40 animate-pulse rounded-3xl bg-ink/10" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((card) => <div key={card} className="h-36 animate-pulse rounded-2xl bg-white" />)}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {[0, 1].map((panel) => (
          <div key={panel} className="rounded-2xl border border-line bg-white p-5">
            <div className="h-6 w-40 animate-pulse rounded bg-ink/10" />
            <LoadingRows />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading admin page…</span>
    </div>
  );
}
