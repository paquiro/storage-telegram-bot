const config = require("config");

const isUserAllowed = id => config.auth.allowed.includes(id.toString());

module.exports = {
  isUserAllowed
};
