// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';
const CronJob = require("cron").CronJob;

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
    // onTick: () => res.send('test'),
    // onTick: () => console.log('test'),
    // onTick: () => robot.send({room: '_200262169_100663296'},{text: 'test'}),
    onTick: () => robot.send({room: id},{text: 'test'}),
    start: false
  })

  robot.respond(/ID$/i, (res) => {
    res.send(res.message.room);
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
