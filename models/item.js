const db = require('../data/dbConfig');

module.exports = {
  add,
  update,
  deleteItem,
  find,
  findBy,
  findById
};

function find() {
  return db('items').select('itemId', 'type', 'variety');
}

function findBy(filter) {
  return db('items').where(filter);
}

async function add(item) {
  const [id] = await db('items').insert(item, "id");
  const newPost = await db('items')
          .where({ id })
          .first();

  return newPost;
}

async function update(item_id, changes) {
    await db('items').where('id', item_id).first().update(changes);
    const updPost = await db('items')
            .where( 'id', item_id )
            .first();
  
    return updPost;
}

async function deleteItem(item_id){
    return await db('items').where('id', item_id).first().del()
}

function findById(id) {
  return db('items')
    .where({ id })
    .first();
}