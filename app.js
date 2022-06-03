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
var privateKey  = fs.readFileSync(__dirname +'./selfsigned.key')
var certificate = fs.readFileSync(__dirname +'./selfsigned.crt')
var credentials = {key: privateKey, cert: certificate}
const express = require('express')
const app = express()
//Import endpoints.js
const endpoints = require('./endpoints')
endpoints.load(app)
//create https sserver
var httpsServer = https.createServer(credentials, app)
httpsServer.listen(config.app.port).then(()=>{
    console.log("Server started")
})
