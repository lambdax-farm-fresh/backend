exports.up = function(knex) {
  return knex.schema.createTable("farmers", f => {
    f.increments("farmerId");
    f.integer("userId")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    f.string("farmName").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("farmers");
};
