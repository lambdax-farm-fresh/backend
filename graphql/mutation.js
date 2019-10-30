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

const FarmType = require('./types/Farm');
const Farms = require('../models/farm');

//MUTATION

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        //USERS
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
        },
        //FARMS
        addFarm: {
            type: FarmType,
            description: "Add a Farm",
            args: {
                userId: { type: GraphQLNonNull(GraphQLInt) },
                farmName: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const farm = {
                    ...args
                }
                return Farms.add(farm) 
            }
        }
    })
})

module.exports = RootMutationType;