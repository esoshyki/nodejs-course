const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const { signIn } = require('./login.service');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  try {
    await signIn(req.body, ({ passwordIsValid, token }) => {
      if (passwordIsValid) {
        return res.json({
          status: HttpStatus.OK,
          message: 'Successful login.',
          token
        });
      }
      return res.json({
        status: HttpStatus.FORBIDDEN,
        message: 'Incorrect login or password'
      });
    });
  } catch (err) {
    return res.json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
    });
  }
});

module.exports = router;
