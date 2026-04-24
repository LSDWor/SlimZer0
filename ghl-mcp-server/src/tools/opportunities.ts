import { z } from "zod";
import { ghlFetch } from "../ghlClient.js";

export const createOpportunity = {
  name: "opportunity_create",
  inputSchema: z.object({
    locationId: z.string().optional(),
    pipelineId: z.string(),
    stageId: z.string(),
    contactId: z.string(),
    status: z.string().default("open"),
    monetaryValue: z.number().optional(),
    name: z.string().optional(),
  }),
  handler: async (input: any) => {
    return ghlFetch(`/opportunities/`, {
      method: "POST",
      locationId: input.locationId,
      body: {
        pipelineId: input.pipelineId,
        stageId: input.stageId,
        contactId: input.contactId,
        status: input.status,
        monetaryValue: input.monetaryValue,
        name: input.name,
      },
    });
  },
};

export const listOpportunities = {
  name: "opportunities_list",
  inputSchema: z.object({
    locationId: z.string().optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    pipelineId: z.string().optional(),
    stageId: z.string().optional(),
    status: z.string().optional(),
  }),
  handler: async (input: any) => {
    return ghlFetch(`/opportunities/`, {
      locationId: input.locationId,
      query: {
        page: input.page,
        limit: input.limit,
        pipelineId: input.pipelineId,
        stageId: input.stageId,
        status: input.status,
      },
    });
  },
};
