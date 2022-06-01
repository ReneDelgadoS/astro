/*
    René Delgado Servín 30/05/2022
    ******************************
    Main of the REST API Astro
    The REST API  
*/
//Import config.js 
const config = require('./config')
//Initiate app
const express = require('express')
const app = express()
app.listen(config.app.port, () => {
    console.log('Server running in '+config.app.port)
});
//Import endpoints.js
const endpoints = require('/endpoints')
endpoints.loadEndpoints(app)