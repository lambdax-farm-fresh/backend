const {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A User in the database',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        firebaseId: { type: GraphQLNonNull(GraphQLString) },
        picture: { type: GraphQLNonNull(GraphQLString) },
        lat: { type: GraphQLNonNull(GraphQLString) },
        lon: { type: GraphQLNonNull(GraphQLString) },
        isfarmer: { type: GraphQLNonNull(GraphQLBoolean) }
    })
})

module.exports = UserType;