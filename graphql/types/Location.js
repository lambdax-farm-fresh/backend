const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const UserType = require('./User');
const Users = require('../../models/user');

const LocationType = new GraphQLObjectType({
    name: 'Location',
    description: 'A Location in the database',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        userId: { type: GraphQLNonNull(GraphQLInt) },
        user: {
            type: UserType,
            resolve: (location) => {
                const user = Users.findById(location.id);
                return user
            }
        },
        lat: { type: GraphQLNonNull(GraphQLString) },
        lon: { type: GraphQLNonNull(GraphQLString) },
        street1: { type: GraphQLNonNull(GraphQLString) },
        street2: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLNonNull(GraphQLString) },
        state: { type: GraphQLNonNull(GraphQLString) },
        zip: { type: GraphQLNonNull(GraphQLString) }
    })
})

module.exports = LocationType;