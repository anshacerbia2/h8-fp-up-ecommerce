const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPw = (pw) => {
  return bcrypt.hashSync(pw, bcrypt.genSaltSync(10));
}

const comparePw = (pwInput, pwHashed) => {
  return bcrypt.compareSync(pwInput, pwHashed);
}

const jwtSign = (objPayload) => {
  return jwt.sign(objPayload, process.env.SECRET);
}

const jwtVerify = (accessToken) => {
  return jwt.verify(accessToken, process.env.SECRET);
}

const slugify = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    slug: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  SequelizeSlugify.slugifyModel(User, {
    source: ['name']
  });

  return User;
};

module.exports = { hashPw, comparePw, jwtSign, jwtVerify, slugify };