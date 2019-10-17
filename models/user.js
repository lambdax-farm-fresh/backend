const db = require('../data/dbConfig');

module.exports = {
  add,
  update,
  deleteUser,
  find,
  findBy,
  findById,
  findByEmail
};

function find() {
  return db('users').select('id', 'firstName', 'lastName', 'email', 'lat', 'lon');
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

function findById(id) {
  return db('users')
          .where({ id })
          .first();
}

async function findByEmail(email) {
  const user = await db('users')
                      .where({ email })
                      .first();

  if(user) {
    const succObj = {
      status: true,
      user: user
    }
    return succObj
  } else {
    const failObj = {
      status: false
    }
    return failObj
  }
}