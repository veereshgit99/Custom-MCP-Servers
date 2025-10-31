import { Server } from "@modelcontextprotocol/sdk/server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import { z } from "zod";
import crypto from "node:crypto";
import Database from "better-sqlite3";
import { expect } from "chai";

describe("MCP Server", () => {
    let server;
    let transport;

    before(async () => {
        server = new Server({ name: "mcp-memory", version: "0.1.0" });
        transport = new StdioServerTransport();
        await server.connect(transport);
    });

    after(async () => {
        await server.disconnect();
    });

    it("should initialize the server correctly", () => {
        expect(server).to.exist;
        expect(server.name).to.equal("mcp-memory");
        expect(server.version).to.equal("0.1.0");
    });

    it("should respond to write_memory tool", async () => {
        const response = await server.call("write_memory", {
            subject: "test",
            text: "This is a test memory.",
            tags: ["test", "memory"]
        });
        expect(response.content[0].text).to.include("saved");
    });

    it("should respond to query_memory tool", async () => {
        const response = await server.call("query_memory", {
            subject: "test",
            topK: 5
        });
        expect(response.content[0].text).to.be.a("string");
    });
});