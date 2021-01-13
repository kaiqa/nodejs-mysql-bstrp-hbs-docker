const express = require('express');
const debug = require('debug')('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const fs = require('fs');

const privateKey = fs.readFileSync('./cert/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./cert/cert.pem', 'utf8');
const ca = fs.readFileSync('./cert/fullchain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

var https = require('https');
var http = require('http');
// 
var servHttps = https.createServer(credentials, app);
var servHttp = http.createServer(credentials, app);


dotenv.config({ path: './.env' });
const db = require('./model/db');
const { exec } = require('child_process');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

db.start.connect(function (err) {
    if (err) {
        console.log(err);
        console.log('Error connecting to the database');
        debug('Error connecting to the database');
    } else {
        console.log('Connected to MYSQL');
        debug('Connected to MYSQL');
    }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

servHttps.listen(443, () => {
    console.log("listening on port 443");
    debug("listening on port 443");
})
servHttp.listen(80, () => {
    console.log("listening on port 80 ");
    debug("listening on port 80");
})
// read files
var directoryPath = './public/audio';
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        //   console.log("\007");
        //  console.log("say " + file);
        // exec("say " + file);
        //  exec('afplay /System/Library/Sounds/Ping.aiff')
        console.log(file);
        debug(file);
    });
});