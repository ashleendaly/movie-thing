import { type ClassValue } from "clsx";
import { QRCodeSVG } from "qrcode.react";
import { env } from "~/env";
import { cn } from "~/lib/utils/cn";

export function Code({
  joinCode,
  className,
}: {
  joinCode: string;
  className?: ClassValue;
}) {
  return (
    <div className={cn(className)}>
      <p className="pb-3 text-sm italic underline">Join this club:</p>
      <QRCodeSVG
        className="border-8 border-solid border-primary p-5"
        value={`${env.NEXT_PUBLIC_OUR_URL}/join/${joinCode}`}
        bgColor="hsl(var(--background))"
        fgColor="hsl(var(--foreground))"
        size={256}
      />
    </div>
  );
}
