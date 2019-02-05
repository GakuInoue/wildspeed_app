
const fs = require('fs');
var index = require("./index.js");

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  index.authorize(JSON.parse(content), (function(oAuth2Client){
    index.listEvents(oAuth2Client,function(text){
      console.log(text);
    })
    }));
  // index.listEvents(function(text){
    // console.log(text);
// })
// index.listEvents(function(text){
  // console.log(text);
// })
});


