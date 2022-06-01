/*
    René Delgado Servín 30/05/2022
    ******************************
    Endpoint configuration and loading.
*/
//Validator
const Ajv = require('ajv')
const ajv = new Ajv();
//db
const Firestore = require('@google-cloud/firestore')
const db =  new Firestore()
const entriesRef=db.collection('entries');
//Add validation schemas to the validator or future use.
ajv.addSchema(
    {
        type: 'object',
        required: ['count']
    },
    'get /pictures count'
)
ajv.addSchema(
    {
        type: 'object',
        properties: {
            count: { type: 'number',minimum:1,maximum:100, multipleOf: 1},
            filter: {type: 'string',maxLength: 50},
            oldest_date:{type: 'string',pattern: "/^\d{4}-\d{2}-\d{2}$/"},
            newest_date:{type: 'string',pattern: "/^\d{4}-\d{2}-\d{2}$/"},
            date:{type: 'string',pattern: "/^\d{4}-\d{2}-\d{2}$/"},
        },
        additionalProperties: false,
        required: ['count']
    },
    'get /pictures'
)
ajv.addSchema(
    {
        type: 'object',
        properties: {
            key: { type: 'string'},
            entry: {
                type: 'object',
                properties: {
                    title: {type: "string", maxLength: 100},
                    explanation:{type: "string",maxLength: 1000},
                    url:{type: "string"},
                    hdurl:{type: "string"},
                },
                additionalProperties: false,
                required: ['title','explanation','url','hdurl']
            },
            filter: {type: 'string'}
        },
        additionalProperties: false,
        required: ['key','entry']
    },
    'post /pictures'
)


function loadEndpoints(app){
    app.get('/pictures',async (req,res)=>{
        let validcount= ajv.getSchema('get /pictures count')(req.query)
        if(!validcount){
            let data = await entriesRef.orderBy(`additiondate`, 'desc').limit(1).get().docs[0].data()
            res.send(JSON.stringify({count:1,entries:data}))
            return
        }
    })
}

module.exports = {load:loadEndpoints}