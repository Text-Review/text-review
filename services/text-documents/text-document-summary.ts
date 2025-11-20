import { builder } from "@/app/api/graphql/builder";

export type TextDocumentSummaryDTO = {
    id: string;
    title: string;
    author: string | null;
};

export const TextDocumentSummaryRef = builder.objectRef<TextDocumentSummaryDTO>('TextDocumentSummary');

TextDocumentSummaryRef.implement({
    description: 'A summary of a text variant (id, title) with the main author.',
    fields: (t) => ({
        id: t.exposeID('id'),
        title: t.exposeString('title'),
        author: t.exposeString('author', { nullable: true }),
    }),
});