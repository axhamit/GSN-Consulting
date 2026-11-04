export default function Loading() {
  return (
    <div className="container-x min-h-[50vh] py-12" role="status" aria-live="polite" aria-label="Loading page">
      <div className="animate-pulse">
        <div className="h-40 rounded-3xl bg-ink/10" />
        <div className="mt-8 h-5 max-w-sm rounded bg-ink/10" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="h-32 rounded-2xl bg-ink/5" />
          <div className="h-32 rounded-2xl bg-ink/5" />
        </div>
      </div>
      <span className="sr-only">Loading page content…</span>
    </div>
  );
}
