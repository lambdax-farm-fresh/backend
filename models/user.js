const db = require('../data/dbConfig');

module.exports = {
  add,
  update,
  deleteUser,
  find,
  findBy,
  findById
};

function find() {
  return db('users').select('id', 'firstName', 'lastName', 'email', 'lat', 'lon', 'firebaseId');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(post) {
  const [id] = await db('users').insert(post, "id");
  const newUser = await db('users')
                          .where({ id })
                          .first();
  return newUser;
}

async function update(user_id, changes) {
    await db('users').where('id', user_id).first().update(changes);
    const updPost = await db('users')
                            .where( 'id', user_id )
                            .first();
  
    return updPost;
}

async function deleteUser(id){
    return await db('users').where('id', id).first().del()
}

function findById(firebaseId) {
  return db('users')
          .where({ firebaseId })
          .first();
}
