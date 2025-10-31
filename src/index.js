import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { writeMemory, queryMemory } from './tools/memory.js';
import { z } from 'zod';

// Create the MCP server
const server = new McpServer({
    name: 'memory-server',
    version: '1.0.0',
});

// Register write_memory tool
server.registerTool(
    'write_memory',
    {
        title: 'Write Memory',
        description: 'Store a new memory with subject, text, and optional tags',
        inputSchema: {
            subject: z.string().describe('The subject/category of the memory'),
            text: z.string().describe('The content of the memory'),
            tags: z.array(z.string()).optional().describe('Optional tags for categorization'),
        },
    },
    async ({ subject, text, tags = [] }) => {
        const result = await writeMemory({ subject, text, tags });
        return result;
    }
);

// Register query_memory tool
server.registerTool(
    'query_memory',
    {
        title: 'Query Memory',
        description: 'Query memories by subject',
        inputSchema: {
            subject: z.string().describe('The subject to search for'),
            topK: z.number().optional().default(5).describe('Maximum number of results'),
        },
    },
    async ({ subject, topK = 5 }) => {
        const result = await queryMemory({ subject, topK });
        return result;
    }
);

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Memory MCP Server running on stdio');
}

main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});