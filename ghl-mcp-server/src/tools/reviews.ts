import { z } from "zod";
import { ghlFetch } from "../ghlClient.js";

export const listReviews = {
  name: "reviews_list",
  inputSchema: z.object({
    locationId: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
  }),
  handler: async (input: any) => {
    return ghlFetch(`/reviews/`, {
      locationId: input.locationId,
      query: { page: input.page, limit: input.limit },
    });
  },
};
