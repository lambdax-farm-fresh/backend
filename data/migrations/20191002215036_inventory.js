exports.up = function(knex) {
  return knex.schema.createTable("inventory", i => {
    i.increments("inventoryId");
    i.integer("farmerId")
      .unsigned()
      .notNullable()
      .references("farmerId")
      .inTable("farmers")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    i.integer("locationId")
      .unsigned()
      .notNullable()
      .references("locationId")
      .inTable("locations")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    i.integer("itemId")
      .unsigned()
      .notNullable()
      .references("itemId")
      .inTable("items")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    i.integer("unitId").notNullable();
    i.decimal("quantity").notNullable();
    i.decimal("price").notNullable();
    i.text("description", 255).defaultTo("");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("inventory");
};
