const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const UserType = require('./User');
const Users = require('../../models/user');

const FarmType = new GraphQLObjectType({
    name: 'Farm',
    description: 'A Farm in the database',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        userId: { type: GraphQLNonNull(GraphQLInt) },
        user: {
            type: UserType,
            resolve: (farm) => {
                const user = Users.findById(farm.id);
                return user
            }
        },
        farmName: { type: GraphQLNonNull(GraphQLString) }
    })
})

module.exports = FarmType;