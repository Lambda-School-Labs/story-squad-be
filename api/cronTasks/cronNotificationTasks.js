const db = require('../../data/db-config');
const createNotification = async (notificationObject) => {
  if (notificationObject.text) {
    return await db('Notifications')
      .insert({
        Text: notificationObject.text,
        Type: notificationObject.type || 'information',
        LinksTo: notificationObject.linksTo || '',
        Date: notificationObject.date || new Date(),
        DueDate: notificationObject.dueDate.toString() || null,
      })
      .returning('ID');
  }
  console.log('error in cronNotificationTasks.js line 15');
  return false;
};
const populateBridgeTable = async (userTable, notificationID) => {
  const userIDStrings = {
    Children: 'ChildID',
    Parents: 'ParentID',
    Staff: 'StaffID',
  };
  const userIDs = await db(userTable).pluck('ID');
  const notificationExists = await db('Notifications').where({
    ID: notificationID,
  });
  if (userIDs && notificationExists) {
    const bridgeTableArray = userIDs.map((id) => {
      if (id > 0) {
        return {
          [userIDStrings[userTable]]: parseInt(id),
          NotificationID: parseInt(notificationID),
        };
      }
    });
    const populate = await db(`${userTable}-Notifications`).insert(
      bridgeTableArray
    );
    if (populate) {
      return true;
    }
  }
  return false;
};

module.exports = { createNotification, populateBridgeTable };
