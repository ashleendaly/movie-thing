import { type ClassValue } from "clsx";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { cn } from "~/lib/utils/cn";
import { CardContent } from "./card-content";

export function AddClubDrawer({ className }: { className?: ClassValue }) {
  return (
    <div className={cn(className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="secondary" className="h-16 w-full" size="lg">
            Add a Club
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <Card className="flex w-full flex-col items-center gap-3 border-none pt-16">
            <CardContent />
          </Card>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
