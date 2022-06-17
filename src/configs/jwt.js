const jwt = require('jsonwebtoken');
const APP = require('../constants/app');

const make = (user,tokenTimeLife) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: user },
      APP.ACCESS_TOKEN,
      {
        algorithm: "HS256",
        expiresIn: tokenTimeLife || APP.TOKEN_TIME_LIFE
      },
      (err, _token) => {
        if (err) return reject(err);
        return resolve(_token);
      });
  });
}

const check = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      APP.ACCESS_TOKEN,
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
  });
}

module.exports = {
  make: make,
  check: check
};