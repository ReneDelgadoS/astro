/*
    René Delgado Servín 30/05/2022
    ******************************
    Main of the REST API Astro
    The REST API  
*/
//Import config.js 
const config = require('./config')
//Initiate app
var https = require('https');
const fs = require('fs');
var privateKey  = fs.readFileSync('key.pem')
var certificate = fs.readFileSync('cert.pem')
var credentials = {key: privateKey, cert: certificate}
const express = require('express')
const app = express()
//Import endpoints.js
const endpoints = require('./endpoints')
endpoints.load(app)
//create https sserver
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000);
