import Link from "next/link";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const joinSchema = z.object({
  code: z.string().min(2),
});

export function AddClubButton({ handleCreate }: { handleCreate: () => void }) {
  const [code, setCode] = useState("");

  type formData = z.infer<typeof joinSchema>;

  const { register, handleSubmit } = useForm<formData>({
    resolver: zodResolver(joinSchema),
  });

  const onSubmit = (data: formData) => {
    setCode(data.code);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-16 w-full" size="lg">
          add
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[70dvh]">
        <div className="mt-10">
          <Tabs defaultValue="join">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="join">join</TabsTrigger>
              <TabsTrigger value="create">create</TabsTrigger>
            </TabsList>
            <TabsContent value="join">
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
            </TabsContent>
            <TabsContent value="create">
              <div className="flex flex-col gap-5 py-10">
                <div>
                  <Label className="text-lg text-foreground/90">Name</Label>
                  <Input
                    className="text-white"
                    type="text"
                    placeholder="Club Name"
                  />
                </div>
                <Button
                  onClick={handleCreate}
                  size="lg"
                  className="h-16 text-lg"
                >
                  Create
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
