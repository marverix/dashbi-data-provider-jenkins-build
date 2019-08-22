'use strict';

const axios = require('axios');
const Worker = require('dashbi-worker');

/**
 * Strip wrapping slashes
 * @param {string} str
 */
function stripWrappingSlashes (str) {
  return str.replace(/^\/|\/$/g, '');
}

/**
 * Get last build
 */
function getLastBuild () {
  let that = this;
  axios.get(`${stripWrappingSlashes(that.config.jenkinsUrl)}/${stripWrappingSlashes(that.config.jobPath)}/lastBuild/api/json`, {
    timeout: 2 * Date.SECOND
  })
  .then(function (res) {
    that.storeState('id', res.data.id);
    that.storeState('result', res.data.result);
    that.storeState('duration', res.data.duration);
  })
  .catch(function (err) {
    // Support error?
  });
}

// Create worker
const worker = new Worker({
  jenkinsUrl: '',
  jobPath: ''
});

// Add checks
worker.addCheck(getLastBuild, Math.floor(5 * Date.SECOND + Math.rand() * Date.SECOND) );
worker.sendOnChange();
