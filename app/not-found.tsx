import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-32">
      <p className="eyebrow">Sheet 404</p>
      <h1 className="display d-xl mt-8">Nothing drawn here.</h1>
      <p className="lede mt-6">
        The listing may have been sold, let, or pulled from the register while it is re-surveyed.
      </p>
      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/properties" className="btn btn-solid" data-cursor="OPEN">Open the register</Link>
        <Link href="/" className="btn" data-cursor="HOME">Back to the front</Link>
      </div>
    </section>
  );
}
