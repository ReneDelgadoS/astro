/*
    René Delgado Servín 29/05/2022
    ******************************
    Server initiation module.
*/
const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Server running in");
});
app.get('/astro', function (req, res) {
    
});