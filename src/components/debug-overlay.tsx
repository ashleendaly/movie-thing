export function DebugOverlay() {
  return (
    <div className="fixed left-5 top-5 z-[9999] grid place-items-center rounded-xl bg-lime-500 px-3 py-2 font-mono font-semibold sm:bg-amber-500 md:bg-red-500 lg:bg-purple-500 xl:bg-sky-500 2xl:bg-emerald-500">
      <h1 className="block sm:hidden">&lt;sm</h1>
      <h1 className="hidden sm:block md:hidden">sm</h1>
      <h1 className="hidden md:block lg:hidden">md</h1>
      <h1 className="hidden lg:block xl:hidden">lg</h1>
      <h1 className="hidden xl:block 2xl:hidden">xl</h1>
      <h1 className="hidden 2xl:block">2xl</h1>
    </div>
  );
}
