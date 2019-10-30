const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const UnitType = new GraphQLObjectType({
    name: 'Unit',
    description: 'A Unit in the database',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        unit: { type: GraphQLNonNull(GraphQLString) }
    })
})

module.exports = UnitType;