import { PrismaClient } from "./generated/client/client";
import logger from "./logger";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

type PrismaQueryEvent = {
    operation: string;
    model?: string;
    args: unknown;
    query: (args: unknown) => Promise<unknown>;
};

// 1. Verbindungspool erstellen
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });

// 2. Adapter instanziieren
const adapter = new PrismaPg(pool);

// 3. Prisma Client mit Adapter instanziieren
const prismaRaw = new PrismaClient({ 
    adapter
});

// 4. Logging via Extension statt $on
const prisma = prismaRaw.$extends({
    client: {
        $log: (msg: string) => logger.info(`[Prisma] ${msg}`),
    },
    query: {
        $allModels: {
            async $allOperations({ operation, model, args, query }: PrismaQueryEvent) {
                const start = performance.now();
                const result = await query(args);
                const end = performance.now();
                const time = end - start;

                logger.info(`[Prisma] ${model}.${operation} took ${time.toFixed(2)}ms`);
                return result;
            }
        }
    }
});

export default prisma;