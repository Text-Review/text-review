import { z } from "zod";
import { oid } from "@/lib/zod/extensions";
import { ParagraphAnalysisSchema } from "./paragraph-analysis.model";

export const TextAnalysisSchema = z.object({
    id: oid('The id of a text analysis must be a valid object id'),
    title: z.string(),
    author: z.string(),
    paragraphs: z.array(ParagraphAnalysisSchema),
})