/*
    René Delgado Servín 30/05/2022
    ******************************
    Main of the REST API Astro
    Should handle module loading and intiation.        
*/
//Load config.js module
const config = require('./config');
const server = require("./server");
server.start(config.server.port)
