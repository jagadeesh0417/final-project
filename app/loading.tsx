export default function Loading() {
  return (
    <div className="shell py-40">
      <div className="h-3 w-32 animate-pulse bg-line" />
      <div className="mt-8 h-16 w-full max-w-2xl animate-pulse bg-line/60" />
      <div className="mt-4 h-16 w-full max-w-xl animate-pulse bg-line/40" />
      <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-[420px] animate-pulse border border-line bg-void-2/40" />
        ))}
      </div>
      <p className="sr-only">Loading</p>
    </div>
  );
}
