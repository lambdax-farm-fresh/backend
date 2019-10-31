const db = require('../../data/dbConfig');

module.exports = {
  add,
  update,
  deleteInventory,
  find,
  findBy,
  findById
};

function find() {
  return db('inventories').select('id', 'farmerId', 'locationId', 'itemId', 'unitId', 'quantity', 'price', 'description');
}

function findBy(filter) {
  return db('inventories').where(filter);
}

async function add(inv) {
  const [id] = await db('inventories').insert(inv, "id");
  const newInventory = await db('inventories')
          .where({ id })
          .first();

  return newInventory;
}

async function update(inventory_id, changes) {
    await db('inventories').where('id', inventory_id).first().update(changes);
    const updInventory = await db('inventories')
            .where( 'id', inventory_id )
            .first();
  
    return updInventory;
}

async function deleteInventory(inventory_id){
    return await db('inventories').where('id', inventory_id).first().del()
}

function findById(id) {
  return db('inventories')
    .where('inventoryId', id)
    .first();
}