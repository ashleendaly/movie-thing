import { type ClassValue } from "clsx";
import { Button } from "~/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { cn } from "~/lib/utils/cn";
import { Code } from "./code";

export function QRDrawer({
  joinCode,
  className,
}: {
  joinCode: string;
  className?: ClassValue;
}) {
  return (
    <div className={cn(className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="accent">Show QR Code</Button>
        </DrawerTrigger>
        <DrawerContent className="grid place-items-center pb-5">
          <Code joinCode={joinCode} className="mt-5 text-center font-bold" />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
