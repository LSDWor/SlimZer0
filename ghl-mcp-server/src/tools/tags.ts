import { z } from "zod";
import { ghlFetch } from "../ghlClient.js";

export const listTags = {
  name: "tags_list",
  inputSchema: z.object({ locationId: z.string().optional() }),
  handler: async (input: any) => {
    return ghlFetch(`/tags/`, { locationId: input.locationId });
  },
};
