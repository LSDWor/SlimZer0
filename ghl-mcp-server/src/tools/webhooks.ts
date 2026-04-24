import { z } from "zod";
import { ghlFetch } from "../ghlClient.js";

export const listWebhooks = {
  name: "webhooks_list",
  inputSchema: z.object({ locationId: z.string().optional() }),
  handler: async (input: any) => {
    return ghlFetch(`/webhooks/`, { locationId: input.locationId });
  },
};

export const createWebhook = {
  name: "webhook_create",
  inputSchema: z.object({
    locationId: z.string().optional(),
    targetUrl: z.string(),
    event: z.string(),
    secret: z.string().optional(),
  }),
  handler: async (input: any) => {
    return ghlFetch(`/webhooks/`, {
      method: "POST",
      locationId: input.locationId,
      body: {
        targetUrl: input.targetUrl,
        event: input.event,
        secret: input.secret,
      },
    });
  },
};

export const deleteWebhook = {
  name: "webhook_delete",
  inputSchema: z.object({ locationId: z.string().optional(), webhookId: z.string() }),
  handler: async (input: any) => {
    return ghlFetch(`/webhooks/${input.webhookId}`, {
      method: "DELETE",
      locationId: input.locationId,
    });
  },
};
