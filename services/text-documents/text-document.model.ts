import { z } from 'zod'

import { TextDocumentType } from '@prisma/client';
import { ParagraphSchema } from "./paragraph.model"
import { oid } from '@/lib/zod/extensions';

export const BaseTextDocumentSchema = z.object({
    id: oid('The id of a text document must be a valid object id'),
    title: z.string(),
    author: z.string(),
    paragraphs: z.array(ParagraphSchema),
});

export const TextDocumentIdSchema = oid('The id of a text document must be a valid object id');

const SpeechTextDocumentSchema = BaseTextDocumentSchema.extend({
    type: z.literal(TextDocumentType.SPEECH),
    meta: z.object({
        date: z.iso.datetime().optional(),
        location: z.string().optional(),
        occasion: z.string().optional(),
    }).nullable()
});

const UnknownTextDocumentSchema = BaseTextDocumentSchema.extend({
    type: z.literal(TextDocumentType.UNKNOWN),
    meta: z.null()
});

export const TextDocumentSchema = z.discriminatedUnion('type', [
    SpeechTextDocumentSchema,
    UnknownTextDocumentSchema
]);

export type TextDocument = z.infer<typeof TextDocumentSchema>;