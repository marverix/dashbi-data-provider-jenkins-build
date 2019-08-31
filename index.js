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
  axios.get(`${stripWrappingSlashes(this.config.jenkinsUrl)}/${stripWrappingSlashes(this.config.jobPath)}/lastBuild/api/json`, {
    timeout: 2 * Date.SECOND
  })
  .then( (res) => {
    this.storeState('id', res.data.id);
    this.storeState('result', res.data.result);
    this.storeState('duration', res.data.duration);
  })
  .catch( (err) => {
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
