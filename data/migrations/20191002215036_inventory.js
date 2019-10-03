exports.up = function(knex) {
  return knex.schema.createTable("inventory", i => {
    i.increments("inventoryId");
    i.integer("farmerId")
      .unsigned()
      .notNullable()
      .references("farmerId")
      .inTable("farmers")
      .onDelete("CASCADE");
    i.integer("locationId")
      .unsigned()
      .notNullable()
      .references("locationId")
      .inTable("locations")
      .onDelete("CASCADE");
    i.integer("itemId")
      .unsigned()
      .notNullable()
      .references("itemId")
      .inTable("items")
      .onDelete("CASCADE");
    i.integer("unitId");
    i.decimal("quantity");
    i.decimal("price");
    i.text("description", 255);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("inventory");
};
