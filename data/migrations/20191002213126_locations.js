exports.up = function(knex) {
  return knex.schema.createTable("locations", l => {
    l.increments("id");
    l.integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    l.string("lat").defaultTo("37.2343");
    l.string("lon").defaultTo("-115.8067");
    l.string("street1").notNullable();
    l.string("street2").notNullable();
    l.string("city").notNullable();
    l.string("state").notNullable();
    l.string("zip").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("locations");
};
