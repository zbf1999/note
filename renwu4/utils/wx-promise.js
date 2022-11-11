const { promisifyAll } = require('miniprogram-api-promise');

const wxp = {};
promisifyAll(wx, wxp);

/**
 * @type {*}
 */
module.exports = wxp;
