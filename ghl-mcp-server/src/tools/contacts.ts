import { z } from "zod";
import { ghlFetch } from "../ghlClient.js";

export const listContacts = {
  name: "contacts_list",
  inputSchema: z.object({
    locationId: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    query: z.string().optional(),
    tagId: z.string().optional(),
  }),
  handler: async (input: any) => {
    return ghlFetch(`/contacts/`, {
      locationId: input.locationId,
      query: { page: input.page, limit: input.limit, query: input.query, tagId: input.tagId },
    });
  },
};

export const getContact = {
  name: "contact_get",
  inputSchema: z.object({ locationId: z.string().optional(), contactId: z.string() }),
  handler: async (input: any) => {
    return ghlFetch(`/contacts/${input.contactId}`, { locationId: input.locationId });
  },
};

export const upsertContact = {
  name: "contact_upsert",
  inputSchema: z.object({ locationId: z.string().optional(), body: z.record(z.any()) }),
  handler: async (input: any) => {
    return ghlFetch(`/contacts/`, { method: "POST", locationId: input.locationId, body: input.body });
  },
};
