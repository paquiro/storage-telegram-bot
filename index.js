"use strict";

const request = require("request");
const fs = require("fs");
const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");
const config = require("config");

const auth = require("./auth");

if (!config.telegram.token) {
  console.log("Please enter a token");
  process.exit(0);
}

const bot = new Telegraf(config.telegram.token);

// Authorization
bot.use((ctx, next) => {
  const userId = ctx.message.from.id;

  if (auth.isUserAllowed(userId)) {
    return next();
  }
  return ctx.reply("You are not allowed to insert data on this Cloud");
});

bot.on("photo", ctx => {
  ctx.reply(
    "If you want to storage the image, send it like a document.",
    Extra.inReplyTo(ctx.message.message_id)
  );
});

bot.on("document", ctx => {
  const document = ctx.message.document;

  bot.telegram.getFile(document.file_id).then(file => {
    request
      .get(
        `https://api.telegram.org/file/botd${config.telegram.token}/${
          file.file_path
        }`
      )
      .on("response", response => {
        ctx.reply("File saved successfully");
      })
      .pipe(
        // TODO Add ${path} between basePath and name
        fs.createWriteStream(`${process.env.basePath}${document.file_name}`)
      );
  });
});

bot.startPolling();
