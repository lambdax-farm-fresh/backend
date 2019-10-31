const db = require('../../data/dbConfig');

module.exports = {
  add,
  update,
  deleteLocation,
  find,
  findBy,
  findById,
  findByFarmId
};

function find() {
  return db('locations').select('id', 'farmId', 'lat', 'lon', 'streetNumber', 'streetName', 'city', 'state', 'countryCode', 'zip');
}

function findBy(filter) {
  return db('locations').where(filter);
}

function findByFarmId(farmId) {
  return db('locations').where('farmId', farmId);
}

async function add(location) {
  const [id] = await db('locations').insert(location, "id");
  const newLocation = await db('locations')
          .where({ id })
          .first();

  return newLocation;
}

async function update(location_id, changes) {
    await db('locations').where('id', location_id).first().update(changes);
    const updLocation = await db('locations')
            .where( 'id', id )
            .first();
  
    return updLocation;
}

async function deleteLocation(location_id){
    return await db('locations').where('id', location_id).first().del()
}

function findById(id) {
  return db('locations')
    .where('id', id)
    .first();
}