import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

const clubCreationSchema = z.object({
  clubName: z.string().min(2),
});

export function CreateClub() {
  const { mutateAsync: createClubAsync } = api.club.admin.create.useMutation();

  type formData = z.infer<typeof clubCreationSchema>;

  const { register, handleSubmit, reset } = useForm<formData>({
    resolver: zodResolver(clubCreationSchema),
  });

  const onSubmit = handleSubmit(async ({ clubName }) => {
    await toast.promise(createClubAsync({ name: clubName }), {
      success: "Success!",
      loading: "Loading...",
      error: (err) => err.toString(),
    });
    reset();
  });

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
