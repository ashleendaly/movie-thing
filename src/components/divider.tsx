export function Divider({ label }: { label?: string }) {
  return (
    <div className="flex w-full items-center gap-2 px-5 text-slate-400">
      <div className="h-[1px] w-full bg-slate-400/30">&nbsp;</div>
      {label && (
        <>
          <p>{label}</p>
          <div className="h-[1px] w-full bg-slate-400/30">&nbsp;</div>
        </>
      )}
    </div>
  );
}
