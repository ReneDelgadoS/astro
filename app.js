/*
    René Delgado Servín 30/05/2022
    ******************************
    Main of the REST API Astro
    Should handle module loading and intiation.        
*/
//Import config.js 
const config = require('./config');
//Import server.js
const server = require("./server");
//Import enendpoints.js
const endpoints = requiere("./endpoints")
//Import db.js
const db = requiere("./db")
//Start server
server.start(config.server.port)
//Start DB
db.loadOriginalData()
//Start endpoints


