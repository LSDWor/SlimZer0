import { z } from "zod";
import { ghlFetch } from "../ghlClient.js";

export const listPipelines = {
  name: "pipelines_list",
  inputSchema: z.object({ locationId: z.string().optional() }),
  handler: async (input: any) => {
    return ghlFetch(`/pipelines/`, { locationId: input.locationId });
  },
};

export const listStages = {
  name: "stages_list",
  inputSchema: z.object({ locationId: z.string().optional(), pipelineId: z.string() }),
  handler: async (input: any) => {
    return ghlFetch(`/pipelines/${input.pipelineId}/stages`, { locationId: input.locationId });
  },
};
