import { builder } from '../builder';

import listTextDocumentsResolver from '@/services/text-documents/list-text-documents/list-text-documents.resolver';

builder.queryField('textDocuments', (t) =>
    t.prismaField({
        type: ['TextDocument'],
        resolve: (query, parent, args, context, info) => listTextDocumentsResolver(query, parent, args, context, info),
    })
);