const { GraphQLSchema, buildSchema } = require('graphql');

const RootQueryType = require('./query');
const RootMutationType = require('./mutation');

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

module.exports = schema;