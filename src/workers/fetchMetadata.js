module.exports = function(message, channel) {
  try {
    console.log('LA => ', message.contentData);
    channel.nack(message, false, false);
  } catch (e) {
    console.log(e);
  }
};