const { alerts: url } = require('../utils/urls');
const { post: requestPost } = require('../utils/request');

function unmute() {
  return requestPost(`${url}/unmute_volume`);
}

function mute() {
  return requestPost(`${url}/mute_volume`);
}

function pause() {
  return requestPost(`${url}/pause_queue`);
}

function unpause() {
  return requestPost(`${url}/unpause_queue`);
}

function show() {
  return requestPost(`${url}/show_video`);
}

function hide() {
  return requestPost(`${url}/hide_video`);
}

const queueActions = { pause, unpause };
const volumeActions = { unmute, mute };
const videoActions = { show, hide };


function queue(action) {
  return queueActions[action]();
}

function volume(action) {
  return volumeActions[action]();
}

function video(action) {
  return videoActions[action]();
}

function skip() {
  return requestPost(`${url}/skip`);
}

function create(alert) {
  return requestPost(url, alert);
}

module.exports = {
  create,
  volume,
  queue,
  video,
  skip,
};
