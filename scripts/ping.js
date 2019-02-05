// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';
const CronJob = require("cron").CronJob;
var tetsudocom = require("./tetsudocom.js");
var test = require("./test.js");
var http = require('http');
var index = require("./index.js");
const fs = require('fs');

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAoMX0o0ClpB7BGPn2XZaF4ilD2blTZJAA',
  Promise: Promise
});

module.exports = (robot) => {

//   let event;
//   robot.brain.once('loaded', () => {
//     event = new Event({ robot });
// 
//     // お弁当注文のリマインド処理
//   const sendOrderMsgCron = new CronJob({
//       cronTime : '*/10 * * * * *',
//       onTick   : () => event.sendOrderMsg(),
//       start    : true,
//       timeZone : 'Asia/Tokyo'
//    });
//   });

  const job = id => new CronJob({
    cronTime: "*/10 * * * * *",
    onTick: () => robot.send({room: id},{text: 'test'}),
    start: false
  })

  robot.respond(/電車$/i, (res) => {
    tetsudocom.func(function(result){
      var trains = "現在\n"
      for (var i = 0; i < result.length; i++) {
        trains += result[i].name
        trains += "\n"
      }
      trains += "が遅延しています"
      res.send(trains);
    })
  });

  robot.respond(/test$/i, (res) => {
    var url = 'http://express.heartrails.com/api/json?method=getStations';
    var lat = "35.6989404"
    var lng = "139.7438649"
    var latlng = "&x="+lng+"&y="+lat
    url += latlng
    var data = [];
    var result = null;
    // test.func(function(latlng,result){
    // test.func(function(result){
    //   console.log(result.response.station[0].name);
    //   res.send(result.response.station[0].name);
    // })
    http.get(url, function (resul) {
      resul.on('data', function(chunk) {
        data.push(chunk);
      }).on('end', function() {
     
        var events   = Buffer.concat(data);
        result = JSON.parse(events);
        res.send(result.response.station[0].name);
     
        // console.log(result);
      });
    });
  });

  robot.respond(/場所　(.*)$/i, (res) => {
    googleMapsClient.geocode({address: res.match[1]})
      .asPromise()
      .then((response) => {
        console.log(response.json.results[0].geometry.location);
        // res.send("緯度："+response.json.results[0].geometry.location.lat+"\n経度："+response.json.results[0].geometry.location.lng);
        var url = 'http://express.heartrails.com/api/json?method=getStations';
        var lat = response.json.results[0].geometry.location.lat
        var lng = response.json.results[0].geometry.location.lng
        var latlng = "&x="+lng+"&y="+lat
        url += latlng
        var data = [];
        var result = null;
        // test.func(function(latlng,result){
        // test.func(function(result){
        //   console.log(result.response.station[0].name);
        //   res.send(result.response.station[0].name);
        // })
        http.get(url, function (resul) {
          resul.on('data', function(chunk) {
            data.push(chunk);
          }).on('end', function() {
         
            var events   = Buffer.concat(data);
            result = JSON.parse(events);
            console.log(result.response);
            res.send("最寄り駅は"+result.response.station[0].name+"駅です");
            console.log("最寄り駅は"+result.response.station[0].name+"駅です");
            var stations = ""
            console.log(result.response);
         
            // console.log(result);
          });
        });
      })
      .catch((err) => {
        console.log(err);
  });

  });

  robot.respond(/予定$/i, (res) => {
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      index.authorize(JSON.parse(content), (function(oAuth2Client){
        index.listEvents(oAuth2Client,function(text){
          console.log(text);
          res.send(text);
        })
        }));
    });
  });

  robot.respond(/本日の予定$/i, (res) => {
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      index.authorize(JSON.parse(content), (function(oAuth2Client){
        index.listEvents(oAuth2Client,function(text){
          console.log(text);
          res.send(text);
          // text = ""
        })
        res.send(text);
        }));
    });
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      index.authorize(JSON.parse(content), (function(oAuth2Client){
        index.listEvents2(oAuth2Client,function(locate){
          console.log(locate);
          res.send(locate);

          for(var k = 0; k < locate.length; k++){
          googleMapsClient.geocode({address: locate[k]})
            .asPromise()
            .then((response) => {
              console.log(response.json.results[0].geometry.location);
              // res.send("緯度："+response.json.results[0].geometry.location.lat+"\n経度："+response.json.results[0].geometry.location.lng);
              var url = 'http://express.heartrails.com/api/json?method=getStations';
              var lat = response.json.results[0].geometry.location.lat
              var lng = response.json.results[0].geometry.location.lng
              var latlng = "&x="+lng+"&y="+lat
              url += latlng
              var data = [];
              var result_get = null;
              var result = null;
              // test.func(function(latlng,result){
              // test.func(function(result){
              //   console.log(result.response.station[0].name);
              //   res.send(result.response.station[0].name);
              // })
              http.get(url, function (resul) {
                resul.on('data', function(chunk) {
                  data.push(chunk);
                }).on('end', function() {
               
                  var events   = Buffer.concat(data);
                  result_get = JSON.parse(events);
                  res.send("最寄り駅は"+result_get.response.station[0].name+"駅です");
               
                  var stations = [];
                  var str_i = ""
                  var head = ""
                  var head2 = ""
                  var head3 = ""
                  var push_str = ""
                  for (var i = 0; i < result_get.response.station.length; i++) {
                    // stations += result_get.response.station[i].line
                    // stations += "\n"
                    str_i = result_get.response.station[i].line
                    head = str_i.slice(0,2);
                    head2 = str_i.slice(0,3);
                    head3 = str_i.slice(0,5);
                    if(head == "JR"){
                      push_str = str_i.slice(2);
                    }else if(head2 == "小田急"){
                      push_str = str_i.slice(3);
                    }else if(head3 == "東京メトロ"){
                      push_str = str_i.slice(5);
                    }else{
                      push_str = str_i
                    }

                    stations.push(push_str);
                  }
                  var stations = stations.filter(function (x, i, self) {
                    return self.indexOf(x) === i;
                  });
                  tetsudocom.func(function(result){
                    var trains = [];
                    for (var i = 0; i < result.length; i++) {
                        // trains += result[i].name
                        // trains += "\n"
                        trains.push(result[i].name);
                    }
                    var trains = trains.filter(function (x, i, self) {
                      return self.indexOf(x) === i;
                    });
                    console.log(trains);
                    console.log(stations);
                    var count = 0
                    var tienn = ""
                    for (var i = 0; i < trains.length; i++){
                      // console.log(trains[i]);
                      for (var j = 0; j < stations.length; j++){
                        // console.log(stations[j]);
                        if(trains[i] == stations[j]){
                          console.log(trains[i]);
                          tienn += trains[i]
                          tienn += "\n"
                          count += 1
                        }
                      }
                    }
                    if(count == 0){
                      res.send("関係ある遅延なし");
                    }else{
                      res.send("今\n"+tienn+"が遅延しています");
                    }
                  })
                  // console.log(stations);
                });
              });
            })
            }





        })
        }));
    });
  });

  robot.respond(/start$/i, (res) => {
    res.send('job start');
    const id = res.message.room
    job(id).start()
  });

  robot.respond(/stop$/i, (res) => {
    res.send('job stop');
    const id = res.message.room
    job(id).stop()
  });

  robot.respond(/PING$/i, (res) => {
    res.send('PONG');
  });

  robot.respond(/(.*)月(.*)日$/i, (res) => {
    res.send(res.match[1]+'/'+res.match[2]);
  });

  robot.respond(/(.*)\/(.*)$/i, (res) => {
    res.send(res.match[1]+'月'+res.match[2]+'日');
  });

  robot.respond(/ADAPTER$/i, (res) => {
    res.send(robot.adapterName);
  });

  robot.respond(/ECHO (.*)$/i, (res) => {
    res.send(res.match[1]);
  });

  robot.respond(/TIME$/i, (res) => {
    res.send(`Server time is: ${new Date()}`);
  });
};
