import { type ClassValue } from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Tooltip } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils/cn";
import { type ClubMember } from "~/types";

export function UserAvatar({
  member,
  className,
}: {
  member: ClubMember;
  className?: ClassValue;
}) {
  return (
    <Tooltip tip={member.user.username!} delay={100}>
      <Avatar
        className={cn(
          "transition-all hover:z-10 hover:scale-105",
          !member.isPresent && "brightness-75",
          className,
        )}
      >
        <AvatarImage src={member.user.imageUrl} />
        <AvatarFallback>{member.user.username?.at(0)}</AvatarFallback>
      </Avatar>
    </Tooltip>
  );
}
