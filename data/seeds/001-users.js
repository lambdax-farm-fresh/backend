exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          firstName: "Bobby",
          lastName: "Brown",
          email: "bobby@brown.com",
          firebaseId: "FIREBASEID",
          picture: "picture.jpg",
          lat: "-122.4587",
          lon: "79.5634"
        },
        {
          id: 2,
          firstName: "Whitney",
          lastName: "Houston",
          email: "Whitney@Houston.com",
          firebaseId: "FIREBASEID2",
          picture: "picture.jpg",
          lat: "-122.4587",
          lon: "79.5634"
        }
      ]);
    });
};
