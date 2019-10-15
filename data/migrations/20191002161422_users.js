exports.up = function(knex) {
  return knex.schema.createTable("users", u => {
    u.increments("id");
    u.string("firstName").notNullable();
    u.string("lastName").notNullable();
    u.string("email")
      .unique()
      .notNullable();
    u.string("firebaseId")
      .unique()
      .notNullable();
    u.string("picture").defaultTo("http://clipart-library.com/img/1325216.png");
    u.string("lat").defaultTo("37.2343");
    u.string("lon").defaultTo("-115.8067");
    u.boolean("isfarmer").defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
