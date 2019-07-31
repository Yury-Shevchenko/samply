const fs = require('fs');

exports.moment = require('moment');
exports.dump = (obj) => JSON.stringify(obj, null, 2);
// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);
exports.siteName = `Samply`;
