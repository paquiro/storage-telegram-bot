const config = require("config");

const isUserAllowed = id => {
  if (typeof id === Number) id = id.toString();
  return config.auth.allowed.includes(ctx.message.from.id.toString());
};
