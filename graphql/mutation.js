//IMPORTS

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull
} = require('graphql');

//MODELS+TYPES

const UserType = require('./types/User');
const Users = require('./models/user');

const FarmType = require('./types/Farm');
const Farms = require('./models/farm');

const LocationType = require('./types/Location');
const Locations = require('./models/location');

const ItemType = require('./types/Item');
const Items = require('./models/item');

const UnitType = require('./types/Unit');
const Units = require('./models/unit');

const OrderType = require('./types/Order');
const Orders = require('./models/order');

const InventoryType = require('./types/Inventory');
const Inventorys = require('./models/inventory');

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
                farmId: { type: GraphQLNonNull(GraphQLInt) },
                lat: { type: GraphQLNonNull(GraphQLString) },
                lon: { type: GraphQLNonNull(GraphQLString) },
                streetNumber: { type: GraphQLNonNull(GraphQLString) },
                streetName: { type: GraphQLNonNull(GraphQLString) },
                city: { type: GraphQLNonNull(GraphQLString) },
                state: { type: GraphQLNonNull(GraphQLString) },
                countryCode: { type: GraphQLNonNull(GraphQLString) },
                zip: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const location = {
                    ...args
                }
                return Locations.add(location)
            }
        },
        updLocation: {
            type: LocationType,
            description: "Update a Location",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                farmId: { type: GraphQLNonNull(GraphQLInt) },
                lat: { type: GraphQLNonNull(GraphQLString) },
                lon: { type: GraphQLNonNull(GraphQLString) },
                streetNumber: { type: GraphQLNonNull(GraphQLString) },
                streetName: { type: GraphQLNonNull(GraphQLString) },
                city: { type: GraphQLNonNull(GraphQLString) },
                state: { type: GraphQLNonNull(GraphQLString) },
                countryCode: { type: GraphQLNonNull(GraphQLString) },
                zip: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const location = {
                    farmId: args.farmId,
                    lat: args.lat,
                    lon: args.lon,
                    street1: args.street1,
                    street2: args.street2,
                    city: args.city,
                    state: args.state,
                    countryCode: args.countryCode,
                    zip: args.zip
                }
                return Locations.update(args.id, location) 
            }
        },
        delLocation: {
            type: LocationType,
            description: "Delete a Location",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                try {
                    await Locations.deleteLocation(args.id)
                } catch (err) {
                    console.log(err);
                }
            }
        },

        //ITEMS
        addItem: {
            type: ItemType,
            description: "Add an Item classifier",
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                vareity: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const item = {
                    ...args
                }
                return Items.add(item)
            }
        },
        updItem: {
            type: ItemType,
            description: "Update a Item",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLNonNull(GraphQLString) },
                vareity: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const item = {
                    name: args.name,
                    vareity: args.vareity
                }
                return Items.update(args.id, item) 
            }
        },
        delItem: {
            type: ItemType,
            description: "Delete an Item",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                try {
                    await Items.deleteItem(args.id)
                } catch (err) {
                    console.log(err);
                }
            }
        },

        //UNIT
        addUnit: {
            type: UnitType,
            description: "Add an Unit classifier",
            args: {
                unit: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const unit = {
                    ...args
                }
                return Units.add(unit)
            }
        },
        updUnit: {
            type: UnitType,
            description: "Update a Unit",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                unit: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const unit = {
                    unit: args.unit
                }
                return Units.update(args.id, unit) 
            }
        },
        delUnit: {
            type: UnitType,
            description: "Delete a Unit",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                try {
                    await Units.deleteUnit(args.id)
                } catch (err) {
                    console.log(err);
                }
            }
        },

        //INVENTORY
        addInventory: {
            type: InventoryType,
            description: "Add an Inventory",
            args: {
                farmId: { type: GraphQLNonNull(GraphQLInt) },
                locationId: { type: GraphQLNonNull(GraphQLInt) },
                itemId: { type: GraphQLNonNull(GraphQLInt) },
                unitId: { type: GraphQLNonNull(GraphQLInt) },
                quantity: { type: GraphQLNonNull(GraphQLFloat) },
                price: { type: GraphQLNonNull(GraphQLFloat) },
                description: { type: GraphQLNonNull(GraphQLString) } 
            },
            resolve: (parent, args) => {
                const inventory = {
                    ...args
                }
                return Inventorys.add(inventory)
            }
        },
        updInventory: {
            type: InventoryType,
            description: "Update an Inventory",
            args: {
                farmId: { type: GraphQLNonNull(GraphQLInt) },
                locationId: { type: GraphQLNonNull(GraphQLInt) },
                itemId: { type: GraphQLNonNull(GraphQLInt) },
                unitId: { type: GraphQLNonNull(GraphQLInt) },
                quantity: { type: GraphQLNonNull(GraphQLFloat) },
                price: { type: GraphQLNonNull(GraphQLFloat) },
                description: { type: GraphQLNonNull(GraphQLString) } 
            },
            resolve: (parent, args) => {
                const inventory = {
                    farmId: args.farmId,
                    locationId: args.locationId,
                    itemId: args.itemId,
                    unitId: args.unitId,
                    quantity: args.quantity,
                    price: args.price,
                    description: args.description
                }
                return Inventorys.update(args.id, inventory) 
            }
        },
        delInventory: {
            type: InventoryType,
            description: "Delete an Inventory",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                try {
                    await Inventorys.deleteInventory(args.id)
                } catch (err) {
                    console.log(err);
                }
            }
        },

        //ORDER
        addOrder: {
            type: OrderType,
            description: "Add an Order",
            args: {
                farmId: { type: GraphQLNonNull(GraphQLInt) },
                userId: { type: GraphQLNonNull(GraphQLInt) },
                date: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                const order = {
                    ...args
                }
                return Orders.add(order)
            }
        },
        updOrder: {
            type: OrderType,
            description: "Update a Order",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                farmId: { type: GraphQLNonNull(GraphQLInt) },
                userId: { type: GraphQLNonNull(GraphQLInt) },
                date: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                const order = {
                    farmId: args.farmId,
                    userId: args.userId,
                    date: args.date
                }
                return Orders.update(args.id, order) 
            }
        },
        delOrder: {
            type: OrderType,
            description: "Delete a Order",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parent, args) => {
                try {
                    await Orders.deleteOrder(args.id)
                } catch (err) {
                    console.log(err);
                }
            }
        },
    })
})

module.exports = RootMutationType;