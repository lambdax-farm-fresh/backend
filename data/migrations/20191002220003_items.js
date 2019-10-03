exports.up = function(knex) {
  return knex.schema.createTable("items", i => {
    i.increments("itemId");
    i.string("type").notNullable();
    i.string("variety").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("items");
};
