import { Metadata } from "next";
import { JSX } from "react";

import logger from "@/lib/logger";
import Show from "@/components/Show";

import listTextDocuments from "@/services/text-documents/list-text-documents/list-text-documents.service";
import TextDocumentItem from "@/services/text-documents/ui/components/TextDocumentItem";
import NoDocumentsFoundMessage from "@/services/text-documents/ui/components/NoDocumentsFoundMessage";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'List of Documents'
};

export default async function Page(): Promise<JSX.Element> {

    logger.debug(`Document Page: Page invoked`);

    // 1. Get the text documents directly from the database

    const textDocuments = await listTextDocuments({ 
        include: { 
            variants: true,
            authors: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    // 2. Render

    return (
        <section className="md:max-w-[75ch] mx-auto px-4 my-8 text-wrap transition-[max-width]">
            
            <h1 className="mb-8 text-3xl">List of Documents</h1>

            <Show when={textDocuments.length > 0}>
                <ul className="space-y-2">
                    { textDocuments.map(doc => {
                        const displayTitle = doc.variants[0]?.title || "Unknown Document";
                        const authorNames = doc.authors.map(a => a.name).join(", ");

                        return (
                            <li key={doc.id}>
                                <TextDocumentItem 
                                        id={doc.id} 
                                        title={displayTitle} 
                                        author={authorNames} 
                                    />
                            </li>
                        );
                    })}
                </ul>
            </Show>

            <Show when={textDocuments.length === 0}>
                <NoDocumentsFoundMessage />
            </Show>

        </section>
    );
}