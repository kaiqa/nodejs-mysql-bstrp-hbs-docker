const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const fs = require('fs');
const options = {
  key: fs.readFileSync('./cert/localhost.key'),
  cert: fs.readFileSync('./cert/localhost.cert')
};
var https = require('https');
var http = require('http');
var servHttps = https.createServer(options, app);
var servHttp = http.createServer(options, app);


dotenv.config({ path: './.env' });
const db = require('./model/db');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

db.start.connect(function(err) {
  if(err) {
    console.log(err);
    console.log('Error connecting to the database');
  } else {
    console.log('Connected to MYSQL');
  }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

servHttps.listen(8443, () => {
  console.log("listening on port 8443");
})
servHttp.listen(8080, () => {
  console.log("listening on port 8080 ");
})
// app.listen(8080, () => {
//   console.log("listening on port 8080");
// })