import { graphql } from '@/lib/graphql/generated';

export const LIST_TEXT_DOCUMENTS = graphql(`
    query TextDocuments {
        textDocuments {
            id
            title
            author
        }
    }
`);