const Firestore = require('@google-cloud/firestore')
const fs = require('fs')

const db = new Firestore()

const loadOriginalData = async function (){
    let rawdata = fs.readFileSync('original-data.json')
    let data = JSON.parse(rawdata)

    for (d of data){
        d.additiondate= "2022-05-30"
        console.log()
        let res = await db.collection('entries').add(d)
    }
}
loadOriginalData()



/* 
module.exports={
    loadOriginalData : loadOriginalData
}

 */