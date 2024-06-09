"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/lib/utils/api";

const joinSchema = z.object({
  code: z.string().min(2),
});

type formData = z.infer<typeof joinSchema>;

export function JoinClub() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<formData>({
    resolver: zodResolver(joinSchema),
  });

  const { mutateAsync: joinClubAsync } = api.club.members.join.useMutation();

  const onSubmit = handleSubmit((data) => {
    void toast.promise(
      joinClubAsync({ joinCode: data.code }).then(({ name: clubName }) =>
        router.push(`/club/${clubName}`),
      ),
      {
        success: "Success!",
        loading: "Loading...",
        error: "Invalid Join Code",
      },
    );
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <div>
        <Label className="text-lg text-foreground/90">Code</Label>
        <Input
          className="text-white"
          type="text"
          placeholder="123-456-789"
          {...register("code")}
        />
      </div>
      <Button variant="accent" size="lg" className="h-16 w-full text-lg">
        Join
      </Button>
    </form>
  );
}
