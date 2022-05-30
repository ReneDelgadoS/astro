const Firestore = require('@google-cloud/firestore')
const fs = require('fs')

const db = new Firestore()

const loadOriginalData = async function (){
    let rawdata = fs.readFileSync('original-data.json')
    let data = JSON.parse(rawdata)

    for (d of data){
        console.log()
        let res = await db.collection('entires').add(d)
    }
}
loadOriginalData()



/* 
module.exports={
    loadOriginalData : loadOriginalData
}

 */