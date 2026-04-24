import { z } from "zod";
import { ghlFetch } from "../ghlClient.js";

export const listUsers = {
  name: "users_list",
  inputSchema: z.object({ locationId: z.string().optional() }),
  handler: async (input: any) => {
    return ghlFetch(`/users/`, { locationId: input.locationId });
  },
};
