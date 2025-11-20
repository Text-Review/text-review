import { builder } from "../builder";

builder.prismaObject('Author', {
    fields: (t) => ({
        id: t.exposeID('id'),
        name: t.exposeString('name'),
        createdAt: t.expose('createdAt', { type: 'DateTime' }),
        textDocuments: t.relation('textDocuments'),
    })
});

builder.prismaObject('Paragraph', {
    fields: (t) => ({
        id: t.exposeID('id'),
        order: t.exposeInt('order'),
        content: t.exposeString('content'),
    })
});

builder.prismaObject('TextDocument', {
    fields: (t) => ({
        id: t.exposeID('id'),
        createdAt: t.expose('createdAt', { type: 'DateTime' }),
        authors: t.relation('authors'),
        variants: t.relation('variants'),
    })
});

builder.prismaObject('TextLanguageVariant', {
    fields: (t) => ({
        id: t.exposeID('id'),
        languageCode: t.exposeString('languageCode'),
        title: t.exposeString('title'),
        createdAt: t.expose('createdAt', { type: 'DateTime' }),
        paragraphs: t.relation('paragraphs', {
            query: {
                orderBy: { order: 'asc' },
            },
        }),
        textDocument: t.relation('textDocument'),
    })
});