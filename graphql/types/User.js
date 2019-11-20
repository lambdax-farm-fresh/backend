const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A User in the database",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    firebaseId: { type: GraphQLNonNull(GraphQLString) },
    picture: { type: GraphQLString },
    lat: { type: GraphQLString },
    lon: { type: GraphQLString },
    rankrole: { type: GraphQLNonNull(GraphQLString) }
  })
});

module.exports = UserType;
