import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import logger from "@/lib/logger";

export default async function listTextDocumentsFromPrisma<T extends Prisma.TextDocumentFindManyArgs>(prismaArgs: T): Promise<Array<Prisma.TextDocumentGetPayload<T>>> {

    logger.debug('listTextDocuments: Infrastructure invoked');

    const result = await prisma.textDocument.findMany({
        ...prismaArgs,
        orderBy: {
            createdAt: 'desc',
        },
        ...prismaArgs
    });

    return result as Array<Prisma.TextDocumentGetPayload<T>>;

}