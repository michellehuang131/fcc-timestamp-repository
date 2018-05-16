// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

app.get("/", function (request, response) {
  // response.sendFile(__dirname + '/views/index.html');
  response.send('Welcome to the homepage');
});

app.get("/:userString", function (request, response) {
  
  //if unixtimestamp
  if(isNaN(Number(request.params.userString))==false){
    var theTime = new Date(Number(request.params.userString)*1000) //converting to milliseconds for new Date()
  }
  //else string date 
  else{
    var theTime = new Date(request.params.userString);
  }
  
  
  //is the created date valid?
  if(theTime=='Invalid Date'){
    response.send('sorry you provided an invalid date');
  }
  else{
    //{ "unix": 1450137600, "natural": "December 15, 2015" }
    var returnDateData = {};
    returnDateData["unix"] = theTime.getTime()/1000;
    returnDateData["natural"] = theTime.toDateString();
    
    response.send(JSON.stringify(returnDateData));
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
