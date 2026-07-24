/** Small inline chart — a dependency-free alternative to pulling in a chart library. */
export default function BarChart({
  data,
  label,
}: {
  data: Array<{ key: string; value: number }>;
  label: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <figure className="border border-line bg-void-2/40 p-5">
      <figcaption className="data mb-6">{label}</figcaption>
      <div className="flex h-40 items-end gap-2">
        {data.map((d) => (
          <div key={d.key} className="flex flex-1 flex-col items-center gap-2">
            <span className="data-lg text-[0.65rem] text-gold">{d.value}</span>
            <div
              className="w-full bg-gold/25 transition-[height] duration-700"
              style={{ height: `${(d.value / max) * 100}%`, minHeight: 2 }}
            >
              <div className="h-px w-full bg-gold" />
            </div>
            <span className="data text-[0.5rem]">{d.key}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
