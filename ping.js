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
        res.send("緯度："+response.json.results[0].geometry.location.lat+"\n経度："+response.json.results[0].geometry.location.lng);
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
            res.send("最寄り駅は"+result.response.station[0].name+"駅です");
         
            // console.log(result);
          });
        });
      })
      .catch((err) => {
        console.log(err);
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
