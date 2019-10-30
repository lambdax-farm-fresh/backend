const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const UserType = require('./User');
const Users = require('../../models/user');

const FarmType = require('./Farm');
const Farms = require('../../models/farm');

const OrderType = new GraphQLObjectType({
    name: 'Order',
    description: 'A Order in the database',
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
        farmId: { type: GraphQLNonNull(GraphQLInt) },
        farm: {
            type: FarmType,
            resolve: (inventory) => {
                const farm = Farms.findById(inventory.farmId);
                return farm
            }
        },
        date: { type: GraphQLString }
    })
})

module.exports = OrderType;