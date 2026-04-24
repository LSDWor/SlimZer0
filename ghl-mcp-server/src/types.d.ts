declare module "@modelcontextprotocol/sdk/dist/esm/server/stdio.js" {
  import type { Transport } from "@modelcontextprotocol/sdk/dist/esm/shared/transport.js";
  export class StdioServerTransport implements Transport {
    connect(onmessage: (data: string) => void, onclose: () => void): Promise<void>;
    send(message: string): Promise<void>;
    close(): Promise<void>;
  }
}
