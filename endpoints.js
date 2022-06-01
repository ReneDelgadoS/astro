/*
    René Delgado Servín 30/05/2022
    ******************************
    Main of the REST API Astro
    Should handle module loading and intiation.        
*/
//Validator
const Ajv = require('ajv')
const ajv = new Ajv();
//db
const Firestore = require('@google-cloud/firestore')
const db =  new Firestore()

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
            firstEntry: {type: 'number',minimum:1, multipleOf: 1},
            filter: {type: 'string',maxLength: 50}
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


function loadEndpoints(app,db){
    app.get('/pictures',(req,res)=>{
        let validcount = ajv.getSchema('get /pictures cont')(req.query)
        if(!validcount){
            db.collection('entries')
        }
        let validget = ajv.getSchema('get /pictures')(req.query)




    })
}
export {loadEndpoints}