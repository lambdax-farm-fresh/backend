const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const UserType = require('./types/User');
const Users = require('../models/user');

const FarmType = require('./types/Farm');
const Farms = require('../models/farm');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'For making queries to the DB',
    fields: () => ({

        user: {
            type: UserType,
            description: 'A user.',
            args: {
                id: { type: GraphQLInt },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                firebaseId: { type: GraphQLString },
                picture: { type: GraphQLString },
                lat: { type: GraphQLString },
                lon: { type: GraphQLString },
                isfarmer: { type: GraphQLBoolean }
            },
            resolve: async (parent, args) => {
                const user = await Users.findByFirebaseId(args.firebaseId);
                console.log(user);
                return user
            }
        },
        users: {
            type: new GraphQLList(UserType),
            description: 'List of all Users',
            resolve: () => Users.find()
        },

        farm: {
            type: FarmType,
            description: 'A farm.',
            args: {
                id: { type: GraphQLInt },
                userId: { type: GraphQLInt },
                farmName: { type: GraphQLString }
            },
            resolve: (parent, args) => Farms.findById(args.id)
        },
        farms: {
            type: new GraphQLList(FarmType),
            description: 'List of all Farms',
            resolve: () => Farms.find()
        }

    })
})

module.exports = RootQueryType;