/**
 * Created by vrut on 26/11/15.
 */

var fs = require('fs');
var async = require('async');
var Download = require('download');
var cheerio = require('cheerio');

var ROOT = 'http://www.bombmanual.com/manual/1/html/';
var DEST_IMG = './public/img/';
var DEST_CSS = './public/css/';
var DEST_JS = './public/js/';

var INDEX = fs.readFileSync('./public/index.html', 'utf8');

var $ = cheerio.load(INDEX);
var images = [];

$('img').each(function(index, image) {

  images.push($(this).attr('src'));

});

async.each(images, function(image, cb) {

  var img = ROOT + image;
  var path = image.split('/').slice(1);

  path = path.slice(0, path.length -1).join('/');

  console.log('Downloading:', img, 'in:', path);

  new Download()
    .get(img)
    .dest(DEST_IMG + path)
    .run(cb);

}, function(err) {

  if (err) throw err;

  // downloading last files

  async.parallel([

    // CSS

    function(cb) {
      new Download()
        .get(ROOT + 'css/normalize.css')
        .get(ROOT + 'css/main.css')
        .dest(DEST_CSS)
        .run(cb);
    },

    // JS

    function(cb) {
      new Download()
        .get(ROOT + 'js/main.js')
        .dest(DEST_JS)
        .run(cb);
    }

  ], function() {

    console.log('Done');
    process.exit(0);

  });

});
