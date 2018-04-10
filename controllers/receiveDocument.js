const async = require('async');
const request = require('request');
const fs = require('fs');
const config = require('config');

module.exports = bot => ctx => {
  const { document } = ctx.message;

  const getFileIdFromTelegram = cb => {
    bot.telegram
      .getFile(document.file_id)
      .then(file => cb(null, file))
      .catch(cb);
  };

  const getFile = (file, cb) => {
    request
      .get(
        `https://api.telegram.org/file/bot${config.telegram.token}/${
          file.file_path
        }`,
      )
      .on('response', response => {
        cb(null, response);
      })
      .on('error', cb);
  };

  const saveFile = (res, cb) => {
    const path = `${config.storage.basePath}${document.file_name}`;
    const ws = fs.createWriteStream(path);
    ws.on('error', cb);
    ws.on('close', () => cb(null, 'Chachito'));
    res.pipe(ws);
  };

  async.waterfall([getFileIdFromTelegram, getFile, saveFile], err => {
    const messageToSend = err
      ? 'Error uploading file'
      : 'File saved successfully';
    // TO-DO: Send error message to Admin
    ctx.reply(messageToSend);
  });
};
