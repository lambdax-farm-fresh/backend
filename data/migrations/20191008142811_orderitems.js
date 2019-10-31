
exports.up = function(knex) {
    return knex.schema.createTable("orderitems", u => {
        u.increments('id')
        u.integer("inventoryId")
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
        u.decimal('quantityPurchased').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("orderitems");
};
