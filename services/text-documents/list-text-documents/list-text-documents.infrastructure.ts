import { Prisma } from "@/lib/generated/client/client";

import prisma from "@/lib/prisma";
import logger from "@/lib/logger";

export default async function listTextDocumentsFromPrisma<T extends Prisma.TextDocumentFindManyArgs>(prismaArgs: T): Promise<Array<Prisma.TextDocumentGetPayload<T>>> {

    logger.debug('listTextDocuments: Infrastructure invoked');

    const finalArgs: Prisma.TextDocumentFindManyArgs = {
        orderBy: {              // First orderBy - as default sort
            createdAt: 'desc',
        },
        ...prismaArgs
    } satisfies Prisma.TextDocumentFindManyArgs;

    const result = await prisma.textDocument.findMany(finalArgs);

    return result as Array<Prisma.TextDocumentGetPayload<T>>;

}