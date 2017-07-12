const express = require('express');
const path = require('path');
const axios = require("axios");
const CircularJSON = require('circular-json');

const app = express();

app.use(function(req, res, next){
res.header('Access-Control-Allow-Origin', "*");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");

next();
});


// Server routes...
app.get('/hello', (req, res) => res.send({ hi: 'there' }));

app.get('/yelpapi', (req, res)=>{

  var config = {
    headers:{
      Authorization: 'Bearer 9gHeNtI4Ioq6Wa3fKlztqiIdoYzxT0ucMz3qQNHS0fBB6rnuhyBxRoxvMeBgSixUoQNoldJh4bEaJCW825FVZi95CEly5B5kHYgteiNgiYYhThg8vjKELkPUSotbWXYx'
    }
  }
  console.log(req.query.location);
  console.log(req.query.offset);
  var url = `https://api.yelp.com/v3/businesses/search?term=bars&location=${req.query.location}&limit=50&offset=${req.query.offset}`;
  axios.get(url, config).then((response)=>{
    const json = CircularJSON.stringify(response);
    res.send(json);
  }).catch((error)=>{
  
    console.log(error);
});
});

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  console.log("Runnig non-prod");
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {

  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));
