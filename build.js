/* jshint node: true */

var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, 'site'), {
  logger: function (msg) {
    console.log(msg);
  },
  branch: 'master'
}, function(err) {
  if (err) {
    console.error('Uh-oh! ' + err);
  }
});
