import { z } from "zod";
import { ghlFetch } from "../ghlClient.js";

// Note: SMS/Email send may require permissions on the account.

export const sendSMS = {
  name: "messages_send_sms",
  inputSchema: z.object({
    locationId: z.string().optional(),
    contactId: z.string(),
    body: z.string(),
    phoneNumberId: z.string().optional(),
  }),
  handler: async (input: any) => {
    return ghlFetch(`/conversations/messages/`, {
      method: "POST",
      locationId: input.locationId,
      body: {
        contactId: input.contactId,
        message: input.body,
        channel: "sms",
        phoneNumberId: input.phoneNumberId,
      },
    });
  },
};

export const sendEmail = {
  name: "messages_send_email",
  inputSchema: z.object({
    locationId: z.string().optional(),
    contactId: z.string(),
    subject: z.string(),
    body: z.string(),
    fromAddress: z.string().optional(),
  }),
  handler: async (input: any) => {
    return ghlFetch(`/conversations/messages/`, {
      method: "POST",
      locationId: input.locationId,
      body: {
        contactId: input.contactId,
        subject: input.subject,
        message: input.body,
        channel: "email",
        fromAddress: input.fromAddress,
      },
    });
  },
};
