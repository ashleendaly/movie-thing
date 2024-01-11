"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/utils/api";

const clubCreationSchema = z.object({
  clubName: z.string().regex(/^\w[\w-]*\w$/, "Invalid club name"),
});

type formData = z.infer<typeof clubCreationSchema>;

export function CreateClub() {
  const { mutateAsync: createClubAsync } = api.club.admin.create.useMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(clubCreationSchema),
  });

  const onSubmit = handleSubmit(({ clubName }) => {
    void toast.promise(
      createClubAsync({ name: clubName }).then(({ name: clubName }) =>
        router.push(`/club/${clubName}`),
      ),
      {
        success: "Success!",
        loading: "Loading...",
        error: "Oops this name is taken",
      },
    );
  });

  useEffect(() => {
    if (errors.clubName?.message) toast.error(errors.clubName.message);
  }, [errors]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 py-10">
      <div>
        <Label className="text-lg text-foreground/90">Name</Label>
        <Input
          className="text-white"
          type="text"
          placeholder="Club Name"
          {...register("clubName")}
        />
      </div>
      <Button size="lg" className="h-16 text-lg">
        Create
      </Button>
    </form>
  );
}
