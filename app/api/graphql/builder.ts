import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';

import ZodPlugin from '@pothos/plugin-zod';
import type PrismaTypes from '@/lib/pothos-prisma-types';
import { getDatamodel } from '@/lib/pothos-prisma-types';
import prisma from '@/lib/prisma';
import { DateTimeResolver } from 'graphql-scalars';

export interface Context {  }

export const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes;
    Context: Context;
    Scalars: {
        DateTime: {
            Input: Date;
            Output: Date;
        };
    };
}>({
    plugins: [PrismaPlugin, ZodPlugin],
    prisma: {
        client: prisma,
        dmmf: getDatamodel(),
        exposeDescriptions: true,
        onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
    },
    zod: {
        validationError: (zodError, args, context, info) => {
            // Formatting before sent to frontend
            return zodError;
        },
    },
});

builder.addScalarType('DateTime', DateTimeResolver, {});

builder.queryType({});