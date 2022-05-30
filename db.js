const Firestore = require('@google-cloud/firestore');
const fs = require('fs');

const db = new Firestore({
    projectId: 'astro-351615',
});

function loadOriginalData(){
    let rawdata = fs.readFileSync('original-data.json');
    let data = JSON.parse(rawdata);

    for (d in data){
        let res = await db.collection('entires').add(d)
    }
}
loadOriginalData()



/* 
module.exports={
    loadOriginalData : loadOriginalData
}

 */