const db = require('../../data/dbConfig');

module.exports = {
  add,
  update,
  deleteItem,
  find,
  findBy,
  findById
};

function find() {
  return db('items').select('id', 'name', 'variety');
}

function findBy(filter) {
  return db('items').where(filter);
}

async function add(item) {
  const [id] = await db('items').insert(item, "id");
  const newItem = await db('items')
          .where({ id })
          .first();

  return newItem;
}

async function update(item_id, changes) {
    await db('items').where('id', item_id).first().update(changes);
    const updItem = await db('items')
            .where( 'id', item_id )
            .first();
  
    return updItem;
}

async function deleteItem(item_id){
    return await db('items').where('id', item_id).first().del()
}

function findById(id) {
  return db('items')
    .where('itemId', id)
    .first();
}