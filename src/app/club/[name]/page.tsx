import { api } from "~/lib/trpc/server";
import { Title } from "./title";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Title name={name} joinCode="name" />
      <div>what to watch</div>
      <div>members</div>
    </div>
  );
}
