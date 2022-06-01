const fs = require('fs');
let rawdata = fs.readFileSync('original-data.json');

let student = JSON.parse(rawdata);
console.log(student[0]);

