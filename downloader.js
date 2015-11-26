/**
 * Created by vrut on 26/11/15.
 */

var fs = require('fs');
var async = require('async');
var Download = require('download');
var cheerio = require('cheerio');

var ROOT = 'http://www.bombmanual.com/manual/1/html/';
var DEST_IMG = './public/img';
var DEST_CSS = './public/CSS';

var INDEX = fs.readFileSync('./public/index.html', 'utf8')
  .replace(/\n/g, '')
  .replace(/\r/g, '')
  .replace(/  /g, '');

var $ = cheerio.load(INDEX);
var images = [];

$('img').each(function(index, image) {

  images.push($(this).attr('src'));

});

async.each(images, function(image, cb) {

  var img = ROOT + image;

  console.log('Downloading:', img);

  new Download()
    .get(img)
    .dest(DEST_IMG)
    .run(cb);

}, function(err) {

  if (err) throw err;

  // downloading last files

  new Download()
    .get(ROOT + 'css/normalize.css')
    .get(ROOT + 'css/main.css')
    .dest(DEST_CSS)
    .run(function() {

      console.log('Done');
      process.exit(0);

    });

});
