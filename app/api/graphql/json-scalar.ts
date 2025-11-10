import { GraphQLScalarType, Kind, type ValueNode } from "graphql";

const parseLiteralValue = (ast: ValueNode): unknown => {
    switch (ast.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return ast.value;
        case Kind.INT:
        case Kind.FLOAT:
            return Number(ast.value);
        case Kind.OBJECT:
            return Object.fromEntries(ast.fields.map(field => [field.name.value, parseLiteralValue(field.value)]));
        case Kind.LIST:
            return ast.values.map(parseLiteralValue);
        case Kind.NULL:
            return null;
        default:
            return null;
    }
};

const jsonScalar = new GraphQLScalarType({
    name: 'JSON',
    description: 'A JSON scalar type',
    serialize(value) {
        return value;
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        return parseLiteralValue(ast);
    },
});

export default jsonScalar;
