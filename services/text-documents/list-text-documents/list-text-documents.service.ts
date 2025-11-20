import { Prisma } from "@prisma/client";

import logger from "@/lib/logger";
import listTextDocumentsFromPrisma from "./list-text-documents.infrastructure";

export default async function listTextDocuments<T extends Prisma.TextDocumentFindManyArgs>(prismaArgs: T): Promise<Array<Prisma.TextDocumentGetPayload<T>>> {

    logger.debug('listTextDocuments: Service invoked');
    
    try {
        
        const result = await listTextDocumentsFromPrisma(prismaArgs);
        return result;

    } catch (error) {

        logger.error('list-text-documents.service.ts:', error);
        throw error;

    }

}