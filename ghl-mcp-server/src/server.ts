import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/dist/esm/server/stdio.js";

import { listContacts, getContact, upsertContact } from "./tools/contacts.js";
import { listPipelines, listStages } from "./tools/pipelines.js";
import { createOpportunity, listOpportunities } from "./tools/opportunities.js";
import { listCalendars, listSlots, bookAppointment } from "./tools/calendars.js";
import { sendSMS, sendEmail } from "./tools/messages.js";
import { listTags } from "./tools/tags.js";
import { listReviews } from "./tools/reviews.js";
import { listCompanies } from "./tools/companies.js";
import { listUsers } from "./tools/users.js";
import { listTasks } from "./tools/tasks.js";
import { listWebhooks, createWebhook, deleteWebhook } from "./tools/webhooks.js";

function registerTool(
  server: McpServer,
  tool: { name: string; inputSchema: any; handler: (input: any, ctx?: any) => Promise<any>; description?: string }
) {
  server.registerTool(
    tool.name,
    { description: tool.description ?? "", inputSchema: tool.inputSchema },
    async (input: any, ctx: any) => {
      return tool.handler(input, ctx);
    }
  );
}

async function main() {
  const server = new McpServer({ name: "ghl-mcp", version: "0.1.0" });

  [
    listContacts,
    getContact,
    upsertContact,
    listPipelines,
    listStages,
    createOpportunity,
    listOpportunities,
    listCalendars,
    listSlots,
    bookAppointment,
    sendSMS,
    sendEmail,
    listTags,
    listReviews,
    listCompanies,
    listUsers,
    listTasks,
    listWebhooks,
    createWebhook,
    deleteWebhook,
  ].forEach((t) => registerTool(server, t));

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GHL MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
