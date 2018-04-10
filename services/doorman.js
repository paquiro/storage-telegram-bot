const auth = require("./auth");

module.exports = (ctx, next) => {
  const userId = ctx.message.from.id;

  if (auth.isUserAllowed(userId)) {
    return next();
  }
  return ctx.reply("You are not allowed to insert data on this Cloud");
};
