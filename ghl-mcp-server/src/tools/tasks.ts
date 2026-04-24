import { z } from "zod";
import { ghlFetch } from "../ghlClient.js";

export const listTasks = {
  name: "tasks_list",
  inputSchema: z.object({
    locationId: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
  }),
  handler: async (input: any) => {
    return ghlFetch(`/tasks/`, {
      locationId: input.locationId,
      query: { page: input.page, limit: input.limit },
    });
  },
};
