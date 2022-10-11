const { jwtVerify } = require('../helpers');;
const { User } = require('../models')

module.exports = async (request, response, next) => {
  try {
    const { access_token } = request.headers;
    if (!access_token) throw { status: 401, message: 'Missing Token' };
    const payload = jwtVerify(access_token);
    const user = await User.findByPk(+payload.id);
    request.user = { id: user.id, role: user.role };
    next();
  } catch (errors) {
    next(errors);
  }
};