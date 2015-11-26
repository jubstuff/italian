/**
 * Created by vrut on 26/11/15.
 */

var fs = require('fs');
var async = require('async');
var Download = require('download');

var ROOT = 'http://www.bombmanual.com/manual/1/html/';
var DEST = './public/img';

var INDEX = fs.readFileSync('./public/index.html', 'utf8');
var images = INDEX.match(/\<img .+?\/\>/ig);

async.each(images, function(image, cb) {

  var url = image.match(/src="img\/(.+\.svg)"/i);

  if (!url) {
    return console.log('NOT FOUND:', image);
  }

  var img = ROOT + 'img/' + url[1];

  console.log('Downloading:', img);
  new Download()
    .get(img)
    .dest(DEST)
    .run(cb);

}, function(err) {

  if (err) throw err;

  console.log('Done');
  process.exit(0);

});
