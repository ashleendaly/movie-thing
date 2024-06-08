import { type ClassValue } from "clsx";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { cn } from "~/lib/utils/cn";
import { CardContent } from "./card-content";

export function AddClubDialog({ className }: { className?: ClassValue }) {
  return (
    <div className={cn(className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="h-16 w-full" size="lg">
            Add a Club
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[70dvh]">
          <Card className="flex w-full flex-col items-center gap-3 border-x-thick border-y-thick border-primary pt-16">
            <CardContent />
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
