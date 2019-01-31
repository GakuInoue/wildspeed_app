
var http = require('http');

//場所、英語指定
var location = "Tokyo, jp";

var units = 'metric';

//https://home.openweathermap.org/でアカウント作ってAPIキーを取得する、メールで送られてくる
var APIKEY = "APIkey";

var engjp = {200:'小雨と雷雨',201:'雨と雷雨',202:'大雨と雷雨', 210:'光雷雨',211:'雷雨',212:'重い雷雨',
			221:'ぼろぼろの雷雨',230:'小雨と雷雨',231:'霧雨と雷雨',232:'重い霧雨と雷雨',300:'光強度霧雨',
			301:'霧雨',302:'重い強度霧雨',310:'光強度霧雨の雨',
311:'霧雨の雨',
312:'重い強度霧雨の雨',
313:'にわかの雨と霧雨',
314:'重いにわかの雨と霧雨',
321:'にわか霧雨',
500:'小雨',
501:'適度な雨',
502:'重い強度の雨',
503:'非常に激しい雨',
504:'極端な雨',
511:'雨氷',
520:'光強度のにわかの雨',
521:'にわかの雨',
522:'重い強度にわかの雨',
531:'不規則なにわかの雨',
600:'小雪',
601:'雪',
602:'大雪',
611:'みぞれ',
612:'にわかみぞれ',
615:'光雨と雪',
616:'雨や雪',
620:'光のにわか雪',
621:'にわか雪',
622:'重いにわか雪',
701:'ミスト',
711:'煙',
721:'ヘイズ',
731:'砂、ほこり旋回する',
741:'霧',
751:'砂',
761:'ほこり',
762:'火山灰',
771:'スコール',
781:'竜巻',
800:'晴天',
801:'薄い雲',
802:'雲',
803:'曇りがち',
804:'厚い雲'}


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
		var id = weather[i]["id"];//天気ID取得
		var jp = engjp[id];//日本語変換
		console.log(jp);
	}
    //console.log(res);
  });
}).on('error', function(e) {
  console.log(e.message);
});