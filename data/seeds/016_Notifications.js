const postgresDateFormatter = require("../../lib/postgresDateFormatter");
const now = new Date();
const due = now.setDate(now.getDate()+3);
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Notifications').del()
    .then(function () {
      // Inserts seed entries
      return knex('Notifications').insert([
        {ID: 1, Text: '%username%, you have a new story to read!', Type: "information", LinksTo: "/child/story", Date: postgresDateFormatter(now), DueDate: postgresDateFormatter(due)},
      ]);
    });
};
