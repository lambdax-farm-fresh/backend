const db = require('../../data/dbConfig');

module.exports = {
  add,
  update,
  deleteFarm,
  find,
  findBy,
  findById
};

function find() {
  return db('farms').select('id', 'userId', 'farmName');
}

function findBy(filter) {
  return db('farms').where(filter);
}

async function add(farm) {
  const [id] = await db('farms').insert(farm, "id");
  const newFarm = await db('farms')
          .where({ id })
          .first();

  return newFarm;
}

async function update(farm_id, changes) {
    await db('farms').where('id', farm_id).first().update(changes);
    const updFarm = await db('farms')
            .where( 'id', id )
            .first();
  
    return updFarm;
}

async function deleteFarm(farm_id){
    return await db('farms').where('id', farm_id).first().del()
}

function findById(id) {
  return db('farms')
    .where('id', id)
    .first();
}