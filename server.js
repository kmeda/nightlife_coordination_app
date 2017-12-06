const express = require('express');
const path = require('path');
const axios = require("axios");
const CircularJSON = require('circular-json');
var favicon = require('serve-favicon');

const app = express();
app.use(favicon(path.join(__dirname + '/favicon.ico')));

app.use(function(req, res, next){
res.header('Access-Control-Allow-Origin', "*");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

next();
});


// Server routes...

app.get('/yelpapi/businesses', (req, res)=>{

  var config = {
    headers:{
      Authorization: 'Bearer 9gHeNtI4Ioq6Wa3fKlztqiIdoYzxT0ucMz3qQNHS0fBB6rnuhyBxRoxvMeBgSixUoQNoldJh4bEaJCW825FVZi95CEly5B5kHYgteiNgiYYhThg8vjKELkPUSotbWXYx'
    }
  }
  console.log(req.query.location);
  console.log(req.query.offset);
  var url = `https://api.yelp.com/v3/businesses/search?term=bars&location=${req.query.location}&limit=20&offset=${req.query.offset}`;
  axios.get(url, config).then((response)=>{
    let json = CircularJSON.stringify(response);
    res.send(json);
  }).catch((error)=>{

    console.log(error);
});
});

app.get('/yelpapi/reviews', (req, res)=>{
  var config = {
    headers:{
      Authorization: 'Bearer 9gHeNtI4Ioq6Wa3fKlztqiIdoYzxT0ucMz3qQNHS0fBB6rnuhyBxRoxvMeBgSixUoQNoldJh4bEaJCW825FVZi95CEly5B5kHYgteiNgiYYhThg8vjKELkPUSotbWXYx'
    }
  }
  var url = `https://api.yelp.com/v3/businesses/${req.query.id}/reviews`;
  axios.get(url, config).then((response)=>{
    let json = CircularJSON.stringify(response);
    res.send(json);
  }).catch((error)=>{
    console.log(error);
});

});

app.use(express.static('dist'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.listen(process.env.PORT || 3050, () => console.log('Listening'));
