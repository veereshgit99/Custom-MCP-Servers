import { z } from "zod";

export const writeMemorySchema = z.object({
    subject: z.string(),
    text: z.string(),
    tags: z.array(z.string()).default([]),
});

export const queryMemorySchema = z.object({
    subject: z.string(),
    topK: z.number().default(5),
});