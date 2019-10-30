const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const ItemType = new GraphQLObjectType({
    name: 'Item',
    description: 'A Item in the database',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        type: { type: GraphQLNonNull(GraphQLString) },
        variety: { type: GraphQLNonNull(GraphQLString) }
    })
})

module.exports = ItemType;