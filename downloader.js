/**
 * Created by vrut on 26/11/15.
 */

var fs = require('fs');
var async = require('async');
var download = require('download');

var ROOT = 'http://www.bombmanual.com/manual/1/html/';
var DEST = './public/img';

var INDEX = fs.readFileSync('./public/index.html', 'utf8');
var images = INDEX.match(/\<img .+?\/\>/ig);

async.each(images, function(image, cb) {

  var url = image.match(/src="(.+)"[\s|\/]/i);

  if (!url) {
    return console.log('NOT FOUND:', image);
  }

  // console.log(ROOT + url[1]);
  download
    .get(ROOT + url[1])
    .dest(DEST)
    .run(cb);

}, function(err) {

  if (err) throw err;

  console.log('Done');
  process.exit(0);

});
