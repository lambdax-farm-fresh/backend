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
        },
        updFarm: {
            type: FarmType,
            description: "Update a Farm",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                userId: { type: GraphQLNonNull(GraphQLInt) },
                farmName: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const farm = {
                    userId: args.userId,
                    farmName: args.farmName
                }
                return Farms.update(args.id, farm) 
            }
        },
        delFarm: {
            type: FarmType,
            description: "Delete a Farm",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                try {
                    await Farms.deleteFarm(args.id)
                } catch (err) {
                    console.log(err);
                }
            }
        },

        //LOCATIONS
        addLocation: {
            type: LocationType,
            description: "Add a location to a farm",
            args: {
                userId: { type: GraphQLNonNull(GraphQLInt) },
                lat: { type: GraphQLNonNull(GraphQLString) },
                lon: { type: GraphQLNonNull(GraphQLString) },
                street1: { type: GraphQLNonNull(GraphQLString) },
                street2: { type: GraphQLNonNull(GraphQLString) },
                city: { type: GraphQLNonNull(GraphQLString) },
                state: { type: GraphQLNonNull(GraphQLString) },
                zip: { type: GraphQLNonNull(GraphQLString) }
            }
        }
    })
})

module.exports = RootMutationType;