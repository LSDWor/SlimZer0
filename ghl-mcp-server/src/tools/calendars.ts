import { z } from "zod";
import { ghlFetch } from "../ghlClient.js";

export const listCalendars = {
  name: "calendars_list",
  inputSchema: z.object({ locationId: z.string().optional() }),
  handler: async (input: any) => {
    return ghlFetch(`/calendars/`, { locationId: input.locationId });
  },
};

export const listSlots = {
  name: "calendar_slots",
  inputSchema: z.object({
    locationId: z.string().optional(),
    calendarId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    timezone: z.string().default("UTC"),
  }),
  handler: async (input: any) => {
    return ghlFetch(`/calendars/${input.calendarId}/slots`, {
      locationId: input.locationId,
      query: {
        startDate: input.startDate,
        endDate: input.endDate,
        timezone: input.timezone,
      },
    });
  },
};

export const bookAppointment = {
  name: "calendar_book",
  inputSchema: z.object({
    locationId: z.string().optional(),
    calendarId: z.string(),
    contactId: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    timezone: z.string().default("UTC"),
    note: z.string().optional(),
  }),
  handler: async (input: any) => {
    return ghlFetch(`/calendars/${input.calendarId}/appointments/`, {
      method: "POST",
      locationId: input.locationId,
      body: {
        contactId: input.contactId,
        startTime: input.startTime,
        endTime: input.endTime,
        timezone: input.timezone,
        note: input.note,
      },
    });
  },
};
