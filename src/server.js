import { Server } from "@modelcontextprotocol/sdk/server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import { writeMemory, queryMemory } from "./tools/memory";

const server = new Server({ name: "mcp-server", version: "0.1.0" });

server.tool("write_memory", writeMemory);
server.tool("query_memory", queryMemory);

const transport = new StdioServerTransport();
await server.connect(transport);