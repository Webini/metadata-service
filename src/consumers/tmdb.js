module.exports = function(message, channel) {
  channel.ack(message);
};