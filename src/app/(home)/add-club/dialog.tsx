import { type ClassValue } from "clsx";
import { Card } from "~/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { cn } from "~/lib/utils/cn";
import { CardContent, Trigger } from "./card-content";

export function AddClubDialog({ className }: { className?: ClassValue }) {
  return (
    <div className={cn(className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Trigger />
        </DialogTrigger>
        <DialogContent>
          <Card className="flex w-full flex-col items-center gap-3 border-x-thick border-y-thick border-primary py-16">
            <CardContent />
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
