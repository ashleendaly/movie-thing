import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const joinSchema = z.object({
  code: z.string().min(2),
});

export function JoinClub() {
  const [code, setCode] = useState("");

  type formData = z.infer<typeof joinSchema>;

  const { register, handleSubmit } = useForm<formData>({
    resolver: zodResolver(joinSchema),
  });

  const onSubmit = (data: formData) => {
    setCode(data.code);
  };
  return (
    <form
      className="flex flex-col gap-5 py-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label className="text-lg text-foreground/90">Code</Label>
        <Input
          className="text-white"
          type="text"
          placeholder="123-456-789"
          {...register("code")}
        />
      </div>
      <Button size="lg" className="h-16 w-full text-lg">
        Join
      </Button>
    </form>
  );
}
