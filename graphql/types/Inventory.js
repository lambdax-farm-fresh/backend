const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} = require("graphql");

const UserType = require("./User");
const Users = require("../models/user");

const FarmType = require("./Farm");
const Farms = require("../models/farm");

const LocationType = require("./Location");
const Locations = require("../models/location");

const ItemType = require("./Item");
const Items = require("../models/item");

const UnitType = require("./Unit");
const Units = require("../models/unit");

const InventoryType = new GraphQLObjectType({
  name: "Inventory",
  description: "A Inventory in the database",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    farmId: { type: GraphQLNonNull(GraphQLInt) },
    farm: {
      type: FarmType,
      resolve: inventory => {
        const farm = Farms.findById(inventory.farmId);
        return farm;
      }
    },
    locationId: { type: GraphQLNonNull(GraphQLString) },
    location: {
      type: LocationType,
      resolve: inventory => {
        const location = Locations.findById(inventory.locationId);
        return location;
      }
    },
    itemId: { type: GraphQLNonNull(GraphQLInt) },
    item: {
      type: ItemType,
      resolve: inventory => {
        const item = Items.findById(inventory.itemId);
        return item;
      }
    },
    unitId: { type: GraphQLNonNull(GraphQLInt) },
    unit: {
      type: UnitType,
      resolve: inventory => {
        const unit = Units.findById(inventory.unitId);
        return unit;
      }
    },
    quantity: { type: GraphQLNonNull(GraphQLFloat) },
    price: { type: GraphQLNonNull(GraphQLFloat) },
    description: { type: GraphQLNonNull(GraphQLString) }
  })
});

module.exports = InventoryType;
