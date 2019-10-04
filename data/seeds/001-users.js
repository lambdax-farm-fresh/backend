const faker = require("faker");

const createFakeUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  firebaseId: faker.random.uuid(),
  picture: faker.image.food(),
  lat: faker.address.latitude(),
  lon: faker.address.longitude()
});

exports.seed = function(knex) {
  let fakeUsers = [];
  for (let i = 1; i <= 90; i++) {
    fakeUsers.push(createFakeUser());
  }
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert(fakeUsers);
    });
};
