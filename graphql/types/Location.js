const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");

const FarmType = require("./Farm");
const Farms = require("../models/farm");

const LocationType = new GraphQLObjectType({
  name: "Location",
  description: "A Location in the database",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    farmId: { type: GraphQLNonNull(GraphQLInt) },
    lat: { type: GraphQLNonNull(GraphQLString) },
    lon: { type: GraphQLNonNull(GraphQLString) },
    streetNumber: { type: GraphQLNonNull(GraphQLString) },
    streetName: { type: GraphQLNonNull(GraphQLString) },
    city: { type: GraphQLNonNull(GraphQLString) },
    state: { type: GraphQLNonNull(GraphQLString) },
    countryCode: { type: GraphQLNonNull(GraphQLString) },
    zip: { type: GraphQLNonNull(GraphQLString) }
  })
});

module.exports = LocationType;
