exports.up = function(knex) {
  return knex.schema.createTable("units", u => {
    u.increments();
    u.string("unit").notNullable;
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("units");
};
