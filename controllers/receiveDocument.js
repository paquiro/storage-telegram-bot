module.exports = ctx => {
  const document = ctx.message.document;
  //   bot.telegram.getFile(document.file_id).then(file => {
  //     request
  //       .get(
  //         `https://api.telegram.org/file/botd${config.telegram.token}/${
  //           file.file_path
  //         }`
  //       )
  //       .on("response", response => {
  //         ctx.reply("File saved successfully");
  //       })
  //       .pipe(
  //         // TODO Add ${path} between basePath and name
  //         fs.createWriteStream(`${process.env.basePath}${document.file_name}`)
  //       );
  //   });
};
