const Firestore = require('@google-cloud/firestore')
const fs = require('fs')

const db = new Firestore()

const loadOriginalData = async function (){
    const entries = await db.collection('entires').get()
    entries.forEach(doc=> {
        doc.ref.update({
            additiondate: 2022-05-30
        })
    })
    
}
loadOriginalData()



/* 
module.exports={
    loadOriginalData : loadOriginalData
}

 */