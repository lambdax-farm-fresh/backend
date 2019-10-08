
exports.up = function(knex) {
    return knex.schema.createTable("orders", u => {
        u.increments('id')
        u.integer("userId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        u.integer("farmerId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("farmers")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        u.date("date");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("orders");
};
