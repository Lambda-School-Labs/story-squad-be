const _has = require('lodash.has');

/**
 * A custom middleware that checks to ensure the data passed in is valid before
 * attempting to send it to the database. This allows for better error messages
 * to be sent back to the client by resolving the API call to a 400 if the data
 * is incorrectly formatted. If the data is correct, the server will move on to
 * the actual POST router.
 * @param {Object} req the server request object
 * @param {Object} res the server response object
 * @param {Function} next a function that will continue to the next middleware
 */
const avatarValidation = (req, res, next) => {
  const avatar = req.body;
  if (_has(avatar, 'AvatarURL')) {
    next();
  } else {
    res.status(400).json({ error: 'InvalidAvatar' });
  }
};

module.exports = {
  avatarValidation,
};
