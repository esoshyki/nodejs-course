const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const { JWT_SECRET_KEY } = require('../common/config');

const checkToken = (req, res, next) => {
  console.log(req.headers);
  let token = req.headers['x-acces-token'] || req.headers.authorization;
  console.log(req.headers.authorization);
  console.log(req.headers['x-acces-token']);
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .send('Access token is missing or invalid')
          .end();
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send('Access token is missing or invalid')
      .end();
  }
};

module.exports = checkToken;
