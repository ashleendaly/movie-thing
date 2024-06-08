import { type ClassValue } from "clsx";
import { cn } from "~/lib/utils/cn";
import { AddClubDialog } from "./dialog";
import { AddClubDrawer } from "./drawer";

export function AddClubButton({ className }: { className?: ClassValue }) {
  return (
    <div className={cn(className)}>
      <AddClubDialog className="hidden lg:block" />
      <AddClubDrawer className="block lg:hidden" />
    </div>
  );
}
