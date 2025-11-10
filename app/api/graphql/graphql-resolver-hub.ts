import getTextDocumentResolver from '@/services/text-documents/get-text-document/get-text-document.resolver';
import listTextDocumentsResolver from '@/services/text-documents/list-text-documents/list-text-documents.resolver';
import jsonScalar from './json-scalar';

type QueryResolvers = {
    textDocument: typeof getTextDocumentResolver;
    textDocuments: typeof listTextDocumentsResolver;
};

type Resolvers = {
    JSON: typeof jsonScalar;
    Query: QueryResolvers;
};

export const resolvers: Resolvers = {
    JSON: jsonScalar,

    Query: {
        textDocument: getTextDocumentResolver,
        textDocuments: listTextDocumentsResolver

    },
    /*Mutation: {

        

    }*/
};
