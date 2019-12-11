const db = require("../../data/dbConfig");

module.exports = {
  add,
  update,
  deleteUser,
  find,
  findBy,
  findById,
  findByFirebaseId
};

function find() {
  return db("users").select(
    "id",
    "firstName",
    "lastName",
    "email",
    "lat",
    "lon",
    "firebaseId",
    "rankrole"
  );
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(post) {
  const [id] = await db("users").insert(post, "id");
  const newUser = await db("users")
    .where({ id })
    .first();
  return newUser;
}

async function update(user_id, changes) {
  await db("users")
    .where("id", user_id)
    .first()
    .update(changes);
  const updUser = await db("users")
    .where("id", user_id)
    .first();

  return updUser;
}

async function deleteUser(id) {
  return await db("users")
    .where("id", id)
    .first()
    .del();
}

async function findByFirebaseId(firebaseId) {
  const user = await db("users")
    .where("firebaseId", firebaseId)
    .first();

  if (user) {
    return user;
  } else {
    return false;
  }
}

async function findById(id) {
  const user = await db("users")
    .where("id", id)
    .first();

  if (user) {
    return user;
  } else {
    return false;
  }
}
