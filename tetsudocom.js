var https = require('https');
var url = 'https://rti-giken.jp/fhc/api/train_tetsudo/delay.json';
var data = [];
var result = null;

https.get(url, function (res) {
  res.on('data', function(chunk) {
    data.push(chunk);
  }).on('end', function() {
 
    var events   = Buffer.concat(data);
    result = JSON.parse(events);
 
    console.log(result);
  });
});
return result;