const notifications = [...new Array(32)].map((value,index)=>{
  return { NotificationID: 1, ChildID: ++index, Read: false }
});


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Children-Notifications').del()
    .then(function () {
      // Inserts seed entries
      return knex('Children-Notifications').insert(notifications);
    });
};
