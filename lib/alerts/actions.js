const queue = Object.freeze({
  pause: 'pause',
  unpause: 'unpause',
});

const volume = Object.freeze({
  unmute: 'unmute', 
  mute: 'mute', 
});

const video = Object.freeze({
  show: 'show', 
  hide: 'hide', 
});

module.exports = {
  queue,
  volume,
  video,
};
