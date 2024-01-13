import { api } from "~/lib/trpc/server";

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  // const data = await api.club.getById.query({id:name})
  return <>{name}</>;
}
