/** Corner ticks and edge coordinates — the border of a drawing sheet. */
export default function SheetFrame() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[21] hidden lg:block">
      <div className="absolute inset-6">
        <span className="corner-tick absolute left-0 top-0 border-l border-t" />
        <span className="corner-tick absolute right-0 top-0 border-r border-t" />
        <span className="corner-tick absolute bottom-0 left-0 border-b border-l" />
        <span className="corner-tick absolute bottom-0 right-0 border-b border-r" />
      </div>
      <span
        className="data absolute left-6 top-1/2 origin-left -translate-y-1/2 -rotate-90 text-[0.55rem]"
        style={{ transformOrigin: "left center" }}
      >
        17°23′N &nbsp; 78°28′E
      </span>
      <span
        className="data absolute right-6 top-1/2 origin-right -translate-y-1/2 rotate-90 text-[0.55rem]"
        style={{ transformOrigin: "right center" }}
      >
        Sheet 01 of 01 — Rev. C
      </span>
    </div>
  );
}
