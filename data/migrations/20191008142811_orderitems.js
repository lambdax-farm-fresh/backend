
exports.up = function(knex) {
    return knex.schema.createTable("orderitems", u => {
        u.increments('id')
        u.integer("itemId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("items")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        u.integer("orderId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("orders")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("orderitems");
};
