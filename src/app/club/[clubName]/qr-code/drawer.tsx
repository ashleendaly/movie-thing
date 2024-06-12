import { QrCode } from "lucide-react";
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
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-max w-6 place-self-end rounded-[4px] p-1",
            className,
          )}
        >
          <QrCode className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="grid place-items-center pb-5">
        <Code joinCode={joinCode} className="mt-5 text-center font-bold" />
      </DrawerContent>
    </Drawer>
  );
}
