// THIS MODEL WILL NEED UPDATES TO INTERFACE WITH ORDERITEMS TABLE

const db = require('../../data/dbConfig');

module.exports = {
  add,
  update,
  deleteorder,
  find,
  findBy,
  findById,
  populateItems
};

function find() {
  return db('orders').select('id', 'userId', 'farmId', 'date');
}

function findBy(filter) {
  return db('orders').where(filter);
}

async function add(order) {
  const [id] = await db('orders').insert(order, "id");
  const newOrder = await db('orders')
          .where({ id })
          .first();

  return newOrder;
}

async function update(order_id, changes) {
    await db('orders').where('id', order_id).first().update(changes);
    const updPost = await db('orders')
            .where( 'id', order_id )
            .first();
  
    return updPost;
}

async function deleteorder(order_id){
    return await db('orders').where('id', order_id).first().del()
}

function findById(id) {
  return db('orders')
    .where('orderId', id)
    .first();
}

async function populateItems(itemlist) {

}