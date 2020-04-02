const errors = {
  BAD_REQUEST: new Error('Id must be integer'),
  USER_NOT_FOUNDED: new Error('The user has not been founded'),
  INCORRECT_USER_DATA: new Error('Incorrect user data')
};

module.exports = errors;
