/*
    René Delgado Servín 30/05/2022
    ******************************
    Endpoint configuration and loading.
*/
//Validator
const Ajv = require('ajv')
const ajv = new Ajv({coerceTypes:true});
//db
const Firestore = require('@google-cloud/firestore')
const db =  new Firestore()
const ordered_entriesRef=db.collection('entries').orderBy(`additiondate`, 'desc');
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
        let validatecount= ajv.getSchema('get /pictures count')
        let validcount= validatecount(req.query)
        if(!validcount){
            let data = await ordered_entriesRef.limit(1).get().then(
                query=>{
                    return query.docs[0].data()
                }
            )
            res.send(JSON.stringify({count:1,entries:[data]}))
            return
        }
        let validateget = ajv.getSchema('get /pictures')
        let validget= validateget(req.query)
        if(validget){
            let newest_date = 'newest_date' in req.query ? req.query.newest_date : (new Date()).toISOString().split('T')[0]
            let oldest_date = 'oldest_date' in req.query ? req.query.newest_date : '2022-05-30'
            yourDate.toISOString().split('T')[0]
            const query = await ordered_entriesRef.where(`additiondate`,'<=',newest_date).where(`additiondate`,'>=',oldest_date).limit(req.query.count).get()
            if(query.empty){
                res.send(JSON.stringify({code:'404',msg:'No entries matchig query found.'}))
                return
            }
            let out = []
            if('filter' in req.query){
                for(doc in query.docs){
                    if(doc.get('title').contains(req.query.filter)||doc.get('explanation').contains(req.query.filter)){
                        out.append(doc.data())
                    }
                }
            }
            else{
                out=query.docs   
            }
            if(out.length=0){
                res.send(JSON.stringify({code:'404',msg:'No entries matchig query found.'}))
                return
            }
            res.send(JSON.stringify({count:out.length,entries:out}))
        }
        else{
            res.send(JSON.stringify({code:'400',msg:'Bad request',extra:validateget.errors,exra2:(typeof req.query.count)}))  
        }
    })
}

module.exports = {load:loadEndpoints}