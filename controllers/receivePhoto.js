const Extra = require("telegraf/extra");

module.exports = ctx => {
  ctx.reply(
    "If you want to storage the image, send it like a document.",
    Extra.inReplyTo(ctx.message.message_id)
  );
};
