import PusherServer from "pusher";
import { env } from "~/env";

export const pusherServer = new PusherServer({
  appId: env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export const triggerClubReload = async (clubName: string) =>
  pusherServer.trigger(clubName, "reload", {});
