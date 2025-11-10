import { z } from "zod";
import { oid } from "@/lib/zod/extensions";

export const TextDocumentSummarySchema = z.object({
    id: oid('The id of a text document must be a valid object id'),
    title: z.string(),
    author: z.string()
});

export type TextDocumentSummary = z.infer<typeof TextDocumentSummarySchema>;