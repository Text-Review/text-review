import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    documents: ['{app,services}/**/*.ts?(x)'],

    generates: {
        'lib/graphql/generated/': {
            plugins: [],
            preset: 'client',
            presetConfig: {
                fragmentMasking: false
            }
        }
    },
    overwrite: true,
    schema: 'http://localhost:3000/api/graphql',
    ignoreNoDocuments: true,

}

export default config;