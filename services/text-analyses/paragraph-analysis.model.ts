import { z } from "zod";
import { oid } from "@/lib/zod/extensions";
import { HighlightSchema } from "./highlight.model";

export const ParagraphAnalysisSchema = z.object({
    id: oid('The id of a paragraph analysis must be a valid object id'),
    text: z.string(),
    highlights: z.array(HighlightSchema),
})