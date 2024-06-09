import { type ClassValue } from "clsx";
import { Card } from "~/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { cn } from "~/lib/utils/cn";
import { CardContent, Trigger } from "./card-content";

export function AddClubDrawer({ className }: { className?: ClassValue }) {
  return (
    <div className={cn(className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <Trigger />
        </DrawerTrigger>
        <DrawerContent>
          <Card className="flex w-full flex-col items-center gap-3 border-none py-16">
            <CardContent />
          </Card>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
