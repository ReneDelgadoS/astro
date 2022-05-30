/*
    René Delgado Servín 29/05/2022
    ******************************
    Server module.
*/

const express = require("express");
const server = express();

module.exports = {
    start: (port)=>{
        server.listen(port, () => {
            console.log("Server running in "+port);
        });
    }
}