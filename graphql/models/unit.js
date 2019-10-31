const db = require("../../data/dbConfig");

module.exports = {
  add,
  update,
  deleteUnit,
  find,
  findBy,
  findById
};

function find() {
  return db("units").select("id", "unit");
}

function findBy(filter) {
  return db("units").where(filter);
}

async function add(unit) {
  const [id] = await db("units").insert(unit, "id");
  const newUnit = await db("units")
    .where({ id })
    .first();

  return newUnit;
}

async function update(unit_id, changes) {
  await db("units")
    .where("id", unit_id)
    .first()
    .update(changes);
  const updUnit = await db("units")
    .where("id", unit_id)
    .first();

  return updUnit;
}

async function deleteUnit(unit_id) {
  return await db("units")
    .where("id", unit_id)
    .first()
    .del();
}

function findById(id) {
  return db("units")
    .where("unitId", id)
    .first();
}
