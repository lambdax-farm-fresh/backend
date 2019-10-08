exports.up = function(knex) {
  return knex.schema.createTable("farmers", f => {
    f.increments("id")
    f.integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    f.string("farmName").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("farmers");
};
