import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const clubCreationSchema = z.object({
  clubName: z.string().regex(/^\w[\w-]*\w$/, "Invalid club name"),
});

export function CreateClub() {
  const { mutateAsync: createClubAsync } = api.club.admin.create.useMutation();
  const router = useRouter();
  type formData = z.infer<typeof clubCreationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(clubCreationSchema),
  });

  const onSubmit = handleSubmit(({ clubName }) => {
    void toast
      .promise(createClubAsync({ name: clubName }), {
        success: "Success!",
        loading: "Loading...",
        error: "Oops this name is taken",
      })
      .then(({ name: clubName }) => router.push(`/club/${clubName}`));
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
