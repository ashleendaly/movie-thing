import { type ClassValue } from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Tooltip } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils/cn";
import { type ClubMember } from "~/types";

export function UserAvatar({
  member: { isPresent, username, imageUrl },
  className,
}: {
  member: ClubMember;
  className?: ClassValue;
}) {
  return (
    <Tooltip tip={username ?? "Unnamed User"} delay={100}>
      <div
        className={cn(
          "relative h-10 w-10 transition-all hover:z-10 hover:scale-105",
          !isPresent && "brightness-75",
          className,
        )}
      >
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{username?.at(0)}</AvatarFallback>
        </Avatar>
        <div
          id="activity indicator"
          className={cn(
            "absolute -bottom-1 right-0 h-3 w-3 rounded-full",
            isPresent ? "bg-green-500" : "bg-red-500",
          )}
        />
      </div>
    </Tooltip>
  );
}
