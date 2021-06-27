const events = [
  //Sunday = 7, Monday = 1
  {
    text: '%username%, you have a new story to read!',
    link: '/child/story',
    groups: ['Children'],
    unlock: ['Read'],
    lock: ['PointShare', 'MatchUp'],
    opens: {
      day: 6, //Saturday = 6
      hour: 9,
      minute: 0,
    },
    due: {
      day: 3,
      hour: 9,
      minute: 0,
    },
  },
  {
    text: '%username%, draw a picture based on the story you read!',
    link: '/child/drawing-sub',
    groups: ['Children'],
    unlock: ['Draw'],
    opens: {
      day: 1, //Monday = 1
      hour: 9,
      minute: 0,
    },
    due: {
      day: 3,
      hour: 9,
      minute: 0,
    },
  },
  {
    text: '%username%, write a story based on the story you read!',
    link: '/child/writing-sub',
    groups: ['Children'],
    unlock: ['Write'],
    opens: {
      day: 2, //Tuesday = 2
      hour: 9,
      minute: 0,
    },
    due: {
      day: 3,
      hour: 9,
      minute: 0,
    },
  },
  {
    text: '%username%, you have submissions to review',
    link: '/staff/review', //incorrect link
    groups: ['Staff'],
    lock: ['Read','Write','Draw'],
    opens: {
      day: 3, //Wednesday = 3
      hour: 9,
      minute: 0,
    },
    due: {
      day: 4,
      hour: 9,
      minute: 0,
    },
  },
  {
    text:
      '%username%, find out who you are paired with and use your points to give your team the best chance to win!',
    link: '/child/point-share',
    groups: ['Children'],
    unlock: ['PointShare'],
    opens: {
      day: 4, //Thursday = 4
      hour: 9,
      minute: 0,
    },
    due: {
      day: 5,
      hour: 9,
      minute: 0,
    },
  },
  {
    text: "%username%, it's time to vote for the best writing and drawing!",
    link: '/child/match-up',
    groups: ['Children'],
    unlock: ['MatchUp'],
    opens: {
      day: 5, //Friday = 5
      hour: 9,
      minute: 0,
    },
    due: {
      day: 6,
      hour: 9,
      minute: 0,
    },
  },
];
module.exports = events;
