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
        className="block border-8 border-solid border-primary p-5 lg:hidden 2xl:block"
        value={`${env.NEXT_PUBLIC_OUR_URL}/join/${joinCode}`}
        bgColor="hsl(var(--background))"
        fgColor="hsl(var(--foreground))"
        size={240}
      />
      <QRCodeSVG
        className="hidden border-8 border-solid border-primary p-5 xl:block 2xl:hidden"
        value={`${env.NEXT_PUBLIC_OUR_URL}/join/${joinCode}`}
        bgColor="hsl(var(--background))"
        fgColor="hsl(var(--foreground))"
        size={200}
      />
      <QRCodeSVG
        className="hidden border-8 border-solid border-primary p-5 lg:block xl:hidden"
        value={`${env.NEXT_PUBLIC_OUR_URL}/join/${joinCode}`}
        bgColor="hsl(var(--background))"
        fgColor="hsl(var(--foreground))"
        size={150}
      />
    </div>
  );
}
