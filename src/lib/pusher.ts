import PusherServer from "pusher";
import PusherClient from "pusher-js";
import { env } from "~/env";

export const pusherClient = new PusherClient(env.NEXT_PUBLIC_PUSHER_APP_ID, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

export const pusherServer = new PusherServer({
  appId: env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: env.PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export const triggerClubReload = async (clubName: string) =>
  pusherServer.trigger(clubName, "reload", {});
