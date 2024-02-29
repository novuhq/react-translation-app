import { Novu } from "@novu/node";

const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API_KEY);

export const workflowTriggerID = "notify-notification";

export default async function handler(req, res) {
  const { subscriberID, userHandle, username } = JSON.parse(req.body);

  await novu.trigger(workflowTriggerID, {
    to: {
      subscriberId: subscriberID,
    },
    payload: {
      name: username,
      handle: userHandle,
    },
  });

  return res.json({ finish: true });
}
