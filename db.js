/*
    René Delgado Servín 02/06/2022
    ******************************
    DB loading module
*/
//db
const Firestore = require('@google-cloud/firestore')
const db =  new Firestore()
//reference to the collections needed
const entriesRef=db.collection('entries')
const ordered_entriesRef=entriesRef.orderBy(`additiondate`, 'desc').orderBy(`title`, 'asc');
const keysRef=db.collection('keys')

module.exports={
    entriesRef:entriesRef,
    ordered_entriesRef:ordered_entriesRef,
    keysRef:keysRef
}