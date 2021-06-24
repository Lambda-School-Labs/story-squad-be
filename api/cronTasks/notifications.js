const events = require('./eventSchedule.js');
const cron = require('node-cron');
const cronNotificationTasks = require('./cronNotificationTasks');
const postgresDateFormatter = require('../../lib/postgresDateFormatter');
//slice is used for testing purposes due to postgres rate limiting - replace with event.forEach to schedule all notifications
[...events.slice(0,1)].forEach((event) => {
  cron.schedule(
    `${event.opens.minute} ${event.opens.hour} * * ${event.opens.day}`,
    async () => {
      const dueDateDelta = event.due 
        ? {
          days:
            event.opens.day > event.due.day
              ? 7 - event.opens.day + event.due.day
              : event.due.day - event.opens.day,
          hours:
            event.opens.hour > event.due.hour
              ? 24 - event.opens.hour + event.due.hour
              : event.due.hour - event.opens.hour,
          minutes: event.due.minute
            ? event.opens.minute > event.due.minute
              ? 60 - event.opens.minute + event.due.minute
              : event.due.minute - event.opens.minute
            : 0,
        }
        : null;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + dueDateDelta.days);
      dueDate.setHours(dueDate.getHours() + dueDateDelta.hours);
      dueDate.setMinutes(dueDate.getMinutes() + dueDateDelta.minutes);
      try {
        const notificationID = await cronNotificationTasks.createNotification({
          text: `${event.text}`,
          linksTo: `${event.linksTo}`,
          ...dueDate ? {dueDate: postgresDateFormatter(dueDate)} : null,
        });
        if (notificationID[0]) {
          event.groups.forEach(async (group)=>{
            await cronNotificationTasks.populateBridgeTable(group,notificationID[0]);
          })
        } else {
          console.log(`error creating notification - notification text: ${event.text}`);
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  );
});
