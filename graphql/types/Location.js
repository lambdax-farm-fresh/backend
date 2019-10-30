const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const FarmType = require('./Farm');
const Farms = require('../../models/farm');

const LocationType = new GraphQLObjectType({
    name: 'Location',
    description: 'A Location in the database',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        farmId: { type: GraphQLNonNull(GraphQLInt) },
        farm: {
            type: FarmType,
            resolve: (location) => {
                const farm = Farms.findById(location.id);
                return farm
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