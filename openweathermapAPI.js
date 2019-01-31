
var http = require('http');

//場所、英語指定
var location = "Tokyo, jp";

var units = 'metric';

//https://home.openweathermap.org/でアカウント作ってAPIキーを取得する、メールで送られてくる
var APIKEY = "APIkey";

var URL = 'http://api.openweathermap.org/data/2.5/weather?q='+ location +'&units='+ units +'&appid='+ APIKEY;
http.get(URL, function(res) {
  var body = '';
  var weather = null;
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('data', function(chunk) {
    res = JSON.parse(body);
	weather = res["weather"]
	//天気の取得、参考：https://usortblog.com/openweathermap2/
	for(i=0;i<weather.length;i++){
		console.log(weather[i]["main"]);
	}
    //console.log(res);
  });
}).on('error', function(e) {
  console.log(e.message);
});