const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} = require("graphql");

//MODELS AND TYPES
const UserType = require("./types/User");
const Users = require("./models/user");

const FarmType = require("./types/Farm");
const Farms = require("./models/farm");

const LocationType = require("./types/Location");
const Locations = require("./models/location");

const ItemType = require("./types/Item");
const Items = require("./models/item");

const UnitType = require("./types/Unit");
const Units = require("./models/unit");

const OrderType = require("./types/Order");
const Orders = require("./models/order");

const InventoryType = require("./types/Inventory");
const Inventorys = require("./models/inventory");

//QUERY
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "For making queries to the DB",
  fields: () => ({
    user: {
      type: UserType,
      description: "A user.",
      args: {
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        firebaseId: { type: GraphQLString },
        picture: { type: GraphQLString },
        lat: { type: GraphQLString },
        lon: { type: GraphQLString },
        rankrole: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const user = await Users.findByFirebaseId(args.firebaseId);
        return user;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      description: "List of all Users",
      resolve: () => Users.find()
    },

    farm: {
      type: FarmType,
      description: "A farm.",
      args: {
        id: { type: GraphQLInt },
        userId: { type: GraphQLInt },
        farmName: { type: GraphQLString }
      },
      resolve: (parent, args) => Farms.findById(args.id)
    },
    farms: {
      type: new GraphQLList(FarmType),
      description: "List of all Farms",
      args: {
        userId: { type: GraphQLInt }
      },
      resolve: (parent, args) => Farms.find(args.userId)
    },

    location: {
      type: LocationType,
      description: "A location",
      args: {
        id: { type: GraphQLInt },
        farmId: { type: GraphQLInt },
        lat: { type: GraphQLString },
        lon: { type: GraphQLString },
        street1: { type: GraphQLString },
        street2: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        zip: { type: GraphQLString }
      }
    },
    locations: {
      type: new GraphQLList(LocationType),
      description: "List of all Locations",
      resolve: () => Locations.find()
    },

    item: {
      type: ItemType,
      description: "A single Item",
      args: {
        id: { type: GraphQLInt },
        type: { type: GraphQLString },
        variety: { type: GraphQLString }
      }
    },
    items: {
      type: GraphQLList(ItemType),
      description: "All the items in the DB",
      resolve: () => Items.find()
    },

    inventory: {
      type: InventoryType,
      description: "An inventory of an item",
      args: {
        id: { type: GraphQLInt },
        farmId: { type: GraphQLInt },
        locationId: { type: GraphQLInt },
        itemId: { type: GraphQLInt },
        unitId: { type: GraphQLInt },
        quantity: { type: GraphQLFloat },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString }
      }
    },
    inventories: {
      type: GraphQLList(InventoryType),
      description: "All the inventories in the DB",
      resolve: () => Inventorys.find()
    },

    unit: {
      type: UnitType,
      description: "A unit within the DB",
      args: {
        id: { type: GraphQLInt },
        unit: { type: GraphQLString }
      }
    },
    units: {
      type: GraphQLList(UnitType),
      description: "A list of all Units available",
      resolve: () => Units.find()
    },

    order: {
      type: OrderType,
      description: "An order in the DB",
      args: {
        id: { type: GraphQLInt },
        userId: { type: GraphQLInt },
        farmId: { type: GraphQLInt },
        date: { type: GraphQLString }
      }
    },
    orders: {
      type: GraphQLList(OrderType),
      description: "A list of all Orders",
      resolve: () => Orders.find()
    }
  })
});

module.exports = RootQueryType;
