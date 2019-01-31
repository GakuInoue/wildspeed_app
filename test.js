var http = require('http');
var url = 'http://express.heartrails.com/api/json?method=getStations&x=139.7438649&y=35.6989404';
// var url = 'http://express.heartrails.com/api/json?method=getStations';
var data = [];
var result = null;

exports.func = function(callback) {
// exports.func = function(latlng,callback) {
// https.get(url+latlng, function (res) {
http.get(url, function (res) {
  res.on('data', function(chunk) {
    data.push(chunk);
  }).on('end', function() {
 
    var events   = Buffer.concat(data);
    result = JSON.parse(events);
    callback(result);
 
    // console.log(result);
  });
});
return result;
}
