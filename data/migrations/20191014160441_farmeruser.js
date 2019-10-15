
exports.up = function(knex) {
    return knex.schema.createTable("farmeruser", u => {
        u.increments('id')
        u.integer("userId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        u.integer("farmId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("farms")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("farmeruser");
};
