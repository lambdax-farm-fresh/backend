exports.up = function(knex) {
  return knex.schema.createTable("items", i => {
    i.increments("id");
    i.string("name").notNullable();
    i.string("variety").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("items");
};
