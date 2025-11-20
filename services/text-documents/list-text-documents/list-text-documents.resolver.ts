import { GraphQLResolveInfo } from "graphql";
import logger from "@/lib/logger";

import { Prisma, TextDocument } from "@prisma/client";
import listTextDocuments from "./list-text-documents.service";
import { createApiError } from "@/services/shared/graphql/errors";

type PothosQuery = Prisma.TextDocumentFindManyArgs;

export default async function listTextDocumentsResolver(query: PothosQuery, _parent: unknown, _args: unknown, context: any, _info: GraphQLResolveInfo): Promise<TextDocument[]> {

    logger.debug('listTextDocuments: Resolver invoked');

    try {

        return await listTextDocuments(query);

    } catch(error) {
        throw createApiError(error);
    }

}