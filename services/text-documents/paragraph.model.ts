import { z } from "zod"
import { oid } from "@/lib/zod/extensions"
import "@/lib/zod/extensions"

export const ParagraphSchema = z.object({
    id: oid('The id of a paragraph must be a valid object id'),
    text: z.string(),
})