const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");

const UserType = require("./User");
const Users = require("../models/user");

const LocationType = require("./Location");
const Locations = require("../models/location");

const FarmType = new GraphQLObjectType({
  name: "Farm",
  description: "A Farm in the database",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    userId: { type: GraphQLNonNull(GraphQLInt) },
    user: {
      type: UserType,
      resolve: farm => {
        const user = Users.findById(farm.userId);
        return user;
      }
    },
    farmLocations: {
      type: new GraphQLList(LocationType),
      resolve: farm => {
        const locations = Locations.findByFarmId(farm.id);
        console.log(farm.id);
        return locations;
      }
    },
    farmName: { type: GraphQLNonNull(GraphQLString) }
  })
});

module.exports = FarmType;
