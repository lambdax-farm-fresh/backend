const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const FarmType = new GraphQLObjectType({
    name: 'Farm',
    description: 'A Farm in the database',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        userId: { type: GraphQLNonNull(GraphQLInt) },
        farmName: { type: GraphQLNonNull(GraphQLString) }
    })
})

module.exports = FarmType;