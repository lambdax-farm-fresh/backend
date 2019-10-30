//IMPORTS

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

//MODELS+TYPES

const UserType = require('./types/User');
const Users = require('../models/user');

//MUTATION

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addUser: {
            type: UserType,
            description: "Add a User",
            args: {
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                firebaseId: { type: GraphQLNonNull(GraphQLString) },
                picture: { type: GraphQLString },
                lat: { type: GraphQLString },
                lon: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                const user = {
                    ...args
                }
                return Users.add(user)
            }
        }
    })
})

module.exports = RootMutationType;